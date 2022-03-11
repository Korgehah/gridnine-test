import React from 'react';

// interface FligtItem {
//   isUnderlined: boolean;
//   startCity: string;
//   startAirport: string;
//   startUid: string;
//   startDate: string;
//   endCity: string;
//   endAirport: string;
//   endUid: string;
//   endDate: string;
//   stops: number;
//   carrier: string;
//   duration: number;
// }

const FlightItem = ({
  isUnderlined,
  startCity,
  startAirport,
  startUid,
  startDate,
  endCity,
  endAirport,
  endUid,
  endDate,
  stops,
  carrier,
  duration,
}) => {
  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин';
  };

  const getTimeFromDate = (flightDate) => {
    const date = new Date(flightDate);
    const time = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
    });
    return time;
  };

  const getDayFromDate = (flightDate) => {
    const date = new Date(flightDate);
    const day = date.toLocaleDateString('bestFit', {
      day: 'numeric',
      month: 'short',
      weekday: 'short',
    });
    return day;
  };

  return (
    <div
      className={`flight__ticket ${
        isUnderlined ? 'flight__ticket_underlined' : ''
      }`}
    >
      <div className='flight__path'>
        <span className='flight__airport'>
          {startCity}, {startAirport}{' '}
          <span className='flight__airport-key'>({startUid})</span>
        </span>
        <svg
          className='flight__arrow'
          version='1.0'
          xmlns='http://www.w3.org/2000/svg'
          width='1280.000000pt'
          height='640.000000pt'
          viewBox='0 0 1280.000000 640.000000'
          preserveAspectRatio='xMidYMid meet'
        >
          <g
            transform='translate(0.000000,640.000000) scale(0.100000,-0.100000)'
            fill='#1f99eb'
            stroke='none'
          >
            <path
              d='M9079 6154 l-24 -26 -3 -694 -2 -694 -4481 0 c-4886 0 -4536 4 -4559
-55 -13 -35 -14 -2934 0 -2969 5 -14 23 -32 39 -41 27 -13 486 -15 4515 -15
l4486 0 2 -694 3 -694 24 -26 c29 -31 84 -35 121 -9 14 10 747 609 1630 1332
883 723 1680 1376 1772 1450 91 75 174 150 183 167 19 32 16 65 -8 95 -11 15
-3526 2846 -3577 2882 -37 26 -92 22 -121 -9z'
            />
          </g>
        </svg>
        <span className='flight__airport'>
          {endCity}, {endAirport}{' '}
          <span className='flight__airport-key'>({endUid})</span>
        </span>
      </div>
      <div className='flight__dates'>
        <div className='flight__departure'>
          <span className='flight__time'>{getTimeFromDate(startDate)}</span>{' '}
          <span className='flight__date'>{getDayFromDate(startDate)}</span>
        </div>
        <span className='flight__time'>
          <svg
            className='flight__clock'
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 490 490'
          >
            <path
              d='M245,0C109.5,0,0,109.5,0,245s109.5,245,245,245s245-109.5,245-245S380.5,0,245,0z M245,449.3
			c-112.6,0-204.3-91.7-204.3-204.3S132.4,40.7,245,40.7S449.3,132.4,449.3,245S357.6,449.3,245,449.3z'
            />
            <path
              d='M290.9,224.1h-25v-95.9c0-11.5-9.4-20.9-20.9-20.9s-20.9,9.4-20.9,20.9V245c0,11.5,9.4,20.9,20.9,20.9h45.9
			c11.5,0,20.9-9.4,20.9-20.9S302.3,224.1,290.9,224.1z'
            />
          </svg>
          {getTimeFromMins(duration)}
        </span>
        <div className='flight__arival'>
          <span className='flight__date'>{getDayFromDate(endDate)}</span>{' '}
          <span className='flight__time'>{getTimeFromDate(endDate)}</span>
        </div>
      </div>
      <span className='flight__stops'>
        {stops === 1
          ? '1 пересадка'
          : stops === 2
          ? '2 и более пересадок'
          : 'без пересадок'}
      </span>
      <span className='flight__airline'>Рейс выполняет: {carrier}</span>
    </div>
  );
};

const FlightCard = ({ flight }) => {
  console.log(flight.legs);
  return (
    <div className='flight__card'>
      <div className='flight__header'>
        <span className='flight__logo'>LOGO</span>
        <div className='flight__info'>
          <span className='flight__price'>
            {flight.price.total.amount} {flight.price.total.currency}
          </span>
          <span className='flight__text'>
            Стоимость для одного взрослого пассажира
          </span>
        </div>
      </div>
      {flight.legs.map((leg, index) => (
        <FlightItem
          key={index}
          isUnderlined={index === 0 ? true : false}
          startCity={leg.segments[0].departureCity?.caption}
          startAirport={leg.segments[0].departureAirport?.caption}
          startUid={leg.segments[0].departureAirport?.uid}
          startDate={leg.segments[0].departureDate}
          endCity={leg.segments[leg.segments.length - 1].arrivalCity?.caption}
          endAirport={
            leg.segments[leg.segments.length - 1].arrivalAirport?.caption
          }
          endUid={leg.segments[leg.segments.length - 1].arrivalAirport?.uid}
          endDate={leg.segments[leg.segments.length - 1].arrivalDate}
          duration={leg.duration}
          stops={leg.segments.length - 1}
          carrier={flight.carrier.caption}
        />
      ))}
      <button className='flight__button'>Выбрать</button>
    </div>
  );
};

const FlightCards = ({ flights }) => {
  return (
    <div className='flight'>
      {flights ? (
        flights.map((item, index) => (
          <FlightCard key={index} flight={item.flight} />
        ))
      ) : (
        <span className='flight__loader'>Идет загрузка...</span>
      )}
    </div>
  );
};
export default FlightCards;

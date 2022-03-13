import React, { useEffect, useRef, useState } from 'react';

/* styles */
import './assets/scss/index.scss';
/* components */
import FlightCards from './components/FlightCards';
import Checkbox from './components/Checkbox';

const Menu = ({
  flights,
  setSortType,
  handleToggle,
  nameNumbers,
  airlineFilters,
  stopsFilters,
  priceFrom,
  priceTo,
  setPriceFilter,
  bestPrices,
}) => {
  const getPrice = () => {
    let priceToCurrent = priceTo.current.value;

    setPriceFilter({
      from: priceFrom.current.value,
      to: priceToCurrent ? priceToCurrent : 10000000,
    });
  };

  return (
    <div className='menu'>
      <div className='menu__section'>
        <span className='menu__title'>Сортировать</span>
        <div className='menu__filters'>
          <label
            className='menu__filter'
            onClick={() => setSortType('priceLowToHigh')}
          >
            <input
              className='menu__filter-item'
              type='radio'
              name='sort'
              defaultChecked
            />
            <span className='menu__filter-name'>- по возрастанию цены</span>
          </label>
          <label
            className='menu__filter'
            onClick={() => setSortType('priceHighToLow')}
          >
            <input className='menu__filter-item' type='radio' name='sort' />
            <span className='menu__filter-name'>- по убыванию цены</span>
          </label>
          <label className='menu__filter' onClick={() => setSortType('byTime')}>
            <input className='menu__filter-item' type='radio' name='sort' />
            <span className='menu__filter-name'>- по времени в пути</span>
          </label>
        </div>
      </div>
      <div className='menu__section'>
        <span className='menu__title'>Фильтровать</span>
        <div className='menu__filters'>
          <Checkbox
            isStops
            flights={flights}
            nameNumbers={nameNumbers}
            stopsFilters={stopsFilters}
            handleToggle={handleToggle}
          />
        </div>
      </div>
      <div className='menu__section'>
        <span className='menu__title'>Цена</span>
        <div className='menu__filters'>
          <label className='menu__filter'>
            <span className='menu__filter-name'>От</span>
            <input
              className='menu__filter-input'
              ref={priceFrom}
              placeholder='0'
              type='text'
              onChange={() => getPrice()}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </label>
          <label className='menu__filter'>
            <span className='menu__filter-name'>До</span>
            <input
              className='menu__filter-input'
              ref={priceTo}
              placeholder='1000000'
              type='text'
              onChange={() => getPrice()}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </label>
        </div>
      </div>
      <div className='menu__section'>
        <span className='menu__title'>Авиакомпании</span>
        <div className='menu__filters'>
          <Checkbox
            flights={flights}
            handleToggle={handleToggle}
            airlineFilters={airlineFilters}
            stopsFilters={stopsFilters}
            bestPrices={bestPrices}
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [flights, setFlights] = useState();
  const [bestPrices, setBestPrices] = useState();
  const [sortType, setSortType] = useState('priceLowToHigh');
  const [flightsToShow, setFlightsToShow] = useState(2);
  const [sortedFlights, setSortedFlights] = useState();
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [airlineFilters, setAirlineFilters] = useState([]);
  const [stopsFilters, setStopsFilters] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ from: 0, to: 1000000 });
  const priceFrom = useRef();
  const priceTo = useRef();

  const nameNumbers = (value) => {
    value = value % 10;
    if (value > 1 && value < 5) return 'пересадки';
    if (value === 1) return 'пересадка';
    if (value === 0) return 'без пересадок';
    return 'пересадок';
  };

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        'https://gist.githubusercontent.com/Korgehah/e401fa1db01becd21b707eba5879523b/raw/0fce2871f476d2a6ed110ed2a9f88ab09d3320c5/flights.json'
      );
      const data = await response.json();
      setFlights(data.result.flights);
      setBestPrices(data.result.bestPrices.ONE_CONNECTION.bestFlights);
    };
    fetcher();
  }, []);

  const handleToggle = (item, filterType) => {
    const currentIndex = filterType.indexOf(item);
    const newFilters = [...filterType];

    if (currentIndex === -1) {
      newFilters.push(item);
    } else {
      newFilters.splice(currentIndex, 1);
    }

    if (filterType === airlineFilters) {
      setAirlineFilters(newFilters);
    } else {
      setStopsFilters(newFilters);
    }
  };

  useEffect(() => {
    const filterFlights = () => {
      if (sortedFlights) {
        setFilteredFlights(
          [...sortedFlights]
            .filter((flight) => {
              if (airlineFilters.length !== 0) {
                return airlineFilters.includes(flight.flight.carrier.caption);
              } else {
                return flight;
              }
            })
            .filter((flight) => {
              if (stopsFilters.length !== 0) {
                return stopsFilters.includes(
                  flight.flight.legs[0].segments.length - 1 ||
                    flight.flight.legs[1].segments.length - 1
                );
              } else {
                return flight;
              }
            })
            .filter(
              (flight) =>
                flight.flight.price.total.amount > Number(priceFilter.from) &&
                flight.flight.price.total.amount < Number(priceFilter.to)
            )
        );
      }
    };
    filterFlights();
  }, [sortedFlights, airlineFilters, priceFilter, stopsFilters]);

  useEffect(() => {
    if (flights) {
      if (sortType === 'priceLowToHigh') {
        setSortedFlights(
          [...flights].sort(
            (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
          )
        );
      } else if (sortType === 'priceHighToLow') {
        setSortedFlights(
          [...flights].sort(
            (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
          )
        );
      } else if (sortType === 'byTime') {
        setSortedFlights(
          [...flights].sort(
            (a, b) =>
              a.flight.legs[0].duration +
              a.flight.legs[1].duration -
              (b.flight.legs[0].duration + b.flight.legs[1].duration)
          )
        );
      }
    }
  }, [sortType, flights]);

  return (
    <div className='App'>
      <main className='main'>
        <div className='wrapper main__wrapper'>
          <Menu
            setSortType={setSortType}
            flights={flights}
            handleToggle={handleToggle}
            nameNumbers={nameNumbers}
            airlineFilters={airlineFilters}
            stopsFilters={stopsFilters}
            priceFrom={priceFrom}
            priceTo={priceTo}
            setPriceFilter={setPriceFilter}
            bestPrices={bestPrices}
          />
          <FlightCards
            flights={filteredFlights}
            flightsToShow={flightsToShow}
            setFlightsToShow={setFlightsToShow}
            nameNumbers={nameNumbers}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

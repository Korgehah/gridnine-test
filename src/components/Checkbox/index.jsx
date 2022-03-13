import React from 'react';

const Checkbox = ({
  flights,
  handleToggle,
  isStops,
  nameNumbers,
  airlineFilters,
  stopsFilters,
  bestPrices,
}) => {
  const stops = [];
  flights?.map((item) => {
    let stop = [];
    stops.push(stop);
    return item.flight.legs.map((leg) => {
      stop.push(leg.segments.length - 1);
      return stop;
    });
  });

  const carriers = bestPrices?.map((item) => {
    return item.carrier.caption;
  });

  const pricesAmount = bestPrices?.map((item) => {
    return item.price.amount;
  });

  const allPricesData = [];

  for (let i = 0; i < carriers?.length; i++) {
    let oneFlight = {};
    oneFlight.carrier = carriers[i];
    oneFlight.price = pricesAmount[i];
    allPricesData.push(oneFlight);
  }

  const carriersAndPrices = [];

  allPricesData.forEach((item) => {
    let cond = carriersAndPrices.some((event) => {
      if (event.carrier === item.carrier) {
        if (+event.price > +item.price) {
          event.price = item.price;
        }
        return true;
      } else {
        return false;
      }
    });
    if (!cond) {
      return carriersAndPrices.push({
        carrier: item.carrier,
        price: item.price,
      });
    }
  });

  const getUnique = (arr) => {
    return Array.from(new Set(arr)).sort();
  };

  const uniqueStops = getUnique(stops.flat(1));

  if (isStops)
    return (
      <>
        {uniqueStops
          ? uniqueStops.map((stop, index) => {
              return (
                <label className='menu__filter' key={index}>
                  <input
                    className='menu__filter-item'
                    type='checkbox'
                    onChange={() => handleToggle(stop, stopsFilters)}
                  />
                  <span className='menu__filter-name'>
                    - {stop !== 0 ? stop : ''} {nameNumbers(stop)}
                  </span>
                </label>
              );
            })
          : ''}
      </>
    );

  return (
    <>
      {carriersAndPrices
        ? carriersAndPrices.map((item, index) => {
            return (
              <label className='menu__filter' key={index}>
                <input
                  className='menu__filter-item'
                  type='checkbox'
                  onChange={() => {
                    handleToggle(item.carrier, airlineFilters);
                  }}
                />
                <span className='menu__filter-name'>- {item.carrier}</span>
                <span className='menu__filter-price'>От {item.price} руб.</span>
              </label>
            );
          })
        : ''}
    </>
  );
};
export default Checkbox;

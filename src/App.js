import React, { useEffect, useState } from 'react';

/* styles */
import './assets/scss/index.scss';
/* components */
import FlightCards from './components/FlightCards';

const Menu = () => {
  return (
    <div className='menu'>
      <div className='menu__section'>
        <span className='menu__title'>Сортировать</span>
        <div className='menu__filters'>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='radio' name='sort' />
            <span className='menu__filter-name'>- по возрастанию цены</span>
          </label>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='radio' name='sort' />
            <span className='menu__filter-name'>- по убыванию цены</span>
          </label>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='radio' name='sort' />
            <span className='menu__filter-name'>- по времени в пути</span>
          </label>
        </div>
      </div>
      <div className='menu__section'>
        <span className='menu__title'>Фильтровать</span>
        <div className='menu__filters'>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='checkbox' />
            <span className='menu__filter-name'>- 1 пересадка</span>
          </label>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='checkbox' />
            <span className='menu__filter-name'>- без пересадок</span>
          </label>
        </div>
      </div>
      <div className='menu__section'>
        <span className='menu__title'>Цена</span>
        <div className='menu__filters'>
          <label className='menu__filter'>
            <span className='menu__filter-name'>От</span>
            <input
              className='menu__filter-input'
              placeholder='0'
              type='text'
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
              placeholder='1000000'
              type='text'
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
          <label className='menu__filter'>
            <input className='menu__filter-item' type='checkbox' />
            <span className='menu__filter-name'>- LOT POLISH AIRLINES</span>
            <span className='menu__filter-price'>от 21049р</span>
          </label>
          <label className='menu__filter'>
            <input className='menu__filter-item' type='checkbox' />
            <span className='menu__filter-airline'>Аэрофлот Россия</span>
            <span className='menu__filter-price'>от 21049р</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [flights, setFlights] = useState();

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        'https://gist.githubusercontent.com/Korgehah/e401fa1db01becd21b707eba5879523b/raw/0fce2871f476d2a6ed110ed2a9f88ab09d3320c5/flights.json'
      );
      const data = await response.json();
      setFlights(data.result.flights);
    };
    fetcher();
  }, []);

  return (
    <div className='App'>
      <main className='main'>
        <div className='wrapper main__wrapper'>
          <Menu />
          <FlightCards flights={flights} />
        </div>
      </main>
    </div>
  );
};

export default App;

import React from 'react';

/* styles */
import './assets/scss/index.scss';
/* components */

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

const reverseFunction = (str) => {
  let reverseStr = str.split('').reverse().join('');
  if (reverseStr === str) {
    console.log(true);
  } else {
    console.log(false);
  }
};

reverseFunction('ablobla');

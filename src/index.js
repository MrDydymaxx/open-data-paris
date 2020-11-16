import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App = () => (
  <div>
    <NavBar />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

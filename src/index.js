import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Context} from "./components/Context/Context";


ReactDOM.render(
    <Context>
        <App />
    </Context>,
  document.getElementById('root')
);


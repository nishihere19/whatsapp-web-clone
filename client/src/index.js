import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './Library/stores'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));

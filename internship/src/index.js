import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './bootstrap.min.css';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);


ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();

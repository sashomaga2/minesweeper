import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import App from './components/App';

const ROW_SIZE = 8;
let row;
let data = [];
for(let i = 0; i < ROW_SIZE; i++){
    row = [];
    for(let j = 0; j < ROW_SIZE; j++){
        row.push({ open: false, id: i*ROW_SIZE + j });
    }
    data.push(row);

}

console.log(data);

const store = configureStore(data);

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);



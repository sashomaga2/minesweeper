import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import createRandomStore from './store/storeCreator';
import {Provider} from 'react-redux';
import App from './components/App';



const store = configureStore(createRandomStore(10,8,8));

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);




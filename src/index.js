/*eslint-disable inport/default*/
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { createRandomStore } from './store/storeCreator';
import { Provider } from 'react-redux';
import App from './components/App';
import { LEVEL } from './reducers/reducers';
import { loadMines } from './actions/actions';

const store = configureStore(createRandomStore(LEVEL.BEGINNER));

/* in case loading async data from API */
//const store = configureStore({});
//store.dispatch(loadMines());

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);




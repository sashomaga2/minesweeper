import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import createRandomStore from './store/storeCreator';
import {Provider} from 'react-redux';
import App from './components/App';
import { LEVEL } from './reducers/reducers';


const store = configureStore(createRandomStore(LEVEL.BEGINNER));

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);




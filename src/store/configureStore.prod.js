import {createStore, applyMiddleware} from 'redux';
import { rootReducer } from '../reducers/reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    console.log('configureStore', initialState);
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}

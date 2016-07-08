import {createStore, applyMiddleware} from 'redux';
import { rootReducer } from '../reducers/reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
    console.log('configureStore', initialState);
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant())
    );
}


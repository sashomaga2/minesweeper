import * as types from './actionTypes';
import MinesApi from './../api/mockMinesApi';

export function openAction(id) {
    console.log("actions.openAction");
    return { type: types.OPEN, id };
}

export function markAction(id) {
    console.log("actions.markAction");
    return { type: types.MARK, id };
}

export function newGameAction(id) {
    console.log("actions.newGameAction");
    return { type: types.NEW_GAME };
}

export function changeLevelAction(level) {
    console.log("actions.changeGameLevelAction");
    return { type: types.CHANGE_LEVEL, level };
}

/* Thunks */
export function loadMinesSuccess(mines) {
    return { type: types.LOAD_MINES_SUCCESS, mines };
}

export function loadMines() {
    return function(dispatch) {
        return MinesApi.getMines()
            .then(mines => dispatch(loadMinesSuccess(mines)))
            .catch(error => { throw(error); });
    };
}




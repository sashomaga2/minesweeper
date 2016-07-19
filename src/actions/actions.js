import * as types from './actionTypes';

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




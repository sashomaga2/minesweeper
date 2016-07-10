export function openAction(id) {
    console.log("actions.openAction");
    return { type: 'OPEN', id }; // in ES6 omit id: id
}

export function markAction(id) {
    console.log("actions.markAction");
    return { type: 'MARK', id }; // in ES6 omit id: id
}

export function newGameAction(id) {
    console.log("actions.newGameAction");
    return { type: 'NEW_GAME' }; 
}

export function changeLevelAction(level) {
    console.log("actions.changeGameLevelAction");
    return { type: 'CHANGE_LEVEL', level }; 
}



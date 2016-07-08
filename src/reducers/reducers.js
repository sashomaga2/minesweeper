import React from 'react';
import update from 'react/lib/update';

export const MARK = {
    BOMB : 0,
    QUESTION: 1,
    EMPTY : 2
}

export function rootReducer(state = [], action) {
    switch(action.type) {
        case 'OPEN':
            return handleOpenAction(state, action.id);
        case 'MARK':
            console.log('reducers.mark', action);
            return handleMarkAction(state, action.id);
        // return [...state, Object.assign({}, action.course)] //deep copy
            // create a new array with new value assigned
        default:
            return state;
    }
}

function findBoxCoordinates(state, boxId) {
    let x, y;
    state.forEach((row, index)=>{
        let box = row.find((item)=>item.id === boxId);
        if(box){
            x = index;
            y = row.indexOf(box);
        }

    });
    return { x, y };
}

function handleMarkAction(state, boxId) {
    let coords = findBoxCoordinates(state, boxId),
        box = state[coords.x][coords.y];

    if(!box.open) {
        let oldMark = box.mark;
        let newMark = ++oldMark % Object.keys(MARK).length;

        return updateBox(state, box, 'mark', newMark, coords);
    }

    return state;
}

function updateBox(state, box, prop, value, coords) {
    let updatedBox, updatedRow;

    updatedBox = update(box, {[prop]: {$set: value}});
    updatedRow = update(state[coords.x], { $splice: [[coords.y, 1, updatedBox]] });
    return update(state, { $splice: [[coords.x, 1, updatedRow]] });
}

function handleOpenAction(state, boxId) {
    let coords = findBoxCoordinates(state, boxId),
        box = state[coords.x][coords.y];

    if(!box.open) {
        return updateBox(state, box, 'open', true, coords);
    }

    return state;
}

//export default reducers;

import React from 'react';
import update from 'react/lib/update';


function reducers(state = [], action) {
    switch(action.type) {
        case 'OPEN':
            return handleOpenAction(state, action.id);
        case 'MARK':
            console.log('reducers.mark', action);
            return state;
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

function handleOpenAction(state, boxId) {
    let coords = findBoxCoordinates(state, boxId),
        box = state[coords.x][coords.y],
        updatedBox, updatedRow;

    if(!box.open) {
        updatedBox = update(box, {open: {$set: true}});
        updatedRow = update(state[coords.x], { $splice: [[coords.y, 1, updatedBox]] });
        state = update(state, { $splice: [[coords.x, 1, updatedRow]] });
    }

    return state;
}

export default reducers;

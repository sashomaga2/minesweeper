import React from 'react';
import update from 'react/lib/update';
import { createEmptyMineMap } from './../store/storeCreator';

export const MARK = {
    BOMB : 0,
    QUESTION: 1,
    EMPTY : 2
};

export const BOMB = {
    EMPTY: 0,
    BOMB: -1,
    WRONG: -2,
    EXPLOSION: -3
};

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
        // set next state by order
        let newMark = ++oldMark % Object.keys(MARK).length;

        return updateBox(state, coords, 'mark', newMark);
    }

    return state;
}

function updateBox(state, coords, prop, value) {
    let updatedBox, updatedRow, box = state[coords.x][coords.y];

    updatedBox = update(box, {[prop]: {$set: value}});
    console.log('updatedBox', updatedBox);
    updatedRow = update(state[coords.x], { $splice: [[coords.y, 1, updatedBox]] });
    return update(state, { $splice: [[coords.x, 1, updatedRow]] });
}

function handleExplosion(state, coords) {
    let newState = updateBox(state, coords, 'open', true),
        box;

    for(let row = 0; row < state.length; row++){
        for(let col= 0; col < state[0].length; col++){
            box = newState[row][col];
            if(!box.open) {
                newState = updateBox(newState, { x: row, y: col }, 'open', true);
            }
            if(box.mark === MARK.BOMB && box.score !== BOMB.BOMB) {
                newState = updateBox(newState, { x: row, y: col }, 'score', BOMB.WRONG);
            }
        }
    }

    newState = updateBox(newState, coords, 'score', BOMB.EXPLOSION);

    return newState;
}

function handleOpenAction(state, boxId) {
    let coords = findBoxCoordinates(state, boxId),
        box = state[coords.x][coords.y];

    if(!box.open) {
        if(box.score === BOMB.BOMB) { // BOMB
            state = handleExplosion(state, coords);
        } else if (box.score === BOMB.EMPTY) { // EMPTY
            state = openFreeSpaces(state, coords);

        }
        return updateBox(state, coords, 'open', true);
    }

    return state;
}

function openFreeSpaces(state, coords) {
    let maxRow = state.length,
        maxCol = state[0].length,
        visited = createEmptyMineMap(maxRow, maxCol);

    _openAdjacentBoxes(coords.x, coords.y);

    return state;

    function _openAdjacentBoxes(row, col) {
        if(visited[row][col]){
            return;
        }

        if(!state[row][col].open) {
            state = updateBox(state, { x: row, y: col }, 'open', true);
        }

        visited[row][col] = 1;

        let newRow, newCol, isSameBox, inBoundaries, score;

        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                newRow = row + i;
                newCol = col + j;
                isSameBox = (i === 0 && j === 0);
                inBoundaries = newRow >= 0 && newRow < maxRow && newCol >=0 && newCol < maxCol;

                if(!isSameBox && inBoundaries) {
                    score = state[newRow][newCol].score;
                    if(score === BOMB.EMPTY && !visited[newRow][newCol]) {
                        _openAdjacentBoxes(newRow, newCol);
                    } else if(score !== BOMB.BOMB) {
                        state = updateBox(state, { x: newRow, y: newCol }, 'open', true);
                    }
                }
            }
        }
    }
}


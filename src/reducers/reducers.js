import React from 'react';
import update from 'react/lib/update';
import { createEmptyMineMap } from './../store/storeCreator';
import createRandomStore from './../store/storeCreator';

export const MARK = {
    BOMB : 0,
    QUESTION: 1,
    EMPTY : 2
};

export const BOX = {
    EMPTY: 0,
    BOMB: -1,
    WRONG: -2,
    EXPLOSION: -3
};

export const LEVEL = {
    BEGINNER: 0,
    INTERMEDIATE: 1,
    EXPERT: 2
};

export function rootReducer(state = [], action) {
    switch(action.type) {
        case 'OPEN':
            return handleOpenAction(state, action.id);
        case 'MARK':
            return handleMarkAction(state, action.id);
        // return [...state, Object.assign({}, action.course)] //deep copy
            // create a new array with new value assigned
        case 'NEW_GAME':
            return handleNewGameAction(state);
        case 'CHANGE_LEVEL':
            return handleChangeLevelAction(state, action.level);
        default:
            return state;
    }
}

function handleChangeLevelAction(state, level) {
    return handleNewGameAction(Object.assign({}, state, {level: level}));
}

function handleNewGameAction(state) {
    console.log('handleNewGame', state.level);
    let newState = createRandomStore(state.level);
    return newState;
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
    let data = state.data,
        coords = findBoxCoordinates(data, boxId),
        box = data[coords.x][coords.y];

    if(!box.open) {
        let oldMark = box.mark;
        // set next state by order
        let newMark = ++oldMark % Object.keys(MARK).length;

        return updateBox(state, coords, 'mark', newMark);
    }

    return state;
}

function updateBox(state, coords, prop, value) {
    let updatedBox, data = state.data, updatedRow, box = data[coords.x][coords.y];

    updatedBox = update(box, {[prop]: {$set: value}});
    updatedRow = update(data[coords.x], { $splice: [[coords.y, 1, updatedBox]] });
    let newData = update(data, { $splice: [[coords.x, 1, updatedRow]] });
    return Object.assign({}, state, { data: newData });
}

function handleExplosion(state, coords) {
    let data = state.data;
    let newState = updateBox(state, coords, 'open', true),
        box;

    for(let row = 0; row < data.length; row++){
        for(let col= 0; col < data[0].length; col++){
            box = newState.data[row][col];
            if(!box.open) {
                newState = updateBox(newState, { x: row, y: col }, 'open', true);
            }
            if(box.mark === MARK.BOMB && box.score !== BOX.BOMB) {
                newState = updateBox(newState, { x: row, y: col }, 'score', BOX.WRONG);
            }
        }
    }

    newState = updateBox(newState, coords, 'score', BOX.EXPLOSION);

    return newState;
}

function handleOpenAction(state, boxId) {
    console.log('open', state);
    let coords = findBoxCoordinates(state.data, boxId),
        box = state.data[coords.x][coords.y];

    if(!box.open) {
        if(box.score === BOX.BOMB) { // BOMB
            state = handleExplosion(state, coords);
        } else if (box.score === BOX.EMPTY) { // EMPTY
            state = openFreeSpaces(state, coords);

        }
        return updateBox(state, coords, 'open', true);
    }

    return state;
}

function openFreeSpaces(state, coords) {
    let maxRow = state.data.length,
        maxCol = state.data[0].length,
        visited = createEmptyMineMap(maxRow, maxCol);

    _openAdjacentBoxes(coords.x, coords.y);

    return state;

    function _openAdjacentBoxes(row, col) {
        if(visited[row][col]){
            return;
        }

        if(!state.data[row][col].open) {
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
                    score = state.data[newRow][newCol].score;
                    if(score === BOX.EMPTY && !visited[newRow][newCol]) {
                        _openAdjacentBoxes(newRow, newCol);
                    } else if(score !== BOX.BOMB) {
                        state = updateBox(state, { x: newRow, y: newCol }, 'open', true);
                    }
                }
            }
        }
    }
}


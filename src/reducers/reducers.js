import React from 'react';
import update from 'react/lib/update';
import { createEmptyMineMap, createRandomStore } from './../store/storeCreator';
import * as types from './../actions/actionTypes';

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

export const GAME = {
    READY: 0,
    STARTED: 1,
    LOST: 2,
    WIN: 3
};

export function rootReducer(state = [], action) {
    console.log('rootReducer', action);
    switch(action.type) {
        case types.OPEN:
            return handleOpenAction(state, action.id);
        case types.MARK:
            return handleMarkAction(state, action.id);
        case types.NEW_GAME:
            return handleNewGameAction(state);
        case types.CHANGE_LEVEL:
            return handleChangeLevelAction(state, action.level);
        case types.LOAD_MINES_SUCCESS:
            return action.mines;
        default:
            return state;
    }
}

function handleChangeLevelAction(state, level) {
    return handleNewGameAction(Object.assign({}, state, {level: level}));
}

function handleNewGameAction(state) {
    return createRandomStore(state.level);
}

export function findBoxCoordinates(state, boxId) {
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

    if(!box.open && state.game === GAME.STARTED) {
        let oldMark = box.mark;
        // set next state by order
        let newMark = ++oldMark % Object.keys(MARK).length;

        if(newMark === MARK.BOMB) {
            state = Object.assign({}, state, {minesLeft: state.minesLeft - 1});
        } else if(newMark === MARK.QUESTION) {
            state = Object.assign({}, state, {minesLeft: state.minesLeft + 1});
        }

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

    newState = Object.assign({}, newState, { game: GAME.LOST });

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
    let coords = findBoxCoordinates(state.data, boxId),
        box = state.data[coords.x][coords.y];

    if(state.game === GAME.READY) {
        state = Object.assign({}, state, {game: GAME.STARTED});
    }

    if(!box.open && box.mark !== MARK.BOMB && state.game === GAME.STARTED) {
        if(box.score === BOX.BOMB) { // BOMB
            state = handleExplosion(state, coords);
        } else if (box.score === BOX.EMPTY) { // EMPTY
            state = openFreeSpaces(state, coords);

        } else {
            state = Object.assign({}, state, { openBoxes: state.openBoxes + 1 });
        }

        //console.log(`openBoxes: ${state.openBoxes} total: ${state.totalWithoutMines}`);

        if(state.openBoxes === state.totalWithoutMines) {
            state = Object.assign({}, state, { game: GAME.WIN });
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

        let box = state.data[row][col];

        if(!box.open && box.mark !== MARK.BOMB) {
            state = Object.assign({}, state, { openBoxes: state.openBoxes + 1 });
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
                    box = state.data[newRow][newCol];
                    score = box.score;
                    if(score === BOX.EMPTY && !visited[newRow][newCol]) {
                        _openAdjacentBoxes(newRow, newCol);
                    } else if(score !== BOX.BOMB && box.mark !== MARK.BOMB && !box.open) {
                        state = Object.assign({}, state, { openBoxes: state.openBoxes + 1 });
                        state = updateBox(state, { x: newRow, y: newCol }, 'open', true);
                    }
                }
            }
        }
    }
}


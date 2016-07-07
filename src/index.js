import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import App from './components/App';



const store = configureStore(createRandomStore(8,8));

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

function createRandomStore(rows, cols) {
    let map = createMinesMap(10, rows, cols);
    let row;
    let data = [];
    for(let i = 0; i < rows; i++){
        row = [];
        for(let j = 0; j < cols; j++){
            row.push({ open: false, id: i*rows + j, score: map[i][j] });
        }
        data.push(row);
    }

    //console.log(data);
    return data;
}

function drawMap(map) {
    var view = '';
    for(var i=0; i< 8; i++) {
        for(var j=0; j< 8; j++) {
            view += ' '+map[i][j];
        }
        console.log(view);
        view = '';
    }
}

function createMinesMap(count, rows, cols) {
    let pos = generateRandomMinesPositions(count, rows*cols);
    let map = createEmptyMineMap(rows, cols);
    populateMines(map, pos);
    populateScores(map);

    drawMap(map);
    console.log('map', map);
    return map;
}

function populateMines(map, positions) {
    const col = map[0].length;
    for(let pos of positions) {
        map[Math.floor(pos / col)][pos % col] = -1;
    }
}

function generateRandomMinesPositions(count, total) {
    let mines = new Set();

    while(mines.size < count) {
        mines.add(Math.floor(Math.random() * total));
    }

    return mines;
}

function createEmptyMineMap(rows, cols) {
    let scores = [];
    let row;
    for(let i = 0; i < rows; i++) {
        row = [];
        for(let j = 0; j < cols; j++) {
            row.push(0);
        }
        scores.push(row);
    }

    return scores;
}

function populateScores(mineMap){
    let row = mineMap.length;
    let col = mineMap[0].length;

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            populateBoxScore(mineMap, i, j);
        }
    }
}

function populateBoxScore(mineMap, row, col) {
    if(mineMap[row][col] === -1) {
        return;
    }

    let maxRow = mineMap.length,
        maxCol = mineMap[0].length,
        newRow, newCol, isSameBox, inBoundaries;

    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            newRow = row + i;
            newCol = col + j;
            isSameBox = (i === 0 && j === 0);
            inBoundaries = newRow >= 0 && newRow < maxRow && newCol >=0 && newCol < maxCol;

            if(!isSameBox && inBoundaries && mineMap[newRow][newCol] === -1) {
                mineMap[row][col]++;
            }
        }
    }
}


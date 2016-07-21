import update from 'react/lib/update';
import { MARK, BOX, LEVEL, GAME } from './../reducers/reducers';

export function createRandomStore (level) {
        let minesCount, rows, cols;
        switch (level) {
            case LEVEL.BEGINNER:
                minesCount = 10;
                rows = 8;
                cols = 8;
                break;
            case LEVEL.INTERMEDIATE:
                minesCount = 40;
                rows = 16;
                cols = 16;
                break;
            case LEVEL.EXPERT:
                minesCount = 99;
                rows = 25;
                cols = 25;
                break;
        }

        let map = createMinesMap(minesCount, rows, cols);
        let row;
        let data = [];
        for (let i = 0; i < rows; i++) {
            row = [];
            for (let j = 0; j < cols; j++) {
                row.push({open: false, id: i * rows + j, score: map[i][j], mark: MARK.EMPTY });
            }
            data.push(row);
        }

        return {
            data :data,
            level : level,
            minesLeft: minesCount,
            game: GAME.STARTED,
            openBoxes: 0,
            totalWithoutMines: rows * cols - minesCount,
            time: 0,
            initial: update(data, {$merge: []})
        };
}

function drawMap(map) {
    let view = '';
    for(let i=0; i< 8; i++) {
        for(let j=0; j< 8; j++) {
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

    //drawMap(map);
    return map;
}

function populateMines(map, positions) {
    const col = map[0].length;
    for(let pos of positions) {
        map[Math.floor(pos / col)][pos % col] = BOX.BOMB;
    }
}

function generateRandomMinesPositions(count, total) {
    let mines = new Set();

    while(mines.size < count) {
        mines.add(Math.floor(Math.random() * total));
    }

    return mines;
}

export function createEmptyMineMap(rows, cols) {
    let scores = [];
    let row;
    for(let i = 0; i < rows; i++) {
        row = [];
        for(let j = 0; j < cols; j++) {
            row.push(BOX.EMPTY);
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
    if(mineMap[row][col] === BOX.BOMB) {
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

            if(!isSameBox && inBoundaries && mineMap[newRow][newCol] === BOX.BOMB) {
                mineMap[row][col]++;
            }
        }
    }
}

import 'babel-polyfill';
import React from 'react';
import Table from './table/table';
import Board from './board/board';
import './../styles/styles.css';
//import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const ROW_SIZE = 8;
const state = { CLOSED: 0, OPEN: 1 };
let row;
let data = { rows : [] };
for(let i = 0; i < ROW_SIZE; i++){
    row = [];
    for(let j = 0; j < ROW_SIZE; j++){
        row.push({ state: state.CLOSED, id: i*ROW_SIZE + j });
    }
    data.rows.push(row);

}

console.log(data);

class App extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            data: data
        }
    }

    render() {
        return (
            <div className="ms-container">
                <Board />
                <Table data={this.state.data} />
            </div>

        );
    }
}

export default App;
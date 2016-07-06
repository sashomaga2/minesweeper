import 'babel-polyfill';
import React from 'react';
import Table from './table/table';
import Board from './board/board';
import './../styles/styles.css';
//import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        // this.state = {
        //     data: data
        // }
        //data={this.state.data}
    }

    render() {
        return (
            <div className="ms-container">
                <Board />
                <Table /> 
            </div>
        );
    }
}

export default App;
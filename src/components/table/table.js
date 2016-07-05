import React from 'react';
import Cell from './../cell/cell';

class Table extends React.Component {

    render() {
        return (
            <div className="ms-table">
                {this.props.data.rows.map(function(row){
                    return(
                        <div>{ row.map(function(cell){
                            //console.log('cell', cell);
                            return (
                                <Cell key={cell.id} test={cell.id}/>
                            )
                        }) } </div>
                    )
                })}
            </div>
        )
    }
}

export default Table;

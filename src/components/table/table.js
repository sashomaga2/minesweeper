import React from 'react';
import Cell from './../cell/cell';
import {connect} from 'react-redux';
import {openAction, markAction} from './../../actions/actions';

class Table extends React.Component {
    // onItemClick(id) {
    //     this.props.dispatch(openAction(id));
    // }

    constructor(props, context){
        super(props, context);

        // need to bind this in ES6 classes!
        //this.handleChildClick = this.handleChildClick.bind(this);
        //this.handleChildRightClick = this.handleChildRightClick.bind(this);
    }

    handleChildRightClick(e, id) {
        e.preventDefault();
        this.props.dispatch(markAction(id));
    }

    handleChildClick(id) {
        this.props.dispatch(openAction(id));
    }

    render() {
        console.log('render', this);
        let self = this;
        return (
            <div className="ms-table">
                {this.props.data.map(function(row){
                    return(
                        <div className="ms-row">{ row.map(function(cell){
                            //console.log('cell', cell);
                            let cellId = cell.id;
                            return (
                                <Cell key={cellId} onClick={()=>self.handleChildClick(cellId)} onContextMenu={(e)=>self.handleChildRightClick(e, cellId)} data={cell}/>
                            )
                        }) } </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log('mapStateToProps', state);
    return {
        data: state //comes from reducer
    };
}

//, mapDispatchToProps
// this.props.dispatch  fire actions

export default connect(mapStateToProps)(Table);

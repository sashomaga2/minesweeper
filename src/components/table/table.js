import React from 'react';
import Cell from './../cell/cell';
import {connect} from 'react-redux';
import {openAction, markAction} from './../../actions/actions';

const PropTypes = React.PropTypes;

class Table extends React.Component {
    constructor(props, context){
        super(props, context);

        // need to bind this in ES6 classes!
        //this.handleChildClick = this.handleChildClick.bind(this);
        //this.handleChildRightClick = this.handleChildRightClick.bind(this);
    }

    handleChildRightClick(e, id) {
        // TODO uncomment in order mark to work
        e.preventDefault();
        this.props.mark(id);
    }

    handleChildClick(id) {
        this.props.open(id);
    }

    render() {
        console.log('%c Table.render', 'color: brown');
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

Table.propTypes = {
    open: PropTypes.func.isRequired,
    mark: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        data: state.initial
    };
}

function mapDispatchToProps(dispatch) {
    return {
        open: id => dispatch(openAction(id)),
        mark: id => dispatch(markAction(id))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Table);

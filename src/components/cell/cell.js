import React from 'react';
import { MARK, BOX, findBoxCoordinates } from './../../reducers/reducers';
import {connect} from 'react-redux';

class Cell extends React.Component {

    getClassName() {
        let className;
        let data = this.props.data;
        let score = data.score;

        if(data.open) {
            className = 'box-open ms-cell';
            if(score === BOX.BOMB) {
                className += ' mine';
            } else if(score === BOX.EXPLOSION) {
                className += ' mine-explosion';
            } else if(score === BOX.WRONG){
                className += ' mine-wrong';
            }
            else if(score !== BOX.EMPTY) {
                className += ' m' + score;
            }
        } else { // CLOSED
            className = 'box-closed ms-cell';
            const mark = data.mark;
            if(mark === MARK.BOMB) {
                className += ' mark-bomb';
            } else if(mark === MARK.QUESTION) {
                className += ' mark-question';
            }
        }
        return className;
    }

    render() {
        console.log('%c Cell.render', 'color: green');
        return (
            <div className={this.getClassName()} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
                {this.props.data.open ? this.props.data.score !== BOX.BOMB && this.props.data.score !== BOX.EMPTY  ? this.props.data.score : '' : ''}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    // TODO cache not to compute on every update
    const coords = findBoxCoordinates(state.data, ownProps.data.id);

    return {
        data: state.data[coords.x][coords.y]
    };
}

export default connect(mapStateToProps)(Cell);

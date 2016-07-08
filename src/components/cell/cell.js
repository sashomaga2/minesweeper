import React from 'react';
import { MARK, BOMB } from './../../reducers/reducers';

class Cell extends React.Component {

    getClassName() {
        let className;
        let data = this.props.data;
        let score = data.score;
        
        if(data.open) {
            className = 'open ms-cell';
            if(score === BOMB.BOMB) {
                className += ' mine';
            } else if(score === BOMB.EXPLOSION) {
                className += ' mine-explosion';
            } else if(score === BOMB.WRONG){
                className += ' mine-wrong';
            }
            else if(score !== BOMB.EMPTY) {
                className += ' m' + score;
            } 
        } else { // CLOSED
            className = 'closed ms-cell';
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
        //console.log('cell render', this.props);
        return (
            //<div className={this.props.data.open ? 'open ms-cell mine' : 'closed ms-cell'} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>{this.props.data.id}</div>
            <div className={this.getClassName()} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
                {this.props.data.open ? this.props.data.score !== -1 && this.props.data.score !== 0  ? this.props.data.score : '' : ''}
            </div>
        )
    }
}

export default Cell;

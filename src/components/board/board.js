import React from 'react';
import { connect } from 'react-redux';
import { newGameAction, changeLevelAction } from './../../actions/actions';
import { GAME } from './../../reducers/reducers';

class Board extends React.Component {
    constructor(props, context){
        super(props, context);
        
        // need to bind this in ES6 classes!
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleGameLevelChange = this.handleGameLevelChange.bind(this);
        this.getStartButtonClass = this.getStartButtonClass.bind(this);
    }

    getStartButtonClass() {
        let cls = 'board-start-btn ';
        switch (this.props.game) {
            case GAME.STARTED:
                cls += 'game-started';
                break;
            case GAME.LOST:
                cls += 'game-lost';
                break;
            case GAME.WIN:
                cls += 'game-win';
                break;
        }

        return cls;
    }

    handleNewGame() {
        this.props.dispatch(newGameAction());
    }

    handleGameLevelChange(e) {
        this.props.dispatch(changeLevelAction(Number(e.target.value)));
    }

    render() {
        console.log('%c Board.render', 'color: green');
        return (
            <div className="ms-board">
                <div className="board-mines-left"> {this.props.minesLeft} </div>
                <div className={this.getStartButtonClass()} onClick={this.handleNewGame}></div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        minesLeft: state.minesLeft,
        game: state.game
    };
}

export default connect(mapStateToProps)(Board);

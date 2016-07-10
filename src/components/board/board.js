import React from 'react';
import { connect } from 'react-redux';
import { newGameAction, changeLevelAction } from './../../actions/actions';
import { LEVEL } from './../../reducers/reducers';

class Board extends React.Component {
    constructor(props, context){
        super(props, context);

        // need to bind this in ES6 classes!
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleGameLevelChange = this.handleGameLevelChange.bind(this);
    }

    handleNewGame() {
         this.props.dispatch(newGameAction());
    }

    handleGameLevelChange(e) {
        this.props.dispatch(changeLevelAction(Number(e.target.value)));
    }

    render() {
        return (
            <div className="ms-board">
                <div className="start-btn" onClick={this.handleNewGame}></div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log('Board.mapStateToProps', state);
    return {
        data: state //comes from reducer
    };
}

//, mapDispatchToProps
// this.props.dispatch  fire actions

export default connect(mapStateToProps)(Board);

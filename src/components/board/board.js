import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { newGameAction, changeLevelAction } from './../../actions/actions';
import { GAME } from './../../reducers/reducers';

class Board extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = { time: 0 };
        
        // need to bind this in ES6 classes!
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleGameLevelChange = this.handleGameLevelChange.bind(this);
        this.getStartButtonClass = this.getStartButtonClass.bind(this);
    }

    componentDidMount() {
        this.setTimeInterval();
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    setTimeInterval() {
        this._interval = setInterval(() => (
                this.setState({time: this.state.time + 1})
        ), 1000); 
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps', props);

        if(props.game !== this.props.game) {
            clearInterval(this._interval);

            if(props.game === GAME.STARTED) {
                this.setState({ time: 0 });
                this.setTimeInterval();
            }
        } 
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
        this.setState({ time: 0 });
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
                <div className="board-mines-right"> {this.state.time} </div>
                <div className={this.getStartButtonClass()} onClick={this.handleNewGame}></div>
            </div>
        );
    }
}

Board.propTypes = {
    minesLeft: PropTypes.number.isRequired,
    game: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log('****mapStateToProps');
    return {
        minesLeft: state.minesLeft,
        game: state.game
    };
}

export default connect(mapStateToProps)(Board);

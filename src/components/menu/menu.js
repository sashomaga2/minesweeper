import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeLevelAction } from './../../actions/actions';
import { LEVEL } from './../../reducers/reducers';

const PropTypes = React.PropTypes;

class Menu extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleGameLevelChange = this.handleGameLevelChange.bind(this);
    }

    handleGameLevelChange(e) {
        //this.props.dispatch(changeLevelAction(Number(e.target.value)));
        this.props.changeLevel(Number(e.target.value));
    }

    render() {
        return (
                <div>	
                    <input type="radio" name="beginner" 
                                value={LEVEL.BEGINNER} 
                                checked={this.props.data.level === LEVEL.BEGINNER} 
                                onChange={this.handleGameLevelChange} />{'Beginner'}       
                    <input type="radio" name="intermediate" 
                                value={LEVEL.INTERMEDIATE}  
                                checked={this.props.data.level === LEVEL.INTERMEDIATE} 
                                onChange={this.handleGameLevelChange} />{'Intermediate'}      
                    <input type="radio" name="expert" 
                                value={LEVEL.EXPERT}  
                                checked={this.props.data.level === LEVEL.EXPERT} 
                                onChange={this.handleGameLevelChange} />{'Expert'}
               </div>
        )
    }
}

Menu.propTypes = {
    data: PropTypes.object.isRequired,
    changeLevel: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        data: state //comes from reducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // Could use actions: bindActionCreators(actions, dispatch) when actions is an object
        changeLevel: bindActionCreators(changeLevelAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
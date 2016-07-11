import React from 'react';
import { connect } from 'react-redux';
import { changeLevelAction } from './../../actions/actions';
import { LEVEL } from './../../reducers/reducers';

class Menu extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleGameLevelChange = this.handleGameLevelChange.bind(this);
    }

    handleGameLevelChange(e) {
        this.props.dispatch(changeLevelAction(Number(e.target.value)));
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

function mapStateToProps(state, ownProps) {
    return {
        data: state //comes from reducer
    };
}

//, mapDispatchToProps
// this.props.dispatch  fire actions

export default connect(mapStateToProps)(Menu);
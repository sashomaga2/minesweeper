import React from 'react';

class Cell extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            state: 'closed',
            mark: 'empty', // 'question', 'bomb'
            score: 'no' // ??? 1/2/3/4/5
        }

        // need to bind this in ES6 classes!
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log('clicked', arguments);
        // merges with other states
        this.setState({ state: 'open' }, function() {
            console.log('state', this.state);
        });
        

    }
    onRightClick(e) {
        console.log('right clicked', arguments);
        e.preventDefault();
        // if is closed change state
    }
    render() {
        return (
            <div className="closed box ms-cell" onClick={this.onClick} onContextMenu={this.onRightClick}>{this.props.test}</div>
        )
    }
}

export default Cell;

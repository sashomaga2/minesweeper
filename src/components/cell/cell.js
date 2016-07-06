import React from 'react';

class Cell extends React.Component {

    render() {
        //console.log('cell render', this.props);
        return (
            <div className={this.props.data.open ? 'open ms-cell' : 'closed ms-cell'} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>{this.props.data.id}</div>
        )
    }
}

export default Cell;

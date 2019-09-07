import React from 'react';
import './Square.css';

export default class Square extends React.Component {
    render() {
        return (
            <div
                className="Square"
                onClick={() => this.props.onClick()}
                style={{
                    cursor: this.props.cursor,
                    width: this.props.size + "px",
                    height: this.props.size + "px",
                    fontSize: this.props.size + "px"
                }}>

                {this.props.value}
            </div>
        );
    }
}
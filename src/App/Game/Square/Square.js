import React from 'react';
import './Square.css';

export default class Square extends React.Component {
    render() {
        return (
            <div className="Square"
                    onClick={() => this.props.onClick()}
                    style={{ cursor: this.props.cursor }}>
                <p>{ this.props.value }</p>
            </div>
        );
    }
}
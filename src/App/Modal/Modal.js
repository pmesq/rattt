import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    render() {
        return (
            <div className="Modal"
                    style={{
                        top: this.props.display ? "30%" : "-45%"
                    }}>
                <p>{this.props.children}</p>
            </div>
        );
    }
}
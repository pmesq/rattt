import React from 'react';
import './Home.css';

export default class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <a href={"?p=game"}>Classic</a>
                <a href={"?p=custom"}>Custom</a>
            </div>
        );
    }
}
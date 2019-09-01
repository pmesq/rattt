import React from 'react';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Game from '../Game/Game';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const url = new URL(window.location);
        this.page = url.searchParams.get("p") || "home";
        this.rows = url.searchParams.get("rows") || 3;
        this.cols = url.searchParams.get("cols") || 3;
        this.sequence = url.searchParams.get("seq") || 3;
        this.players = url.searchParams.get("players");
    }
    render () {
        if(this.page === "home")
            return (
                <div className="App">
                    <Header />
                    <Home />
                </div>
            );
        else
            return (
                <div className="App">
                    <Header />
                    <Game rows={this.rows} cols={this.cols} sequence={this.sequence} players={this.players} />
                </div>
            );
    };
}

import React from 'react';
import Header from './Header/Header';
import Home from './Home/Home';
import Custom from './Custom/Custom';
import Game from './Game/Game';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const url = new URL(window.location);
        this.page = url.searchParams.get("p");
        this.rows = url.searchParams.get("rows") || 3;
        this.cols = url.searchParams.get("cols") || 3;
        this.sequence = url.searchParams.get("seq") || 3;
        this.players = url.searchParams.get("players");
    }
    render () {
        switch(this.page) {
            case "game":
                return (
                    <div className="App">
                        <Header />
                        <Game rows={this.rows} cols={this.cols} sequence={this.sequence} players={this.players} />
                    </div>
                );
            case "custom":
                return (
                    <div className="App">
                        <Header />
                        <Custom />
                    </div>
                );
            default:
                return (
                    <div className="App">
                        <Header />
                        <Home />
                    </div>
                );
        }
    };
}

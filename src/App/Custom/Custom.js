import React from 'react';
import './Custom.css';

export default class Custom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 3,
            cols: 3,
            sequence: 3,
            players: [
                {
                    name: "Player 1",
                    type: "Human",
                    symbol: "X"
                }, {
                    name: "Player 2",
                    type: "Human",
                    symbol: "O"
                },
            ]
        };
    }

    render() {
        const that = this;
        return (
            <div className="Custom">
                <h2>Custom game</h2>
                <form>
                    <h3>{this.state.players[0].name || "Player 1"}</h3>
                    <label>Name: <input type="name" maxLength="16" value={this.state.players[0].name} onChange={e => { const players = that.state.players; players[0].name = e.target.value; that.setState({players}); }} /></label>
                    <label>Type: 
                        <select value={this.state.players[0].type} onChange={e => { const players = that.state.players; players[0].type = e.target.value; that.setState({players}); }}>
                            <option value="Human">Human</option>
                            <option value="Brandom">Brandom</option>
                        </select>
                    </label>
                    <label>Symbol: <input type="name" maxLength="1" value={this.state.players[0].symbol} onChange={e => { const players = that.state.players; players[0].symbol = e.target.value; that.setState({players}); }} /></label>
                </form>
                <form>
                <h3>{this.state.players[1].name || "Player 2"}</h3>
                    <label>Name: <input type="name" maxLength="16" value={this.state.players[1].name} onChange={e => { const players = that.state.players; players[1].name = e.target.value; that.setState({players}); }} /></label>
                    <label>Type: 
                        <select value={this.state.players[1].type} onChange={e => { const players = that.state.players; players[1].type = e.target.value; that.setState({players}); }}>
                            <option value="Human">Human</option>
                            <option value="Brandom">Brandom</option>
                        </select>
                    </label>
                    <label>Symbol: <input type="name" maxLength="1" value={this.state.players[1].symbol} onChange={e => { const players = that.state.players; players[1].symbol = e.target.value; that.setState({players}); }} /></label>
                </form>
                <form>
                    <h3>Board</h3>
                    <label>Rows: <input type="number" value={this.state.rows} onChange={e => that.setState({rows: e.target.value})}/></label>
                    <label>Columns: <input type="number" value={this.state.cols} onChange={e => that.setState({cols: e.target.value})} /></label>
                    <label>Sequence to win: <input type="number" value={this.state.sequence} onChange={e => that.setState({sequence: e.target.value})} /></label>
                </form>
                <br />
                <a href={"?p=game&rows=" + this.state.rows + "&cols=" + this.state.cols + "&seq=" + this.state.sequence + "&players=" + JSON.stringify(this.state.players)}>Play</a>
            </div>
        );
    }
}
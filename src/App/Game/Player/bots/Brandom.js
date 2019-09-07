import Bot from '../Bot';

export default class Brandom extends Bot {
    constructor(game, key, symbol, name = "Brandom") {
        super(game, key, symbol, name);
    }

    play() {
        const availableSquares = this.game.getAvailableSquares();
        return availableSquares.length ?
            availableSquares[Math.floor(Math.random() * availableSquares.length)] :
            null;
    }
}
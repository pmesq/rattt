import Player from './Player';

export default class Bot extends Player {
    constructor(game, key, symbol, name = "Bot") {
        super(symbol, name);
        this.bot = true;
        this.game = game;
        this.key = key;
    }

    getGame() {
        return this.game;
    }

    setGame(game) {
        this.game = game;
    }

    getKey() {
        return this.key;
    }

    setKey(key) {
        this.key = key
    }
}
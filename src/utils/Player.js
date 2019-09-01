export default class Player {
    constructor(symbol, name = "Player") {
        this.symbol = symbol;
        this.name = name;
        this.bot = false;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getSymbol() {
        return this.symbol;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    isBot() {
        return this.bot;
    }

    setBot(bot) {
        this.bot = bot;
    }
}
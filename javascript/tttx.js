class TicTacToe {
	constructor(linhas, colunas, sequencia, jogadores) {
		this.linhas = linhas;
		this.colunas = colunas;
		this.numJogadores = jogadores;
		this.sequenciaNecessaria = sequencia;

		this.jogadores = [{ tipo: 'n', simbolo: 
			'https://vignette.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/latest?cb=20061003200043' }];
		for(let i = 1; i <= this.numJogadores; i++) {
			this.jogadores.push({
				tipo: 'usuario',
				simbolo: i == 1 ? '../imgs/x.png' : '../imgs/o.png'
			});
		}

		this.criaTabuleiro();

		this.vez = 1;
		this.casasPreenchidas = 0;

		this.timeout = null;
	}

	imprime() {
		let s = '';
		for(let i = 0; i < this.linhas; i++) {
			for(let j = 0; j < this.colunas; j++) {
				s += this.tabuleiro[i][j] + ' ';
			}
			s += '\n';
		}
		console.log(s);
	}

	criaTabuleiro() {
		this.tabuleiro = new Array(this.linhas);
		this.linhaEl = new Array(this.linhas);
		for(let i = 0; i < this.linhas; i++) {
			this.tabuleiro[i] = new Array(this.colunas);
			this.linhaEl[i] = $('<div class="linha">');
			$('main').append(this.linhaEl[i]);
			for(let j = 0; j < this.colunas; j++) {
				this.tabuleiro[i][j] = 0;
				this.linhaEl[i].append($('<canvas class="casa"></canvas>'));
			}
		}
	}

	reinicia() {
		this.vez = 0;
		for(let i = 0; i < this.linhas; i++)
			for(let j = 0; j < this.colunas; j++)
				this.preencheCasa(i, j);
		this.vez = 1;
	}

	analisaLinha(i, j) {
		for(let c = 0; c < this.sequenciaNecessaria; c++) {
			if(this.tabuleiro[i][j] != this.tabuleiro[i][j + c])
				return false;
		}
		return this.tabuleiro[i][j] != 0;
	}

	analisaVencedor() {
		for(let i = 0; i < this.linhas; i++) {
			for(let j = 0; j <= this.colunas - this.sequenciaNecessaria; j++)
				if(this.analisaLinha(i, j)) return this.tabuleiro[i][j];
		}
		return -1;
	}

	fimJogada() {
		this.vez = (this.vez == 1) ? 2 : 1;
		console.log(this.analisaVencedor());
	}

	preencheCasa(i, j) {
		this.tabuleiro[i][j] = this.vez;
		$('.casa:eq(' + (this.colunas * i + j) + ')').css(
			'background-image',
			'url("' + this.jogadores[this.vez].simbolo + '")'
		);
	}

	jogadaUsuario(i, j) {
		if(this.jogadores[this.vez].tipo == 'usuario'
		   && this.tabuleiro[i][j] == 0) {
			this.preencheCasa(i, j);
			this.fimJogada();
		}
	}

}

let ttt = new TicTacToe(3, 3, 3, 2);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = indice / 3;
	let j = indice % 3;
	ttt.jogadaUsuario(i, j);
});

$('#janela-help').hide();

$('#botao-reiniciar').click(function() {
	ttt.reinicia();
});
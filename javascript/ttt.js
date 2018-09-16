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

		if(this.jogadores[1].tipo != 'usuario')
			this.jogadaComputador();
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
		clearTimeout(this.timeout);
		this.vez = 0;
		this.casasPreenchidas = 0;
		for(let i = 0; i < this.linhas; i++)
			for(let j = 0; j < this.colunas; j++)
				this.preencheCasa([i, j]);
		this.vez = 1;
		if(this.jogadores[1].tipo != 'usuario')
			this.jogadaComputador();
	}

	atualizaTipoJogador(i, tipo) {
		this.jogadores[i].tipo = tipo;
		this.reinicia();
	}

	atualizaSimboloJogador(i, simbolo) {
		this.jogadores[i].simbolo = simbolo;
		this.reinicia();
	}

	analisaHorizontal(i, j) {
		for(let c = 1; c < this.sequenciaNecessaria; c++) {
			if(this.tabuleiro[i][j] != this.tabuleiro[i][j + c])
				return false;
		}
		return this.tabuleiro[i][j] != 0;
	}

	analisaVertical(i, j) {
		for(let c = 1; c < this.sequenciaNecessaria; c++) {
			if(this.tabuleiro[i][j] != this.tabuleiro[i + c][j])
				return false;
		}
		return this.tabuleiro[i][j] != 0;
	}

	analisaDiagonalDecres(i, j) {
		for(let c = 1; c < this.sequenciaNecessaria; c++) {
			if(this.tabuleiro[i][j] != this.tabuleiro[i + c][j + c])
				return false;
		}
		return this.tabuleiro[i][j] != 0;
	}

	analisaDiagonalCres(i, j) {
		for(let c = 1; c < this.sequenciaNecessaria; c++) {
			if(this.tabuleiro[i][j] != this.tabuleiro[i + c][j - c])
				return false;
		}
		return this.tabuleiro[i][j] != 0;
	}

	analisaVencedor() {
		for(let i = 0; i < this.linhas; i++) {
			for(let j = 0; j <= this.colunas - this.sequenciaNecessaria; j++)
				if(this.analisaHorizontal(i, j)) return this.tabuleiro[i][j];
		}
		for(let j = 0; j < this.colunas; j++) {
			for(let i = 0; i <= this.linhas - this.sequenciaNecessaria; i++)
				if(this.analisaVertical(i, j)) return this.tabuleiro[i][j];
		}
		for(let i = 0; i <= this.linhas - this.sequenciaNecessaria; i++) {
			for(let j = 0; j <= this.colunas - this.sequenciaNecessaria; j++)
				if(this.analisaDiagonalDecres(i, j)) return this.tabuleiro[i][j];
		}
		for(let i = 0; i <= this.linhas - this.sequenciaNecessaria; i++) {
			for(let j = this.sequenciaNecessaria - 1; j <= this.colunas; j++)
				if(this.analisaDiagonalCres(i, j)) return this.tabuleiro[i][j];
		}
		return this.casasPreenchidas == this.linhas * this.colunas ? 0 : -1;
	}

	fimJogada() {
		this.vez = (this.vez == 1) ? 2 : 1;
		let analise = this.analisaVencedor();
		if(analise == -1) {
			$('#log').html('Vez do jogador ' + this.vez);
			if(this.jogadores[this.vez].tipo != 'usuario')
				this.jogadaComputador();
		}
		else if(analise) {
			$('#log').html('Jogador ' + analise + ' venceu!');
			$('.casa').css('cursor', 'default');
			this.vez = 0;
		}
		else {
			$('#log').html('Deu velha');
			this.vez = 0;
		}
	}

	preencheCasa(pos) {
		let i = pos[0], j = pos[1];
		this.tabuleiro[i][j] = this.vez;
		$('.casa:eq(' + (this.colunas * i + j) + ')').css(
			'background-image',
			'url("' + this.jogadores[this.vez].simbolo + '")'
		);
		$('.casa:eq(' + (this.colunas * i + j) + ')').css(
			'cursor', this.vez ? 'default' : 'pointer'
		);
		if(this.vez) this.casasPreenchidas++;
	}

	casoAleatorio() {
		let v = [];
		for(let i = 0; i < this.linhas; i++) {
			for(let j = 0; j < this.colunas; j++)
				if(this.tabuleiro[i][j] == 0) v.push([i, j]);
		}
		return v[Math.floor(Math.random() * v.length)];
	}

	analisaSequenciaVitoria(casas, jogador) {
		let casaDisponivel = false;
		for(let c = 0; c < casas.length; c++) {
			let i = casas[c][0], j = casas[c][1];
			if(this.tabuleiro[i][j] == 0 && casaDisponivel == false)
				casaDisponivel = [i, j];
			else if(this.tabuleiro[i][j] != jogador)
				return false;
		} 
		return casaDisponivel;
	}

	tradicional_canto() {
		let v = [];
		for(let i = 0; i < 4; i++)
			if(this.tabuleiro[(i > 1) * 2][(i % 2) * 2] == 0)
				v.push([(i > 1) * 2, (i % 2) * 2]);
		return v.length ? v[Math.floor(Math.random() * v.length)] : false;
	}

	tradicional_medio() {
		let v = [];
		if(this.tabuleiro[0][1] == 0) v.push([0, 1]);
		if(this.tabuleiro[1][0] == 0) v.push([1, 0]);
		if(this.tabuleiro[1][2] == 0) v.push([1, 2]);
		if(this.tabuleiro[2][1] == 0) v.push([2, 1]);
		return v.length ? v[Math.floor(Math.random() * v.length)] : false;
	}

	tradicional_primeiraJogada() {
		if(this.casasPreenchidas > 1) return false;
		return this.tabuleiro[1][1] == 0 ? [1, 1] : this.tradicional_canto();
	}

	tradicional_casoDireto(caso) {
		let jogador, analise;
		if(caso == 'vitoria') jogador = this.vez;
		else jogador = (this.vez == 1) ? 2 : 1;

		for(let i = 0; i < 3; i++) {
			analise = this.analisaSequenciaVitoria([ [i, 0], [i, 1], [i, 2] ], jogador);
			if(analise) return analise;

			analise = this.analisaSequenciaVitoria(	[ [0, i], [1, i], [2, i] ], jogador);
			if(analise) return analise;

			if(i) {
				analise = this.analisaSequenciaVitoria(
					[ [0, i == 1 ? 0 : 2], [1, 1], [2, i == 1 ? 2 : 0] ], jogador
				);
				if(analise) return analise;
			}
		}
		return false;
	}

	tradicional_defensivaDiagonais() {
		let adversario = (this.vez == 1) ? 2 : 1;
		if((this.tabuleiro[0][0] == adversario && this.tabuleiro[2][2] == adversario) ||
		   (this.tabuleiro[0][2] == adversario && this.tabuleiro[2][0] == adversario))
			return this.tradicional_medio();
		return false;
	}

	tradicional_defensivaMedios() {
		let adversario = (this.vez == 1) ? 2 : 1;
		for(let i = 0; i < 4; i++) {
			if(this.tabuleiro[(i > 1) * 2][1] == adversario
			   && this.tabuleiro[1][(i % 2) * 2] == adversario
			   && this.tabuleiro[(i > 1) * 2][(i % 2) * 2] == 0)
				return [(i > 1) * 2, (i % 2) * 2];
		}
		return false;
	}

	tradicional_defensivaCantoMedio() {
		let adversario = (this.vez == 1) ? 2 : 1;
		for(let i = 0; i < 4; i++) {
			if(this.tabuleiro[(i > 1) * 2][(i % 2) * 2] == adversario
			   && (this.tabuleiro[1][!(i % 2) * 2] == adversario
			   || this.tabuleiro[(i < 2) * 2][1] == adversario)
			   && this.tabuleiro[(i < 2) * 2][!(i % 2) * 2] == 0)
				return [(i < 2) * 2, !(i % 2) * 2];
		}
		return false;
	}

	jogadaComputador() {
		let that = this;
		this.timeout = setTimeout(function() {
			let casa;
			switch(that.jogadores[that.vez].tipo) {
				case 'aleatorio':
					that.preencheCasa(that.casoAleatorio());
					break;
				case 'tradicional-medio':
					if(casa = that.tradicional_primeiraJogada()) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_casoDireto('vitoria')) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_casoDireto('derrota')) 
						that.preencheCasa(casa);
					else
						that.preencheCasa(that.casoAleatorio());
					break;
				case 'tradicional-impossivel':
					if(casa = that.tradicional_primeiraJogada()) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_casoDireto('vitoria')) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_casoDireto('derrota')) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_defensivaDiagonais()) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_defensivaMedios()) 
						that.preencheCasa(casa);
					else if(casa = that.tradicional_defensivaCantoMedio()) 
						that.preencheCasa(casa);
					else
						that.preencheCasa(that.casoAleatorio());
					break;
			}
			that.fimJogada();
		}, 500);
	}

	jogadaUsuario(i, j) {
		if(this.jogadores[this.vez].tipo == 'usuario'
		   && this.tabuleiro[i][j] == 0) {
			this.preencheCasa([i, j]);
			this.fimJogada();
		}
	}

}

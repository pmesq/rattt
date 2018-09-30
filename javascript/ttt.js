class TicTacToe {
	constructor(props) {
		this.linhas = props.linhas;
		this.colunas = props.colunas;
		this.numJogadores = props.jogadores;
		this.sequenciaNecessaria = props.sequencia;
		this.gravidade = props.gravidade;

		this.tradicional = (props.tabuleiro == 'tradicional');

		this.simbolos = [
			'Rato', 'Bolinha', 'Triângulo', 'Quadrado', 'Rato', 'Pizza'
		];

		this.jogadores = [{ tipo: 'n', simbolo:
			'Nenhum' }];
		for(let i = 1; i <= this.numJogadores; i++) {
			this.jogadores.push({
				tipo: 'usuario',
				simbolo: this.simbolos[(i - 1) % this.simbolos.length]
			});
		}

		if(props.tabuleiro == 'tradicional')
			props.tabuleiro = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

		this.casas = 0;
		for(let i = 0; i < this.linhas; i++)
			for(let j = 0; j < this.colunas; j++)
				if(props.tabuleiro[i][j]) this.casas++;

		this.criaTabuleiro(props.tabuleiro);

		for(let i = 0; i < this.numJogadores; i++) {
			this.criaJanelaJogador(i);
		}

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

	criaTabuleiro(tab) {
		this.tabuleiro = new Array(this.linhas);
		this.linhaEl = new Array(this.linhas);
		for(let i = 0; i < this.linhas; i++) {
			this.tabuleiro[i] = new Array(this.colunas);
			this.linhaEl[i] = $('<div class="linha">');
			$('main').append(this.linhaEl[i]);
			for(let j = 0; j < this.colunas; j++) {
				this.tabuleiro[i][j] = tab[i][j] - 1;
				this.linhaEl[i].append($('<div class="casa"></div>'));
				if(tab[i][j] == 0) {
					$('.linha:eq(' + i + ') > .casa:eq(' + j + ')').css('cursor', 'default');
					$('.linha:eq(' + i + ') > .casa:eq(' + j + ')').css(
						'border-width',
						'0px ' + (j == this.colunas - 1 ? 0 : (tab[i][j + 1] ? 1 : 0)) + 'px '
						+ (i == this.linhas - 1 ? 0 : (tab[i + 1][j] ? 1 : 0)) + 'px 0px'
					);
					$('.linha:eq(' + i + ') > .casa:eq(' + j + ')').css(
						'background-color', 'transparent'
					);
				}
			}
		}
	}

	criaJanelaJogador(i) {
		$('nav').append('<button class="botao botao-janela botao-jogador">'+(i+1)+'</button>');
		$('.botao-jogador:eq(' + i + ')').css('top', (160 + i * 70) + 'px');

		$('#janelas-jogador').append('<div class="janela janela-jogador"></div>');

		$('.janela-jogador:eq(' + i + ')').append('<h2>Jogador ' + (i + 1) + '</h2>');

		$('.janela-jogador:eq(' + i + ')').append('<label class="label-tipo">Jogador: </label>');
		$('.label-tipo:eq(' + i + ')').append('<select class="select-tipo"></select>');
		$('.select-tipo:eq(' + i + ')').append('<option value="usuario">Usuário</option>');
		$('.select-tipo:eq(' + i + ')').append('<option value="aleatorio">Random Bot</option>');
		if(this.tradicional) {
			$('.select-tipo:eq(' + i + ')').append(
				'<option value="tradicional-medio">Friendly Bot</option>');
			$('.select-tipo:eq(' + i + ')').append(
				'<option value="tradicional-impossivel">Invincible bot</option>');
		}

		$('.janela-jogador:eq(' + i + ')').append('<label class="label-simbolo">Símbolo: </label>');
		$('.label-simbolo:eq(' + i + ')').append('<select class="select-simbolo"></select>');
		for(let s = 0; s < this.simbolos.length; s++) {
			$('.select-simbolo:eq(' + i + ')').append(
				'<option value="' + this.simbolos[s] + '" ' + (i == s ? 'selected' : '') + '>'
				+ this.simbolos[s] + '</option>'
			);
		}

		$('.janela-jogador:eq(' + i + ')').append('<button class="fechar-janela">X</button>');
	}

	reinicia() {
		clearTimeout(this.timeout);
		this.vez = 0;
		this.casasPreenchidas = 0;
		for(let i = 0; i < this.linhas; i++)
			for(let j = 0; j < this.colunas; j++) {
				if(this.tabuleiro[i][j] != -1) {
					this.tabuleiro[i][j] = 0;
					$('.casa:eq(' + (this.colunas * i + j) + ')').css('cursor', 'pointer');
				}
			}

		$('.simbolo').fadeOut(300);
		setTimeout(function() { $('.simbolo').detach();	}, 300);

		$('#log').html('Vez do Jogador 1');
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

	analisaVencedor() {
		let sequencia;

		for(let i = 0; i < this.linhas; i++) {
			sequencia = 1;
			for(let j = 1; j < this.colunas; j++) {
				if(this.tabuleiro[i][j] > 0 && this.tabuleiro[i][j] == this.tabuleiro[i][j - 1])
					sequencia++;
				else sequencia = 1;
				if(sequencia == this.sequenciaNecessaria)
					return this.tabuleiro[i][j];
			}
		}

		for(let j = 0; j < this.colunas; j++) {
			sequencia = 1;
			for(let i = 1; i < this.linhas; i++) {
				if(this.tabuleiro[i][j] > 0 && this.tabuleiro[i][j] == this.tabuleiro[i - 1][j])
					sequencia++;
				else sequencia = 1;
				if(sequencia == this.sequenciaNecessaria)
					return this.tabuleiro[i][j];
			}
		}

		for(let i = 0; i < this.linhas - 1; i++) {
			for(let j = 0; j < this.colunas - 1; j++) {
				sequencia = 1;
				for(let k = 1; i + k < this.linhas && j + k < this.colunas; k++) {
					if(this.tabuleiro[i + k][j + k] > 0
					   && this.tabuleiro[i + k][j + k] == this.tabuleiro[i + k - 1][j + k - 1])
						sequencia++;
					else sequencia = 1;
					if(sequencia == this.sequenciaNecessaria)
						return this.tabuleiro[i + k][j + k];
				}
			}
		}

		for(let i = 0; i < this.linhas - 1; i++) {
			for(let j = 1; j < this.colunas; j++) {
				sequencia = 1;
				for(let k = 1; i + k < this.linhas && j - k >= 0; k++) {
					if(this.tabuleiro[i + k][j - k] > 0
					   && this.tabuleiro[i + k][j - k] == this.tabuleiro[i + k - 1][j - k + 1])
						sequencia++;
					else sequencia = 1;
					if(sequencia == this.sequenciaNecessaria)
						return this.tabuleiro[i + k][j - k];
				}
			}
		}

		return this.casasPreenchidas == this.casas ? 0 : -1;
	}

	fimJogada() {
		this.vez = (this.vez == this.numJogadores) ? 1 : this.vez + 1;

		let analise = this.analisaVencedor();
		if(analise == -1) {
			$('#log').html('Vez do Jogador ' + this.vez);
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
		let simbolo = new Simbolo(
			$('.casa')[this.colunas * i + j],
			this.jogadores[this.vez].simbolo
		);

		$('.casa:eq(' + (this.colunas * i + j) + ')').css('cursor', 'default');
		this.casasPreenchidas++;
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

	realizaAtracaoGravitacional(linha, coluna) {
		switch(this.gravidade) {
			case 'cima':
				for(let i = 0; i < this.linhas; i++)
					if(this.tabuleiro[i][coluna] == 0) return [i, coluna];
				break;
			case 'direita':
				for(let i = this.colunas - 1; i >= 0; i--)
					if(this.tabuleiro[linha][i] == 0) return [linha, i];
				break;
			case 'baixo':
				for(let i = this.linhas - 1; i >= 0; i--)
					if(this.tabuleiro[i][coluna] == 0) return [i, coluna];
				break;
			case 'esquerda':
				for(let i = 0; i < this.colunas; i++)
					if(this.tabuleiro[linha][i] == 0) return [linha, i];
				break;
		}
	}

	jogadaUsuario(linha, coluna) {
		if(this.jogadores[this.vez].tipo == 'usuario'
		   && this.tabuleiro[linha][coluna] == 0) {

		   	if(this.gravidade)
		   		this.preencheCasa(this.realizaAtracaoGravitacional(linha, coluna));
		   	else
		   		this.preencheCasa([linha, coluna]);

			this.fimJogada();
		}
	}

}

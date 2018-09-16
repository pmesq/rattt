class TicTacToe {
	constructor(linhas, colunas, sequencia, jogadores, $casas, $log) {
		this.numLinhas = linhas;
		this.numColunas = colunas;
		this.tamTabuleiro = linhas * colunas;
		this.numJogadores = jogadores;
		this.sequenciaNecessaria = sequencia;
		this.casas = $casas;
		this.log = $log;

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

	criaTabuleiro() {
		let linhas = this.numLinhas, colunas = this.numColunas;
		this.tabuleiro = new Array(linhas);
		this.tabuleiro.fill(new Array(colunas));
		for(let i = 0; i < colunas; i++)
			this.tabuleirio[i].fill(0);
	}

	imprime() {
		let s = '';
		for(let i = 0; i < this.numLinhas; i++) {
			for(let j = 0; j < this.numColunas; j++) {
				s += this.tabuleiro[3 * i + j] + ' ';
			}
			s += '\n';
		}
		console.log(s);
	}

	atualizaTipoJogador(i, tipo) {
		this.jogadores[i].tipo = tipo;
		this.reinicia();
	}

	atualizaSimboloJogador(i, simbolo) {
		this.jogadores[i].simbolo = simbolo;
		this.reinicia();
	}

	preencheCasa(i, jogador) {
		this.tabuleiro[i] = jogador;
		$(this.casas[i]).css('background-image', 
			'url("' + this.jogadores[jogador].simbolo + '")');
		$(this.casas[i]).css('cursor', jogador ? 'default' : 'pointer');
		if(jogador) this.casasPreenchidas++;
	}

	reinicia() {
		clearTimeout(this.timeout);
		this.vez = 1;
		this.casasPreenchidas = 0;
		for(let i = 0; i < this.tamTabuleiro; i++)
			this.preencheCasa(i, 0);
		if(this.jogadores[1].tipo != 'usuario')
			this.jogadaComputador(1);
	}

	analisaSequencia(indices) {
		if(this.tabuleiro[indices[0]] == 0) return false;
		for(let i = 1; i < indices.length; i++) {
			if(this.tabuleiro[indices[0]] != this.tabuleiro[indices[i]])
				return false;
		}
		return true;
	}

	analisaVencedor() {
		if(this.casasPreenchidas < this.sequenciaNecessaria * this.numJogadores - 1) 
			return 0;
		for(let i = 0; i < this.numLinhas; i++) {
			if(this.analisaSequencia( [i, i + 3, i + 6] ))
				return this.tabuleiro[i];
			if(this.analisaSequencia( [3 * i, 3 * i + 1, 3 * i + 2] ))
				return this.tabuleiro[3 * i];
			if(i && this.analisaSequencia( [4 - 2 * i, 4, 4 + 2 * i] ))
				return this.tabuleiro[4];
		}
		return this.casasPreenchidas == 9 ? 3 : 0;
	}

	alteraVez() {
		let analise = this.analisaVencedor();
		if(analise == 0) {
			this.vez = (this.vez == 1) ? 2 : 1;
			$(this.log).html('Vez do Jogador ' + this.vez);
			if(this.jogadores[this.vez].tipo != 'usuario')
				this.jogadaComputador(this.vez);
		}
		else if(analise == 1 || analise == 2) {
			for(let i = 0; i < this.tamTabuleiro; i++)
				$(this.casas[i]).css('cursor', 'default');
			$(this.log).html('Jogador ' + this.vez + ' venceu');
			this.vez = 0;
		} else if(analise == 3) {
			$(this.log).html('Deu velha');
			this.vez = 0;
		}
	}

	jogadaUsuario(jogador) {
		if(this.jogadores[this.vez].tipo == 'usuario' && this.tabuleiro[jogador] == 0) {
			this.preencheCasa(jogador, this.vez);
			this.alteraVez();
		}
	}

	canto() {
		let v = [];
		for(let i = 0; i < this.tamTabuleiro; i += 2) {
			if(i != 4 && this.tabuleiro[i] == 0) v.push(i);
		}
		return v.length ? v[Math.floor(Math.random() * v.length)] : -1;
	}

	meio() {
		let v = [];
		for(let i = 1; i <= 7; i += 2) {
			if(this.tabuleiro[i] == 0) v.push(i);
		}
		return v.length ? v[Math.floor(Math.random() * v.length)] : -1;
	}

	analisaPossibilidadeVitoria(i1, i2, i3, jogador) {
		if(this.tabuleiro[i1] == 0 && this.tabuleiro[i2] == jogador && this.tabuleiro[i3] == jogador)
			return i1;
		if(this.tabuleiro[i1] == jogador && this.tabuleiro[i2] == 0 && this.tabuleiro[i3] == jogador)
			return i2;
		if(this.tabuleiro[i1] == jogador && this.tabuleiro[i2] == jogador && this.tabuleiro[i3] == 0)
			return i3;
		return -1;
	}

	casoVitoria(jogador) {
		let casa = -1;
		for(let i = 0; i <= 2; i++) {
			if((casa = this.analisaPossibilidadeVitoria(i, i + 3, i + 6, jogador)) != -1)
				return casa;
			if((casa = this.analisaPossibilidadeVitoria(3 * i, 3 * i + 1, 3 * i + 2, jogador)) != -1)
				return casa;
			if(i && (casa = this.analisaPossibilidadeVitoria(4 - 2 * i, 4, 4 + 2 * i, jogador)) != -1)
				return casa;
		}
		return -1;
	}

	casoDerrota(jogador) {
		return this.casoVitoria(jogador == 1 ? 2 : 1);
	}

	casoPrimeiraJogada() {
		if(this.casasPreenchidas > 2) return -1;
		if(this.tabuleiro[4] == 0) return 4;
		return this.canto();
	}

	defensivaDiagonais(jogador) {
		let jogadorAdversario = (jogador == 1) ? 2 : 1;
		if((this.tabuleiro[0] == jogadorAdversario && this.tabuleiro[8] == jogadorAdversario) ||
			 (this.tabuleiro[2] == jogadorAdversario && this.tabuleiro[6] == jogadorAdversario))
			return this.meio();
		return -1;
	}

	defensivaMeios(jogador) {
		let jogadorAdversario = (jogador == 1) ? 2 : 1;
		for(let i = 0; i <= 8; i++) {
			if(this.tabuleiro[i <= 2 ? 1 : i - 3] == jogadorAdversario &&
				 this.tabuleiro[i >= 6 ? 7 : i + 3] == jogadorAdversario) {
				let v = [], n;
				if(this.tabuleiro[i] == 0) v.push(i)
				if(this.tabuleiro[n = (i == 0 || i == 8 ? 2 : 0)] == 0) v.push(n)
				if(this.tabuleiro[n = (i == 0 || i == 8 ? 6 : 8)] == 0) v.push(n)
				if(v.length) return v[Math.floor(Math.random() * v.length)];
			}
		}
		return -1;
	}

	defensivaCantoMeio(jogador) {
		let jogadorAdversario = (jogador == 1) ? 2 : 1, n;
		for(let i = 0; i <= 8; i += 2) {
			if(i != 4 && this.tabuleiro[i] == jogadorAdversario) {
				if(this.tabuleiro[i >= 6 ? 1 : 5 - i] == jogadorAdversario &&
					 this.tabuleiro[n = (i == 0 || i == 8) ? 2 : 0] == 0) return n;
				if(this.tabuleiro[i <= 2 ? 7 : 11 - i] == jogadorAdversario &&
					 this.tabuleiro[n = (i == 0 || i == 8) ? 6 : 8] == 0) return n;
			}
		}
		return -1;
	}

	casoAleatorio() {
		let v = [];
		for(let i = 0; i < this.tamTabuleiro; i++) {
			if(this.tabuleiro[i] == 0) v.push(i);
		}
		return v[Math.floor(Math.random() * v.length)];
	}

	jogadaComputador(i) {
		let that = this;
		this.timeout = setTimeout(function() {
			let casa;
			switch(that.jogadores[i].tipo) {
				case 'aleatorio':
					that.preencheCasa(that.casoAleatorio(), i);
					break;
				case 'medio':
					if((casa = that.casoPrimeiraJogada()) != -1) 
						that.preencheCasa(casa, i);
					else if((casa = that.casoVitoria(i)) != -1) 
						that.preencheCasa(casa, i);
					else if((casa = that.casoDerrota(i)) != -1) 
						that.preencheCasa(casa, i);
					else 
						that.preencheCasa(that.casoAleatorio(), i);
					break;
				case 'impossivel':
					if((casa = that.casoPrimeiraJogada()) != -1)
						that.preencheCasa(casa, i);
					else if((casa = that.casoVitoria(i)) != -1) that.preencheCasa(casa, i);
					else if((casa = that.casoDerrota(i)) != -1) that.preencheCasa(casa, i);
					else if((casa = that.defensivaDiagonais(i)) != -1) that.preencheCasa(casa, i);
					else if((casa = that.defensivaCantoMeio(i)) != -1) that.preencheCasa(casa, i);
					else if((casa = that.defensivaMeios(i)) != -1) that.preencheCasa(casa, i);
					else if((casa = that.canto()) != -1) that.preencheCasa(casa, i);
					else that.preencheCasa(that.meio(), i);
					break;
			}
			that.alteraVez();
		}, 500);
	}
}


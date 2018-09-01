let tabuleiro = new Array(9);
for(let i = 0; i <= 8; i++)
	tabuleiro[i] = 0;

let jogadores = [{ tipo: 'n', simbolo: 'white'},
				 { tipo: 'c', simbolo: 'blue' },
		   		 { tipo: 'c', simbolo: 'red'  }];
let vez = 1;
let casasPreenchidas = 0;
if(jogadores[1].tipo != 'j') jogadaComputador(1);

function reinicia() {
	vez = 1;
	casasPreenchidas = 0;
	for(let i = 0; i <= 8; i++)
		preencheCasa(i, 0)
	if(jogadores[1].tipo != 'j') jogadaComputador(1);
}

function preencheCasa(i, jogador) {
	tabuleiro[i] = jogador;
	$('.casa:eq(' + i + ')').css('background-color', jogadores[jogador].simbolo);
	if(jogador) casasPreenchidas++;
}

function analisaSequencia(i1, i2, i3) {
	if(tabuleiro[i1] == tabuleiro[i2] && tabuleiro[i1] == tabuleiro[i3])
		return tabuleiro[i1];
	return 0;
}

function analisaVencedor() {
	if(casasPreenchidas <= 4) return 0;
	for(let i = 0; i <= 2; i++) {
		if(analisaSequencia(i, i + 3, i + 6))
			return tabuleiro[i];
		if(analisaSequencia(3 * i, 3 * i + 1, 3 * i + 2))
			return tabuleiro[3 * i];
		if(i && analisaSequencia(4 - 2 * i, 4, 4 + 2 * i))
			return tabuleiro[4];
	}
	return casasPreenchidas == 9 ? 3 : 0;
}

function alteraVez() {
	let analise = analisaVencedor();
	if(analise == 0) {
		vez = (vez == 1) ? 2 : 1;
		if(jogadores[vez].tipo != 'j') 
			jogadaComputador(vez);
	}
	else if(analise == 1 || analise == 2) {
		console.log('jogador ' + vez + ' venceu');
		vez = 0;
	} else {
		console.log('deu velha');
		vez = 0;
	}
}

$('#botao-reiniciar').click(reinicia);

function analisaPossibilidadeVitoria(i1, i2, i3, jogador) {
	if(tabuleiro[i1] == 0 && tabuleiro[i2] == jogador && tabuleiro[i3] == jogador)
		return i1;
	if(tabuleiro[i1] == jogador && tabuleiro[i2] == 0 && tabuleiro[i3] == jogador)
		return i2;
	if(tabuleiro[i1] == jogador && tabuleiro[i2] == jogador && tabuleiro[i3] == 0)
		return i3;
	return -1;
}

function casoVitoria(jogador) {
	let casa = -1;
	for(let i = 0; i <= 2; i++) {
		if((casa = analisaPossibilidadeVitoria(i, i + 3, i + 6, jogador)) != -1)
			return casa;
		if((casa = analisaPossibilidadeVitoria(3 * i, 3 * i + 1, 3 * i + 2, jogador)) != -1)
			return casa;
		if(i && (casa = analisaPossibilidadeVitoria(4 - 2 * i, 4, 4 + 2 * i, jogador)) != -1)
			return casa;
	}
	return -1;
}

function casoDerrota(jogador) {
	return casoVitoria(jogador == 1 ? 2 : 1);
}

function casoAleatorio() {
	let v = [];
	for(let i = 0; i <= 8; i++) {
		if(tabuleiro[i] == 0) v.push(i);
	}
	return v[Math.floor(Math.random() * v.length)];
}

function jogadaComputador(jogador) {
	setTimeout(function() {
		let casa;
		if((casa = casoVitoria(jogador)) != -1) preencheCasa(casa, jogador);
		else if((casa = casoDerrota(jogador)) != -1) preencheCasa(casa, jogador);
		else preencheCasa(casoAleatorio(), jogador);
		alteraVez();
	}, 500);
}

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	if(vez && jogadores[vez].tipo == 'j' && tabuleiro[indice] == 0) {
		preencheCasa(indice, vez);
		alteraVez();
	}
});

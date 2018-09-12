let ttt = new TicTacToe(3, 3, 3, 2, $('.casa'), $('#log'));

$('.casa').click(function() {
	ttt.jogadaUsuario($('.casa').index($(this)));
});

$('#botao-reiniciar').click(function() {
	ttt.reinicia();
});

$('.select-jogador').change(function() {
	let indice = $('.select-jogador').index($(this)) + 1;
	ttt.atualizaTipoJogador(indice, $(this).val());
});

$('.select-simbolo').change(function() {
	let indice = $('.select-simbolo').index($(this)) + 1;
	ttt.atualizaSimboloJogador(indice, $(this).val());
});

$('body').keyup(function(event) {
	if(event.which >= 103 && event.which <= 105) ttt.jogadaUsuario(event.which - 103);
	else if(event.which >= 100 && event.which <= 102) ttt.jogadaUsuario(event.which - 97);
	else if(event.which >= 97 && event.which <= 99) ttt.jogadaUsuario(event.which - 91);
	else if(event.which == 82 || event.which == 96) ttt.reinicia();
});

$('#janela-help').hide();
$('#janela-help').css('opacity', '1');

$('#botao-help').click(function() {
	$('#janela-help').fadeToggle(250);
});

$('#fechar-janela-help').click(function() {
	$('#janela-help').fadeOut(250);
});

/*let tabuleiro = new Array(9);
for(let i = 0; i <= 8; i++)
	tabuleiro[i] = 0;

let jogadores = [{ tipo: 'n',       simbolo: 'white'      },
				 { tipo: 'usuario', simbolo: 'imgs/x.png' },
				 { tipo: 'usuario', simbolo: 'imgs/o.png' }];
let vez = 1;
let casasPreenchidas = 0;
let timeout = null;
if(jogadores[1].tipo != 'usuario') jogadaComputador(1);
function reinicia() {
	clearTimeout(timeout);
	vez = 1;
	casasPreenchidas = 0;
	for(let i = 0; i <= 8; i++)
		preencheCasa(i, 0)
	if(jogadores[1].tipo != 'usuario') jogadaComputador(1);
}

function preencheCasa(i, jogador) {
	tabuleiro[i] = jogador;
	$('.casa:eq(' + i + ')').css('background-image', 
		'url("' + jogadores[jogador].simbolo + '")');
	$('.casa:eq(' + i + ')').css('cursor', jogador ? 'default' : 'pointer');
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
		if(jogadores[vez].tipo != 'usuario')
			jogadaComputador(vez);
	}
	else if(analise == 1 || analise == 2) {
		for(let i = 0; i <= 8; i++)
			$('.casa:eq(' + i + ')').css('cursor', 'default');
		console.log('jogador ' + vez + ' venceu');
		vez = 0;
	} else {
		console.log('deu velha');
		vez = 0;
	}
}

$('#botao-reiniciar').click(reinicia);

function canto() {
	let v = [];
	for(let i = 0; i <= 8; i += 2) {
		if(i != 4 && tabuleiro[i] == 0) v.push(i);
	}
	return v.length ? v[Math.floor(Math.random() * v.length)] : -1;
}

function meio() {
	let v = [];
	for(let i = 1; i <= 7; i += 2) {
		if(tabuleiro[i] == 0) v.push(i);
	}
	return v.length ? v[Math.floor(Math.random() * v.length)] : -1;
}

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

function casoPrimeiraJogada(jogador, principal, alternativo) {
	if(casasPreenchidas > 2) return -1;
	if(tabuleiro[principal] == 0) return principal;
	return alternativo;
}

function defensivaDiagonais(jogador) {
	let jogadorAdversario = (jogador == 1) ? 2 : 1;
	if((tabuleiro[0] == jogadorAdversario && tabuleiro[8] == jogadorAdversario) ||
		 (tabuleiro[2] == jogadorAdversario && tabuleiro[6] == jogadorAdversario))
		return meio();
	return -1;
}

function defensivaMeios(jogador) {
	let jogadorAdversario = (jogador == 1) ? 2 : 1;
	for(let i = 0; i <= 8; i++) {
		if(tabuleiro[i <= 2 ? 1 : i - 3] == jogadorAdversario &&
			 tabuleiro[i >= 6 ? 7 : i + 3] == jogadorAdversario) {
			let v = [], n;
			if(tabuleiro[i] == 0) v.push(i)
			if(tabuleiro[n = (i == 0 || i == 8 ? 2 : 0)] == 0) v.push(n)
			if(tabuleiro[n = (i == 0 || i == 8 ? 6 : 8)] == 0) v.push(n)
			if(v.length) return v[Math.floor(Math.random() * v.length)];
		}
	}
	return -1;
}

function defensivaCantoMeio(jogador) {
	let jogadorAdversario = (jogador == 1) ? 2 : 1, n;
	for(let i = 0; i <= 8; i += 2) {
		if(i != 4 && tabuleiro[i] == jogadorAdversario) {
			if(tabuleiro[i >= 6 ? 1 : 5 - i] == jogadorAdversario &&
				 tabuleiro[n = (i == 0 || i == 8) ? 2 : 0] == 0) return n;
			if(tabuleiro[i <= 2 ? 7 : 11 - i] == jogadorAdversario &&
				 tabuleiro[n = (i == 0 || i == 8) ? 6 : 8] == 0) return n;
		}
	}
	return -1;
}

function casoAleatorio() {
	let v = [];
	for(let i = 0; i <= 8; i++) {
		if(tabuleiro[i] == 0) v.push(i);
	}
	return v[Math.floor(Math.random() * v.length)];
}

function jogadaComputador(jogador) {
	timeout = setTimeout(function() {
		let casa;
		switch(jogadores[jogador].tipo) {
			case 'aleatorio':
				preencheCasa(casoAleatorio(), jogador);
				break;
			case 'medio':
				if((casa = casoPrimeiraJogada(jogador, 4, canto())) != -1) preencheCasa(casa, jogador);
				else if((casa = casoVitoria(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = casoDerrota(jogador)) != -1) preencheCasa(casa, jogador);
				else preencheCasa(casoAleatorio(), jogador);
				break;
			case 'impossivel':
				if((casa = casoPrimeiraJogada(jogador, 4, canto())) != -1) preencheCasa(casa, jogador);
				else if((casa = casoVitoria(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = casoDerrota(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = defensivaDiagonais(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = defensivaCantoMeio(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = defensivaMeios(jogador)) != -1) preencheCasa(casa, jogador);
				else if((casa = canto()) != -1) preencheCasa(casa, jogador);
				else preencheCasa(meio(), jogador);
				break;
		}
		alteraVez();
	}, 500);
}

function jogadaUsuario(indice) {
	if(vez && jogadores[vez].tipo == 'usuario' && tabuleiro[indice] == 0) {
		preencheCasa(indice, vez);
		alteraVez();
	}
}

$('.casa').click(function() {
	jogadaUsuario($('.casa').index($(this)));
});

$('body').keyup(function(event) {
	if(event.which >= 103 && event.which <= 105) jogadaUsuario(event.which - 103);
	else if(event.which >= 100 && event.which <= 102) jogadaUsuario(event.which - 97);
	else if(event.which >= 97 && event.which <= 99) jogadaUsuario(event.which - 91);
	else if(event.which == 82 || event.which == 96) reinicia();
});

$('.selectJogador').change(function() {
	let indice = $('.selectJogador').index($(this));
	jogadores[indice + 1].tipo = $(this).val();
	reinicia();
});

$('#janela-help').hide();
let left = (parseInt($('body').css('width')) -
		parseInt($('#janela-help').css('width'))) / 2;
$('#janela-help').css('left', left + 'px');
$('#janela-help').css('opacity', '1');

$('#botao-help').click(function() {
	$('#janela-help').show();
});

$('#fechar-janela-help').click(function() {
	$('#janela-help').hide();
});*/

var tabuleiro;
var jogadores = [{ tipo: 'j', simbolo: 'blue'},
			   { tipo: 'j', simbolo: 'red' }];
var vez = 1;

function inicializaTabuleiro() {
	tabuleiro = new Array(9);
	for(let casa of tabuleiro)
		casa = 0;
}

inicializaTabuleiro();

function reinicia() {
	return true;
}

function preencheCasa(i, jogador) {
	tabuleiro[i] = jogador;
	console.log(i);
	$('.casa:eq(' + i + ')').css('background-color', jogadores[jogador - 1].simbolo);
}

function vencedor() {
	return 0;
}

$('.casa').click(function() {
	if(jogadores[vez - 1].tipo == 'j')
		preencheCasa($('.casa').index($(this)), 1);
});


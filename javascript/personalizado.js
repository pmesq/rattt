let ttt;
let props = {};
$('#log').hide();
$('.botao-controle').hide();

$('#input-linhas').select();

$('#input-linhas, #input-colunas').change(function() {
	if($(this).val() > 20)
		$(this).val(20);
	else if($(this).val() < 2)
		$(this).val(2);
});

$('#input-sequencia').change(function() {
	linhas = parseInt($('#input-linhas').val());
	colunas = parseInt($('#input-colunas').val());
	sequencia = parseInt($(this).val());
	let maximo = (linhas > colunas) ? linhas : colunas;
	if(sequencia > maximo)
		$(this).val(maximo);
	else if(sequencia < 2)
		$(this).val(2);
});

$('#input-jogadores').change(function() {
	if($(this).val() > 4)
		$(this).val(4);
	else if($(this).val() < 2)
		$(this).val(2);
});

$('input').keyup(function(e) {
	if(e.which == 13) $('#botao-jogar').click();
});

$('input').click(function() {
	$(this).select();
});

function jogo() {
	$('main').html('');

	ttt = new TicTacToe(props);

	$('.casa').click(function() {
		let indice = $('.casa').index($(this));
		let i = Math.floor(indice / props.colunas);
		let j = indice % props.colunas;
		ttt.jogadaUsuario(i, j);
	});


	$('#log').show();
	$('.botao-controle').show();

	$('#reiniciar').click(function() {
		ttt.reinicia();
	});

	$('.select-tipo').change(function() {
		let indice = $('.select-tipo').index($(this)) + 1;
		let tipo = $(this).val();
		ttt.atualizaTipoJogador(indice, tipo);
	});

	$('.select-simbolo').change(function() {
		let indice = $('.select-simbolo').index($(this)) + 1;
		let simbolo = $(this).val();
		ttt.atualizaSimboloJogador(indice, simbolo);
	});

	configuraElementos(props.jogadores, props.linhas, props.colunas);
}

$('#botao-jogar').click(function() {

	props.linhas = $('#input-linhas').val();
	props.colunas = $('#input-colunas').val();
	props.sequencia = $('#input-sequencia').val();
	props.gravidade = $('#input-gravidade').val();
	props.jogadores = $('#input-jogadores').val();
	props.tabuleiro = new Array(props.linhas);

	if(props.gravidade == 0) props.gravidade = false;
	else if(props.gravidade == 1) props.gravidade = "cima";
	else if(props.gravidade == 2) props.gravidade = "direita";
	else if(props.gravidade == 3) props.gravidade = "baixo";
	else if(props.gravidade == 4) props.gravidade = "esquerda";

	for(let i = 0; i < props.linhas; i++) {
		props.tabuleiro[i] = new Array(props.colunas);
		for(let j = 0; j < props.colunas; j++)
			props.tabuleiro[i][j] = 1;
	}

	jogo();
});

let mapas = JSON.parse(localStorage.getItem('mapas'));
if(mapas == null) mapas = [];

for(let i = 0; i < mapas.length; i++) {
	$('#mapas').append('<button class="botao-mapa">Mapa' + (i + 1) + '</button>');
}

$('.botao-mapa').click(function() {
	let i = $('.botao-mapa').index($(this));
	props.tabuleiro = mapas[i].tabuleiro;
	props.linhas = mapas[i].linhas;
	props.colunas = mapas[i].colunas;
	props.sequencia = mapas[i].sequencia;
	props.gravidade = mapas[i].gravidade;
	props.jogadores = mapas[i].jogadores;
	jogo();
});
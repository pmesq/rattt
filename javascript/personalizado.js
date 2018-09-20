let ttt;
let tabuleiro, linhas, colunas, sequencia, jogadores;
$('#log').hide();
$('.botao').hide();

$('#input-linhas').select();

$('#input-linhas, #input-colunas').change(function() {
	if($(this).val() > 20)
		$(this).val(20);
	else if($(this).val() < 2)
		$(this).val(2);
});

$('#input-sequencia').change(function() {
	linhas = $('#input-linhas').val();
	colunas = $('#input-colunas').val();
	let maximo = (linhas > colunas) ? linhas : colunas;
	if($(this).val() > maximo)
		$(this).val(maximo);
	else if($(this).val() < 2)
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

	ttt = new TicTacToe(tabuleiro, linhas, colunas, sequencia, jogadores);

	$('.casa').click(function() {
		let indice = $('.casa').index($(this));
		let i = Math.floor(indice / colunas);
		let j = indice % colunas;
		ttt.jogadaUsuario(i, j);
	});


	$('#log').show();
	$('.botao').show();

	$('#botao-reiniciar').click(function() {
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

	configuraElementos(jogadores);
}

$('#botao-jogar').click(function() {
	linhas = $('#input-linhas').val();
	colunas = $('#input-colunas').val();
	sequencia = $('#input-sequencia').val();
	jogadores = $('#input-jogadores').val();
	tabuleiro = new Array(linhas);
	for(let i = 0; i < linhas; i++) {
		tabuleiro[i] = new Array(colunas);
		for(let j = 0; j < colunas; j++)
			tabuleiro[i][j] = 1;
	}

	jogo();
});

$('#mapa').click(function() {
	/*linhas = colunas = 5;
	sequencia = 3;
	jogadores = 2;
	tabuleiro = [
		[0, 0, 1, 0, 0], 
		[0, 1, 1, 1, 0], 
		[1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 0], 
		[0, 0, 1, 0, 0]
	];
	*/
	linhas = 15;
	colunas = 7;
	sequencia = 15;
	jogadores = 2;
	tabuleiro = [
		[0, 0, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0],  
		[0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0], 
		[0, 0, 1, 1, 1, 0, 0],
		[1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1]
	];
	jogo();
});
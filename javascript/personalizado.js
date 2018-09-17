let linhas, colunas, sequencia, jogadores;
$('#log').hide();
$('.botao').hide();

$('#input-linhas, #input-colunas').change(function() {
	if($(this).val() > 20)
		$(this).val(20);
	else if($(this).val() < 1)
		$(this).val(1);
});

$('#input-sequencia').change(function() {
	linhas = $('#input-linhas').val();
	colunas = $('#input-colunas').val();
	let maximo = (linhas > colunas) ? linhas : colunas;
	if($(this).val() > maximo)
		$(this).val(maximo);
	else if($(this).val() < 1)
		$(this).val(1);
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

$('#botao-jogar').click(function() {
	linhas = $('#input-linhas').val();
	colunas = $('#input-colunas').val();
	sequencia = $('#input-sequencia').val();
	jogadores = $('#input-jogadores').val();
	$('main').html('');
	let ttt = new TicTacToe(linhas, colunas, sequencia, jogadores);

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
});

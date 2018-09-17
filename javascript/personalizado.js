let linhas, colunas, sequencia, jogadores;
$('#log').hide();
$('.botao').hide();

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

	$('.select-jogador').change(function() {
		let indice = $('.select-jogador').index($(this)) + 1;
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

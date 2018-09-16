$('#janela-help').hide();
$('#janela-help').css('opacity', '1');
$('#log').hide();
$('#botao-reiniciar').hide();
$('#botao-help').hide();
$('#jogador1').hide();
$('#jogador2').hide();

$('#botao-jogar').click(function() {
	linhas = $('#input-linhas').val();
	colunas = $('#input-colunas').val();
	sequencia = $('#input-sequencia').val();
	$('main').html('');
	let ttt = new TicTacToe(linhas, colunas, sequencia, 2);

	$('.casa').click(function() {
		let indice = $('.casa').index($(this));
		let i = Math.floor(indice / colunas);
		let j = indice % colunas;
		ttt.jogadaUsuario(i, j);
	});

	$('#botao-reiniciar').show();
	$('#log').show();
	$('#botao-help').show();
	$('#jogador1').show();
	$('#jogador2').show();

	$('#botao-reiniciar').click(function() {
		ttt.reinicia();
	});

	$('#botao-help').click(function() {
		$('#janela-help').fadeToggle(400);
	});
	
	$('#fechar-janela-help').click(function() {
		$('#janela-help').fadeOut(400);
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
});

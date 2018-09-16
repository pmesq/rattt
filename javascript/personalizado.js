$('#janela-help').hide();
$('#janela-help').css('opacity', '1');
$('#log').hide();
$('#botao-reiniciar').hide();
$('#botao-help').hide();

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

	$('#botao-reiniciar').click(function() {
		ttt.reinicia();
	});

	$('#botao-help').click(function() {
		$('#janela-help').fadeToggle(400);
	});
	
	$('#fechar-janela-help').click(function() {
		$('#janela-help').fadeOut(400);
	});
});

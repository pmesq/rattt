const linhas = 3, colunas = 3, sequencia = 3, jogadores = 2;

let ttt = new TicTacToe(linhas, colunas, sequencia, jogadores);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
	ttt.jogadaUsuario(i, j);
});

$('#janela-help').hide();
$('#janela-help').css('opacity', '1');

$('#botao-reiniciar').click(function() {
	ttt.reinicia();
});

$('#botao-help').click(function() {
	$('#janela-help').fadeToggle(400);
});

$('#fechar-janela-help').click(function() {
	$('#janela-help').fadeOut(400);
});
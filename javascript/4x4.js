let ttt = new TicTacToe(4, 4, 3, 2, $('.casa'), $('#log'));

$('.casa').click(function() {
	ttt.jogadaUsuario($('.casa').index($(this)));
});

$('#botao-reiniciar').click(function() {
	ttt.reinicia();
});
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

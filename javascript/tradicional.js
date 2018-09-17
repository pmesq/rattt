const linhas = 3, colunas = 3, sequencia = 3, jogadores = 2;

let ttt = new TicTacToe(linhas, colunas, sequencia, jogadores);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
	ttt.jogadaUsuario(i, j);
});

$('.janela').hide();
$('.janela').css('opacity', '1');
let larguraHTML = parseInt($('html').css('width'));
for(let i = 0; i <= jogadores; i++) {
	let larguraJanela = parseInt($('.janela:eq(' + i + ')').css('width'));
	$('.janela:eq(' + i + ')').css('left', (larguraHTML - larguraJanela) / 2 + 'px');
}

$('#botao-reiniciar').click(function() {
	ttt.reinicia();
});

$('.botao-janela').click(function() {
	let i = $('.botao-janela').index($(this));
	for(let j = 0; j <= jogadores; j++) {
		if(j != i) $('.janela:eq(' + j + ')').fadeOut(400);
	}
	$('.janela:eq(' + i + ')').fadeToggle(400);
});

$('.fechar-janela').click(function() {
	$('.janela').fadeOut(400);
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

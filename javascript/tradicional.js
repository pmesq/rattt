const linhas = 3, colunas = 3, sequencia = 3, jogadores = 2;

let ttt = new TicTacToe(linhas, colunas, sequencia, jogadores);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
	ttt.jogadaUsuario(i, j);
});

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

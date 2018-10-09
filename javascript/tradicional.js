const props = {
	tabuleiro: 'tradicional',
	linhas: 3,
	colunas: 3,
	sequencia: 3,
	gravidade: false,
	jogadores: 2
}

let ttt = new TicTacToe(props);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = Math.floor(indice / props.colunas);
	let j = indice % props.colunas;
	ttt.jogadaUsuario(i, j);
});

$('#reiniciar').click(function() {
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

configuraElementos(props.jogadores, props.linhas, props.colunas);

const props = {
	tabuleiro: [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ],
	jogadores: [{tipo: 'usuario', simbolo: 'Xis'}, {tipo: 'usuario', simbolo: 'Bolinha'}],
	sequencia: 3,
	gravidade: false
}

let ttt = new TicTacToe(props);

const linhas = 3, colunas = 3;

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
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

configuraElementos(props.jogadores, linhas, colunas);

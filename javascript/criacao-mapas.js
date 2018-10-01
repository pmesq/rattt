let linhas = 20;
let colunas = 20;

let lin = new Array(linhas);
let col = new Array(colunas);
lin.fill(0);
col.fill(0);

let tabuleiro = new Array(linhas);

for(let i = 0; i < linhas; i++) {
	tabuleiro[i] = new Array(colunas);
	$('main').append('<div class="linha"></div>');
	for(let j = 0; j < colunas; j++) {
		tabuleiro[i][j] = 0;
		let canvas = $('<canvas class="casa"></canvas>');
		canvas.css('opacity', '.5');
		$('.linha:eq(' + i + ')').append(canvas);
	}
}

function alternaCasa(casa) {
	let indice = $('.casa').index(casa);
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
	if(tabuleiro[i][j]) {
		console.log('if');
		tabuleiro[i][j] = 0;
		lin[i]--;
		col[j]--;
		casa.css('opacity', '.5');
	} else {
		console.log('else');
		tabuleiro[i][j] = 1;
		lin[i]++;
		col[j]++;
		casa.css('opacity', '1');
	}
}

let isMouseDown = false;

$('.casa').mousedown(function() {
	isMouseDown = true;
	alternaCasa($(this));
});

$('.casa').mouseup(function() {
	isMouseDown = false;
});

$('.casa').mouseenter(function() {
	if(isMouseDown) {
		alternaCasa($(this));
	}
});

let larguraHTML = parseInt($('html').css('width'));
let alturaHTML = parseInt($('html').css('height'));


if(larguraHTML > alturaHTML) {
	let tamanho = (alturaHTML - 200) / linhas + 'px';
	$('.linha').css('height', tamanho);
	$('.casa').css('width', tamanho);
	$('.casa').css('height', tamanho);
} else {
	let tamanho = (larguraHTML - 50) / linhas + 'px';
	$('.linha').css('height', tamanho);
	$('.casa').css('width', tamanho);
	$('.casa').css('height', tamanho);
}

$('#salvar').click(function() {
	let mapas = JSON.parse(localStorage.getItem('mapas'));
	if(mapas == null) mapas = [];
	console.log(mapas);

	let menorLinha = -1, maiorLinha = -1;
	let menorColuna = -1, maiorColuna = -1;
	for(let i = 0; i < linhas; i++) {
		if(lin[i]) {
			if(menorLinha == -1) menorLinha = i;
			maiorLinha = i;
		}
	}
	for(let i = 0; i < linhas; i++) {
		if(col[i]) {
			if(menorColuna == -1) menorColuna = i;
			maiorColuna = i;
		}
	}

	let numLinhas = maiorLinha - menorLinha + 1;
	let numColunas = maiorColuna - menorColuna + 1;

	if(numLinhas > 1 && numColunas > 1) {
		let tab = new Array(numLinhas);
		for(let i = 0; i < numLinhas; i++) {
			tab[i] = new Array(numColunas);
			for(let j = 0; j < numColunas; j++)
				tab[i][j] = tabuleiro[i + menorLinha][j + menorColuna];
		}
		mapas.push({
			linhas: numLinhas,
			colunas: numColunas,
			sequencia: 3,
			gravidade: false,
			jogadores: 2,
			tabuleiro: tab
		});
		localStorage.setItem('mapas', JSON.stringify(mapas));
	}
});

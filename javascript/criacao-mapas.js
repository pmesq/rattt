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
		let casa = $('<div class="casa"></div>');
		casa.css('opacity', '.5');
		$('.linha:eq(' + i + ')').append(casa);
	}
}

function alternaCasa(casa) {
	let indice = $('.casa').index(casa);
	let i = Math.floor(indice / colunas);
	let j = indice % colunas;
	if(tabuleiro[i][j]) {
		tabuleiro[i][j] = 0;
		lin[i]--;
		col[j]--;
		casa.css('opacity', '.5');
	} else {
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

let tamanho;

if(larguraHTML > alturaHTML)
	tamanho = (alturaHTML - 200) / linhas;
else
	tamanho = (larguraHTML - 50) / linhas;

$('main').css('width', tamanho * 20 + 'px');
$('.linha').css('height', tamanho + 'px');
$('.casa').css('width', tamanho + 'px');
$('.casa').css('height', tamanho + 'px');

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

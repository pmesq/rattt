let tabuleiro = new Array(9);
for(let i = 0; i <= 8; i++)
	tabuleiro[i] = 0;

let jogadores = [{ tipo: 'n', simbolo: 'white'},
				 { tipo: 'j', simbolo: 'blue' },
		   	     { tipo: 'j', simbolo: 'red'  }];
let vez = 1;
let casasPreenchidas = 0;

function reinicia() {
	vez = 1;
	casasPreenchidas = 0;
	for(let i = 0; i <= 8; i++)
		preencheCasa(i, 0)
}

function preencheCasa(i, jogador) {
	tabuleiro[i] = jogador;
	$('.casa:eq(' + i + ')').css('background-color', jogadores[jogador].simbolo);
	if(jogador) casasPreenchidas++;
}

function analisaSequencia(i1, i2, i3) {
	if(tabuleiro[i1] == tabuleiro[i2] && tabuleiro[i1] == tabuleiro[i3])
		return tabuleiro[i1];
	return 0;
}

function analisaVencedor() {
	if(casasPreenchidas <= 4) return 0;
	for(let i = 0; i <= 2; i++) {
		if(analisaSequencia(i, i + 3, i + 6))
			return tabuleiro[i];
		if(analisaSequencia(3 * i, 3 * i + 1, 3 * i + 2))
			return tabuleiro[3 * i];
		if(i && analisaSequencia(4 - 2 * i, 4, 4 + 2 * i))
			return tabuleiro[4];
	}
	return casasPreenchidas == 9 ? 3 : 0;
}

$('#botao-reiniciar').click(reinicia);

$('.casa').click(function() {
	let indice = $('.casa').index($(this));
	if(vez && jogadores[vez].tipo == 'j' && tabuleiro[indice] == 0) {
		preencheCasa(indice, vez);
		let vencedor = analisaVencedor();
		if(vencedor) {
			console.log(vencedor);
			vez = 0;
		} else {
			vez = (vez == 1) ? 2 : 1;
		}
	}
});


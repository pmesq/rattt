$('.janela').hide();
$('.janela').css('opacity', '1');
function configuraElementos(jogadores, linhas, colunas) {
	let larguraHTML = parseInt($('html').css('width'));
	let alturaHTML = parseInt($('html').css('height'));

	$('.janela').hide();
	$('.janela').css('opacity', '1');
	for(let i = 0; i <= jogadores; i++) {
		let larguraJanela = parseInt($('.janela:eq(' + i + ')').css('width'));
		$('.janela:eq(' + i + ')').css('left', (larguraHTML - larguraJanela) / 2 + 'px');
	}

	$('.botao-jogador').click(function() {
		let i = $('.botao-jogador').index($(this));
		for(let j = 0; j <= jogadores; j++) {
			if(j != i) $('.janela:eq(' + j + ')').fadeOut(400);
		}
		$('.janela:eq(' + i + ')').fadeToggle(400);
	});

	$('.fechar-janela').click(function() {
		$('.janela').fadeOut(400);
	});

	let tamanho;
	if(larguraHTML > alturaHTML) {
		tamanho = (alturaHTML - 200) / linhas;
	} else {
		tamanho = (larguraHTML - 50) / linhas;
	}
	$('.linha').css('width', tamanho * colunas + 'px');
	$('.linha').css('height', tamanho + 'px');
	$('.casa').css('width', tamanho + 'px');
	$('.casa').css('height', tamanho + 'px');

}

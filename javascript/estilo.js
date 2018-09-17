$('.janela').hide();
$('.janela').css('opacity', '1');
function configuraElementos(jogadores) {
	let larguraHTML = parseInt($('html').css('width'));
	let alturaHTML = parseInt($('html').css('height'));

	$('.janela').hide();
	$('.janela').css('opacity', '1');
	for(let i = 0; i <= jogadores; i++) {
		let larguraJanela = parseInt($('.janela:eq(' + i + ')').css('width'));
		$('.janela:eq(' + i + ')').css('left', (larguraHTML - larguraJanela) / 2 + 'px');
	}

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

	if(larguraHTML > alturaHTML) {
		let tamanho = (alturaHTML - 200) / linhas;
		$('.linha').css('height', (tamanho + 2) + 'px');
		$('.casa').css('width', tamanho + 'px');
		$('.casa').css('height', tamanho + 'px');
	} else {
		let tamanho = (larguraHTML - 50) / linhas + 'px';
		$('.linha').css('height', tamanho);
		$('.casa').css('width', tamanho);
		$('.casa').css('height', tamanho);
	}
}

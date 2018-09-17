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
    $('.casa').css('width', (alturaHTML - 200) / 3 + 'px');
    $('.casa').css('height', (alturaHTML - 200) / 3 + 'px');
  }
  else {
    $('.casa').css('width', (larguraHTML - 50) / 3);
    $('.casa').css('height', (larguraHTML - 50) / 3);
  }
}

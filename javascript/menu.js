let menuAberto = false;

$('h1').click(() => {
	$('h1 > span').html((menuAberto = !menuAberto) ? '▲' : '▼');
	$('#menu').css('left', menuAberto ? '0' : '-184px');
});

$('#menu').hover(() => { $('#menu').css('left', '0'); }, () => { if(!menuAberto) $('#menu').css('left', '-184px'); });

function configuraSecaoBotoes(secao) {
	let $botao = $('#botao-' + secao), $seta = $('#botao-' + secao + ' > span');
	let $div = $('#' + secao).slideUp(), divAberta = false;
	
	$botao.click(() => {
		$seta.html((divAberta = !divAberta) ? '▲' : '▼');
		$div.slideToggle();
	});
}

let secoes = ['jogar', 'campanha', 'personalizado'];
secoes.forEach(secao => { configuraSecaoBotoes(secao); });
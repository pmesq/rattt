let $menu = $('aside'), $h1 = $('h1'), $spanH1 = $('h1 > span');
let menuAberto = false;

$h1.click(function() {
	$spanH1.html((menuAberto = !menuAberto) ? '▲' : '▼');
	$menu.css('left', menuAberto ? '0' : '-184px');
});

$menu.mouseover(function() { $menu.css('left', '0'); });
$menu.mouseout(function() { if(!menuAberto) $menu.css('left', '-184px'); });

function secaoBotoes(secao) {
	let $botao = $('#botao-' + secao), $seta = $('#botao-' + secao + ' > span'), $div = $('#' + secao);
	let divAberta = false;
	
	$div.slideUp();
	$div.css('display', 'auto');
	
	$botao.click(function() {
		$seta.html((divAberta = !divAberta) ? '▲' : '▼');
		$div.slideToggle();
	});
}

let secoes = ['jogar', 'campanha', 'personalizado'];
secoes.forEach(function(secao) { secaoBotoes(secao); });
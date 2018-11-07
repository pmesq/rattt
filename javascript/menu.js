let $menu = $('aside');
let $h1 = $('h1');
let $spanH1 = $('h1 > span');

let menuAberto = false;

$h1.click(function() {
	menuAberto = !menuAberto;
	if(menuAberto) {
		$spanH1.html('▲')
		$menu.css('left', '0');
	} else {
		$spanH1.html('▼')
		$menu.css('left', '-184px');
	}
});

$menu.mouseenter(function() {
    $menu.css('left', '0');
});

$menu.mouseout(function() {
    if(!menuAberto)
        $menu.css('left', '-184px');
    $menu.mousemove(function() { $menu.css('left', '0'); });
});

let $botaoCampanha = $('#a-campanha');
let $setaCampanha = $('#a-campanha > span');
let $campanha = $('#campanha');
let campanhaAberta = false;

$campanha.slideUp();
$campanha.css('display', 'auto');

$botaoCampanha.click(function() {
	campanhaAberta = !campanhaAberta;
	if(campanhaAberta) {
		$setaCampanha.html('▲');
		$campanha.slideDown();
	} else {
		$setaCampanha.html('▼');
		$campanha.slideUp();
	}
});

let $botaoJogar = $('#a-jogar');
let $setaJogar = $('#a-jogar > span');
let $jogar = $('#jogar');
let jogarAberto = false;

$jogar.slideUp();
$jogar.css('display', 'auto');

$botaoJogar.click(function() {
	jogarAberto = !jogarAberto;
	if(jogarAberto) {
		$setaJogar.html('▲');
		$jogar.slideDown();
	} else {
		$setaJogar.html('▼');
		$jogar.slideUp();
	}
});

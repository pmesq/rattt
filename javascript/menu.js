let $menu = $('aside');
let $h1 = $('h1');

let menuAberto = false;

$h1.click(function() {
    $menu.css('left', (menuAberto = !menuAberto) ? '0' : '-184px');
});

$menu.mouseenter(function() {
    $menu.css('left', '0');
});

$menu.mouseout(function() {
    if(!menuAberto)
        $menu.css('left', '-184px');
    $menu.mousemove(function() { $menu.css('left', '0'); });
});
let norte, sul, leste, oeste, x = 0, y = 0;
norte = sul = leste = oeste = false;
$('body').on({
	keydown: function(e) {
		let tecla = e.which;
		if(tecla == 38 || tecla == 87)
			norte = true;
		else if(tecla == 40 || tecla == 83)
			sul = true;
		else if(tecla == 39 || tecla == 68)
			leste = true;
		else if(tecla == 37 || tecla == 65)
			oeste = true;
	},
	keyup: function(e) {
		let tecla = e.which;
		if(tecla == 38 || tecla == 87)
			norte = false;
		else if(tecla == 40 || tecla == 83)
			sul = false;
		else if(tecla == 39 || tecla == 68)
			leste = false;
		else if(tecla == 37 || tecla == 65)
			oeste = false;
	}
});
setInterval(function() {
	let horizontal = leste - oeste;
	let vertical = norte - sul;
	if(horizontal || vertical) {
		let n = (horizontal && vertical) ? 3.5 : 5;
		$('#rato').css('left', (x += n * horizontal) + 'px');
		if(x < 0) $('#rato').css('left', (x = 0) + 'px');
		else if(x > 750) $('#rato').css('left', (x = 750) + 'px');
		$('#rato').css('top', (y -= n * vertical) + 'px');
		if(y < 0) $('#rato').css('top', (y = 0) + 'px');
		else if(y > 530) $('#rato').css('top', (y = 530) + 'px');
	}
}, 10);

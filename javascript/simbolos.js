class Simbolo {
	constructor(casa, simbolo) {
		this.canvas = document.createElement('canvas');
		this.canvas.classList.add('simbolo');

		this.tam = parseFloat($(casa).css('width'));

		this.canvas.style.width = this.tam * 2 + 'px';
		this.canvas.style.height = this.tam + 'px';

		switch(simbolo) {
			case 'Xis': this.desenhaXis(); break;
			case 'Bolinha': this.desenhaBolinha(); break;
			case 'Triângulo': this.desenhaTriangulo(); break;
			case 'Quadrado': this.desenhaQuadrado(); break;
		}

		$(this.canvas).hide();
		$(casa).append($(this.canvas));
		$(this.canvas).fadeIn(300);
	}

	desenhaXis() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(18.75, 18.75);
		ctx.lineTo(131.75, 131.75);
		ctx.moveTo(131.75, 18.75);
		ctx.lineTo(18.75, 131.75);

		ctx.stroke();
	}

	desenhaBolinha() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.arc(75, 75, 56.25, 0, Math.PI * 2);
		ctx.stroke();
	}

	desenhaTriangulo() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(75, 18.75);
		ctx.lineTo(139.95, 131.75);
		ctx.lineTo(10.05, 131.75);
		ctx.lineTo(75, 18.75);

		ctx.stroke();
	}

	desenhaQuadrado() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(18.75, 18.75);
		ctx.lineTo(131.75, 18.75);
		ctx.lineTo(131.75, 131.75);
		ctx.lineTo(18.75, 131.75);
		ctx.lineTo(18.75, 18.75);

		ctx.stroke();
	}
}
class Simbolo {
	constructor(casa, simbolo) {
		this.canvas = document.createElement('canvas');
		this.canvas.classList.add('simbolo');

		this.tam = parseFloat($(casa).css('width'));

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

		ctx.moveTo(this.tam * 0.125, this.tam * 0.125);
		ctx.lineTo(this.tam * 0.875, this.tam * 0.875);
		ctx.moveTo(this.tam * 0.875, this.tam * 0.125);
		ctx.lineTo(this.tam * 0.125, this.tam * 0.875);

		ctx.stroke();
	}

	desenhaBolinha() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.arc(this.tam * 0.5, this.tam * 0.5, this.tam * 0.375, 0, Math.PI * 2);
		ctx.stroke();
	}

	desenhaTriangulo() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(this.tam * 0.5, this.tam * 0.125);
		ctx.lineTo(this.tam * (0.25 * Math.sqrt(3) + 0.5), this.tam * 0.875);
		ctx.lineTo(this.tam - this.tam * (0.25 * Math.sqrt(3) + 0.5), this.tam * 0.875);
		ctx.lineTo(this.tam * 0.5, this.tam * 0.125);

		ctx.stroke();
	}

	desenhaQuadrado() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(this.tam * 0.125, this.tam * 0.125);
		ctx.lineTo(this.tam * 0.875, this.tam * 0.125);
		ctx.lineTo(this.tam * 0.875, this.tam * 0.875);
		ctx.lineTo(this.tam * 0.125, this.tam * 0.875);
		ctx.lineTo(this.tam * 0.125, this.tam * 0.125);

		ctx.stroke();
	}
}
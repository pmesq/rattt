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
			case 'Rato': this.desenhaRato(); break;
			case 'Pizza': this.desenhaPizza(); break;
		}

		$(this.canvas).hide();
		$(casa).append($(this.canvas));
		$(this.canvas).fadeIn(300);
	}

	desenhaXis() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#00a4dd';

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
		ctx.strokeStyle = '#00a4dd';
		
		ctx.arc(75, 75, 56.25, 0, Math.PI * 2);
		ctx.stroke();
	}

	desenhaTriangulo() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();

		ctx.lineWidth = 5;
		ctx.strokeStyle = '#00a4dd';

		ctx.moveTo(75, 18.75);
		ctx.lineTo(139.95, 131.75);
		ctx.lineTo(10.05, 131.75);
		ctx.lineTo(75, 18.75);

		ctx.stroke();
	}

	desenhaQuadrado() {
		let ctx = this.canvas.getContext('2d');

		ctx.beginPath();
		
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#00a4dd';
		
		ctx.moveTo(18.75, 18.75);
		ctx.lineTo(131.75, 18.75);
		ctx.lineTo(131.75, 131.75);
		ctx.lineTo(18.75, 131.75);
		ctx.lineTo(18.75, 18.75);

		ctx.stroke();
	}

	desenhaRato() {
		let ctx = this.canvas.getContext('2d');

		ctx.lineWidth = 3;

		ctx.beginPath();

		ctx.moveTo(130, 35);
		ctx.lineTo(75, 125);
		ctx.lineTo(20, 35);
		
		ctx.arc(75, 125, 105, Math.PI * 1.35, Math.PI * 1.675);
		
		ctx.fillStyle = '#999999';
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		
		ctx.moveTo(75, 125);
		ctx.arc(75, 125, 10, 0, Math.PI * 2);
		
		ctx.fillStyle = 'black';
		ctx.fill();
		
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(65, 50);
		ctx.arc(55, 50, 10, 0, Math.PI * 2);
		
		ctx.moveTo(105, 50);
		ctx.arc(95, 50, 10, 0, Math.PI * 2);
		
		ctx.fillStyle = 'white';
		ctx.fill();
		
		ctx.stroke();
		
		ctx.beginPath();
		
		ctx.moveTo(55, 50);
		ctx.arc(55, 52.5, 1.5, 0, Math.PI * 2);
		
		ctx.moveTo(95, 50);
		ctx.arc(95, 52.5, 1.5, 0, Math.PI * 2);
		
		ctx.fillStyle = 'black';
		ctx.fill();
		
		ctx.stroke();
		
		ctx.beginPath();
		
		ctx.moveTo(25, 45);
		ctx.arc(25, 30, 15, Math.PI * 0.45, Math.PI * 1.95);
		
		ctx.moveTo(110, 27.5);
		ctx.arc(125, 30, 15, Math.PI * 1.1, Math.PI * 0.55);
		
		ctx.fillStyle = '#999999';
		ctx.fill();
		
		ctx.stroke();
		
		ctx.beginPath();
		
		ctx.moveTo(33, 30);
		ctx.arc(25, 30, 8, 0, Math.PI * 2);
		
		ctx.moveTo(133, 30);
		ctx.arc(125, 30, 8, 0, Math.PI * 2);
		
		ctx.fillStyle = '#f9d1ac';
		ctx.fill();
		
		ctx.stroke();
		
		ctx.beginPath();
		
		ctx.moveTo(65, 100);
		ctx.lineTo(45, 100);
		
		ctx.moveTo(85, 100);
		ctx.lineTo(105, 100);
		
		ctx.moveTo(67.5, 105);
		ctx.lineTo(52.5, 115);

		
		ctx.moveTo(82.5, 105);
		ctx.lineTo(97.5, 115);
		
		ctx.stroke();
	}

	desenhaPizza() {
		let ctx = this.canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth = 3;

		ctx.moveTo(130, 35);
		ctx.lineTo(75, 125);
		ctx.lineTo(20, 35);
		ctx.arc(75, 125, 105, Math.PI * 1.35, Math.PI * 1.675);

		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(50, 50, 10, 0, Math.PI * 2);
		ctx.moveTo(85, 75);
		ctx.arc(75, 75, 10, 0, Math.PI * 2);
		ctx.moveTo(110, 50);
		ctx.arc(100, 50, 10, 0, Math.PI * 2);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.stroke();
	}
}

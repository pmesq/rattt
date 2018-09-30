const maxLetras = 5;

let letras = new Array(maxLetras).fill(' ');

let cheats = [
	{
		nome: 'cheat',
		func: function() {
			console.log('cheat ativado');
		}
	}
]

function atualizaLetras(novaLetra) {
	for(let i = 0; i < maxLetras - 1; i++)
		letras[i] = letras[i + 1];
	letras[maxLetras - 1] = novaLetra;
}

function comparaCheat(cheat) {
	let str = "";
	for(let i = maxLetras - cheat.length; i < maxLetras; i++)
		str += letras[i];
	return str == cheat;
}

function verificaCheats() {
	for(let i = 0; i < cheats.length; i++) {
		if(comparaCheat(cheats[i].nome)) {
			cheats[i].func();
			return true;
		}
	}
	return false;
}

$('body').keyup(function(event) {
	if(event.which >= 65 && event.which <= 90) {
		atualizaLetras(event.key);
		verificaCheats();
	}
})
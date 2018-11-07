let isEditing = {
	h2: true,
	p: true
};

$('.botao-pagina').click(function() {
    let $main = $('main');
    $main.html('');
    let destino = $(this).data('destino');
    if(destino == 'home') paginaHome();
    else if(destino == 'perfil') paginaPerfil();
    else {
        $.ajax({
            url: 'modos.json',
            dataType: 'json',
            success: function(res) {
                paginaJogo(res[destino]);
            }
        });
		paginaJogo(res[destino]);
    }
});

$('header img').click(paginaPerfil);


function paginaHome() {
	
}


/*  PERFIL   {*/

function alteraHTML(El){
	let tagName = (El.prop('tagName')).toLowerCase();
	let botao = $('#edit'+tagName);
	console.log(botao);
	if(isEditing[tagName]){
		El.hide();
		El.after('<input id="'+ tagName +'Field"value="'+ El.text() +'"></input>');
		botao.html('👌');
		console.log('Inicio da edição de #'+tagName+'Field');
	}
	else{
		let newValue = $('#'+ tagName + 'Field').val();
		$('#' + tagName + 'Field').remove();
		$('#exibicao '+tagName).html(newValue);
		$('#exibicao '+tagName).show();
		botao.html('🖉')
		console.log('Fim da edição de #'+tagName+'Field');
	}
	isEditing[tagName] = !(isEditing[tagName]);
}

function paginaPerfil() {
    let $main = $('main');
    $main.html('<section id="exibicao">\
		<div> \
			<img src="imgs/perfil.png"> \
		</div> \
		<button id="editImage">🖉</button>\
		<div> \
			<h2>Username</h2>\
			<button id="edith2">🖉</button>\
		</div>\
		<div>\
			<p>Esta é sua descrição. (max: 300 caracteres)</p>\
			<button id="editp">🖉</button>\
		</div>\
	</section>');
	$('#edith2').click( function(){ alteraHTML( $('#exibicao h2') ) } );
	$('#editp').click( function(){ alteraHTML( $('#exibicao p') ) } );
	
}

/*}*/


function criaTabuleiro(modo) {
    let $main = $('main');
    let $tabuleiro = $('<div id="tabuleiro"></div>');
    let gridTemplateColumns = "";
    for(let i = 0; i < modo.tabuleiro.colunas; i++)
        gridTemplateColumns += 'auto ';
    $tabuleiro.css('grid-template-columns', gridTemplateColumns);

    let larguraMain = parseFloat($main.css('width' ));
    let alturaMain  = parseFloat($main.css('height'));
    let tamCasa;
    if(alturaMain * 0.75 <= larguraMain * 0.95) {
        tamCasa = alturaMain * 0.75 / modo.tabuleiro.linhas;
    } else {
        tamCasa = larguraMain * 0.95 / modo.tabuleiro.linhas;
    }
    $tabuleiro.css('width' , (tamCasa + 1) * modo.tabuleiro.colunas + 'px');
    $tabuleiro.css('height', (tamCasa) * modo.tabuleiro.linhas + 'px');
    $('.casa').css('width' , tamCasa + 'px');
    $('.casa').css('height', tamCasa + 'px');
    setTimeout(function() { $('.casa > span').css('font-size', tamCasa); }, 1);
    for(let i = 0; i < modo.tabuleiro.linhas; i++) {
        for(let j = 0; j < modo.tabuleiro.colunas; j++) {
            let $casa = $('<div class="casa"></div>');
            $casa.append($('<span></span>'));
            if(!i) $casa.css('border-top-width', '0');
            if(!j) $casa.css('border-left-width', '0');
            $tabuleiro.append($casa);
        }
    }
    $main.append($tabuleiro);
}

function criaJanela(i, modo) {
    let $janela = $('<div class="janela" id="janela-jogador-' + i + '"></div>');
    let $nomeJogador = $('<h2>' + modo.jogadores[i].nome + '</h2>');
    let $selectTipo = $('<select class="select-tipo"></select>');
    for(let j = 0; j < modo.jogadores[i].tiposDisponiveis.length; j++) {
        let $option = $('<option value="' +modo.jogadores[i].tiposDisponiveis[j]+ '">' + modo.jogadores[i].tiposDisponiveis[j] + '</option>');
        $selectTipo.append($option);
    }
    $janela.append($nomeJogador);
    $janela.append($selectTipo);
    $janela.hide();
    let larguraMain   = parseFloat($main.css('width'));
    let larguraJanela = parseFloat($janela.css('width'));
    $main.append($janela);
    $janela.fadeIn(300);
    $janela.css('left', (larguraMain - larguraJanela) / 2 + 'px');
}

function deletaJanela() {
    let $janela = $('#janela-jogador-' + i);
    $janela.fadeOut(300);
    setTimeout(function() { $janela.detach() }, 300);
}

let game;
function paginaJogo(modo) {
    let $main = $('main');
    let $log = $('<p id="log">Vez de <span>' + modo.jogadores[0].nome + '</span></p>');
    $main.append($log);

    criaTabuleiro(modo);

    let $controles = $('<div id="controles"></div>');
    let $reiniciar = $('<button type="button" class="botao-controle" id="botao-reiniciar">Reiniciar</button>');
    $controles.append($reiniciar);


    let janelasAbertas = [];
    for(let i = 0; i < modo.jogadores.length; i++) {
        janelasAbertas.push(false);
        if(modo.jogadores[i].editavel) {
            let $botaoEditarJogador = $('<button type="button" class="botao-controle">' + modo.jogadores[i].nome + ' ⚙</button>');
            $botaoEditarJogador.click(function() {
                $('.select-tipo').change(function() {
                    
                });
                (janelasAbertas[i] = !janelasAbertas[i]) ? criaJanela(i) : deletaJanela(i);
            }); 
            $controles.append($botaoEditarJogador);
        }
    }

    $main.append($controles);



    game = new Game(modo);
}

function requisicaoAjax(destino) {
    $.ajax({
        url: 'json/modos.json',
        dataType: 'json',
        success: function(res) {
            paginaJogo(res[destino]);
        }
    });
}

$('.botao-pagina').click(function() {
    let $main = $('main');
    $main.html('');
    let tipoDestino = $(this).data('tipo-destino'), destino = $(this).data('destino');
    $('header > h2').html(destino);
    if(tipoDestino == 'modo-padrao')
        requisicaoAjax(destino);
    else if(tipoDestino == 'campanha') {
        let nivelProgresso = parseInt(localStorage.getItem('campanha') || 1);
        let nivelDestino = parseInt(destino.charAt(6));
        if(nivelDestino <= nivelProgresso) requisicaoAjax(destino);
        else paginaNivelBloqueado();
    } else {
        if(destino == 'Home') paginaHome();
        else if(destino == 'Perfil') paginaPerfil();
        else if(destino == 'Criar Personalizado') paginaCriarPersonalizado();
    }    
});

function paginaNivelBloqueado() {
    $('main').append($('<h2>Este nível está bloqueado. Conclua os níveis anteriores para desbloqueá-lo.</h2>'));
}

function paginaHome() {
	
}

//PERFIL   {

let isEditing = {
    h2: true,
    p: true
};
let maxLength = {
	h2: 16,
	p: 128
};
let $pencilImg = '<img src="imgs/pencil.png" class="pencil">';
let conteudoSalvo = '';
let h2Limite = 22;
let pLimite = 150;

$('header img').click(paginaPerfil);

function alteraHTML(El){
	let tagName = (El.prop('tagName')).toLowerCase();
	let inputID = '#' + tagName + 'Field';
	let botao = $('#edit'+tagName);
	if(isEditing[tagName]){
		El.hide();
		El.after('<input maxlength="' + maxLength[tagName] + '"id="'+ tagName + 'Field"value="'+ El.text() +'"></input>');
		botao.html('👌');
		$(inputID).select();
		console.log('Inicio da edição de ' + inputID);
		$(inputID).keydown( function(event){
			if(event.which == 13)
				alteraHTML($('#exibicao '+tagName))
		});
	}
	else{
		let newValue = $(inputID).val();
		$(inputID).remove();
		$('#exibicao '+tagName).html(newValue);
		$('#exibicao '+tagName).show();
		botao.html($pencilImg)
		console.log('Fim da edição de '+inputID);
	}
	isEditing[tagName] = !(isEditing[tagName]);
	atribuiEventos();
}

function atribuiEventos(){
	$('button img')
	.mouseenter(function(){ 
		this.src = 'imgs/pencilHover.png';
		this.style.borderColor = '#41f4ff';
	})
	.mouseout(function(){ 
		this.src = 'imgs/pencil.png';
		this.style.borderColor = '#00a4dd';
	});
}

function paginaPerfil() {
    let $main = $('main');
	$main.html('');
	$main.append('<section id="exibicao"></section>');
	let $exibicao = $('#exibicao')
	$exibicao.append('<div id="divImg"><img src="imgs/perfil.png" id="perfilImg"></div>');
	$exibicao.append('<div id="divNome"></div>');
	$exibicao.append('<div id="divBio"></div>');
	$('#divImg').append('<button id="editImage"></button>');
	$('#divNome').append('<h2>Username</h2>');
	$('#divNome').append('<button id="edith2"></button>');
	$('#divBio').append('<p>Esta é sua descrição. max: 150 caracteres</p>');
	$('#divBio').append('<button id="editp"></button>');
	
	$('#exibicao button').append($pencilImg);
	$('#divNome button').click( function(){ alteraHTML($('#exibicao h2')); } );
	$('#divNome h2').click( function(){ alteraHTML($(this)); } );
	$('#divBio button').click( function(){ alteraHTML($('#exibicao p')) } );
	$('#divBio p').click( function(){ alteraHTML($(this)); } );
	atribuiEventos();
}

//}

function paginaCriarPersonalizado() {
    let $main = $('main');
    let $log = $('<p id="log">Mapa</p>');
    $main.append($log);
    let $mapa = $('<div id="tabuleiro"></div>');
    $mapa.css('grid-template-columns', 'auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto');
    $main.append($mapa);
    let larguraMain = parseFloat($main.css('width')), alturaMain = parseFloat($main.css('height'));
    let tamCasa;
    if(alturaMain * 0.75 <= larguraMain * 0.95)
        tamCasa = alturaMain * 0.75 / 16;
    else
        tamCasa = larguraMain * 0.95 / 16;
    $mapa.css('width' , (tamCasa + 1) * 16 + 'px');
    $mapa.css('height', (tamCasa) * 16 + 'px');
    $('.casa').css('width' , tamCasa + 'px');
    $('.casa').css('height', tamCasa + 'px');

    let mapa = new Array(16);
    let marcarCasa = null;
    for(let i = 0; i < 16; i++) {
        mapa[i] = new Array(16);
        for(let j = 0; j < 16; j++) {
            mapa[i][j] = 0;
            let $casa = $('<div class="casa"></div>');
            $casa.append($('<span></span>'));
            if(i == 0) $casa.css('border-top-width', '0');
            if(j == 0) $casa.css('border-left-width', '0');
            $casa.css('box-sizing', 'border-box');
            $casa.css('background-color', '#2b2b2b');
            $mapa.append($casa);

            $casa.mousedown(function() {
                $casa.css('background-color', (marcarCasa = mapa[i][j] = mapa[i][j] ? 0 : 1) ? '#343a40' : '#2b2b2b');
            });
            $casa.mouseup(function() {
                marcarCasa = null;
            });
            $casa.mouseenter(function() {
                if(marcarCasa != null)
                    $casa.css('background-color', (mapa[i][j] = marcarCasa) ? '#343a40' : '#2b2b2b');
            });
        }
    }

    let $configuracoesModo = $('<div id="configuracoes-modo-personalizado"></div>');

    let $labelNome = $('<label id="label-personalizado-nome">Nome </label>');
    let $inputNome = $('<input type="text" maxlength="16" id="input-personalizado-nome" value="Meu Modo">');
    $labelNome.append($inputNome);
    $configuracoesModo.append($labelNome);

    let $labelSequencia = $('<label id="label-personalizado-sequencia">Sequência </label>');
    let $inputSequencia = $('<input type="number" min="2" max="16" id="input-personalizado-sequencia" value="3">');
    $labelSequencia.append($inputSequencia);
    $configuracoesModo.append($labelSequencia);

    let $labelGravidade = $('<label id="label-personalizado-gravidade">Gravidade </label>');
    let $selectGravidade = $('<select id="select-personalizado-gravidade"></select>');
    $selectGravidade.append($('<option value="false">Não</option>'));
    $selectGravidade.append($('<option value="true">Sim</option>'));
    $labelGravidade.append($selectGravidade);
    $configuracoesModo.append($labelGravidade);

    let $labelJogadores = $('<label id="label-personalizado-jogadores">Jogadores </label>');
    let $inputJogadores = $('<input type="number" min="2" max="4" id="input-personalizado-jogadores" value="2">');
    $labelJogadores.append($inputJogadores);
    $configuracoesModo.append($labelJogadores);

    let $salvar = $('<button id="personalizado-salvar" type="button">Salvar</button>');
    $configuracoesModo.append($salvar);

    $inputSequencia.change(function()  {
        if($(this).val() < 2) $(this).val(2);
        else if($(this).val() > 16) $(this).val(16);
    });

    $inputJogadores.change(function() {
        if($(this).val() < 2) $(this).val(2);
        else if($(this).val() > 4) $(this).val(4);
    });

    $salvar.click(function() {
        let primeiraLinha = null, ultimaLinha = null, primeiraColuna = null, ultimaColuna = null;
        for(let i = 0; i < 16; i++) {
            for(let j = 0; j < 16; j++) {
                if(mapa[i][j]) ultimaLinha = i;
            }
            for(let j = 0; j < 16; j++) {
                if(mapa[j][i]) ultimaColuna = i;
            }
        }
        for(let i = 15; i >= 0; i--) {
            for(let j = 0; j < 16; j++) {
                if(mapa[i][j]) primeiraLinha = i;
            }
            for(let j = 0; j < 16; j++) {
                if(mapa[j][i]) primeiraColuna = i;
            }
        }
        
        if(!primeiraLinha || !primeiraColuna) return;
        let linhas = ultimaLinha - primeiraLinha + 1;
        let colunas = ultimaColuna - primeiraColuna + 1;
        let mapaFinal = new Array(linhas);
        for(let i = 0; i < linhas; i++) {
            mapaFinal[i] = new Array(colunas);
            for(let j = 0; j < colunas; j++) {
                mapaFinal[i][j] = mapa[i + primeiraLinha][j + primeiraColuna];
            }
        }

        let jogadores = new Array($inputSequencia.val());
        for(let i = 0; i < jogadores.length; i++) {
            jogadores[i] = {
                "nome": "P" + (i + 1), "tipo": "Usuário",
                "simbolo": (i == 0) ? "X" : ((i == 1) ? "O" : ((i == 2) ? "△" : "◊")),
                "editavel": true
            }
        }
        let novoModo = {
            "tipo": "personalizado",
            "nome": $inputNome.val(),
            "tabuleiro": { "linhas": linhas, "colunas": colunas, "mapa": mapaFinal },
            "sequencia": {
                "num": $inputSequencia.val(),
                "tipos": ["horizontal", "vertical", "diagonal-crescente", "diagonal-decrescente"]
            },
            "gravidade": $selectGravidade.val(),
            "numJogadores": $inputJogadores.val(),
            "jogadores": jogadores
        };
        let modosPersonalizados = JSON.parse(localStorage.getItem('modos-personalizados') || '[]');
        modosPersonalizados.push(novoModo);
        localStorage.setItem('modos-personalizados', JSON.stringify(modosPersonalizados));
    });

    $main.append($configuracoesModo);
}

function criaTabuleiro(modo) {
    let $main = $('main');
    let $tabuleiro = $('<div id="tabuleiro"></div>');
    let gridTemplateColumns = "";
    for(let i = 0; i < modo.tabuleiro.colunas; i++)
        gridTemplateColumns += 'auto ';
    $tabuleiro.css('grid-template-columns', gridTemplateColumns);

    let larguraMain = parseFloat($main.css('width')), alturaMain = parseFloat($main.css('height'));
    let tamCasa;
    if(alturaMain * 0.75 <= larguraMain * 0.95)
        tamCasa = alturaMain * 0.75 / modo.tabuleiro.linhas;
    else
        tamCasa = larguraMain * 0.95 / modo.tabuleiro.linhas;
    $tabuleiro.css('width' , (tamCasa + 1) * modo.tabuleiro.colunas + 'px');
    $tabuleiro.css('height', (tamCasa) * modo.tabuleiro.linhas + 'px');
    $('.casa').css('width' , tamCasa + 'px');
    $('.casa').css('height', tamCasa + 'px');
    setTimeout(function() { $('.casa > span').css('font-size', tamCasa + 'px'); }, 1);
    for(let i = 0; i < modo.tabuleiro.linhas; i++) {
        for(let j = 0; j < modo.tabuleiro.colunas; j++) {
            let $casa = $('<div class="casa"></div>');
            $casa.append($('<span></span>'));
            if(!i) $casa.css('border-top-width', '0');
            if(!j) $casa.css('border-left-width', '0');
            if(modo.tabuleiro.mapa[i][j] == 0) {
                $casa.css('background-color', '#2b2b2b');
                $casa.css('cursor', 'default');
            }
            $tabuleiro.append($casa);
        }
    }
    $main.append($tabuleiro);
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

    for(let i = 0; i < modo.jogadores.length; i++) {
        if(modo.jogadores[i].editavel) {
            let $janela = $('<div class="janela-jogador"></div>');
            let $nomeJogador = $('<h2>' + modo.jogadores[i].nome + '</h2>');
            let $selectTipo = $('<select class="select-tipo"></select>');
            for(let j = 0; j < modo.jogadores[i].tiposDisponiveis.length; j++) {
                let $option = $('<option value="' +modo.jogadores[i].tiposDisponiveis[j]+ '">' + modo.jogadores[i].tiposDisponiveis[j] + '</option>');
                $selectTipo.append($option);
            }
            $janela.append($nomeJogador);
            $janela.append($selectTipo);
            $janela.hide();
            let larguraMain = parseFloat($main.css('width'));
            $main.append($janela);
            let larguraJanela = parseFloat($janela.css('width'));
            $janela.css('left', (larguraMain - larguraJanela) / 2 + 'px');
            let $botaoEditarJogador = $('<button type="button" class="botao-controle">' + modo.jogadores[i].nome + ' ⚙</button>');
            $botaoEditarJogador.click(function() { $janela.fadeToggle(300); });
            $controles.append($botaoEditarJogador);
        }
    }

    $main.append($controles);



    game = new Game(modo);
}

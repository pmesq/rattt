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
    }
});

function paginaHome() {

}

function paginaPerfil() {

}

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
                if(janelasAbertas[i] = !janelasAbertas[i]) {
                    let $janela = $('<div class="janela" id="janela-jogador-' + i + '"></div>');
                    let $nomeJogador = $('<h2>' + modo.jogadores[i].nome + '</h2>');
                    let $selectTipo = $('<select id="select-tipo"></select>');
                    for(let i = 0; i < modo.jogadores[i].tiposDisponiveis.length; i++) {
                        let $option = $('<option>')
                    }
                    $janela.append($nomeJogador);
                    $janela.hide();
                    let larguraMain   = parseFloat($main.css('width'));
                    let larguraJanela = parseFloat($janela.css('width'));
                    $main.append($janela);
                    $janela.fadeIn(300);
                    $janela.css('left', (larguraMain - larguraJanela) / 2 + 'px');
                } else {
                    let $janela = $('#janela-jogador-' + i);
                    $janela.fadeOut(300);
                    setTimeout(function() { $janela.detach() }, 300);
                }
            }); 
            $controles.append($botaoEditarJogador);
        }
    }

    $main.append($controles);



    game = new Game(modo);
}

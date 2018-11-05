class Game {
    constructor(modo = {}) {
        this.tabuleiro = modo.tabuleiro;
        this.jogadores = modo.jogadores;
        this.numJogadores = modo.numJogadores;
        this.sequencia = modo.sequencia;
        this.gravidade = modo.gravidade;
        this.profundidadeMaxima = modo.profundidadeMaxima;
        this.vez = 0;
        this.inicializaTabuleiro();
        this.alteraLog(this.geraFraseVez(this.jogadores[0].nome));
        this.casaOn();
    }

    alteraLog(frase) {
        let $log = $('#log');
        $log.html(frase);
    }

    inicializaTabuleiro(tabuleiro = this.tabuleiro) {
        for(let i = 0; i < tabuleiro.linhas; i++)
            for(let j = 0; j < tabuleiro.colunas; j++)
                tabuleiro.mapa[i][j] = tabuleiro.mapa[i][j] ? '_' : '*';
    }

    imprime(tabuleiro = this.tabuleiro) {
        console.log('Tabuleiro:');
        let barra;
        if(tabuleiro.colunas <= 4) barra = '==========';
        else for(let i = 0; i < tabuleiro.colunas + 1; i++) {
                barra += '==';
            }
        console.log(barra);
        for(let i = 0; i < tabuleiro.linhas; i++) {
            let lin = i + ':';
            for(let j = 0; j < tabuleiro.colunas; j++)
                lin += " " + tabuleiro.mapa[i][j];
            console.log(lin);
        }
        console.log(barra);
    }


    reinicia(tabuleiro = this.tabuleiro) {
        clearTimeout(this.timeout);
        this.vez = 0; // Passa a vez para o jogador 1
        this.alteraLog(this.geraFraseVez(this.jogadores[0].nome));
        $('.casa').css('cursor', 'pointer');
        for(let i = 0; i < tabuleiro.linhas; i++) {
            for(let j = 0; j < tabuleiro.colunas; j++) {
                this.limpaCasa($('casa:eq(' + (tabuleiro.colunas * i + j) + ')'), { linha: i, coluna: j });
            }
        }
    }

    marcaCasaLogica(posicao, jogador = this.vez, tabuleiro = this.tabuleiro) {
        let linha = posicao.linha, coluna = posicao.coluna;
        tabuleiro.mapa[linha][coluna] = jogador;
    }

    marcaCasaGrafica(posicao, jogador = this.vez, tabuleiro = this.tabuleiro, jogadores = this.jogadores) {
        let linha = posicao.linha, coluna = posicao.coluna;
        let $casa = $('.casa:eq(' + (linha * tabuleiro.colunas + coluna) + ')');
        let $span = $casa.children().first(); // Pega o span filho da casa
        $span.text(jogadores[jogador].simbolo);
        $span.css('opacity', '1'); // Torna o span opaco novamente 
        $casa.css('cursor', 'default'); // Torna o cursor da casa marcada como padrão
    }

    limpaCasa($casa, posicao, tabuleiro = this.tabuleiro) {
        let linha = posicao.linha, coluna = posicao.coluna;
        tabuleiro.mapa[linha][coluna] = '_';
        let $span = $casa.children().first();
        $span.html('');
        $span.css('opacity', '0');
    }

    geraFraseVez(nome = 'Jogador') {
        let frases = [
            'Sua vez, <span>' + nome + '</span>!',
            'Vez de <span>' + nome + '</span>!',
            '<span>' + nome + '</span>, pode jogar!',
            'Eu confio em você, <span>' + nome + '</span>!',
            '<span>' + nome + '</span> ae',
            'Eis que é a vez de <span>' + nome + '</span>:'
        ]
        return frases[Math.floor(Math.random() * frases.length)];
    }

    geraFraseEmpate() {
        let frases = [
            'Deu velha!',
            'Empate!',
            'Ninguém ganhou!',
            'Todos perderam!'
        ]
        return frases[Math.floor(Math.random() * frases.length)];
    }

    geraFraseVitoria(nome = 'Jogador') {
        let frases = [
            'Você venceu, <span>' + nome + '</span>!',
            'Parabéns, <span>' + nome + '</span>!',
            'Vitória de <span>' + nome + '</span>!',
            'Todos exceto <span>' + nome + '</span> perderam!'
        ]
        return frases[Math.floor(Math.random() * frases.length)];
    }

    fimJogada() {
        let gs = this.gameState();
        if(gs.finalizado) {
            if(gs.vencedor != null) {
                this.alteraLog(this.geraFraseVitoria(this.jogadores[this.vez].nome));
            } else {
                this.alteraLog(this.geraFraseEmpate());
            }
            $('.casa').css('cursor', 'default');
            this.vez = null;
        } else {
            this.vez = this.vez == this.numJogadores - 1 ? 0 : this.vez + 1;
            this.alteraLog(this.geraFraseVez(this.jogadores[this.vez].nome));
            if(this.jogadores[this.vez].tipo != 'usuario') {
                this.botPlay();
            }
        }
    }

    gameState(tabuleiro = this.tabuleiro, sequencia = this.sequencia) {
        if(sequencia.tipos.includes('horizontal')) {
            for(let i = 0; i < tabuleiro.linhas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.colunas; j++) {
                    if((tabuleiro.mapa[i][j] == tabuleiro.mapa[i][j - 1]) && (tabuleiro.mapa[i][j] != '_') && (tabuleiro.mapa[i][j] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num)  {
                        return { finalizado: true, vencedor: tabuleiro.mapa[i][j], sentido: 'horizontal' };
                    }
                }
            }
        }
        if(sequencia.tipos.includes('vertical')) {
            for(let i = 0; i < tabuleiro.colunas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.linhas; j++) {
                    if((tabuleiro.mapa[j][i] == tabuleiro.mapa[j - 1][i]) && (tabuleiro.mapa[j][i] != '_') && (tabuleiro.mapa[j][i] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[j][i], sentido: 'vertical' };
                    }
                }
            }
        }
        if(sequencia.tipos.includes('diagonal-decrescente')) {
            for(let i = 0; i < tabuleiro.linhas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.colunas - i; j++) {
                    if(tabuleiro.mapa[i + j][j] == tabuleiro.mapa[i + j - 1][j - 1] && tabuleiro.mapa[i + j][j] != '_' && tabuleiro.mapa[i + j][j] != '*')
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[i + j][j], sentido: 'diagonal-decrescente' };
                    }
                }
            }
            for(let i = 1; i < tabuleiro.colunas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.linhas - i; j++) {
                    if(tabuleiro.mapa[j][i + j] == tabuleiro.mapa[j - 1][i + j - 1] && tabuleiro.mapa[j][i + j] != '_' && tabuleiro.mapa[j][i + j] != '*')
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[j][i + j], sentido: 'diagonal-decrescente' };
                    }
                }
            }
        }
        if(sequencia.tipos.includes('diagonal-crescente')) {
            for(let i = tabuleiro.linhas - 1; i >= 0; i--) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.colunas - tabuleiro.linhas + i + 1; j++) {
                    if(tabuleiro.mapa[i - j][j] == tabuleiro.mapa[i - j + 1][j - 1] && tabuleiro.mapa[i - j][j] != '_' && tabuleiro.mapa[i - j][j] != '*')
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[i - j][j], sentido: 'diagonal-crescente' };
                    }
                }
            }
            for(let i = 1; i < tabuleiro.colunas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.linhas - i; j++) {
                    if(tabuleiro.mapa[tabuleiro.linhas - j - 1][i + j] == tabuleiro.mapa[tabuleiro.linhas - j][i + j - 1] && tabuleiro.mapa[tabuleiro.linhas - j - 1][i + j] != '_' && tabuleiro.mapa[tabuleiro.linhas - j - 1][i + j] != '*')
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[tabuleiro.linhas - j - 1][i + j], sentido: 'diagonal-crescente' };
                    }
                }
            }
        }

        for(let i = 0; i < tabuleiro.linhas; i++) {
            if(tabuleiro.mapa[i].includes('_')) return { finalizado: false, vencedor: null, sentido: null };
        }
        return { finalizado: true, vencedor: null, sentido: null };
    }

    casaOn(tabuleiro = this.tabuleiro, jogadores = this.jogadores) {
        let that = this;
        $('.casa').mouseenter(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa sobrevoada
            let coluna = $(this).index() % tabuleiro.linhas; // Pega a coluna da casa sobrevoada
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'usuario') {  // Testa se a casa está disponível e se é vez de algum usuário
                let $span = $(this).children().first(); // Pega o span filho da casa
                $span.css('opacity', '.25'); // Torna o span transparente
                $span.html(jogadores[that.vez].simbolo); // Altera o conteúdo do span para o símbolo a ser marcado (transparente)
            }
        });
        $('.casa').mouseout(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa
            let coluna = $(this).index() % tabuleiro.linhas; // Pega a coluna da casa
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'usuario') {  // Testa se a casa está disponível e se é vez de algum usuário
                let $span = $(this).children().first(); // Pega o span filho da casa
                $span.html(''); // Retira o conteúdo do span
                $span.css('opacity', '0'); // Torna o span opaco novamente 
            }
        });
        $('.casa').click(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa clicada
            let coluna = $(this).index() % tabuleiro.linhas; // Pega a coluna da casa clicada
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'usuario') {  // Testa se a casa clicada está disponível e se é vez de algum usuário
                that.marcaCasaLogica({ linha: linha, coluna: coluna });
                that.marcaCasaGrafica({ linha: linha, coluna: coluna });
                that.fimJogada();
            }
        });
    }

    casasDisponiveis(tabuleiro = this.tabuleiro) { // Acha as casas disponíveis no tabuleiro e retorna um array com as posições das mesmas
        let arrCasasDisponiveis = []; // Cria o array que conterá as posições das casas disponíveis
        for(let i = 0; i < tabuleiro.linhas; i++)
            for(let j = 0; j < tabuleiro.colunas; j++) {
                if(tabuleiro.mapa[i][j] == '_') // Testa se a casa está disponível
                    arrCasasDisponiveis.push({ linha: i, coluna: j }); // Insere a posição da casa no array
            }
        return arrCasasDisponiveis; // Retorna o array com as posições das casas disponíveis
    }

    copiaArray(array) {
        return array.map(function(elemento) { return elemento; });
    }

    copiaTabuleiro(tabuleiro = this.tabuleiro) {
        let novoTabuleiro = {
            linhas: tabuleiro.linhas,
            colunas: tabuleiro.colunas,
            regular: tabuleiro.regular,
            mapa: tabuleiro.mapa.map(function(linha) {
                return linha.map(function(elemento) { return elemento; });
            })
        };
        return novoTabuleiro;
    }

    randomBotPlay() {
        let arrCasasDisponiveis = this.casasDisponiveis();
        return arrCasasDisponiveis[Math.floor(Math.random() * arrCasasDisponiveis.length)];
    }

    minimax(tabuleiro = this.tabuleiro, vez = this.vez, profundidade = 0, IDminnie = this.vez) {
        let gs = this.gameState(tabuleiro);
        if(gs.finalizado) {
            if(gs.vencedor == '_') return { posicao: null, pontos: 0 };
            if(gs.vencedor == IDminnie) return { posicao: null, pontos: 100 - profundidade };
            return { posicao: null, pontos: profundidade - 100 };
        }
        if(profundidade >= this.profundidadeMaxima) return { posicao: null, pontos: 0 };

        let arrCasasDisponiveis = this.casasDisponiveis(tabuleiro);

        let resultados = new Array(arrCasasDisponiveis.length);
        for(let i = 0; i < arrCasasDisponiveis.length; i++) {
            let novoTabuleiro = this.copiaTabuleiro(tabuleiro);
            let linha = arrCasasDisponiveis[i].linha, coluna = arrCasasDisponiveis[i].coluna;
            novoTabuleiro.mapa[linha][coluna] = vez;
            resultados[i] = this.minimax(novoTabuleiro, vez ? 0 : 1, profundidade + 1).pontos;
        }

        let melhor = {
            pontos: resultados[0],
            posicao: arrCasasDisponiveis[0]
        };
        for(let i = 1; i < arrCasasDisponiveis.length; i++) {
            if((vez == IDminnie && resultados[i] > melhor.pontos) 
              || (vez != IDminnie && resultados[i] < melhor.pontos)) {
                melhor.pontos = resultados[i];
                melhor.posicao = arrCasasDisponiveis[i];
            }
        }
        return melhor;
    }

    minnieBotPlay() {
        let resultado = this.minimax();
        console.log(resultado.pontos);
        return resultado.posicao;
    }

    botPlay(bot = this.jogadores[this.vez].tipo) {
        let posicao;
        switch(bot) {
            case 'random': posicao = this.randomBotPlay(); break;
            case 'minnie': posicao = this.minnieBotPlay(); break;
        }
        let that = this;
        this.timeout = setTimeout(function() {
            that.marcaCasaLogica(posicao);
            that.marcaCasaGrafica(posicao);
            that.fimJogada();
        }, 500);
    }
}

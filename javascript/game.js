class Game {
    constructor(modo = {}) {
        this.tabuleiro = modo.tabuleiro;
        this.jogadores = modo.jogadores;
        this.numJogadores = modo.numJogadores;
        this.sequencia = modo.sequencia;
        this.gravidade = modo.gravidade;
        this.tipo = modo.tipo;
        if(this.tipo == 'campanha') this.nivel = modo.nivel;
        this.vez = 0;
        this.inicializaTabuleiro();
        this.alteraLog(this.geraFraseVez(this.jogadores[0].nome));
        this.casaOn();
        this.reiniciarOn();
        this.selectOn();
        if(this.jogadores[0].tipo != 'Usuário') this.botPlay();
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
        for(let i = 0; i < tabuleiro.linhas; i++) {
            for(let j = 0; j < tabuleiro.colunas; j++) {
                this.limpaCasa({ linha: i, coluna: j });
            }
        }
        if(this.jogadores[0].tipo != 'Usuário') this.botPlay();
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

    limpaCasa(posicao, tabuleiro = this.tabuleiro) {
        let linha = posicao.linha, coluna = posicao.coluna;
        let $casa = $('.casa:eq(' + (linha * tabuleiro.colunas + coluna) + ')');
        if(tabuleiro.mapa[linha][coluna] != '*') {
            $casa.css('cursor', 'pointer');
            tabuleiro.mapa[linha][coluna] = '_';
        }
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
                if(this.tipo == 'campanha' && gs.vencedor == 0) {
                    let nivelProgresso = parseInt(localStorage.getItem('campanha') || 1);
                    let nivelAtual = this.nivel;
                    if(nivelAtual == nivelProgresso) localStorage.setItem('campanha', nivelAtual + 1);
                }
            } else
                this.alteraLog(this.geraFraseEmpate());
            $('.casa').css('cursor', 'default');
            this.vez = null;
        } else {
            this.vez = this.vez == this.numJogadores - 1 ? 0 : this.vez + 1;
            this.alteraLog(this.geraFraseVez(this.jogadores[this.vez].nome));
            if(this.jogadores[this.vez].tipo != 'Usuário')
                this.botPlay();
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
                for(let j = 1; j + i < tabuleiro.linhas && j < tabuleiro.colunas; j++) {
                    if((tabuleiro.mapa[j + i][j] == tabuleiro.mapa[j + i - 1][j - 1]) && (tabuleiro.mapa[j + i][j] != '_') && (tabuleiro.mapa[j + i][j] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[j + i][j], sentido: 'diagonal-decrescente' };
                    }
                }
            }
            for(let i = 0; i < tabuleiro.colunas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.linhas && j + i < tabuleiro.colunas; j++) {
                    if((tabuleiro.mapa[j][j + i] == tabuleiro.mapa[j - 1][j + i - 1]) && (tabuleiro.mapa[j][j + i] != '_') && (tabuleiro.mapa[j][j + i] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[j][j + i], sentido: 'diagonal-decrescente' };
                    }
                }
            }
        }
        if(sequencia.tipos.includes('diagonal-crescente')) {
            for(let i = 0; i < tabuleiro.linhas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j + i < tabuleiro.linhas && j < tabuleiro.colunas; j++) {
                    if((tabuleiro.mapa[tabuleiro.linhas - i - j - 1][j] == tabuleiro.mapa[tabuleiro.linhas - i - j][j - 1]) && (tabuleiro.mapa[tabuleiro.linhas - i - j - 1][j] != '_') && (tabuleiro.mapa[tabuleiro.linhas - i - j - 1][j] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[tabuleiro.linhas - i - j - 1][j], sentido: 'diagonal-crescente' };
                    }
                }
            }
            for(let i = 0; i < tabuleiro.colunas; i++) {
                let sequenciaAtual = 1;
                for(let j = 1; j < tabuleiro.linhas && j + i < tabuleiro.colunas; j++) {
                    if((tabuleiro.mapa[tabuleiro.linhas - j - 1][j + i] == tabuleiro.mapa[tabuleiro.linhas - j][j + i - 1]) && (tabuleiro.mapa[tabuleiro.linhas - j - 1][j + i] != '_') && (tabuleiro.mapa[tabuleiro.linhas - j - 1][j + i] != '*'))
                        sequenciaAtual++;
                    else sequenciaAtual = 1;
                    if(sequenciaAtual >= sequencia.num) {
                        return { finalizado: true, vencedor: tabuleiro.mapa[tabuleiro.linhas - j - 1][j + i], sentido: 'diagonal-crescente' };
                    }
                }
            }
        }

        for(let i = 0; i < tabuleiro.linhas; i++) {
            if(tabuleiro.mapa[i].includes('_')) return { finalizado: false, vencedor: null, sentido: null };
        }
        return { finalizado: true, vencedor: null, sentido: null };
    }

    atracaoGravitacional(posicao, tabuleiro = this.tabuleiro) {
        if(tabuleiro.mapa[tabuleiro.linhas - 1][posicao.coluna] == '_') return { linha: tabuleiro.linhas - 1, coluna: posicao.coluna };
        for(let i = posicao.linha + 1; i < tabuleiro.linhas; i++) {
            if(tabuleiro.mapa[i][posicao.coluna] != '_') return { linha: i - 1, coluna: posicao.coluna };
        }
    }

    casaOn(tabuleiro = this.tabuleiro, jogadores = this.jogadores) {
        let that = this;
        $('.casa').mouseenter(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa sobrevoada
            let coluna = $(this).index() % tabuleiro.colunas; // Pega a coluna da casa sobrevoada
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'Usuário') {  // Testa se a casa está disponível e se é vez de algum usuário
                let posicao = { linha: linha, coluna: coluna };
                if(that.gravidade) posicao = that.atracaoGravitacional(posicao, that.tabuleiro);
                let $span = $('.casa:eq(' + (posicao.linha * tabuleiro.colunas + posicao.coluna) + ')').children().first(); // Pega o span filho da casa
                $span.css('opacity', '.25'); // Torna o span transparente
                $span.html(jogadores[that.vez].simbolo); // Altera o conteúdo do span para o símbolo a ser marcado (transparente)
            }
        });
        $('.casa').mouseout(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa
            let coluna = $(this).index() % tabuleiro.colunas; // Pega a coluna da casa
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'Usuário') {  // Testa se a casa está disponível e se é vez de algum usuário
                let posicao = { linha: linha, coluna: coluna };
                if(that.gravidade) posicao = that.atracaoGravitacional(posicao, that.tabuleiro);
                let $span = $('.casa:eq(' + (posicao.linha * tabuleiro.colunas + posicao.coluna) + ')').children().first(); // Pega o span filho da casa
                $span.html(''); // Retira o conteúdo do span
                $span.css('opacity', '0'); // Torna o span opaco novamente 
            }
        });
        $('.casa').click(function() {
            let linha = Math.floor($(this).index() / tabuleiro.colunas); // Pega a linha da casa clicada
            let coluna = $(this).index() % tabuleiro.colunas; // Pega a coluna da casa clicada
            if(tabuleiro.mapa[linha][coluna] == '_' && that.vez != null && jogadores[that.vez].tipo == 'Usuário') {  // Testa se a casa clicada está disponível e se é vez de algum usuário
                let posicao = { linha: linha, coluna: coluna };
                if(that.gravidade) posicao = that.atracaoGravitacional(posicao, that.tabuleiro);
                that.marcaCasaLogica(posicao);
                that.marcaCasaGrafica(posicao);
                that.fimJogada();
            }
        });
    }

    reiniciarOn() {
        let that = this;
        $('#botao-reiniciar').click(function() {
            that.reinicia();
        });
    }

    selectOn() {
        let that = this;
        $('.botao-controle').click(function() {
            $('.select-tipo').change(function() {
                let i = $('.select-tipo').index($(this));
                that.jogadores[i].tipo = $(this).val();
                that.reinicia();
            });
        });
    }

    casasDisponiveis(tabuleiro = this.tabuleiro) { // Acha as casas disponíveis no tabuleiro e retorna um array com as posições das mesmas
        let arrCasasDisponiveis = []; // Cria o array que conterá as posições das casas disponíveis
        for(let i = 0; i < tabuleiro.linhas; i++)
            for(let j = 0; j < tabuleiro.colunas; j++) {
                if(!this.gravidade) {
                    if(tabuleiro.mapa[i][j] == '_') // Testa se a casa está disponível
                        arrCasasDisponiveis.push({ linha: i, coluna: j }); // Insere a posição da casa no array
                } else {
                    if(tabuleiro.mapa[i][j] == '_' && (i == tabuleiro.linhas - 1 || tabuleiro.mapa[i + 1][j] != '_')) // Testa se a casa está disponível e se a casa abaixo está preenchida
                        arrCasasDisponiveis.push({ linha: i, coluna: j }); // Insere a posição da casa no array
                }
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

    minimax(profundidade, tabuleiro = this.tabuleiro, jogador = this.vez, minnieId = this.vez) {
        let gs = this.gameState(tabuleiro);
        if(gs.finalizado && gs.vencedor == minnieId) return { pontos: 10 };
        if(gs.finalizado && gs.vencedor != null) return { pontos: -10 };
        if(gs.finalizado || profundidade == 0) return { pontos: 0 };

        let casasDisp = this.casasDisponiveis(tabuleiro);
        let melhor = { pontos: jogador == minnieId ? -1000 : 1000 };
        for(let i = 0; i < casasDisp.length; i++) {
            let novoTabuleiro = this.copiaTabuleiro(tabuleiro);
            this.marcaCasaLogica(casasDisp[i], jogador, novoTabuleiro);
            let resultado = this.minimax(profundidade - 1, novoTabuleiro, jogador ? 0 : 1).pontos;
            if((jogador == minnieId && resultado > melhor.pontos) || (jogador != minnieId && resultado < melhor.pontos))
                melhor = { pontos: resultado, posicao: casasDisp[i] };
        }
        return melhor;
    }

    analisaCasasConsecutivas(casas, jogador = this.vez) {
        if(casas[0] == '_' && casas[1] == jogador && casas[2] == jogador)
            return { conclusao: true, indice: 0 };
        if(casas[0] == jogador && casas[1] == '_' && casas[2] == jogador)
            return { conclusao: true, indice: 1 };
        if(casas[0] == jogador && casas[1] == jogador && casas[2] == '_')
            return { conclusao: true, indice: 2 };
        return { conclusao: false };
    }

    classicGanhar(jogador = this.vez) {
        let resultado;
        for(let i = 0; i < 3; i++) {
            resultado = this.analisaCasasConsecutivas(this.tabuleiro.mapa[i], jogador);
            if(resultado.conclusao) 
                return { conclusao: true, posicao: { linha: i, coluna: resultado.indice } };
            resultado = this.analisaCasasConsecutivas([this.tabuleiro.mapa[0][i], this.tabuleiro.mapa[1][i], this.tabuleiro.mapa[2][i]], jogador);
            if(resultado.conclusao) 
                return { conclusao: true, posicao: { linha: resultado.indice, coluna: i } };
        }
        resultado = this.analisaCasasConsecutivas([this.tabuleiro.mapa[0][0], this.tabuleiro.mapa[1][1], this.tabuleiro.mapa[2][2]], jogador);
        if(resultado.conclusao) 
            return { conclusao: true, posicao: { linha: resultado.indice, coluna: resultado.indice } };
        resultado = this.analisaCasasConsecutivas([this.tabuleiro.mapa[2][0], this.tabuleiro.mapa[1][1], this.tabuleiro.mapa[0][2]], jogador);
        if(resultado.conclusao) 
            return { conclusao: true, posicao: { linha: 2 - resultado.indice, coluna: resultado.indice } };
        return { conclusao: false };
    }

    classicPerder(jogador = this.vez) {
        return this.classicGanhar(jogador ? 0 : 1);
    }

    classicTriangulacao(oponente = this.vez ? 0 : 1) {
        if((this.tabuleiro.mapa[0][0] == oponente && this.tabuleiro.mapa[2][2] == oponente)
          || (this.tabuleiro.mapa[0][2] == oponente && this.tabuleiro.mapa[2][0] == oponente))
            return this.classicLado();
        if(this.tabuleiro.mapa[0][1] == oponente && this.tabuleiro.mapa[0][0] == '_'
          && (this.tabuleiro.mapa[1][0] == oponente || this.tabuleiro.mapa[2][0] == oponente))
            return { conclusao: true, posicao: { linha: 0, coluna: 0 } };
        if(this.tabuleiro.mapa[0][1] == oponente && this.tabuleiro.mapa[0][2] == '_'
          && (this.tabuleiro.mapa[1][2] == oponente || this.tabuleiro.mapa[2][2] == oponente))
            return { conclusao: true, posicao: { linha: 0, coluna: 2 } };
        if(this.tabuleiro.mapa[2][1] == oponente && this.tabuleiro.mapa[2][0] == '_'
          && (this.tabuleiro.mapa[1][0] == oponente || this.tabuleiro.mapa[0][0] == oponente))
            return { conclusao: true, posicao: { linha: 2, coluna: 0 } };
        if(this.tabuleiro.mapa[2][1] == oponente && this.tabuleiro.mapa[2][2] == '_'
          && (this.tabuleiro.mapa[1][2] == oponente || this.tabuleiro.mapa[0][2] == oponente))
            return { conclusao: true, posicao: { linha: 2, coluna: 2 } };
        if(this.tabuleiro.mapa[1][0] == oponente && this.tabuleiro.mapa[0][0] == '_'
          && this.tabuleiro.mapa[0][2] == oponente)
            return { conclusao: true, posicao: { linha: 0, coluna: 0 } };
        if(this.tabuleiro.mapa[1][0] == oponente && this.tabuleiro.mapa[2][0] == '_'
          && this.tabuleiro.mapa[2][2] == oponente)
            return { conclusao: true, posicao: { linha: 2, coluna: 0 } };
        if(this.tabuleiro.mapa[1][2] == oponente && this.tabuleiro.mapa[0][2] == '_'
          && this.tabuleiro.mapa[0][0] == oponente)
            return { conclusao: true, posicao: { linha: 0, coluna: 2 } };
        if(this.tabuleiro.mapa[1][2] == oponente && this.tabuleiro.mapa[2][2] == '_'
          && this.tabuleiro.mapa[2][0] == oponente)
            return { conclusao: true, posicao: { linha: 2, coluna: 2 } };
        return { conclusao: false };
    }

    classicMeio() {
        if(this.tabuleiro.mapa[1][1] == '_') return { conclusao: true, posicao: { linha: 1, coluna: 1 } };
        return { conclusao: false };
    }

    classicCanto() {
        let cantosDisp = [];
        if(this.tabuleiro.mapa[0][0] == '_') cantosDisp.push({ linha: 0, coluna: 0 });
        if(this.tabuleiro.mapa[0][2] == '_') cantosDisp.push({ linha: 0, coluna: 2 });
        if(this.tabuleiro.mapa[2][0] == '_') cantosDisp.push({ linha: 2, coluna: 0 });
        if(this.tabuleiro.mapa[2][2] == '_') cantosDisp.push({ linha: 2, coluna: 2 });
        if(cantosDisp.length)
            return { conclusao: true, posicao: cantosDisp[Math.floor(Math.random() * cantosDisp.length)]};
        return { conclusao: false };
    }

    classicLado() {
        let cantosDisp = [];
        if(this.tabuleiro.mapa[0][1] == '_') cantosDisp.push({ linha: 0, coluna: 1 });
        if(this.tabuleiro.mapa[1][0] == '_') cantosDisp.push({ linha: 1, coluna: 0 });
        if(this.tabuleiro.mapa[1][2] == '_') cantosDisp.push({ linha: 1, coluna: 2 });
        if(this.tabuleiro.mapa[2][1] == '_') cantosDisp.push({ linha: 2, coluna: 1 });
        if(cantosDisp.length)
            return { conclusao: true, posicao: cantosDisp[Math.floor(Math.random() * cantosDisp.length)]};
        return { conclusao: false };
    }

    randomBotPlay() {
        let arrCasasDisponiveis = this.casasDisponiveis();
        return arrCasasDisponiveis[Math.floor(Math.random() * arrCasasDisponiveis.length)];
    }

    greedBotPlay() {
        let resultado = this.classicGanhar();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicPerder();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicMeio();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicCanto();
        if(resultado.conclusao) return resultado.posicao;

        return this.randomBotPlay();
    }

    prideBotPlay() {
        let resultado = this.classicGanhar();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicPerder();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicTriangulacao();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicMeio();
        if(resultado.conclusao) return resultado.posicao;

        resultado = this.classicCanto();
        if(resultado.conclusao) return resultado.posicao;

        return this.randomBotPlay();
    }

    minnieBotPlay() {
        return this.minimax(3).posicao;
    }

    maxBotPlay() {
        return this.minimax(8).posicao;
    }

    botPlay(bot = this.jogadores[this.vez].tipo) {
        let posicao;
        switch(bot) {
            case 'Brandon': posicao = this.randomBotPlay(); break;
            case 'Greed':  posicao = this.greedBotPlay(); break;
            case 'Pride':  posicao = this.prideBotPlay(); break;
            case 'Minnie': posicao = this.minnieBotPlay(); break;
            case 'Max': posicao = this.maxBotPlay(); break;
        }
        let that = this;
        this.timeout = setTimeout(function() {
            that.marcaCasaLogica(posicao);
            that.marcaCasaGrafica(posicao);
            that.fimJogada();
        }, 500);
    }
}

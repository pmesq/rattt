let conquistasPadrao = '[0, 0, 0, 0, 0, 0, 0]';

function notificaConquista(conquista) {
    $.ajax({
        url: 'json/conquistas.json',
        dataType: 'json',
        success: function(res) {
            alert('Conquista ' + res[conquista].nome + ' alcançada!');
        }
    });
}

function conquistaAlcancada(novaConquista) {
    let conquistasAlcancadas = JSON.parse(localStorage.getItem('conquistas') || conquistasPadrao);
    if(!conquistasAlcancadas[novaConquista]) {
        conquistasAlcancadas[novaConquista] = 1;
        localStorage.setItem('conquistas', JSON.stringify(conquistasAlcancadas));
        notificaConquista(novaConquista);
    }
}

function verificaConquistas(partidasJogadas, modo) {
    if(partidasJogadas == 1) conquistaAlcancada(0);
    else if(partidasJogadas == 30) conquistaAlcancada(1);
    else if(partidasJogadas == 250) conquistaAlcancada(2);

    if(modo.tipo == 'campanha') {
        if(modo.nivel == 1) conquistaAlcancada(3);
        else if(modo.nivel == 3) conquistaAlcancada(4);
        else if(modo.nivel == 5) conquistaAlcancada(5);
    } else if(modo.tipo == 'personalizado') conquistaAlcancada(6);
}
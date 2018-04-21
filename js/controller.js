let criaController = function (jogo) {

    $entrada = $('#entrada');
    $lacunas = $('.lacunas');

    let exibeLacunas = function () {
        // let lacunas = jogo.getLacunas();
        $lacunas.empty();
        jogo.getLacunas().forEach(lacuna => {
            lacuna = $("<li>").addClass("lacuna").text(lacuna).appendTo($lacunas);
        });
    };

    // muda o texto do placeHolder do campo de entrada    
    let mudaPlaceHolder = function (texto) {
        $entrada.val("").attr("placeholder", texto);
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    let guardaPalavraSecreta = function () {
        jogo.setPalavraSecreta($entrada.val().trim());
        exibeLacunas();
        mudaPlaceHolder("chuta");
    };

    let reinicia = function(){
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder("Palavra secreta");
    };

    let leChute = function () {
        jogo.processaChute($entrada.val().trim().substr(0, 1));
        $entrada.val('');
        exibeLacunas();

        setTimeout(()=>{
            if (jogo.ganhouOuperdeu()) {
                if (jogo.ganhou()) alert("Parabéns, você ganhou");
                else if (jogo.perdeu()) alert("Que pensa, tente novamente");
    
                reinicia();
            }
        }, 300);
    };

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    let inicia = function () {

        $entrada.keypress(function (event) {

            if (event.which == 13) {
                console.log("entrou condição");
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia: inicia };
}
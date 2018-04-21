const criaController = function (jogo) {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = function () {
        // let lacunas = jogo.getLacunas();
        $lacunas.empty();
        jogo.getLacunas().forEach(lacuna => {
            lacuna = $("<li>").addClass("lacuna").text(lacuna).appendTo($lacunas);
        });
    };

    // muda o texto do placeHolder do campo de entrada    
    const mudaPlaceHolder = function (texto) {
        $entrada.val("").attr("placeholder", texto);
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    const guardaPalavraSecreta = function () {

        try{
            jogo.setPalavraSecreta($entrada.val().trim());
            exibeLacunas();
            mudaPlaceHolder("chuta");
        }
        catch(err){
            alert(err.message);
        }
    };

    const reinicia = function(){
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder("Palavra secreta");
    };

    const leChute = function () {
        
        try{
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
        }
        catch (err){
            alert(err.message);
        }
    };

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    const inicia = function () {

        $entrada.keypress(function (event) {

            if (event.which == 13) {
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
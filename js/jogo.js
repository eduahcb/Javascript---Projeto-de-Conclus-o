let criaJogo = function(sprite){
    let palavraSecreta;
    let lacunas = [];
    let etapa = 1;
    //recebe a palavra secreta e deve atribuila a variavel palavra

    let ganhou = function(){

        return lacunas.length
            ?  !lacunas.some(lacuna =>{
                    return lacuna == '';
                })
            : false;
    };

    let perdeu = function(){

        return sprite.isFinished();
    }
    let ganhouOuperdeu = function(){
        return ganhou() || perdeu();
    }
    let reinicia = function(){
        etapa = 1;
        lacunas = [];
        sprite.reset();
    }

    let processaChute = function(chute){
        let ex = new RegExp(chute, "gi"),
            resultado,
            acertou = false;

        while(resultado = ex.exec(palavraSecreta)){
            lacunas[resultado.index] = chute;
            acertou = true;
        }

        if(!acertou) sprite.nextFrame();

    };

    let criaLacunas = function(){
       lacunas = Array(palavraSecreta.length).fill('');
    };

    let setPalavraSecreta = function(palavra){
        palavraSecreta = palavra;
        criaLacunas();
        etapa++;
    };

    let getLacunas = function(){
        return lacunas;
    };

    let getEtapa = function(){
        console.log(etapa);
    };

    return {
        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuperdeu: ganhouOuperdeu,
        reinicia: reinicia
    }

}
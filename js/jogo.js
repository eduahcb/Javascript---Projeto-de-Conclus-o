const criaJogo = sprite => {
    
    let palavraSecreta;
    let lacunas = [];
    let etapa = 1;
    //recebe a palavra secreta e deve atribuila a variavel palavra

    const ganhou = () => {
        return lacunas.length
            ?  !lacunas.some(lacuna =>{
                    return lacuna == '';
                })
            : false;
    };

    const perdeu = () => sprite.isFinished();

    const ganhouOuperdeu = () => ganhou() || perdeu();
    
    
    const reinicia = () => {
        etapa = 1;
        lacunas = [];
        sprite.reset();
    }

    const processaChute = chute => {
        
        if(!chute.trim()) throw Error('Chute inválido');
        
        const ex = new RegExp(chute, "gi");
        
        let resultado, acertou = false;

        while(resultado = ex.exec(palavraSecreta)){
            lacunas[resultado.index] = chute;
            acertou = true;
        }
        if(!acertou) sprite.nextFrame();
    };

    const criaLacunas = () => lacunas = Array(palavraSecreta.length).fill('');

    const setPalavraSecreta = palavra => {
        
        if(!palavra.trim()) throw Error('Palavra inválida');
        
        palavraSecreta = palavra;
        criaLacunas();
        etapa++;
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuperdeu,
        reinicia
    };
}
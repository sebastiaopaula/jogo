let listaDenumeroSorteados = []; 
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas=1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor!');
         }else {
            exibirTextoNaTela('p','O número secreto é maior!');
         }
         tentativas++;         
         limparCampo();
         
    }
}

function gerarNumeroAleatorio() {    
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista=listaDenumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDenumeroSorteados.length = 0;
    }
    if (listaDenumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDenumeroSorteados.push(numeroEscolhido);
        console.log(listaDenumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto=gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    mensagemInicial();   
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').toggleAttribute('disabled', false);

}












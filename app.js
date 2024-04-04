let listaNumerosSorteados = [];
let numLimite = 10;
let numSecreto = numAleatorio();
let tentativas = 1;

function NomeNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate :1.2});
}

function mensagemInicial (){
    NomeNaTela('h1', 'Jogo do número secreto');
    NomeNaTela('p','Escolha o número entre 1 e 10');
}
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

    if(chute == numSecreto) {
        NomeNaTela('h1','PARABÉNS!');
        NomeNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');


    } else {
        if (chute > numSecreto ) {
            NomeNaTela('p', 'Dica: o número secreto é menor.');
        } else {
            NomeNaTela('p','Dica: o número secreto é maior.');
        }
        tentativas++;
        campoVazio();
    }
}

function numAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantElementLista = listaNumerosSorteados.length;

    if (quantElementLista == numLimite){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return numAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function campoVazio() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numSecreto = numAleatorio();
    campoVazio();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
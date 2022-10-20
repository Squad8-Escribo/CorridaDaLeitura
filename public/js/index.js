const gameScreen = document.getElementById('bg')
const playBt = document.getElementsByClassName('game-play');
const gameMenu = document.getElementById('game');
const logo = document.getElementById('logo');
const levels = document.getElementById('game-levels');
const fase = document.getElementsByClassName('fase');
const tutorial = document.getElementById('tutorial')

function limparTela(){
    gameMenu.style.display = "none";
    logo.style.display = "none";
}

function play() {
    limparTela()
    levelScreen()
}

function levelScreen(){
    gameScreen.style.backgroundImage = "url('public/img/backgroundTelaDeFase_Limpa.png')"
    levels.style.display = "flex";

    for(let i = 0; i<3; i++){
        fase[i].onclick = primeiraFase; //TODO: Implementar array de fases
    }
    
}

function exibeTutorial(){
    limparTela()
    tutorial.style.display = "flex";
}

function primeiraFase(){
    alert("Primeira fase em breve...")
}


const gameScreen = document.getElementById('bg')
const playBt = document.getElementsByClassName('game-play');
const gameMenu = document.getElementById('game');
const logo = document.getElementById('logo');
const levels = document.getElementById('game-levels');
const fase = document.getElementsByClassName('fase');

function play() {
    gameMenu.style.display = "none";
    logo.style.display = "none";
    levelScreen()
}

function levelScreen(){
    gameScreen.style.backgroundImage = "url('public/img/backgroundTelaDeFase.png')"
    levels.style.display = "flex";

    for(var i = 0; i<3; i++){
        fase[i].onclick = primeiraFase; //TODO: Implementar array de fases
    }
    
}

function primeiraFase(){
    alert("Primeira fase em breve...")
    fase.window.reload();
}


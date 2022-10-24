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
    gameScreen.style.backgroundImage = "url('public/img/background/backgroundCleanScreen.png')"
    levels.style.display = "flex";

    for(let i = 0; i<3; i++){
        fase[i].onclick = primeiraFase;        
        //TODO: Implementar array de fases
    }
    
}

function exibeTutorial(){
    limparTela()
    tutorial.style.display = "flex";
}

function primeiraFase(){
    limparTela()
    //pra ir pra a pagina play.html ela tem que estar rodando no live server!!
   window.location.href = "http://127.0.0.1:5500/play.html"
}


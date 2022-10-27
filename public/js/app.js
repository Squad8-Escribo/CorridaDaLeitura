const gameScreen = document.getElementById('game-screen')
const gameMenu = document.getElementById('game-menu');
const playBtn = document.getElementById('play-btn ');
const gameLogo = document.getElementById('game-logo');
const gameTutorial = document.getElementById('game-tutorial')
const gameLevels = document.getElementById('game-levels');
const level = document.getElementsByClassName('level');
const gamePlay = document.getElementById('game-play')

gamePlay.style.display = "none"

function cleanScreen(){
    gameMenu.style.display = "none";
    gameLogo.style.display = "none";
}

function playGame() {
    cleanScreen()
    levelScreen()
}

function levelScreen(){
    gameScreen.style.backgroundImage = "url('public/img/background/backgroundCleanScreen.png')"
    gameLevels.style.display = "flex";

    for(let i = 0; i<3; i++){
        level[i].onclick = firstLevel;        
        //TODO: Implementar array de fases
    }
    
}

function showTutorial(){
    cleanScreen()
    gameTutorial.style.display = "flex";
}

function firstLevel() {
    cleanScreen()
    gameLevels.style.display = "none";
    gamePlay.style.display = "flex";

}


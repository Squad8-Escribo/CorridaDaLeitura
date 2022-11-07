const gameScreen = document.getElementById('game-screen')
const gameMenu = document.getElementById('game-menu');
const playBtn = document.getElementById('play-btn ');
const gameLogo = document.getElementById('game-logo');
const gameTutorial = document.getElementById('game-tutorial')
const gameLevels = document.getElementById('game-levels');
const level = document.getElementsByClassName('level');
const gamePlay = document.getElementById('game-play');
const wordbox = document.getElementById('word-box');

function cleanPlay() {
    gamePlay.style.display = "none";
}

function cleanLevel() {
    gameLevels.style.display = "none";
}

function cleanScreen(){
    gameMenu.style.display = "none";
    gameLogo.style.display = "none";
}

function playGame() {
    cleanScreen();
    levelScreen();
}

function gamePlayScreen() {
    gamePlay.style.display="flex";
}

function levelScreen(){
    gameScreen.style.backgroundImage = "url('public/img/background/backgroundCleanScreen.png')"
    gameLevels.style.display = "flex";

    for(let i = 0; i<3; i++){
        level[0].onclick = firstLevel; 
        level[1].onclick = secondLevel;     
        level[2].onclick = thirdLevel;  
    }
}

function wordBox() {
    wordbox.style.display = "flex";
}

function showTutorial(){
    cleanScreen()
    gameTutorial.style.display = "flex";
}

function firstLevel() {
    cleanScreen();
    cleanLevel();
    gamePlayScreen();
    wordbox.classList.add('word-box__word');
}

function secondLevel() {
    cleanScreen();
    cleanLevel();
    gamePlayScreen();
    wordbox.classList.add('word-box__phrase');
}

function thirdLevel() {
    cleanScreen();
    cleanLevel();
    gamePlayScreen();
    wordbox.classList.add('word-box__text');
}




cleanPlay();

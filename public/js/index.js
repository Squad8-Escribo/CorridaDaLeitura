const playBt = document.getElementsByClassName('game-play');
const gameMenu = document.getElementById('game');
const logo = document.getElementById('logo');

function play() {
    gameMenu.style.display = "none";
    logo.style.display = "none";
    location.href = '../../play.html'
}

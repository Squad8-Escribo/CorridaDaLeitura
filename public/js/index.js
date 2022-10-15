const playBt = document.getElementsByClassName('game-play');
const gameMenu = document.getElementById('game');
const logo = document.getElementById('logo');
const voltar = document.getElementById('back');

function play() {
    gameMenu.style.display = "none";
    logo.style.display = "none";
  let btn = setInterval(() => {
        voltar.style.display = "flex";
        voltar.onclick = () => document.location.reload();
    }, 20);
}


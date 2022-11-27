const initialMusic = document.getElementById("initialMusic");
const musicToggle = document.getElementById("game-screen__cfgBtn");

initialMusic.volume = .05

function audioPause(){

    initialMusic.pause()

}

function audioPlay(){
    initialMusic.play()
}

musicToggle.onclick = audioPlay;




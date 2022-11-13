const gameScreen = document.getElementById('game-screen')
const gameMenu = document.getElementById('game-menu')
const playBtn = document.getElementById('play-btn ')
const gameLogo = document.getElementById('game-logo')
const gameTutorial = document.getElementById('game-tutorial')
const gameLevels = document.getElementById('game-levels')
const level = document.getElementsByClassName('level')
const gamePlay = document.getElementById('game-play')
const wordbox = document.getElementById('word-box')
const read = document.getElementById('read')
const result = document.getElementById('result')
const medal = document.getElementById('medal')
const mic = document.getElementById('mic')
const background = document.getElementById('background')
const sky = document.getElementById('sky')
const passBtn = document.getElementById('pass-btn')
const carApp = document.getElementById('car')
const gamePhase = document.getElementById('game-phase')
const phase1 = document.getElementById('phase-one')
const phase2 = document.getElementById('phase-two')
const phase3 = document.getElementById('phase-three')
const car1 = document.getElementById("car-phase1")
const car2 = document.getElementById("car-phase2")
const car3 = document.getElementById("car-phase3")
const carGame = document.getElementById("carGamer")


function cleanPlay() {
  gamePlay.style.display = 'none'
}

function cleanWordBox(x) {

  wordbox.style.display = 'none'

  if (x===1) {
    wordbox.classList.remove('word-box__congrats')
    wordbox.classList.remove('word-box__word')
    wordbox.classList.add('word-box__phrase')
  } else if (x===2) {
    wordbox.classList.remove('word-box__congrats')
    wordbox.classList.remove('word-box__phrase')
    wordbox.classList.add('word-box__text')
  }
}



function passLevelPhrase() {
  cleanWordBox(1)
  stopAnimation()
  showMic()
  removeGameOpacity()
}

function passLevelText() {
  cleanWordBox(2)
  stopAnimation()
  showWordBox()
  showMic()
  removeGameOpacity()
}

function showMic() {
  mic.style.display = 'flex'

}

function removeGameOpacity() {
  sky.classList.remove('sky-opacity')
  mic.classList.remove('mic-opacity')
  carApp.classList.remove('car-opacity')
  background.classList.remove('background-opacity')
}

function cleanResult() {
  result.style.display = 'none'
}

function showResult() {
  result.style.display = 'block'
  result.classList.add('result')
}
function cleanMedal() {
  medal.style.display = 'none'
}

function showCongrats() {
  backgroundOpacity()
  showResult()
  showTime()
  stopArtyon()
  showPassBtn()
}

function showTime() {
  result.innerHTML += `<h5>SEU TEMPO FOI DE <br> ${timeToString(
    elapsedTime
  )}</h5>`
}

function cleanPassBtn() {
  passBtn.style.display = 'none'
}

function cleanLevel() {
  gameLevels.style.display = 'none'
}

function cleanScreen() {
  gameMenu.style.display = 'none'
  gameLogo.style.display = 'none'
}

function readSize(a) {
  if (a == 1) {
    read.classList.add('read-word')
  } else if (a == 2) {
    read.classList.add('read-phrase')
  } else if (a == 3) {
    read.classList.add('read-text')
  }
}

function playGame() {
  cleanScreen()
  levelScreen()
}

// function backgroundOpacity () {
//     mic.classList.add('mic-opacity')
// }


function showPassBtn() {
  passBtn.style.display = 'flex'
  passBtn.classList.add('pass-btn')
}

function showGame() {
  gamePlayScreen()
}

function backgroundOpacity() {
  mic.style.display = 'none'
  car.classList.add('car-opacity')
  background.classList.add('background-opacity')
  sky.classList.add('sky-opacity')
}

function gamePlayScreen() {
  gamePlay.style.display = 'flex'
}
function medalSelect(a) {
  if (a == 1) {
    medal.classList.add('medal')
    medal.style.display='flex'
    medal.innerHTML = "  <img src='public/img/elements/diamond-medal.png'>"
  } else if (a == 2) {
    medal.style.display='flex'
    medal.innerHTML = "  <img src='public/img/elements/gold-medal.png'>"
  } else if (a == 3) {
    medal.innerHTML = "  <img src='public/img/elements/silver-medal.png'>"
  } else if (a == 4) {
    medal.innerHTML = "  <img src='public/img/elements/cooper-medal.png'>"
  }
}

function levelScreen() {
  gameScreen.style.backgroundImage =
    "url('public/img/background/backgroundCleanScreen.png')"
  gameLevels.style.display = 'flex'

  /* for (let i = 0; i < 3; i++) {
    level[0].onclick = firstLevel
    level[1].onclick = secondLevel
    level[2].onclick = thirdLevel
    level[3].onclick = fourthLevel
  } */
}

function phaseScreen() {
  gameScreen.style.background =  "url('public/img/background/backgroundCleanScreen.png')"

  for (let i = 0; i < 3; i++) {
    phase[0].onclick = phase    
  }
}

// implementar função wordbox
function wordBox(a) {
    if (a==1) {
       wordbox.classList.add('word-box__word')
   } else if (a==2) {
       wordbox.classList.add('word-box__phrase')
   } else if (a==3) {
       wordbox.classList.add('word-box__text')
   } else if (a==4) {
    wordbox.classList.add('word-box__congrats')
     wordbox.classList.remove('word-box__word')
     wordbox.classList.remove('word-box__text')
     wordbox.classList.add('word-box__congrats')
   }
}

function showTutorial() {
  cleanScreen()
  gameTutorial.style.display = 'flex'
}

function phaseScreen() {
  gamePhase.style.display = 'flex'
}

function showWordBox() {
  wordbox.style.display = 'flex'
}

function chooseLevel(level) {
  phase1.setAttribute("onclick", `choosePhase(0,${level});showGame(); wordBox(1)`)
  phase2.setAttribute("onclick", `randomLevel(${level});showGame(); wordBox(2)`)
  phase3.setAttribute("onclick", `choosePhase(4,${level});showGame(); wordBox(3)`)
}

function cleanPhase(){
  cleanScreen()
  cleanLevel()
  phaseScreen()
}
/* function firstLevel() {
  cleanScreen()
  cleanLevel()
  phaseScreen()
}
function secondLevel() {
  cleanScreen()
  cleanLevel()
  phaseScreen()
}

function thirdLevel() {
  cleanScreen()
  cleanLevel()
  phaseScreen()
}

function fourthLevel() {
  cleanScreen()
  cleanLevel()
  phaseScreen()
}
 */
function randomLevel(phase) {
  let randomPhrase = (Math.random() * 10 + 1).toFixed(0)
  while (randomPhrase > 3) {
    randomPhrase = (Math.random() * 10 + 1).toFixed(0)
  }
  choosePhase(randomPhrase, phase)
}

function selectCar(color){
  car1.setAttribute("src", `public/img/cars/car${color}.png`)
  car2.setAttribute("src", `public/img/cars/car${color}.png`)
  car3.setAttribute("src", `public/img/cars/car${color}.png`)
  carGame.setAttribute("src", `public/img/cars/car${color}.png`)
}

cleanPlay()

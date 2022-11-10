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

function cleanPlay() {
  gamePlay.style.display = 'none'
}

function cleanWordBox() {
  wordbox.style.display = 'none'
}

function passLevelPhrase() {
  wordbox.classList.remove('word-box__congrats')
  wordbox.classList.remove('word-box__word')
  wordbox.classList.add('word-box__phrase')
  wordbox.style.display = 'flex'
  mic.style.display = 'flex'
  background.classList.remove('background-opacity')
  mic.classList.remove('mic-opacity')
}

// function passLevelText() {
//   wordbox.classList.remove('word-box__phrase')
//   wordbox.
// }

function cleanResult() {
  result.style.display = 'none'
}

function cleanMedal() {
  medal.style.display = 'none'
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



function backgroundOpacity() {
  mic.classList.add('mic-opacity')
  car.classList.add('car-opacity')
  background.classList.add('background-opacity')
  sky.classList.add('sky-opacity')
}

function gamePlayScreen() {
  gamePlay.style.display = 'flex'
}

function medalSelect(a) {
  if (a == 1) {
    medal.innerHTML = "  <img src='public/img/elements/diamond-medal.png'>"
  } else if (a == 2) {
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

  for (let i = 0; i < 3; i++) {
    level[0].onclick = firstLevel
    level[1].onclick = secondLevel
    level[2].onclick = thirdLevel
  }
}

// implementar função wordbox
function wordBox() {
  // if ----
  wordbox.style.display = 'flex'

  // if (a==1) {
  //     wordbox.classList.add('word-box__word')
  // } else if (a=='phrase') {
  //     wordbox.classList.add('word-box__phrase')
  // } else if (a='text') {
  //     wordbox.classList.add('word-box__text')
  // } else if (a==4) {
  //     wordbox.classList.add('word-box__congrats')
  // }
}

function showTutorial() {
  cleanScreen()
  gameTutorial.style.display = 'flex'
}

function firstLevel() {
  cleanScreen()
  cleanLevel()
  gamePlayScreen()
  wordbox.classList.add('word-box__word')
}

function secondLevel() {
  cleanScreen()
  cleanLevel()
  gamePlayScreen()
  wordbox.classList.add('word-box__phrase')
}

function thirdLevel() {
  cleanScreen()
  cleanLevel()
  gamePlayScreen()
  wordbox.classList.add('word-box__text')
}

function randomLevel(phase) {
  let randomPhrase = (Math.random() * 10 + 1).toFixed(0)
  while (randomPhrase > 3) {
    randomPhrase = (Math.random() * 10 + 1).toFixed(0)
  }
  choosePhase(randomPhrase, phase)
}

cleanPlay()

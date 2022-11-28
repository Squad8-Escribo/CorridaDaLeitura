// Game Scn
if (

  window.screen.orientation.type == "landscape-primary" &&
  window.screen.width < 690

) {

  window.alert("Infelizmente o seu dispositivo é incompatível com o jogo D:");

}else if (window.screen.width < 690) {

  window.alert("Por favor, gire a tela para jogar!");

}

const gameScreen = document.getElementById("game-screen");
const levelsBackBtn = document.getElementById("levels-backBtn");
const phaseBackBtn = document.getElementById("phase-backBtn");
const tutorialBackBtn = document.getElementById("tutorial-backBtn");
const newLevel = document.getElementById("new-level");

function cleanGameScn() {
  gameScreen.style.background = "none";
}

function setGameScn(screen) {
  // menu scn & finish scn
  if (screen == 1) {
    gameScreen.style.background =
      "url(public/img/background/backgroundMain.png)";
    gameScreen.style.backgroundSize = "cover";
    gameScreen.style.backgroundRepeat = "no-repeat";
  } else if (screen == 2) {
    // levels scn & phase scn
    gameScreen.style.backgroundImage =
      "url('public/img/background/backgroundCleanScreen.png')";
    gameScreen.style.backgroundSize = "cover";
    gameScreen.style.backgroundRepeat = "no-repeat";
  }
}


function backBtn(screen) {
  if (screen === 1) {
    tutorialBackBtn.setAttribute(
      "onclick",
      `cleanTutorialScn();
       showMenuScn();
       btnAudio.play()`
    );
  } else if (screen === 2) {
    levelsBackBtn.setAttribute(
      "onclick",
      `cleanLevelScn();
       showMenuScn();
       btnAudio.play()`
    );
  } else if (screen == 3) {
    phaseBackBtn.setAttribute(
      "onclick",
      `cleanPhaseScn();
       showLevelScn();
       btnAudio.play()`
    );
  }
}

// Menu Scn
const gameMenu = document.getElementById("game-menu");
const playBtn = document.getElementById("play-btn");
const gameLogo = document.getElementById("game-logo");

function cleanMenuScn() {
  gameMenu.style.display = "none";
  gameLogo.style.display = "none";
}

function showMenuScn() {
  setGameScn(1);
  gameMenu.style.display = "flex";
  gameLogo.style.display = "flex";
}

function setPlayBtn() {
  playBtn.onclick = showLevelScn;
}

// Tutorial Scn
const gameTutorial = document.getElementById("game-tutorial");
const tutorialBtn = document.getElementById("tutorial-btn");

function showTutorialScn() {
  cleanMenuScn();
  gameTutorial.style.display = "flex";
}

function cleanTutorialScn() {
  showMenuScn();
  gameTutorial.style.display = "none";
}

function setTutorialBtn() {
  tutorialBtn.onclick = showTutorialScn;
}

backBtn(1);
setTutorialBtn();

// Levels Scn
const gameLevels = document.getElementById("game-levels");
const level = document.getElementsByClassName("level");

function showLevelScn() {
  cleanMenuScn();
  setLevelScn();
}

backBtn(2);

function cleanLevelScn() {
  gameLevels.style.display = "none";
}

function setLevelScn() {
  setGameScn(2);
  gameLevels.style.display = "flex";
}

// set a single color for the cars in each level
function selectCar(color) {
  car1.setAttribute("src", `public/img/cars/car${color}.png`);
  car2.setAttribute("src", `public/img/cars/car${color}.png`);
  car3.setAttribute("src", `public/img/cars/car${color}.png`);
  carGame.setAttribute("src", `public/img/cars/car${color}.png`);
}

// Phase Scn
const gamePhase = document.getElementById("game-phase");
const phase1 = document.getElementById("phase-one");
const phase2 = document.getElementById("phase-two");
const phase3 = document.getElementById("phase-three");
const car1 = document.getElementById("car-phase1");
const car2 = document.getElementById("car-phase2");
const car3 = document.getElementById("car-phase3");
const carGame = document.getElementById("carGamer");

backBtn(3);

function cleanPhaseScn() {
  gamePhase.style.display = "none";
}

function showPhaseScn() {
  cleanLevelScn();
  gamePhase.style.display = "flex";
}

// content size
function setReadSize(a) {
  if (a === 1) {
    read.classList.remove("read-endGame");
    read.classList.remove("read-box");
    read.classList.remove("read-word");
    read.classList.remove("read-text");
    read.classList.add("read-word");
  } else if (a === 2) {
    read.classList.remove("read-endGame");
    read.classList.remove("read-box");
    read.classList.remove("read-box");
    read.classList.remove("read-word");
    read.classList.add("read-box");
  } else if (a === 3) {
    read.classList.remove("read-endGame");
    read.classList.remove("read-text");
    read.classList.remove("read-word");
    read.classList.remove("read-box");
    read.classList.add("read-text");
  } else if (a === 4) {
    read.classList.remove("read-text");
    read.classList.remove("read-word");
    read.classList.remove("read-box");
    read.classList.remove("read-text");
    read.classList.add("read-endGame");
  }
}

// Main Function

const showFinishScn = (phase, level) => {
  if (level >= 4) {
    setGameScn(1);
    background.style.display = "none";
    sky.style.display = "none";
    passBtn.style.display = "none";
    carGame.style.display = "none";
    cleanPassBtn();
    cleanCar();
    cleanMicBtn();
    cleanLevel();
    cleanRead();
    showWordBox();
    wordBox(5);
    showRead();
    setReadSize(4);
    read.innerHTML = "<h1>PARABÉNS!</h1>  Você conseguiu finalizar o jogo!";
    showHomeBtn();
    homeBtn.classList.add("home-btn-endGame");
  } else {
    choosePhase(phase, level);
  }
};

/* const showBoxLevel=(phase,level)=>{
  newLevel.innerHTML=`<h2>Level ${(level+1)}</h2>Fase ${(phase+1)}`
} */

const choosePhase = async (phase, level) => {

  //Show box level

  newLevel.style.display="flex"
  if(phase==0){
    newLevel.innerHTML=`<h2>Level ${(level+1)}</h2>Fase ${(phase+1)}`
  }else if(phase==4){
    newLevel.innerHTML=`<h2>Level ${(level+1)}</h2>Fase 3`
  }else{
    newLevel.innerHTML=`<h2>Level ${(level+1)}</h2>Fase 2`
  }

 /*  showBoxLevel(phase,level) */

  //Get phases for json

  read.innerHTML = "";
  const response = await fetch("fases.json");
  const data = await response.json();
  var phaseName = Object.keys(data[level][phase]);
  var phaseName = phaseName[0];
  var arrayText = data[level][phase][phaseName];

  //if chosse word, one by one

  if (phaseName == "palavras") {
    cleanPassBtn();
    setReadSize(1);
    var hits = 0;
    var numberWord = 0;
    var wordNot1 = 100;
    var wordNot2 = 100;

    //System randomazing word

    let randomWord = (Math.random() * 10).toFixed(0);
    while (randomWord > 5) {
      randomWord = (Math.random() * 10).toFixed(0);
    }
    read.innerHTML = arrayText[randomWord];

    //API array string transforming

    artyom.redirectRecognizedTextOutput(function (text, isFinal) {
      if (isFinal) {
        var arrayWord = Artyom.prototype.splitStringByChunks(text, 1);
        console.log(
          arrayWord[0]
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "") +
            "<-recebe|json->" +
            arrayText[randomWord].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        ); //Debug

        //Correction system

        if (
          arrayWord[0]
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "") ==
          arrayText[randomWord].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        ) {
          hits++;
        }

        //Do not repeat words

        if (wordNot1 == 100) {
          wordNot1 = randomWord;
        } else if (wordNot2 == 100) {
          wordNot2 = randomWord;
        }
        randomWord = (Math.random() * 10).toFixed(0);
        while (
          randomWord > 5 ||
          wordNot1 == randomWord ||
          wordNot2 == randomWord
        ) {
          randomWord = (Math.random() * 10).toFixed(0);
        }
        read.innerHTML = arrayText[randomWord];
        numberWord++;

        // set pass btn to each phase

        //Congratulations screen

        if (numberWord == 3) {
          pause();
          cleanRead();
          if (hits == 3) {
            medalSelect(1);
          } else if (hits == 2) {
            medalSelect(2);
          } else if (hits == 1) {
            medalSelect(3);
          } else if (hits == 0) {
            medalSelect(4);
          }
          showAnimation();
          setPassBtn(1);
        }
      }
    });

    //other cases(Pharse or text)
  } else {
    //Box size and pass button

    cleanPassBtn();
    if (phaseName == "texto") {
      cleanPassBtn();
      setReadSize(3);
      setPassBtn(2);
    } else {
      cleanPassBtn();
      setReadSize(2);
      setPassBtn(3);
    }

    //Show text

    for (var i = 0; i < arrayText.length; i++) {
      read.innerHTML += arrayText[i];
    }
    var arrayWord = [];
    var finish = false;
    var finishLast = false;
    var finishPenultimate = false;
    var finishNumber = false;

    //API array string transforming

    artyom.redirectRecognizedTextOutput(function (text, isFinal) {
      if (isFinal) {
        var hits = 0;
        arrayTemporary = Artyom.prototype.splitStringByChunks(text, 1);

        //System to terminate the API

        if (arrayTemporary.length < arrayText.length) {
          finishLast =
            arrayTemporary[arrayTemporary.length] ===
              arrayText[arrayTemporary.length] ||
            arrayTemporary[arrayTemporary.length - 1] ===
              arrayText[arrayTemporary.length];

          finishPenultimate =
            arrayTemporary[arrayTemporary.length - 1] ===
            arrayText[arrayTemporary.length - 1];
        } else {
          finishNumber = true;
        }

        //First correction system

        if (finishLast || finishPenultimate || finishNumber) {
          for (var i = 0; i < arrayText.length; i++) {
            console.log(
              arrayTemporary[i]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") +
                "<-recebe|json->" +
                arrayText[i]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "")
            ); //Debug
            if (
              arrayTemporary[i]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") ==
              arrayText[i]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "")
            ) {
              hits++;
            }
          }
          if (arrayTemporary.length > arrayText.length) {
            hits = hits - arrayText.length / 5;
          }
          finish = true;

          //Final correction system
        } else {
          arrayWord = arrayWord.concat(arrayTemporary);
          if (arrayWord.length < arrayText.length) {
            finishLast =
              arrayWord[arrayWord.length]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") ===
                arrayText[arrayWord.length]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "") ||
              arrayWord[arrayWord.length - 1]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") ===
                arrayText[arrayWord.length]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "");

            finishPenultimate =
              arrayWord[arrayWord.length - 1]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") ===
              arrayText[arrayTemporary.length - 1]
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "");
          } else {
            finishNumber = true;
          }
          if (finishLast || finishPenultimate || finishNumber) {
            for (var i = 0; i < arrayText.length; i++) {
              console.log(
                arrayWord[i]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "") +
                  "<-recebe|json->" +
                  arrayText[i]
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9 ]/g, "")
              ); //Debug
              if (
                arrayWord[i]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "") ==
                arrayText[i]
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "")
              ) {
                hits++;
              }
            }
            if (arrayWord.length > arrayText.length) {
              hits = hits - arrayText.length / 5;
            }
            finish = true;
          }
        }
      }

      //Congratulations screen

      if (finish) {
        pause();
        cleanRead();
        if (hits >= arrayText.length * 0.9) {
          medalSelect(1);
        } else if (hits >= arrayText.length * 0.7) {
          medalSelect(2);
        } else if (hits >= arrayText.length * 0.5) {
          medalSelect(3);
        } else {
          medalSelect(4);
        }
        showAnimation();
      }
    });
  }
  // set passBtn
  function setPassBtn(phase) {
    if (phase == 1) {
      passBtn.setAttribute(
        "onclick",
        `randomLevel(${level});
         reset();
         cleanResult();
         cleanMedal();
         passBtnWord();
         showCar();
         btnAudio.play()`
      );
    } else if (phase == 2) {
      passBtn.setAttribute(
        "onclick",
        `passBtnText(${level});
         reset();
         cleanResult();
         cleanMedal();
         setReadSize(1);
         showCar();
         btnAudio.play();
         showFinishScn(0,${
          level + 1
        })`
      );
    } else if (phase == 3) {
      passBtn.setAttribute(
        "onclick",
        `choosePhase(4,${level});
         reset();
         cleanResult();
         cleanMedal();
         passBtnPhrase();
         setReadSize(2);
         showCar();
         btnAudio.play()`
      );
    }
  }
};

//Stopwatch codes

// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  //document.getElementById("stopwatch").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
}

//Artyom codes

var artyom = new Artyom();

artyom.addCommands([
  //precisa de um comando
  {
    descripition: "Lendo zebra",
    indexes: ["Zebra"],
    action: function (i) {
      if (i == 0) {
        h3.innerHTML = `Acertou`;
      }
    },
  },
]);

function startArtyom() {
  artyom.initialize({
    lang: "pt-BR",
    continuous: false, // Listen forever, dps de um comando ele continua ouvindo
    soundex: false, // Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
    listen: true, // Start to listen commands !
  });
}

function stopArtyom() {
  artyom.fatality();
}

// randomize the phrases
function randomLevel(phase) {
  let randomPhrase = (Math.random() * 10 + 1).toFixed(0);
  while (randomPhrase > 3) {
    randomPhrase = (Math.random() * 10 + 1).toFixed(0);
  }
  choosePhase(randomPhrase, phase);
}

// set the phase btns
function chooseLevel(level) {
  phase1.setAttribute(
    "onclick",
    `choosePhase(0,${level});
     showPlayScn(); 
     wordBox(1)`
  );
  phase2.setAttribute(
    "onclick",
    `randomLevel(${level});
     showPlayScn(); wordBox(2)`
  );
  phase3.setAttribute(
    "onclick",
    `choosePhase(4,${level});
     showPlayScn(); 
     wordBox(3)`
  );
}

// Play Scn
const carApp = document.getElementById("car");
const gamePlay = document.getElementById("game-play");

function cleanLevel() {
  newLevel.style.display = "none";
}

function cleanCar() {
  car.style.display = "none";
  carApp.style.display = "none";
}

function showCar() {
  carApp.style.display = "flex";
  carGame.style.display = "flex";
}

function cleanPlayScn() {
  gamePlay.style.display = "none";
}

function showPlayScn() {
  gamePlay.style.display = "flex";
  cleanGameScn();
  showBackground();
  showSky();
  showCar();
  cleanPhaseScn();
  showMicBtn();
}
const wordbox = document.getElementById("word-box");

function showWordBox() {
  wordbox.style.display = "flex";
}

function setWordBox() {
  setTimeout(showWordBox, 1000);
}

// used in pass btn to defines word box after pass to the next phase
function cleanWordBox(x) {
  wordbox.style.display = "none";

  if (x === 1) {
    wordbox.style.display = "none";
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__word");
    wordbox.classList.add("word-box__phrase");
  } else if (x === 2) {
    wordbox.style.display = "none";
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__text");
  } else if (x === 3) {
    wordbox.style.display = "none";
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__word");
  } else if (x == 4) {
    wordbox.classList.remove("word-box__congrats");
  }
}

// defines wordbox size for phase onclick
function wordBox(a) {
  if (a == 1) {
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__word");
  } else if (a == 2) {
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__phrase");
  } else if (a == 3) {
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__text");
  } else if (a == 4) {
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__congrats");
  } else if (a == 5) {
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.add("word-box__endGame");
  }
}

const background = document.getElementById("background");

function showBackground() {
  background.style.display = "flex";
}

const read = document.getElementById("read");

function showRead() {
  read.style.display = "inline";
}
function cleanRead() {
  read.style.display = "none";
}
const sky = document.getElementById("sky");

function showSky() {
  sky.style.display = "flex";
}

const micBtn = document.getElementById("mic-btn");

function showMicBtn(x) {
  if (x !== 3) {
    micBtn.style.display = "flex";
  }
}

function cleanMicBtn() {
  micBtn.style.display = "none";
}

const restarBtn = document.getElementById("restart-btn");

function showRestartBtn() {
  restarBtn.style.display = "flex";
}

function cleanRestartBtn() {
  restarBtn.style.display = "none";
}

// Congrats Scn
const result = document.getElementById("result");

function cleanResult() {
  result.style.display = "none";
}

function showResult() {
  result.style.display = "block";
  result.classList.add("result");
}

const medal = document.getElementById("medal");

function showMedal() {
  medal.classList.add("medal");
  medal.style.display = "flex";
}

function cleanMedal() {
  medal.style.display = "none";
}

// define the medal rank
function medalSelect(rank) {
  if (rank == 1) {
    medal.innerHTML = "  <img src='public/img/elements/diamond-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE DIAMANTE!</h5>";
  } else if (rank == 2) {
    medal.innerHTML = "  <img src='public/img/elements/gold-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE OURO!</h5>";
  } else if (rank == 3) {
    medal.innerHTML = "  <img src='public/img/elements/silver-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE PRATA!</h5>";
  } else if (rank == 4) {
    medal.innerHTML = "  <img src='public/img/elements/cooper-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE BRONZE!</h5>";
  }
}

// show the time of speak
function showTime() {
  result.innerHTML += `<h5>SEU TEMPO FOI DE <br> ${timeToString(
    elapsedTime
  )}</h5>`;
}

const passBtn = document.getElementById("pass-btn");

function showPassBtn() {
  passBtn.style.display = "flex";
}

function cleanPassBtn() {
  passBtn.style.display = "none";
}
// add opacity to gameplay
function setOpacity() {
  micBtn.style.display = "none";
  carApp.classList.add("car-opacity");
  background.classList.add("background-opacity");
  sky.classList.add("sky-opacity");
}

// remove game opacity
function cleanOpacity() {
  sky.classList.remove("sky-opacity");
  micBtn.classList.remove("mic-opacity");
  carApp.classList.remove("car-opacity");
  background.classList.remove("background-opacity");
}

// set the pass btn for word phase
function passBtnWord() {
  cleanWordBox(1);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn();
}

// set the pass btn for phrase phase
function passBtnPhrase() {
  cleanWordBox(2);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn();
}

// set the pass btn for text phase
function passBtnText(x) {
  cleanWordBox(3);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn(x);
  showCar();
}

const homeBtn = document.getElementById("home-btn");

function showHomeBtn() {
  homeBtn.style.display = "flex";
}

function cleanHomeBtn() {
  homeBtn.style.display = "none";
}

function setHomeBtn() {
  showHomeBtn();
  homeBtn.classList.remove("home-btn-endGame");
  homeBtn.classList.add("home-btn");
  homeBtn.setAttribute(
    "onclick",
    `showMenuScn();
     cleanPlayScn();
     cleanPhaseScn();
     cleanHomeBtn();
     cleanWordBox(4);
     cleanMedal();
     cleanResult();
     cleanOpacity();
     btnAudio.play()`
  );
}

function cleanBackground() {
  gameLevels.style.display = "none";
  gamePhase.style.display = "none";
}

// show the congratulations screen
function showCongratulations() {
  stopArtyom();
  stopAnimation();
  cleanPhaseScn();
  cleanLevelScn();
  cleanBackground();
  cleanCar();
  setOpacity();
  showWordBox();
  wordBox(4);
  showMedal();
  showHomeBtn();
  setHomeBtn();
  showResult();
  showTime();
  showPassBtn();
  cleanGameScn()
}

// Animations
const car = document.getElementById("car");
const gameBackground = document.getElementById("background");
const obstacle = document.getElementById("obstacle");

function raceAnimation() {
  gameBackground.classList.add("raceAnimation");
}

function carAnimation() {
  car.classList.add("carSuspension");
}

//show animation after complete phase
function showAnimation() {
  stopArtyom();
  wordbox.style.display = "none";
  car.classList.remove("carSuspension");
  car.classList.add("carJump");
  obstacle.classList.add("obstacleMove");

  setTimeout(showCongratulations, 3000);
}

function animationGame() {
  raceAnimation();
  carAnimation();
}

// stop all game animations
function stopAnimation() {
  gameBackground.classList.remove("raceAnimation");
  car.classList.remove("carSuspension");
  carApp.classList.remove("carJump");
  obstacle.classList.remove("obstacleMove");
}

// Music

const initialMusic = document.getElementById("initialMusic");
const musicToggle = document.getElementById("game-screen__cfgBtn");
const btnAudio = new Audio();

btnAudio.src = "public//sound/btnAudio.mp3";

initialMusic.volume = 0.05;

function audioPause() {
  initialMusic.pause();
}

function audioPlay() {
  initialMusic.play();
}

musicToggle.onclick = audioPlay;

setPlayBtn();

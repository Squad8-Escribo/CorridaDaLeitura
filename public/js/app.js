if (window.hasOwnProperty('webkitSpeechRecognition')) {
  console.log("webkitSpeechRecognition")

  // your code that requires artyom.
}

if (window.hasOwnProperty('speechSynthesis')) {
  console.log("speechSynthesis")

  // your code that requires artyom.
}

// Game Scn
const gameScreen = document.getElementById("game-screen");

// Menu Scn
const gameMenu = document.getElementById("game-menu");
const playBtn = document.getElementById("play-btn");
const gameLogo = document.getElementById("game-logo");

function cleanMenuScn() {
  gameMenu.style.display = "none";
  gameLogo.style.display = "none";
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

function setTutorialBtn() {
  tutorialBtn.onclick = showTutorialScn;
}

setTutorialBtn();

// Levels Scn
const gameLevels = document.getElementById("game-levels");
const level = document.getElementsByClassName("level");

function showLevelScn() {
  cleanMenuScn();
  setLevelScn();
}

function cleanLevelScn() {
  gameLevels.style.display = "none";
}

function setLevelScn() {
  gameScreen.style.backgroundImage =
    "url('public/img/background/backgroundCleanScreen.png')";
  gameLevels.style.display = "flex";
}

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

function cleanPhaseScn() {
  gamePhase.style.display = "none";
}

function showPhaseScn() {
  cleanLevelScn();
  gamePhase.style.display = "flex";
}

function setReadSize(a) {
  if (a === 1) {
    read.classList.remove("read-text");
    read.classList.add("read-box");
  } else if (a === 2) {
    read.classList.remove("read-word");
    read.classList.add("read-box");
  } else if (a === 3) {
    read.classList.remove("read-box");
    read.classList.add("read-text");
  }
}

// Main Function
const choosePhase = async (phase, level) => {
  //Get phases for json

  read.innerHTML = "";
  const response = await fetch("fases.json");
  const data = await response.json();
  var phaseName = Object.keys(data[level][phase]);
  var phaseName = phaseName[0];
  var arrayText = data[level][phase][phaseName];

  //level passing system

  /* if (phase >= data[level].length) {
    level++
    phase = 0
  }
  if (level >= data.length) {
    alert('Parabéns Você terminou o jogo')
  }
 */

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
          showCongratulations();
          passBtn.setAttribute(
            "onclick",
            `randomLevel(${level});reset();cleanResult();cleanMedal();passBtnWord()`
          );
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
      passBtn.setAttribute(
        "onclick",
        `choosePhase(0,${
          level + 1
        });reset();cleanResult();cleanMedal();passBtnText();setReadSize(1)`
      );
    } else {
      cleanPassBtn();
      setReadSize(2);
      passBtn.setAttribute(
        "onclick",
        `choosePhase(4,${level});reset();cleanResult();cleanMedal();passBtnPhrase();setReadSize(2)`
      );
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
        showCongratulations();
      }
    });
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

function randomLevel(phase) {
  let randomPhrase = (Math.random() * 10 + 1).toFixed(0);
  while (randomPhrase > 3) {
    randomPhrase = (Math.random() * 10 + 1).toFixed(0);
  }
  choosePhase(randomPhrase, phase);
}

function chooseLevel(level) {
  phase1.setAttribute(
    "onclick",
    `choosePhase(0,${level});showPlayScn(); wordBox(1)`
  );
  phase2.setAttribute(
    "onclick",
    `randomLevel(${level});showPlayScn(); wordBox(2)`
  );
  phase3.setAttribute(
    "onclick",
    `choosePhase(4,${level});showPlayScn(); wordBox(3)`
  );
}

// Play Scn
const carApp = document.getElementById("car");
const gamePlay = document.getElementById("game-play");

function cleanPlayScn() {
  gamePlay.style.display = "none";
}

function showPlayScn() {
  gamePlay.style.display = "flex";
}
const wordbox = document.getElementById("word-box");

function showWordBox() {
  wordbox.style.display = "flex";
}

function cleanWordBox(x) {
  wordbox.style.display = "none";

  if (x === 1) {
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__word");
    wordbox.classList.add("word-box__phrase");
  } else if (x === 2) {
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__phrase");
    wordbox.classList.add("word-box__text");
  } else if (x === 3) {
    wordbox.classList.remove("word-box__congrats");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.add("word-box__word");
  }
}

function wordBox(a) {
  if (a == 1) {
    wordbox.classList.add("word-box__word");
  } else if (a == 2) {
    wordbox.classList.add("word-box__phrase");
  } else if (a == 3) {
    wordbox.classList.add("word-box__text");
  } else if (a == 4) {
    wordbox.classList.add("word-box__congrats");
    wordbox.classList.remove("word-box__word");
    wordbox.classList.remove("word-box__text");
    wordbox.classList.add("word-box__congrats");
  }
}

const background = document.getElementById("background");
const read = document.getElementById("read");

function showRead() {
  read.style.display = "inline";
}
function cleanRead() {
  read.style.display = "none";
}
const sky = document.getElementById("sky");

const micBtn = document.getElementById("mic-btn");

function showMicBtn() {
  micBtn.style.display = "flex";
}

function cleanMicBtn() {
  micBtn.style.display = "none";
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

function medalSelect(a) {
  if (a == 1) {
    medal.innerHTML = "  <img src='public/img/elements/diamond-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE DIAMANTE!</h5>";
  } else if (a == 2) {
    medal.innerHTML = "  <img src='public/img/elements/gold-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE OURO!</h5>";
  } else if (a == 3) {
    medal.innerHTML = "  <img src='public/img/elements/silver-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE PRATA!</h5>";
  } else if (a == 4) {
    medal.innerHTML = "  <img src='public/img/elements/cooper-medal.png'>";
    result.innerHTML =
      "<h1>PARABÉNS!</h1> <h5>VOCÊ CONSEGUIU A <br> MEDALHA DE BRONZE!</h5>";
  }
}

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

function cleanOpacity() {
  sky.classList.remove("sky-opacity");
  micBtn.classList.remove("mic-opacity");
  carApp.classList.remove("car-opacity");
  background.classList.remove("background-opacity");
}

function passBtnWord() {
  cleanWordBox(1);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn();
}

function passBtnPhrase() {
  cleanWordBox(3);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn();
}

function passBtnText() {
  cleanWordBox(2);
  cleanHomeBtn();
  cleanOpacity();
  stopAnimation();
  showRead();
  showMicBtn();
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
  homeBtn.classList.add("home-btn");
}

function cleanBackground() {
  gameScreen.style.background = "none";
  gameLevels.style.display = "none";
  gamePhase.style.display = "none";
}

function setOpacity() {
  micBtn.style.display = "none";
  carApp.classList.add("car-opacity");
  background.classList.add("background-opacity");
  sky.classList.add("sky-opacity");
}

function showCongratulations() {
  cleanBackground();
  setOpacity();
  setHomeBtn();
  showMedal();
  showResult();
  showTime();
  showPassBtn();
  wordBox(4);
  stopArtyom();
}

// Animations
const car = document.getElementById("car");
const gameBackground = document.getElementById("background");

function raceAnimation() {
  gameBackground.classList.add("raceAnimation");
}
function animationGame() {
  raceAnimation();
  carAnimation();
}

function stopAnimation() {
  gameBackground.classList.remove("raceAnimation");
  car.classList.remove("carSuspension");
}

function carAnimation() {
  car.classList.add("carSuspension");
}

setPlayBtn();

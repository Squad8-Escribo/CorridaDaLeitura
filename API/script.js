//Menus codes

/* const buttonsLevel= async()=>{
    
    const response = await fetch("fases.json");
    const data = await response.json();
    buttons.innerHTML="";
    read.innerHTML="";
    result.innerHTML="";
    for(let i=0;i<data.length;i++){
        buttons.innerHTML+=`<input type="button" onclick="chooseLevel(${i})" value="Level ${i+1}"><br>`;
    }
}


const chooseLevel =  async(level) => {
    const response = await fetch("fases.json");
    const data = await response.json();
    read.innerHTML="";
    buttons.innerHTML="";
    for(let i=0;i<data[level].length;i++){
        buttons.innerHTML+=`<input type="button" onclick="choosePhase(${i},${level})" value="${Object.keys(data[level][i])}"/><br>`;
    }
  };
 */

//Game codes

//Text appear if click button "start"
/* const appearText=async(phase,level)=>{
    const response = await fetch("API/fases.json");
    const data = await response.json();
    var phaseName=Object.keys(data[level][phase]);
    var phaseName=phaseName[0]
    const arrayText=(data[level][phase][phaseName]);
    for(var i=0;i<arrayText.length;i++){
        read.innerHTML+=arrayText[i];
    }
} */

const choosePhase = async (phase, level) => {
  
  //Get phases for json

  read.innerHTML = ''
  const response = await fetch('API/fases.json')
  const data = await response.json()
  var phaseName = Object.keys(data[level][phase])
  var phaseName = phaseName[0]
  var arrayText = data[level][phase][phaseName]

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

  if (phaseName == 'palavras') {
    cleanPassBtn()
    setReadSize(1)
    var hits = 0
    var numberWord = 0
    var wordNot1=100
    var wordNot2=100

    //System randomazing word

    let randomWord = (Math.random() * 10).toFixed(0)
      while (randomWord > 5) {
        randomWord = (Math.random() * 10).toFixed(0)
      }
    read.innerHTML = arrayText[randomWord]

    //API array string transforming

    artyom.redirectRecognizedTextOutput(function (text, isFinal) {
      if (isFinal) {
        var arrayWord = Artyom.prototype.splitStringByChunks(text, 1)
        console.log(
          arrayWord[0].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') +
            '<-recebe|json->' +
            arrayText[randomWord].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
        )//Debug

        //Correction system

        if (
          arrayWord[0].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') ==
          arrayText[randomWord].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
        ) {
          hits++
        }

        //Do not repeat words

        if(wordNot1==100){
          wordNot1=randomWord;
        }else if(wordNot2==100){
          wordNot2=randomWord;
        }
        randomWord = (Math.random() * 10).toFixed(0)
        while (randomWord > 5 || wordNot1==randomWord || wordNot2==randomWord) {
          randomWord = (Math.random() * 10).toFixed(0)
        }
        read.innerHTML = arrayText[randomWord]
        numberWord++

        //Congratulations screen

        if (numberWord == 3) {
          pause()
          cleanRead() 
          if (hits == 3) {
            medalSelect(1)
          } else if (hits == 2) {
            medalSelect(2)
          } else if (hits == 1) {
            medalSelect(3)
          } else if (hits == 0) {
            medalSelect(4)          
          }
          showCongratulations()
          passBtn.setAttribute("onclick", `randomLevel(${level});reset();cleanResult();cleanMedal();passLevelPhrase()`)
        } 
      }
    })

  //other cases(Pharse or text)

  } else {

    //Box size and pass button

    cleanPassBtn()
    if (phaseName == 'texto') {
      cleanPassBtn()
      setReadSize(3)
      passBtn.setAttribute("onclick", `choosePhase(0,${level+1});reset();cleanResult();cleanMedal();passLevelWord();setReadSize(1)`)
      
    } else {
      cleanPassBtn()
      setReadSize(2)
      passBtn.setAttribute("onclick", `choosePhase(4,${level});reset();cleanResult();cleanMedal();passLevelText();setReadSize(2)`)
    }

    //Show text

    for (var i = 0; i < arrayText.length; i++) {
      read.innerHTML += arrayText[i]
    }
    var arrayWord = []
    var finish = false
    var finishLast = false
    var finishPenultimate = false
    var finishNumber = false

    //API array string transforming

    artyom.redirectRecognizedTextOutput(function (text, isFinal) {
      if (isFinal) {
        var hits = 0
        arrayTemporary = Artyom.prototype.splitStringByChunks(text, 1)

        //System to terminate the API

        if (arrayTemporary.length < arrayText.length) {
          finishLast =
            arrayTemporary[arrayTemporary.length] ===
              arrayText[arrayTemporary.length] ||
            arrayTemporary[arrayTemporary.length - 1] ===
              arrayText[arrayTemporary.length]
          
          finishPenultimate =
            arrayTemporary[arrayTemporary.length - 1] ===
            arrayText[arrayTemporary.length - 1]
        } else {
          finishNumber = true
        }

        //First correction system

        if (finishLast || finishPenultimate || finishNumber) {
          for (var i = 0; i < arrayText.length; i++) {
            console.log(
              arrayTemporary[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') +
                '<-recebe|json->' +
                arrayText[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
            )//Debug
            if (
              arrayTemporary[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') ==
              arrayText[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
            ) {
              hits++
            }
          }
          if (arrayTemporary.length > arrayText.length) {
            hits = hits - arrayText.length / 5
          }
          finish = true

        //Final correction system

        } else {
          arrayWord = arrayWord.concat(arrayTemporary)
          if (arrayWord.length < arrayText.length) {
            finishLast =
              arrayWord[arrayWord.length].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') === arrayText[arrayWord.length].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') ||
              arrayWord[arrayWord.length - 1].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') === arrayText[arrayWord.length].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
            
            finishPenultimate =
              arrayWord[arrayWord.length - 1].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') ===
              arrayText[arrayTemporary.length - 1].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
          } else {
            finishNumber = true
          }
          if (finishLast || finishPenultimate || finishNumber) {
            for (var i = 0; i < arrayText.length; i++) {
              console.log(
                arrayWord[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') +
                  '<-recebe|json->' +
                  arrayText[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
              )//Debug
              if (
                arrayWord[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') ==
                arrayText[i].trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
              ) {
                hits++
              }
            }
            if (arrayWord.length > arrayText.length) {
              hits = hits - arrayText.length / 5
            }
            finish = true
          }
        }
      }

      //Congratulations screen

      if (finish) {
        pause()
        cleanRead() 
        if (hits >= arrayText.length * 0.9) {
          medalSelect(1)
        } else if (hits >= arrayText.length * 0.7) {
          medalSelect(2)
        } else if (hits >= arrayText.length * 0.5) {
          medalSelect(3)
        } else {
          medalSelect(4)
        }
        showCongratulations()
      }
    })
  }
}

//Stopwatch codes

// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000
  let hh = Math.floor(diffInHrs)

  let diffInMin = (diffInHrs - hh) * 60
  let mm = Math.floor(diffInMin)

  let diffInSec = (diffInMin - mm) * 60
  let ss = Math.floor(diffInSec)

  let diffInMs = (diffInSec - ss) * 100
  let ms = Math.floor(diffInMs)

  let formattedMM = mm.toString().padStart(2, '0')
  let formattedSS = ss.toString().padStart(2, '0')
  let formattedMS = ms.toString().padStart(2, '0')

  return `${formattedMM}:${formattedSS}:${formattedMS}`
}

// Declare variables to use in our functions below

let startTime
let elapsedTime = 0
let timerInterval

// Create function to modify innerHTML

function print(txt) {
  //document.getElementById("stopwatch").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime
    print(timeToString(elapsedTime))
  }, 10)
}

function pause() {
  clearInterval(timerInterval)
}

function reset() {
  clearInterval(timerInterval)
  elapsedTime = 0
}

//Artyom codes

var artyom = new Artyom()

artyom.addCommands([
  //precisa de um comando
  {
    descripition: 'Lendo zebra',
    indexes: ['Zebra'],
    action: function (i) {
      if (i == 0) {
        h3.innerHTML = `Acertou`
      }
    },
  },
])

function startArtyon() {
  artyom.initialize({
    lang: 'pt-BR',
    continuous: false, // Listen forever, dps de um comando ele continua ouvindo
    soundex: false, // Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
    listen: true, // Start to listen commands !
  })
}

function stopArtyon() {
  artyom.fatality()
}

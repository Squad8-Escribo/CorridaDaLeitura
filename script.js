
//Menus codes

const buttonsLevel= async()=>{
    
    const response = await fetch("fases.json");
    const data = await response.json();
    buttons.innerHTML="";
    read.innerHTML="";
    result.innerHTML="";
    for(let i=0;i<data.length;i++){
        buttons.innerHTML+=`<input type="button" onclick="chooseLevel(${i})" value="Level ${i+1}"><br>`;
    }
}
buttonsLevel()

const chooseLevel =  async(level) => {
    const response = await fetch("fases.json");
    const data = await response.json();
    read.innerHTML="";
    buttons.innerHTML="";
    for(let i=0;i<data[level].length;i++){
        buttons.innerHTML+=`<input type="button" onclick="choosePhase(${i},${level})" value="${Object.keys(data[level][i])}"/><br>`;
    }
  };



//Game codes

const choosePhase = async(phase,level)=>{
    result.innerHTML="";
    read.innerHTML="";
    const response = await fetch("fases.json");
    const data = await response.json();

    //level passing system

    if(phase>=data[level].length){
        level++;
        phase=0;
    }
    if(level>=data.length){
        buttonsLevel()
        alert("Parabens voce terminou o jogo");
    }
    //get array for json

    var phaseName=Object.keys(data[level][phase]);
    var phaseName=phaseName[0]
    const arrayText=(data[level][phase][phaseName]);

    //if chosse word, one by one

    if(phaseName=="palavras"){
        buttons.innerHTML=`<br><input type="button" onclick="startArtyon();start();" value="Começar"/></br>`;
        document.getElementById("stopwatch").innerHTML = "00:00:00";
        var hits=0;
        var numberWord=0;
        
        read.innerHTML=arrayText[0];
        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            if(isFinal ){
                var arrayWord=Artyom.prototype.splitStringByChunks(text,1);
                console.log(arrayWord[0].trim().toLowerCase()+"<-recebe|json->"+arrayText[numberWord].toLowerCase())
                console.log(arrayWord[0].trim().toLowerCase()==arrayText[numberWord].toLowerCase())
                if(arrayWord[0].trim().toLowerCase()==arrayText[numberWord].toLowerCase()){
                    hits++;
                }
                numberWord++;
                read.innerHTML=arrayText[numberWord];
                if(numberWord==3){
                    pause();
                    if(hits==3){
                        read.innerHTML=arrayText[2];
                        result.innerHTML="Parabes voce conseguiu 3 estrelas<br>";
                    }else if(hits==2){
                        read.innerHTML=arrayText[2];
                        result.innerHTML="Voce conseguiu 2 estrelas<br>";
                    }else if(hits==1){
                        read.innerHTML=arrayText[2];
                        result.innerHTML="Voce consegiu 1 estrelas<br>";
                    }else if(hits==0){
                        read.innerHTML=arrayText[2];
                        result.innerHTML="Voce nao conseguiu nenhuma estrela";
                    }
                    result.innerHTML+=`<input type="button" onclick="choosePhase(${(phase+1)},${level});reset()" value="Proxima fase"/><br>`;
                    result.innerHTML+=`<input type="button" onclick="buttonsLevel();reset()" value="Voltar ao começo"/><br>`;
                    stopArtyon();
                }
            }
        });

    //other cases

    }else{
        buttons.innerHTML=`<br><input type="button" onclick="startArtyon();start()" value="Começar"/></br>`;
        document.getElementById("stopwatch").innerHTML = "00:00:00";
        for(var i=0;i<arrayText.length;i++){
            read.innerHTML+=arrayText[i];
        }
        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            console.log("teste "+text);
            
            if(isFinal){
                console.log(isFinal);
                pause();
                console.log(elapsedTime);
                let hits=0;
                var arrayWord=Artyom.prototype.splitStringByChunks(text,1);
                for(var i=0;i<arrayWord.length;i++){
                    console.log(arrayWord[i].trim().toLowerCase()+"<-recebe|json->"+arrayText[i].trim().toLowerCase())
                    console.log(arrayWord[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase())
                    if(arrayWord[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase()){
                            hits++;
                    }
                }
                if(hits>=(arrayText.length*0.9)){
                    result.innerHTML="Parabes voce conseguiu 3 estrelas<br>";
                }else if(hits>=(arrayText.length*0.75)){
                    result.innerHTML="Voce conseguiu 2 estrelas<br>";
                }else if(hits>=(arrayText.length*0.5)){
                    result.innerHTML="Voce consegiu 1 estrelas<br>";
                }else{
                    result.innerHTML="Voce nao conseguiu nenhuma estrela";
                }
                result.innerHTML+=`<input type="button" onclick="choosePhase(${(phase+1)},${level});reset()" value="Proxima fase"/><br>`;
                result.innerHTML+=`<input type="button" onclick="buttonsLevel();reset()" value="Voltar ao começo"/><br>`;
                stopArtyon();
            }
        });
    } 

}

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
let returnTime=1;
  
// Create function to modify innerHTML
  
function print(txt) {
    document.getElementById("stopwatch").innerHTML = txt;
}
  
// Create "start", "pause" and "reset" functions
  
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        if(elapsedTime>=1000){
            returnTime=1;
        }else if(elapsedTime>=60000){
            returnTime=60;
        }
        print(timeToString(elapsedTime));
}, 10); }
  

function pause() {
    clearInterval(timerInterval);
}

  
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
}
  

//Artyom codes

var artyom = new Artyom();


    artyom.addCommands([//precisa de um comando
        {
          descripition:"Lendo zebra",
          indexes:["Zebra"],
          action:function(i){  
            if(i==0){
                h3.innerHTML=`Acertou`;
            }
          }
        },
    ]); 

    function startArtyon(){
        artyom.initialize({
            lang:"pt-BR",
            continuous:false, // Listen forever, dps de um comando ele continua ouvindo
            soundex: false, // Use the soundex algorithm to increase accuracy
            debug:true, // Show messages in the console
            listen:true // Start to listen commands !
        })
    }

    function stopArtyon(){
        artyom.fatality();
    }
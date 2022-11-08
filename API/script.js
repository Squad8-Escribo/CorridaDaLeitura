
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


const choosePhase = async(phase,level)=>{
    read.innerHTML="";

    const response = await fetch("API/fases.json");
    const data = await response.json();
    var phaseName=Object.keys(data[level][phase]);
    var phaseName=phaseName[0]
    var arrayText=(data[level][phase][phaseName]);
    

    //level passing system

    if(phase>=data[level].length){
        level++;
        phase=0;
    }
    if(level>=data.length){
        alert("Parabéns Você terminou o jogo");
    } 


    //if chosse word, one by one

    if(phaseName=="palavras"){
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
                        read.innerHTML="Parabéns você conseguiu a </br>medalha de diamante</br>";
                    }else if(hits==2){
                        read.innerHTML="Você conseguiu a </br>medalha de ouro</br>";
                    }else if(hits==1){
                        read.innerHTML="Você consegiu a </br>medalha de prata</br>";
                    }else if(hits==0){
                        read.innerHTML="Você conseguiu a </br>medalha de bronze</br>";
                    }
                    read.innerHTML+=`Seu tempo foi:${timeToString(elapsedTime)}`;
                    //read.innerHTML+=`<a class="game-levels__levels--three level"><img src="public/img/btns/passBtn.png" alt="" class="" onclick="choosePhase(${(phase+1)},${level});reset()"></a>`
                    // result.innerHTML+=`<input type="button" onclick="choosePhase(${(phase+1)},${level});reset()" value="Proxima fase"/><br>`;
                    // result.innerHTML+=`<input type="button" onclick="buttonsLevel();reset()" value="Voltar ao começo"/><br>`;
                    stopArtyon();
                }
            }
        });

    //other cases

    }else{
        for(var i=0;i<arrayText.length;i++){
            read.innerHTML+=arrayText[i];
        }
        var arrayWord=[];
        var finish=false;
        var finishLast=false;
        var finishPenultimate=false;
        var finishNumber=false;
        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            console.log("teste "+text);

            if(isFinal){
                var hits=0;
                arrayTemporary=Artyom.prototype.splitStringByChunks(text,1);
                if(arrayTemporary.length<arrayText.length){
                    finishLast=(arrayTemporary[arrayTemporary.length]===arrayText[arrayTemporary.length]) ||(arrayTemporary[(arrayTemporary.length)-1]===arrayText[arrayTemporary.length]);
                    finishPenultimate=(arrayTemporary[(arrayTemporary.length)-1]===arrayText[(arrayTemporary.length)-1]);
                }else{
                    finishNumber=true
                }
                console.log("asdasdasdasda   "+(arrayText[(arrayWord.length)]))
                console.log("dsfgdfgdgf   "+(arrayWord[(arrayWord.length)]))
                if (finishLast|| finishPenultimate|| finishNumber){
                    for(var i=0;i<arrayText.length;i++){
                        console.log(arrayTemporary[i].trim().toLowerCase()+"<-recebe|json->"+arrayText[i].trim().toLowerCase())
                        if(arrayTemporary[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase()){
                            hits++;
                        }
                    }
                    if(arrayTemporary.length>arrayText.length){
                        hits=hits-(arrayText.length/5);
                    }
                    finish=true;
                }else{
                    arrayWord=arrayWord.concat(arrayTemporary);
                    if(arrayWord.length<arrayText.length){
                        finishLast=(arrayWord[arrayWord.length]===arrayText[arrayWord.length]) ||(arrayWord[(arrayWord.length)-1]===arrayText[arrayWord.length]);
                        finishPenultimate=(arrayWord[(arrayWord.length)-1]===arrayText[(arrayTemporary.length)-1]);
                    }else{
                        finishNumber=true;
                    }
                    console.log("etste t   "+arrayWord);
                    if(finishLast|| finishPenultimate|| finishNumber){
                        for(var i=0;i<arrayText.length;i++){
                            console.log(arrayWord[i].trim().toLowerCase()+"<-recebe|json->"+arrayText[i].trim().toLowerCase())
                            if(arrayWord[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase()){
                                hits++;
                            }
                        }
                        if(arrayWord.length>arrayText.length){
                            hits=hits-(arrayText.length/5);
                        }
                        finish=true;
                    }
                }
                
            }
            if(finish){
                pause();
                console.log(elapsedTime);
                if(hits>=(arrayText.length*0.9)){
                    read.innerHTML="Parabéns você conseguiu a </br>medalha de Diamante!</br>";
                }else if(hits>=(arrayText.length*0.7)){
                    read.innerHTML="Você conseguiu a </br>medalha de Ouro!</br>";
                }else if(hits>=(arrayText.length*0.5)){
                    read.innerHTML="Você conseguiu a </br>medalha de Prata!</br>";
                }else{
                    read.innerHTML="Você conseguiu a </br>medalha de Bronze!</br>";
                }
                read.innerHTML+=`Seu tempo foi:${timeToString(elapsedTime)}`;
                //read.innerHTML+-'<div class="game-result__back-btn"><a href=""><img src="public/img/btns/backBtn.png" alt=""></a> </div>';
                read.innerHTML+=`<a class="passBtn"><img src="public/img/btns/passBtn.png" alt="" class="game-levels__pass-btn" onclick="choosePhase(${(phase+3)},${level});reset();thirdLevel()"></a>`
                /* read.innerHTML+=`<input type="button" onclick="choosePhase(${(phase+1)},${level});reset()" value="Proxima fase"/><br>`;
                read.innerHTML+=`<input type="button" onclick="buttonsLevel();reset()" value="Voltar ao começo"/><br>`; */
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
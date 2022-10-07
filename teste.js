var h3=document.getElementById("h3");
var h1=document.getElementById("h1");
    var artyom = new Artyom();

    artyom.addCommands([//precisa de um comando
        {
          descripition:"Lendo zebra",
          indexes:["Zebra"],
          //smart:true, //?
          action:function(i){  //i retorna 0 caso zebra
            //console.log("wildcard");
            console.log(i)
            if(i==0){
                h3.innerHTML=`Acertou`;
            }else if(i==1){//so retorna 0
                h3.innerHTML=`Errou`;
            }
          }
        },
    ]); 

    artyom.redirectRecognizedTextOutput(function(text,isFinal){
        console.log("text"+text); //
        console.log("isfinal"+isFinal);// tempo sem falar, contar quantos ticks
        //usar desse jeito usar switch case, if so para o teste
        //testar a criação de uma array com a var text
        //primeira letra maiuscula(em frases), sem pontuacao
        //text so da pra acertar uma por vez
        if(text=="Mariana tem nove anos ela gosta de jogar bola fazer bolo de cenoura com sua vovó está na escola com seus amigos ela é uma menina bem feliz"){
            h3.innerHTML=`Acertou o texto,clique em strat para testar novamente`;
            artyom.fatality();
        }else if(text=="O rato comeu o queijo"){
            h3.innerHTML=`Acertou a frase,clique em strat para testar novamente`;
            artyom.fatality();
        }else if(text=="porta"){
            h3.innerHTML=`Acertou a palavra,clique em strat para testar novamente`;
            artyom.fatality();
        }else if(text=="Um lobo devorou sua presa tão depressa que acabou ficando com um osso entalado na garganta cheio de dor ofereceu uma bela recompensa para quem tirasse o osso de sua garganta com pena do lobo e com vontade de ganhar o dinheiro uma cegonha resolveu enfrentar o perigo depois de tirar o osso quis saber onde estava a recompensa que o lobo tinha prometido  recompensa?  berrou o lobo que recompensa que nada você enfiou sua cabeça na minha boca e em vez de eu arrancar sua cabeça com uma dentada deixei que você a tirasse lá de dentro sem um arranhão dê o fora e se cuide para nunca mais chegar perto de minhas garras"){
            h3.innerHTML=`Acertou o texto,clique em strat para testar novamente`;
            artyom.fatality();
        }else{
            h3.innerHTML=`Errou${text}`;
        } 
        if(isFinal){
            h1.innerHTML='';
        }else{
            h1.innerHTML=text;
        }
    });

    function startArtyon(){//nao da pra startar 2 vezes, procurar como reiniciar
        artyom.initialize({
            lang:"pt-PT",
            continuous:false, // Listen forever, dps de um comando ele continua ouvindo
            soundex: false, // Use the soundex algorithm to increase accuracy
            debug:true, // Show messages in the console
            listen:true // Start to listen commands !
        })
    }

    function stopArtyon(){
        artyom.fatality();
    }

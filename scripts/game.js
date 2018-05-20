document.addEventListener("DOMContentLoaded", function (event) {
    let selectedCards = [];
    let cards = {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null,
        eight: null,
        nine: null,
        ten: null,
        eleven: null,
        twelve: null,
        thirteen: null,
        fourteen: null,
        fifthteen: null,
        sixteen: null

    };
    let startingTime;
    let now;
    let timer;
    let intervalHold;  
    let plays=0;
    let gameState = "STOP"; // Current State of game for controlling the logic
    let playedPairs = 0;
    const gameBoard = document.getElementById("game"); //Gets the board from DOM
    const btnStart = document.getElementById("btnStart");
    let cards1 = document.querySelectorAll(".card");
    let timerText=document.getElementById('count');
  
    btnStart.addEventListener('click', function () //Adds a Click Event for the start buttong
        {
            startingTime= Date.now();
            
            gameState = "START" //Changes the gameState to Start
            
            randomCards(); //Puts the random cards into the Array
            console.log(cards);
           

           intervalHold= setInterval(function timerLogic(){
            let seconds=0;
            let minutes=0;
            now = Date.now();
            timer=now-startingTime;
            seconds=Math.floor(timer/1000);
            if(seconds<60)
            {
              timerText.innerText='0:'+seconds;
              if (seconds<10)
              {
                timerText.innerText='0:0'+seconds;
              }
              else if (seconds < 60)
              {
                timerText.innerText='0:'+seconds;
              }
            
            }
            else{
                minutes=Math.floor(timer/60000);
                seconds=(Math.floor(timer/1000)-(60*minutes));
                timerText.innerText=minutes+':'+seconds;
                if (seconds<10)
                {
                  timerText.innerText=minutes + ':0' + seconds;
                }
                else
                {
                  timerText.innerText=minutes+':'+seconds;
                }
            }

           },1000)
        })

    gameBoard.addEventListener('click', clicker, false);



    function randomCards() { //Shuffles the cards
        let cardsArray = [];
        if (cardsArray <= 16) {
            for (let i = 0; i < 16; i++) {
                cardsArray.push(checkRepeated(cardsArray));
            };
        } else {
            cardsArray.length = 0;
            for (let i = 0; i < 16; i++) {
                cardsArray.push(checkRepeated(cardsArray));
            };
        }
        cards.one = cardsArray[0];
        cards.two = cardsArray[1];
        cards.three = cardsArray[2];
        cards.four = cardsArray[3];
        cards.five = cardsArray[4];
        cards.six = cardsArray[5];
        cards.seven = cardsArray[6];
        cards.eight = cardsArray[7];
        cards.nine = cardsArray[8];
        cards.ten = cardsArray[9];
        cards.eleven = cardsArray[10];
        cards.twelve = cardsArray[11];
        cards.thirteen = cardsArray[12];
        cards.fourteen = cardsArray[13];
        cards.fifthteen = cardsArray[14];
        cards.sixteen = cardsArray[15];

    }

    function checkRepeated(cardsArray) { //Verifies that the number is only repeated  twice
        let counter = 0;
        let number = 0;
        number = getRandomInt(1, 9); //Gets the number to be used on  next position
        //.log("Random Number: " + number)
        for (const cardNumber of cardsArray) { //Iterates inside the array
            if (parseInt(cardNumber) === number) { //convert number to int
                counter++;
      //          console.log("SAME NUMBER: " + cardNumber + " | " + number + " COUNT: " + counter);
            }
        }
        if (counter < 2) {
            return number; //if counter is less than 2 retunr number
        } else {
         //   console.log("Repeating function with number : " + number)
            number = checkRepeated(cardsArray); //Recursive function into itself again
            return number;
        }
    }

    function getRandomInt(min, max) { //Gets Random Integer between two numbers
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function clicker(e) {
        let clicked = document.getElementById(e.target.id);
        let clickedElements;
        console.log("Plays: "+ plays);
        score();

        if (gameState === "WAIT") {
            clickedElements = document.querySelectorAll(".selected");
            clickedElements.forEach(function (remover) {
                remover.style.background="";
                remover.classList.remove('selected');
                remover.classList.remove('incorrect');
              
                
            })
            gameState = "START";
        }
        if (e.target !== e.currentTarget) {
            if (gameState === "START") { //Only verify if game have started

                clickedElements = document.querySelectorAll(".selected"); //Gets all elements that have been clicked already
                if (clickedElements.length < 1 && !clicked.classList.contains('correct')) { //If there is not any selected
                    clicked.classList.add("selected"); 
                    pictureReveal(clicked);
                } else if (clickedElements.length === 1 && !clicked.classList.contains('correct')) { //If there is one selected
                    clicked.classList.add("selected"); //Add new class
                    pictureReveal(clicked);
                    clickedElements = document.querySelectorAll(".selected"); //get all selected
                    validateSelection(clickedElements); //Logic for what happens when two are selected
                }
            }
        }
        e.stopPropagation(); //Stop DOM from getting any higher than parent

        function validateSelection(clickedElements) {
            try {
                if (cards[clickedElements[0].id] === cards[clickedElements[1].id]) { // If the two clicked elements are the same
                    console.log("SAME");
                    clickedElements.forEach(function (element) {
                        element.classList.add('correct');
                        element.classList.remove('selected');
                    })

                    playedPairs++; //How many have been guested goes up by one
                    console.log(playedPairs);
                    if (playedPairs === 8) {
                        console.log("YOU WON!");
                        gameState = "FINISHED";
                        clearInterval(intervalHold);
                        
                    }

                } else { // Else just remove selected 
                    gameState = "WAIT";
                clickedElements.forEach(function(element)
                {
                    element.classList.add('incorrect');
                    setTimeout(function(){
                        element.classList.remove('incorrect');
                },500);
                })
                }
                plays++;
            } catch (error) {}
        }
    }

    function pictureReveal(selection)
    {
        console.log(cards[selection.id]);
        selection.style.background='url(imgs/'+ cards[selection.id]+'.png)';
        selection.style.backgroundSize="100% 100%";
    }
    function score()
    { //TODO:FIX SCORE!
        let normalStars=document.getElementsByClassName('fa-star');   
    console.log(normalStars);
     if (true)
     {
     normalStars[normalStars.length-1].classList.remove('fas');
     }
    }
})
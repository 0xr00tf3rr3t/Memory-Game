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

    ;

    let gameState = "stop"; // Current State of game
    const gameBoard = document.getElementById("game"); //Gets the board from DOM
    const btnStart = document.getElementById("btnStart");
    let cards1 = document.querySelectorAll(".card");


    btnStart.addEventListener('click', function () //Adds a Click Event for the whole Board
        {
            gameState = "Start" //Changes the gameState to Start
            randomCards(); //Puts the random cards into the Array
            console.log(cards);
        })

    gameBoard.addEventListener('click', clicker, false)


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
        var counter = 0;
        let number = 0;

        number = getRandomInt(1, 9);//Gets the number to be used on  next position
        console.log("Random Number: " + number)
        for (const cardNumber of cardsArray) {//Iterates inside the array
            if (parseInt(cardNumber) === number) {//convert number to int
                counter++;
                console.log("SAME NUMBER: " + cardNumber + " | " + number + " COUNT: " + counter);
            }
        }
        if (counter < 2) {
            return number;//if counter is less than 2 retunr number

        } else {
            console.log("Repeating function with number : " + number)
            number = checkRepeated(cardsArray);//Recursive function into itself again
            return number;
        }

    }

    function getRandomInt(min, max) { //Gets Random Integer between two numbers
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function clicker(e) {
        if (e.target !== e.currentTarget) {
            let clickedItem = e.target.id;
            let clicked = document.getElementById(clickedItem);
            let clickedElements;

            if (gameState === "Start") {
                
                clickedElements=document.querySelectorAll(".selected");
                if (clickedElements.length <1) {
                    clicked.classList.add("selected");
                    console.log(clicked.classList);
                }
            else if (clickedElements.length ===1)
             {
                clicked.classList.add("selected");
                clickedElements=document.querySelectorAll(".selected");
                validateSelection(clickedElements);
            }
        }
        }
        e.stopPropagation();
       function validateSelection(clickedElements)
       {
        if( cards[clickedElements[0].id]=== cards[clickedElements[1].id])
        {console.log("SAME");
    }
    else
    {console.log("Wrong!")}
       let remover=document.querySelector(".selected");
       console.log(remover);
       remover.classList.remove(".selected");
       }
    }

})
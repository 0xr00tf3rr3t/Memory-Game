document.addEventListener("DOMContentLoaded", function(event)
 {let cardsOrder=[];
    const gameBoard = document.getElementById("game");
    gameBoard.addEventListener('click',function()
{
    console.log ("CLICK!");
    randomCards(cardsOrder);
})
  });

function randomCards (cardsOrder){
    for(let i=0;i<16;i++ )
    {      
    cardsOrder.push(checkRepeated(cardsOrder));
    };
    console.log(cardsOrder);
}

function checkRepeated(cardsOrder) 
{var counter=0;
    let number=0;
    
    number =getRandomInt(1,9);  
    console.log("Random Number: "+ number)
    for(const cardNumber of cardsOrder)
    {
        if(parseInt(cardNumber) === number)
            {
                counter++;
                console.log("SAME NUMBER: "+ cardNumber+" | "+ number +" COUNT: "+ counter);
            }
    } 
if (counter<2)
{
    return number;
}
else{
    console.log("Repeating function with number : " + number)
     number=checkRepeated(cardsOrder);
     return number;
}

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

let pairCounter = 12;
let picturesCounter = {};
let picArr = ['cat.jpg', 'dog.jpg', 'snake.jpg', 'turtle.jpg', 'horse.jpg', 'iguana.jpg', 'parrot.jpg', 'monkey.jpg', 'bunny.jpg', 'sloth.jpg', 'guinea.jpg', 'ferret.jpg'];
let table = document.getElementById("myTable");
let turnNum = 0;
let clickNum = 0;
let firstClickedCard;
let firstClickedImg;
let click1;
let secondClickedCard;
let secondClickedImage;
let click2;

// Get random picture from picArr to attach to each facedown card
function getRandomPicture() {
  let randPicIndex = null;
  while (randPicIndex === null || picturesCounter[randPicIndex] >= 2) {
    randPicIndex = Math.floor(Math.random()*12);
    if (picturesCounter[randPicIndex] === undefined) {
      picturesCounter[randPicIndex] = 0;
    }
  }
  picturesCounter[randPicIndex]++;
  return picArr[randPicIndex];
}

function initializeGame() {

  // Create 5 x 5 table of cards facedown with random picture hidden
  for (let i = 0, row; row = table.rows[i]; i++) {

    for (let j = 0, col; col = row.cells[j]; j++) {

      if (i === 2 && j === 2) {
        continue;
      }

      let facedown = document.createElement("img");
      facedown.src = "facedown.jpg";
      facedown.width = 100;
      facedown.height = 100;
      facedown.alt = "picture";
      col.appendChild(facedown);

      let faceup = document.createElement("img");
      faceup.src = getRandomPicture();
      faceup.width = 100;
      faceup.height = 100;
      faceup.alt = "picture";
      faceup.style = 'display: none';
      col.appendChild(faceup);

      // Assign click1 and click2 locations on grid
      col.onclick = function() {
        if (clickNum === 2) {
          return;
        }
        faceup.style = 'display: block';
        facedown.style = 'display: none';
        clickNum++;

        if (clickNum === 1) {
          firstClickedCard = facedown;
          firstClickedImg = faceup;
          click1 = facedown.parentElement.id;
        }
        else if (clickNum === 2) {
          secondClickedCard = facedown;
          secondClickedImg = faceup;
          click2 = facedown.parentElement.id;
          setTimeout(function() {

            // If user clicks on same card, turn card facedown
            if (click1 === click2) { 
                firstClickedCard.style = 'display: block';
                firstClickedImg.style = 'display: none';
                facedown.style = 'display: block';
                faceup.style = 'display: none';
              }

            // They're the same card! Remove them
            else if (firstClickedImg.src === secondClickedImg.src) {
              turnNum++;
              firstClickedCard.style = 'visibility: hidden';
              firstClickedImg.style = 'display: none';
              facedown.style = 'visibility: hidden';
              faceup.style = 'display: none';
              pairCounter--;
              if (pairCounter === 0) {
                setTimeout(function() {
                  alert("You've won!!!! You took " + turnNum + " clicks");
                  startNewGame();
                }, 1000);
              }
            } 

            // They're not the same card. Flip them back over.
            else {
              turnNum++;
              firstClickedCard.style = 'display: block';
              firstClickedImg.style = 'display: none';
              facedown.style = 'display: block';
              faceup.style = 'display: none';
            }

            // Keep track of turns
            let turn = document.getElementById("turn");
            turn.innerHTML = "Turn: " + turnNum;
            clickNum = 0;
          }, 1000);
        }
      }
    }
  }
}

// Starting a new game
function startNewGame() {
  picturesCounter = {};
  pairCounter = 12;
  turnNum = 1;
  clickNum = 0;
  firstClickedCard = null;
  firstClickedImg = null;

  let turn = document.getElementById("turn");
  turn.innerHTML = "Turn: " + turnNum;

  for (let i = 0, row; row = table.rows[i]; i++) {
     for (let j = 0, col; col = row.cells[j]; j++) {
       col.innerHTML = '';
     }
  }
  initializeGame();
}

document.getElementById('new-game').addEventListener('click', startNewGame);

startNewGame();

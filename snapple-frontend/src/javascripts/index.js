const canvas = document.getElementById('canvas'); 
canvas.style.display = "none"
const ctx = canvas.getContext("2d"); 
const nameScreen = document.getElementById('name-screen')
const startScreen = document.getElementById('start-screen')
startScreen.style.display = "none"
const startScreenInput = document.getElementById('input-form')
const startButton = document.getElementById('start')
const restoreButton = document.getElementById('restore')
const mainImage = document.getElementsByTagName('img')[0]
const highScoreScreen = document.getElementById('high-score-screen')
highScoreScreen.style.display = "none"
let name

let gridSize = 20; //testing variable. To be re-evaluated later for dynamic gridSize changes.

let snake = new Snake("src/images/striker.png")
let apple = new Consumable("src/images/apple.png")
let skull = new Consumable("src/images/skull.png")
let newGame  = new Game("Donnovan", snake, 0, apple, skull)

function keyDownEvent(e) {
    switch (e.keyCode) {
      case 37:
          nextX = -1;
          nextY = 0;
          newGame.snake.direction = "left"
          break;
      case 38:
          nextX = 0;
          nextY = -1;
          newGame.snake.direction = "up"
          break;
      case 39:
          nextX = 1;
          nextY = 0;
          newGame.snake.direction = "right"
          break;
      case 40:
          nextX = 0;
          nextY = 1;
          newGame.snake.direction = "down"
          break;
      }
  }

  function init() {
    startScreen.style.display = "none"
    mainImage.style.display = "none"
    canvas.style.display = "block"
    newGame.start()
}

function getName(e) {
    e.preventDefault()
    name = document.getElementById("name")
    nameScreen.style.display = "none"
    startScreen.style.display = ""
    console.log("submitted")
}

startScreenInput.addEventListener("submit", getName)
startButton.addEventListener("click", init)
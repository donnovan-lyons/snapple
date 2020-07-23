const canvas = document.getElementById('canvas'); 
canvas.style.display = "none"
const ctx = canvas.getContext("2d"); 
const nameScreen = document.getElementById('name-screen')
const startScreen = document.getElementById('start-screen')
startScreen.style.display = "none"
const startScreenInput = document.getElementById('input-form')
const startButton = document.getElementById('start')
const restoreButton = document.getElementById('restore')
restoreButton.style.display = "none"
const mainImage = document.getElementsByTagName('img')[0]
const highScoreScreen = document.getElementById('high-score-screen')
highScoreScreen.style.display = "none"
const playAgainButton = document.getElementById('play-again')
const newNameButton = document.getElementById('choose-new-name')

let name
let interval
let restoredGameData

let gridSize = 20; //testing variable. To be re-evaluated later for dynamic gridSize changes.

// declare all game variables
let snake
let snapple = new Snake("src/images/snapple.png")
let striker = new Snake("src/images/striker.png")
let apple = new Consumable("src/images/apple.png")
let skull = new Consumable("src/images/skull.png")
let newGame

function keyDownEvent(e) {
    switch (e.keyCode) {
      case 37:
          if (newGame.snake.direction != "right") {
            newGame.snake.direction = "left"
          }
          break;
      case 38:
          if (newGame.snake.direction != "down") {
            newGame.snake.direction = "up"
          }
          break;
      case 39:
          if (newGame.snake.direction != "left") {
            newGame.snake.direction = "right"
          }
          break;
      case 40:
          if (newGame.snake.direction != "up") {
            newGame.snake.direction = "down"
          }
          break;
      case 80:
          newGame.pause()
          break;
      case 82:
          newGame.resume()
          break;
      }
  }

function init() {
    startScreen.style.display = "none"
    mainImage.style.display = "none"
    canvas.style.display = "block"
    snapple = new Snake("src/images/snapple.png")
    newGame = new Game(null, name, snapple, 0, apple, skull)
    newGame.start()
}

function playAgain() {
    snapple = new Snake("src/images/snapple.png")
    newGame = new Game(null, name, snapple, 0, apple, skull)
    highScoreScreen.style.display = "none"
    canvas.style.display = "block"
    newGame.start()
}

function playAgainWithNewName() {
    document.getElementById("name").value = ""
    highScoreScreen.style.display = "none"
    nameScreen.style.display = ""
    mainImage.style.display= ""
}

function restore() {
    return fetch(`http://localhost:3000/api/v1/games/restore/${name}`)
    .then(resp => resp.json())
    .then(json => addGameData(json[0]))
}

function addGameData(data) {
    restoredGameData = data
    if (restoredGameData) {
        restoreButton.style.display = ""
    } else {
        restoreButton.style.display = "none"
    }
}

function restoreGame() {
    const snakeBody = restoredGameData.snake.body.map(bodyPart => JSON.parse(bodyPart))
    const snakeX = snakeBody[0].x
    const snakeY = snakeBody[0].y
    const snakeDirection = restoredGameData.snake.direction
    const gameId = restoredGameData.id
    const restoredGameScore = restoredGameData.score
    const skullData = JSON.parse(restoredGameData.skull)
    const skullX = skullData[0]
    const skullY = skullData[1]
    const appleData = JSON.parse(restoredGameData.apple)
    const appleX = appleData[0]
    const appleY = appleData[1]
    const restoredSnake = new Snake("src/images/snapple.png", snakeX, snakeY, snakeDirection, snakeBody)
    const restoredApple = new Consumable("src/images/apple.png", appleX, appleY)
    const restoredSkull = new Consumable("src/images/skull.png", skullX, skullY)
    newGame = new Game(gameId, name, restoredSnake, restoredGameScore, restoredApple, restoredSkull)
    startScreen.style.display = "none"
    mainImage.style.display = "none"
    canvas.style.display = "block"
    restoredGameData = null
    newGame.start()
}

function getName(e) {
    e.preventDefault()
    name = document.getElementById("name").value
    restore()
    nameScreen.style.display = "none"
    startScreen.style.display = ""
}

startScreenInput.addEventListener("submit", getName)
startButton.addEventListener("click", init)
restoreButton.addEventListener("click", restoreGame)
playAgainButton.addEventListener("click", playAgain)
newNameButton.addEventListener("click", playAgainWithNewName)
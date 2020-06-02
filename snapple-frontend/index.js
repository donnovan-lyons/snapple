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
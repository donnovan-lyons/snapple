class Game {
    constructor(player, snake, score = 0, apple, skull) {
        this.player = player;
        this.snake = snake
        this.score = score
        this.apple = apple
        this.skull = skull
    }

    checkHighScore() {

    }

    checkContact() {
        for (let index = 1; index < this.snake.body.length; index++) {
            if (this.snake.x == this.snake.body[index].x && this.snake.y == this.snake.body[index].y) {
                this.gameOver();
            }        
        }
        if (this.snake.x == this.apple.x && this.snake.y == this.apple.y) {
            this.score += 10
            this.snake.grow();
            this.apple.spawn()
        }
        if (this.snake.x == this.skull.x && this.snake.y == this.skull.y) {
            this.score += 25
            this.skull.spawn()
        }
    }

    draw() {
        this.snake.slither()
        this.checkContact()
    
        //paint background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
        this.snake.draw()
    
        this.apple.draw()
        this.skull.draw()
    }

    start() {
        document.addEventListener("keydown", keyDownEvent); 
        let x = 8;
        let interval = setInterval(this.draw.bind(this), 1000 / x);
    }

    gameOver() {
        console.log("Game Over")
        canvas.style.display = "none"
        highScoreScreen.style.display = ""
    }
    
}
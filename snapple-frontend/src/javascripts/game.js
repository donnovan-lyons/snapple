class Game {
    constructor(player, snake, score = 0, apple, skull) {
        this.player = player;
        this.snake = snake
        this.score = score
        this.apple = apple
        this.skull = skull
        this.completed = false
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
        interval = setInterval(this.draw.bind(this), 1000 / x);
    }

    gameOver() {
        console.log("Game Over")
        clearInterval(interval);
        fetch("http://localhost:3000/games/high_scores")
        .then(resp => resp.json())
        .then(json => Game.appendHighScore(json))
        canvas.style.display = "none"
        highScoreScreen.style.display = ""
    }

    static appendHighScores(data) {
        data.forEach(element => {
            let tr = document.createElement('tr');
            let name = document.createElement('td')
            let score = document.createElement('td')
            name.innerText = element.user.name
            score.innerText = element.score
            tr.appendChild(name)
            tr.appendChild(score)
            document.getElementById('high_scores').appendChild(tr)
        });
    }

    s

    pause() {
        clearInterval(interval);
    }

    save() {

    }
    
}

// fetch("http://localhost:3000/games", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"},
//         body: JSON.stringify({trainer_id: trainerId})
//     })
//     .then(resp => resp.json())
//     .then(json => appendPokemon(json));
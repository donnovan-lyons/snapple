class Game {
    constructor(id = null, player, snake, score = 0, apple, skull, completed = false) {
        this.id = id;
        this.player = player;
        this.snake = snake;
        this.score = score;
        this.apple = apple;
        this.skull = skull;
        this.completed = completed;
        if (this.id == null) {
            this.init()
        }
    }

    init() {
        const game = {name: this.player}
        return fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify(game)
        })
        .then(resp => resp.json())
        .then(json => this.id = json.id) //we want to return the id that was created and make our id it
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
            this.save()
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
        this.completed = true
        this.pause()
        canvas.style.display = "none"
        highScoreScreen.style.display = ""
        return fetch(`http://localhost:3000/games/high_scores`)
        .then(resp => resp.json())
        .then(json => Game.appendHighScores(json))
    }

    static appendHighScores(data) {
        const highScoreTable = document.getElementById('high_scores')
        highScoreTable.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const tr = document.createElement('tr');
            const rank = document.createElement('td')
            const name = document.createElement('td')
            const score = document.createElement('td')
            rank.innerText = `${i + 1}.`
            name.innerText = element.user.name
            score.innerText = element.score
            tr.appendChild(rank)
            tr.appendChild(name)
            tr.appendChild(score)
            highScoreTable.appendChild(tr)
        } 
    }

    pause() {
        clearInterval(interval);
        this.save()
    }

    resume() {
        let x = 8;
        interval = setInterval(this.draw.bind(this), 1000 / x);
    }

    save() {
        const game = {id: this.id, name: this.player, snake: this.snake, score: this.score, apple: this.apple, skull: this.skull, completed: this.completed}
        return fetch(`http://localhost:3000/games/${this.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify(game)
        })
    }
       
}
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
        Game.backGroundMusic.play();
    }

    init() {
        const game = {id: this.id, name: this.player, snake: this.snake, score: this.score, apple: this.apple, skull: this.skull, completed: this.completed}
        return fetch("http://localhost:3000/api/v1/games", {
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
            Game.eatAppleSound.play();
            this.score += 10
            this.snake.grow();
            this.apple.spawn()
            this.save()
        }
        if (this.snake.x == this.skull.x && this.snake.y == this.skull.y) {
            Game.skullBoostSound.play()
            this.score += 25
            clearInterval(interval);
            this.skull.spawn()
            interval = setInterval(this.draw.bind(this), 80);
            setTimeout(this.pause.bind(this), 8000);
            setTimeout(this.resume.bind(this), 8001);
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
        this.drawScore()
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
    }

    static appendHighScores(data) {
        const highScoreTable = document.getElementById('high-scores')
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

    static backGroundMusic = (function() {
        const audio = new Audio("src/audio/skull-snake-game-music.m4a")
        audio.loop = true
        return audio
    })()
    static eatAppleSound = new Audio("src/audio/eat-apple.ogg");
    static ratDeathSound = new Audio("src/audio/rat-death.mp3");
    static skullBoostSound = new Audio("src/audio/skull-boost.wav");
    static lightningStrikeSound = new Audio("src/audio/lightning-strike.wav");

    pause() {
        Game.backGroundMusic.pause();
        clearInterval(interval);
        this.save()
    }

    resume() {
        Game.backGroundMusic.play();
        let x = 8;
        interval = setInterval(this.draw.bind(this), 1000 / x);
    }

    save() {
        const game = {id: this.id, name: this.player, snake: this.snake, score: this.score, apple: this.apple, skull: this.skull, completed: this.completed}
        return fetch(`http://localhost:3000/api/v1/games/${this.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify(game)
        })
        .then(resp => resp.json())
        .then(json => {
            if (game.completed === true) {
                Game.appendHighScores(json)
            }
        })
    }

    drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "brown";
        ctx.fillText("Score: "+this.score, 8, 20);
        // ctx.fillText("High Score: "+, canvas.width-65, 20);
    }
       
}
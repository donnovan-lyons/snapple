class Snake {
    constructor(imageFile, x = Math.floor(Math.random() * gridSize), y = Math.floor(Math.random() * gridSize), direction = ["left", "up", "right", "down"][Math.floor(Math.random() * 4)], speed = 0, snakeSize = 3) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.directions = {"left": {x: -1,y: 0}, "up": {x:0, y:-1}, "right": {x: 1, y:0}, "down": {x:0, y:1}}
        this.image = this.loadImage(imageFile)

        this.body = [];
        
        for (let index = 0; index < snakeSize; index++) {
            this.body.push({x: this.x - index * this.directions[direction].x, y: this.y - index * this.directions[direction].y})
        }
    }

    loadImage(imageFile) {
        const image = new Image();
        image.onload = function() {}
        image.src = imageFile;
    
        return image;
    }

    slither() {
        this.x += this.directions[this.direction].x
        this.y += this.directions[this.direction].y
        if (this.x < 0) {
            this.x = gridSize - 1;
        }
        if (this.x > gridSize - 1) {
            this.x = 0;
        }
    
        if (this.y < 0) {
            this.y = gridSize - 1;
        }
        if (this.y > gridSize - 1) {
            this.y = 0;
        }
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }
        this.body[0].x = this.x
        this.body[0].y = this.y
    }

    grow() {
        this.x += this.directions[this.direction].x
        this.y += this.directions[this.direction].y
        this.body.unshift({x: this.x, y: this.y})
    }

    respawn() {
        this.body = []
        for (let index = 0; index < snakeSize; index++) {
            this.body.push({x: this.x - index * this.directions[direction].x, y: this.y - index * this.directions[direction].y})
        }
    }

    drawSnapple() {
        for (let index = 0; index < this.body.length; index++) {
            // draw head
            const snakePart = this.body[index];
            if (index == 0) {
                if (this.direction == "left") {
                    ctx.drawImage(this.image, 192, 64, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (this.direction == "up") {
                    ctx.drawImage(this.image, 192, 0, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (this.direction == "right") {
                    ctx.drawImage(this.image, 256, 0, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 256, 64, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            } else if (index == this.body.length - 1) {
                // draw tail
                const adj = this.body[index - 1]
                if (snakePart.x < adj.x) {
                    ctx.drawImage(this.image, 256, 128, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.x > adj.x) {
                    ctx.drawImage(this.image, 192, 192, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.y < adj.y) {
                    ctx.drawImage(this.image, 256, 192, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 192, 128, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            } else {
                // draw in between
                const toTail = this.body[index + 1]
                const toHead = this.body[index - 1]
                if (toHead.x > snakePart.x && toTail.y > snakePart.y || toTail.x > snakePart.x && toHead.y > snakePart.y) {
                    ctx.drawImage(this.image, 0, 0, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (toHead.y < snakePart.y && toTail.x > snakePart.x || toTail.y < snakePart.y && toHead.x > snakePart.x) {
                    ctx.drawImage(this.image, 0, 64, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.y == toTail.y && snakePart.y == toHead.y) {
                    ctx.drawImage(this.image, 64, 0, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (toHead.x < snakePart.x && toTail.y > snakePart.y || toTail.x < snakePart.x && toHead.y > snakePart.y) {
                    ctx.drawImage(this.image, 128, 0, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.x == toTail.x && snakePart.x == toHead.x) {
                    ctx.drawImage(this.image, 128, 64, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 128, 128, 64, 64, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            }
        }
    }
    drawStriker() {
        for (let index = 0; index < this.body.length; index++) {
            // draw head
            const snakePart = this.body[index];
            if (index == 0) {
                if (this.direction == "left") {
                    ctx.drawImage(this.image, 48, 0, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (this.direction == "up") {
                    ctx.drawImage(this.image, 0, 0, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (this.direction == "right") {
                    ctx.drawImage(this.image, 16, 0, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 32, 0, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            } else if (index == this.body.length - 1) {
                // draw tail
                const adj = this.body[index - 1]
                if (snakePart.x < adj.x) {
                    ctx.drawImage(this.image, 16, 16, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.x > adj.x) {
                    ctx.drawImage(this.image, 48, 16, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.y < adj.y) {
                    ctx.drawImage(this.image, 32, 16, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 0, 16, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            } else {
                // draw in between
                const toTail = this.body[index + 1]
                const toHead = this.body[index - 1]
                if (toHead.x > snakePart.x && toTail.y > snakePart.y || toTail.x > snakePart.x && toHead.y > snakePart.y) {
                    ctx.drawImage(this.image, 16, 32, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (toHead.y < snakePart.y && toTail.x > snakePart.x || toTail.y < snakePart.y && toHead.x > snakePart.x) {
                    ctx.drawImage(this.image, 0, 32, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.y == toTail.y && snakePart.y == toHead.y) {
                    ctx.drawImage(this.image, 16, 48, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (toHead.x < snakePart.x && toTail.y > snakePart.y || toTail.x < snakePart.x && toHead.y > snakePart.y) {
                    ctx.drawImage(this.image, 32, 32, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else if (snakePart.x == toTail.x && snakePart.x == toHead.x) {
                    ctx.drawImage(this.image, 0, 48, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                } else {
                    ctx.drawImage(this.image, 48, 32, 16, 16, this.body[index].x * gridSize, this.body[index].y * gridSize, gridSize, gridSize);
                }
            }
        }
    }
}
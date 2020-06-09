class Consumable {
    constructor(imageFile, x = Math.floor(Math.random() * 20), y = Math.floor(Math.random() * 20)){
        this.image = this.loadImage(imageFile)
        this.x = x
        this.y = y
    }

    loadImage(imageFile) {
        const image = new Image();
        image.onload = function() {}
        image.src = imageFile;
    
        return image;
    }

    draw() {
        ctx.drawImage(this.image, this.x * gridSize, this.y * gridSize, gridSize, gridSize)
    }

    spawn() {
      this.x = Math.floor(Math.random() * 20)
      this.y = Math.floor(Math.random() * 20)
    }
}
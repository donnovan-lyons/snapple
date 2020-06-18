function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

class Audio {
    constructor(source)  {
        this.audio = document.createElement("audio");
        this.audio.src = source;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
        document.body.appendChild(this.audio);
    }

    set loop(boolean) {
        if (boolean == true) {
            this.audio.loop = true
        } else {
            this.audio.loop = false
        }
    }
}

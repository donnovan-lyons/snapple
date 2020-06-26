class Audio {
    constructor(source)  {
        // creates HTML element with attributes and appends to DOM
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

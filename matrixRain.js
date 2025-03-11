class MatrixRain{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.context = this.canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.colors = ["#0F0", "#F00", "#00F", "#FFF", "#FFD700"]; // Green, Red, Blue, White, Gold
        this.activeColorIndex = 0 

        // Listen for mouse clicks and touch events to switch colors
        document.addEventListener("click", () => {
            this.activeColorIndex = (this.activeColorIndex + 1) % this.colors.length;
        });

        // document.addEventListener("touchstart", () => {
        //     this.activeColorIndex = (this.activeColorIndex + 1) % this.colors.length;
        // });
        // //adjust on window resize
        window.addEventListener("resize", () => this.resize())

        this.characters = [] 
        //for katakana
        for (let i = 0x30A0; i <= 0x30FF; i++){
            this.characters.push(String.fromCharCode(i))
        }
        // Hiragana: U+3040 to U+309F
        // for (let i = 0x3040; i <= 0x309F; i++) {
        //     this.characters.push(String.fromCharCode(i));
        // }
        this.fontSize = 20
        this.columns = Math.floor(this.canvas.width / this.fontSize) //number of possible columns per screen width
        this.drops = Array(this.columns).fill(0) // initially [0,0,0,0... for each column]
    }
    resize(){
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.columns = Math.floor(this.canvas.width / this.fontSize)
        this.drops = Array(this.columns).fill(0)
    }

    draw(){
        this.context.fillStyle = "rgba(0,0,0, 0.07)"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)


        this.context.fillStyle = this.colors[this.activeColorIndex]
        this.context.font = `${this.fontSize}px monospace`
    
        for (let i = 0; i < this.columns; i++){
            const char = this.characters[Math.floor(Math.random() * this.characters.length)]

            this.context.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize)

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.95){
                this.drops[i] = 0 
            }

            this.drops[i]++
        }
    }
    start(){
        setInterval(() => this.draw(), 50); //calling draw every 50 milliseconds
    }
}

const matrixRain = new MatrixRain("matrixCanvas")
console.log(matrixRain.characters)
matrixRain.start()
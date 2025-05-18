class SandGrain {
    constructor(xpoint, ypoint, size){
        this.xpoint = xpoint
        this.ypoint = ypoint
        this.status = 0
        this.size = size
    }

    draw(context) {
        context.fillStyle = value == 0 ? "white" : "black"
        context.strokeStyle = "black"
        context.fillRect(this.xpoint * size, this.ypoint * size, size, size)
        context.strokeRect(this.xpoint * size, this.ypoint * size, size, size)

    }
}
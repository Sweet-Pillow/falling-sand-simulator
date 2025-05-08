function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function square(canvas) {

    const square = {
        x: 100,
        y: 100,
        size: 10,
        color: 'blue'
    };

    canvas.fillStyle = square.color
    canvas.strokeRect(square.x, square.y, square.size, square.size)

}

function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = (new Array(rows)).fill(0)
    }

    return arr
}


function setup() {
    let grid
    const width = 400
    const height = 600

    const canvas = createCanvas(width, height)

    square(canvas)

}

setup()
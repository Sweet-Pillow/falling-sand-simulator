function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function createGridCells() {
    const _gridCells = []

    for (let i = 0; i < cols; i ++) {
        for (let j = 0; j < rows; j++) {
            _gridCells.push({
                x: i * squareSize,
                y: j * squareSize,
                color: 'white'
            })
        }
    }

    return _gridCells
}

function drawGrid() {
    for (const square of gridCells) {
        ctx.fillStyle = square.color
        ctx.strokeStyle = "black"
        ctx.fillRect(square.x, square.y, squareSize, squareSize)
        ctx.strokeRect(square.x, square.y, squareSize, squareSize)
    }
}

function toggleColor(clickedSquare) {
    clickedSquare.color = clickedSquare.color === "white" ? "black" : "white"
}


function make2DArray(cols, rows) {
    let arr = new Array(cols)

    for (let i = 0; i < arr.length; i++) {
        arr[i] = (new Array(rows)).fill(0)
    }

    return arr
}

const width = 400
const height = 600

const squareSize = 20

const cols = width / squareSize
const rows = height / squareSize

const gridCells = createGridCells()
const ctx = createCanvas(width, height)

const arrPos = make2DArray(cols, rows)

ctx.canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - ctx.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - ctx.canvas.getBoundingClientRect().top;

    const clikedSquare = gridCells.find(
        (square) =>
            mouseX >= square.x &&
            mouseX <= square.x + squareSize &&
            mouseY >= square.y &&
            mouseY <= square.y + squareSize
    )

    if (clikedSquare) {
        toggleColor(clikedSquare)

        let arrPosI = (mouseX - (mouseX % squareSize)) / squareSize
        let arrPosJ = (mouseY - (mouseY % squareSize)) / squareSize

        arrPos[arrPosI][arrPosJ] = 1
    }

    drawGrid()
})

drawGrid()

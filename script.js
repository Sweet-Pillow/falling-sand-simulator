function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function createGridCells() {
    const _gridCells = []

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            _gridCells.push({
                x: i * squareSize,
                y: j * squareSize,
                status: 0
            })
        }
    }

    return _gridCells
}

function drawGrid() {

    for (const square of gridCells) {
        ctx.fillStyle = square.status == 0 ? "white" : "black"
        ctx.strokeStyle = "black"
        ctx.fillRect(square.x, square.y, squareSize, squareSize)
        ctx.strokeRect(square.x, square.y, squareSize, squareSize)
    }
}

function toggleColor(clickedSquare) {
    clickedSquare.status = 1
}

function make2DArray(cols, rows) {
    let arr = new Array(rows)

    for (let i = 0; i < arr.length; i++) {
        arr[i] = (new Array(cols)).fill(0)
    }

    return arr
}

const width = 400
const height = 600

const squareSize = 200

const cols = width / squareSize
const rows = height / squareSize

const gridCells = createGridCells()
const ctx = createCanvas(width, height)

const arrPos = make2DArray(cols, rows)

drawGrid()

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

    toggleColor(clikedSquare)

    const arrPosI = (mouseY - (mouseY % squareSize)) / squareSize
    const arrPosJ = (mouseX - (mouseX % squareSize)) / squareSize

    arrPos[arrPosI][arrPosJ] = 1

    const arrPosPrev = [...arrPos]

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (arrPosPrev[i][j] && (i+1 < cols)) {
                arrPos[i][j] = 0
                arrPos[i + 1][j] = 1
                
            }
        }
    }

    setTimeout(drawGrid, 100);

})

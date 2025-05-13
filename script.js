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
    let arr = new Array(cols)

    for (let i = 0; i < arr.length; i++) {
        arr[i] = (new Array(rows)).fill(0)
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

    if (!clikedSquare) {
        return
    }

    toggleColor(clikedSquare)

    const arrPosI = (mouseX - (mouseX % squareSize)) / squareSize
    const arrPosJ = (mouseY - (mouseY % squareSize)) / squareSize

    arrPos[arrPosI][arrPosJ] = 1

    const arrPosAux = [...arrPos] 

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (arrPosAux[i][j] && (j+1 < rows)) {
                arrPos[i][j] = 0
                arrPos[i][j + 1] = 1
                
            }
        }
    }

    setTimeout(drawGrid, 100);

})

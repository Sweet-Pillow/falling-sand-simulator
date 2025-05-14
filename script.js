function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function createGridCells() {
    const _gridCells = new Map()

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            _gridCells.set([i, j], 0)
        }
    }

    return _gridCells
}

function drawGrid() {

    for (const [key, value] of gridCells) {
        ctx.fillStyle = value == 0 ? "white" : "black"
        ctx.strokeStyle = "black"
        ctx.fillRect(key[0] * squareSize, key[1] * squareSize, squareSize, squareSize)
        ctx.strokeRect(key[0] * squareSize, key[1] * squareSize, squareSize, squareSize)
    }
}

function toggleColor([posI, posJ]) {
    gridCells.set([posI, posJ], 1)
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

    const posI = (mouseX - (mouseX % squareSize)) / squareSize
    const posJ = (mouseY - (mouseY % squareSize)) / squareSize

    toggleColor([posI, posJ])

    // arrPos[posI][posJ] = 1

    // const arrPosPrev = [...arrPos]

    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         if (arrPosPrev[i][j] && (i + 1 < cols)) {
    //             arrPos[i][j] = 0
    //             arrPos[i + 1][j] = 1

    //         }
    //     }
    // }

    setTimeout(drawGrid, 100);

})

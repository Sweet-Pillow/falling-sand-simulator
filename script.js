function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function createGridCells() {
    const _gridCells = new Map()

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            _gridCells.set([i, j], 0)
        }
    }

    return _gridCells
}

function drawGrid() {

    for (const [key, value] of gridCells) {
        ctx.fillStyle = value == 0 ? "white" : "black"
        ctx.strokeStyle = "black"
        ctx.fillRect(key[1] * squareSize, key[0] * squareSize, squareSize, squareSize)
        ctx.strokeRect(key[1] * squareSize, key[0] * squareSize, squareSize, squareSize)
    }
}

function addSand([posI, posJ]) {
    gridCells.set([posI, posJ], 1)
}

function loop() {
    setInterval(() => {
        sandFall()
        drawGrid()

    }, delay)

}

function sandFall() {
    sandGrains = [...gridCells.entries()].filter(([_, value]) => value === 1)

    if (!sandGrains) return

    sandGrains.forEach(elem => {
        const x = elem[0][0]
        const y = elem[0][1]

        if (x + 2 > rows) return

        if (gridCells.get([x + 1, y]) == 1) return

        gridCells.set([x, y], 0)
        gridCells.set([x + 1, y], 1)

    });

}

const width = 400
const height = 600
const delay = 2000

const squareSize = 20

const cols = width / squareSize
const rows = height / squareSize

const ctx = createCanvas(width, height)

const gridCells = createGridCells()

drawGrid()

ctx.canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - ctx.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - ctx.canvas.getBoundingClientRect().top;

    const posI = (mouseY - (mouseY % squareSize)) / squareSize
    const posJ = (mouseX - (mouseX % squareSize)) / squareSize

    addSand([posI, posJ])

    drawGrid()

})


loop()
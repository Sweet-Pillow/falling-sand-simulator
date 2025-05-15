function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function hashKey(key) {
    if (Array.isArray(key)) {
        return JSON.stringify(key)
    }

    return JSON.parse(key)
}

function createGridCells() {
    const _gridCells = new Map()

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            _gridCells.set(hashKey([i, j]), 0)
        }
    }

    return _gridCells
}

function drawGrid() {

    for (const [key, value] of gridCells) {
        const k = hashKey(key)
        ctx.fillStyle = value == 0 ? "white" : "black"
        ctx.strokeStyle = "black"
        ctx.fillRect(k[1] * squareSize, k[0] * squareSize, squareSize, squareSize)
        ctx.strokeRect(k[1] * squareSize, k[0] * squareSize, squareSize, squareSize)
    }
}

function addSand([posI, posJ]) {
    gridCells.set(hashKey([posI, posJ]), 1)
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
        const currentKeys = hashKey(elem[0])

        const x = currentKeys[0]
        const y = currentKeys[1]

        if (x + 2 > rows) return

        if (gridCells.get([x + 1, y]) == 1) return

        gridCells.set(hashKey([x, y]), 0)
        gridCells.set(hashKey([x + 1, y]), 1)

    });

}

const width = 400
const height = 600
const delay = 1000

const squareSize = 200

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
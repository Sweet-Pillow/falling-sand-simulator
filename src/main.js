function createCanvas(gameInfos) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = gameInfos.width
    canvas.height = gameInfos.height

    return canvas.getContext("2d")
}

function createGrid(gameInfos) {
    let _gridCells = []

    for (let i = 0; i < gameInfos.rows; i++) {
        _gridCells[i] = [];
        for (let j = 0; j < gameInfos.cols; j++) {
            _gridCells[i][j] = 0
        }
    }

    return _gridCells
}

function drawGrid(gameInfos) {
    const ctx = gameInfos.ctx
    const rows = gameInfos.rows
    const cols = gameInfos.cols
    const size = gameInfos.size

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = gameInfos.gridCells[i][j] == 0 ? "white" : "black"
            ctx.strokeStyle = "black"
            ctx.fillRect(j * size, i * size, size, size)
            ctx.strokeRect(j * size, i * size, size, size)

        }
    }
}

function addSand(posI, posJ, gridCells) {
    gridCells[posI][posJ] = 1
}

function handleClick(gameInfos) {
    const ctx = gameInfos.ctx

    ctx.canvas.addEventListener('click', (event) => {
        const mouseX = event.clientX - ctx.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - ctx.canvas.getBoundingClientRect().top;

        const posI = (mouseY - (mouseY % gameInfos.size)) / gameInfos.size
        const posJ = (mouseX - (mouseX % gameInfos.size)) / gameInfos.size

        addSand(posI, posJ, gameInfos.gridCells)

    })
}

function loop(gameInfos) {

    const interval = setInterval(() => {


        const gridCellsAuxs = JSON.parse(JSON.stringify(gameInfos.gridCells))

        for (let i = 0; i < gameInfos.rows - 1; i++) {
            for (let j = 0; j < gameInfos.cols; j++) {

                //Verify if the cell has a sand
                if (gridCellsAuxs[i][j] != 1) {
                    continue
                }

                //Verify if the sand is stacked
                if (gridCellsAuxs[i + 1][j] == 1) {
                    //Verify if the sand stack has 2 height
                    if ((i + 2 < gameInfos.rows) && gridCellsAuxs[i + 2][j] == 1) {
                        if (gridCellsAuxs[i + 1][j + 1] == 1 && gridCellsAuxs[i + 1][j - 1] == 0) {
                            gameInfos.gridCells[i][j] = 0
                            gameInfos.gridCells[i + 1][j - 1] = 1
                            continue
                        }
                        if (gridCellsAuxs[i + 1][j + 1] == 0 && gridCellsAuxs[i + 1][j - 1] == 1) {
                            gameInfos.gridCells[i][j] = 0
                            gameInfos.gridCells[i + 1][j + 1] = 1
                            continue
                        }
                        if (gridCellsAuxs[i + 1][j + 1] == 0 && gridCellsAuxs[i + 1][j - 1] == 0) {

                            const direc = [-1, 1]
                            const x = Math.floor(Math.random() * 2);

                            gameInfos.gridCells[i][j] = 0
                            gameInfos.gridCells[i + 1][j + direc[x]] = 1
                            continue
                        }
                    }
                    continue
                }

                gameInfos.gridCells[i][j] = 0
                gameInfos.gridCells[i + 1][j] = 1

            }
        }

        drawGrid(gameInfos)

    }, gameInfos.delay)
}

function main() {
    const gameInfos = {
        width: 400,
        height: 600,
        delay: 100,
        size: 20,

        get cols() {
            return this.width / this.size
        },

        get rows() {
            return this.height / this.size
        },

    }

    gameInfos.ctx = createCanvas(gameInfos)

    gameInfos.gridCells = createGrid(gameInfos)

    drawGrid(gameInfos)

    handleClick(gameInfos)

    loop(gameInfos)
}

main()

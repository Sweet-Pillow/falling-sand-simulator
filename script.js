function createCanvas(width, height) {
    const canvas = document.getElementById("myCanvas")
    canvas.width = width
    canvas.height = height

    return canvas.getContext("2d")
}

function setup() {
    let grid
    const width = 400
    const height = 600

    const canvas = createCanvas(width, height)


}

setup()
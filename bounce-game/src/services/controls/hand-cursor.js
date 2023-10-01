const drawCursor = function (canvas, hands) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = 'red' // Box color
    ctx.lineWidth = 5 // Box width

    hands.forEach((hand) => {
        ctx.beginPath()
        const [x, y, width, height] = hand.bbox
        ctx.moveTo(x, y + height)
        ctx.lineTo(x + width, y + height)
        ctx.stroke()
    })
}

export { drawCursor }

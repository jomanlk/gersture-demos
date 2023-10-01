var handTrack = window.handTrack || false

const getModel = async function () {
    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6, // confidence threshold for predictions.
    }
    return await handTrack.load(modelParams)
}

const getDetector = async function () {
    const model = await getModel()
    const runDetection = async function (videoEl) {
        const predictions = await model.detect(videoEl)
        return getDetectedHands(predictions)
    }
    return runDetection
}

const getDetectedHands = function (predictions) {
    const types = ['open', 'closed']
    return predictions.filter((p) => types.indexOf(p.label) > -1)
}

export { getModel, getDetector }

const loadModel = async function () {
    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6, // confidence threshold for predictions.
    }
    return await handTrack.load(modelParams)
}

const isFaceDetectionModelLoaded = function () {
    return !!faceapi.nets.ssdMobilenetv1.params
}

const showLog = function (message) {
    $('#log').prepend(`<p>${message}</p>`)
}

const showStatus = function (message) {
    $('#status').html(`<p>${message}</p>`)
}

function getHands(predictions) {
    const types = ['open', 'closed', 'pinch', 'point', 'pointtip', 'pinchtip']
    return predictions.filter((p) => types.indexOf(p.label) > -1)
}

const setVideoDimensions = async function (videoEl) {
    const $videoEl = $(videoEl)
    // $videoEl.height(`${$videoEl.height()}px`)
    // $videoEl.width(`${$videoEl.width()}px`)

    videoEl.width = videoEl.width || 640
    videoEl.height = videoEl.width * (videoEl.videoHeight / videoEl.videoWidth) //* (3 / 4);
    videoEl.style.height = '20px'
}

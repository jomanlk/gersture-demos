const pageLoaded = async function (videoEl, canvasEl) {
    await startWebcam(videoEl)
    const model = await loadModel()
    //await handlePlayback(model, videoEl, canvasEl)
    runDetection(model, videoEl, canvasEl)
}

const handlePlayback = async function (model, videoEl, canvasEl) {
    const status = await handTrack.startVideo(videoEl)
    if (status) {
        showLog('Video started. Now tracking')
        runDetection(model, videoEl, canvasEl)
    } else {
        showLog('Please enable video')
    }
}

const startWebcam = async function (video) {
    return new Promise(function (resolve, reject) {
        // Video must have height and width in order to be used as input for NN
        // Aspect ratio of 3/4 is used to support safari browser.

        if (!video) {
            resolve({ status: false, msg: 'please provide a valid video element' })
        }

        video.width = video.width || $(video).parent().width()
        video.height = video.width * (video.videoHeight / video.videoWidth) //* (3 / 4);
        //video.style.height = '20px'

        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: 'user',
                },
            })
            .then((stream) => {
                window.localStream = stream
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.height = video.width * (video.videoHeight / video.videoWidth) //* (3 / 4);
                    video.style.height = parseInt(video.style.width) * (video.videoHeight / video.videoWidth).toFixed(2) + 'px'
                    video.play()
                    resolve({ status: true, msg: 'webcam successfully initiated.' })
                }
            })
            .catch(function (err) {
                resolve({ status: false, msg: err })
            })
    })
}

const runDetection = async function (model, videoEl, canvasEl) {
    const predictions = await model.detect(videoEl)
    const hands = getHands(predictions)
    if (hands.length) {
        console.log(hands)
        showStatus(`${hands.length} visible`)
    } else {
        showStatus('no hands visible')
    }
    model.renderPredictions(hands, canvasEl, canvasEl.getContext('2d'), videoEl)

    requestAnimationFrame(() => {
        runDetection(model, videoEl, canvasEl)
    })
}

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

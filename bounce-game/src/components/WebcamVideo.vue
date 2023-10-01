<template>
    <video ref="inputVideo" autoplay muted playsinline></video>
</template>

<script setup>
import { unref, ref, onMounted } from 'vue'

const emit = defineEmits(['videoReady'])
const inputVideo = ref(null)

onMounted(async () => {
    await startWebcam(inputVideo.value)
    emit('videoReady', unref(inputVideo))
})
</script>

<script>
const startWebcam = async function (video) {
    return new Promise(function (resolve, reject) {
        // Video must have height and width in order to be used as input for NN
        // Aspect ratio of 3/4 is used to support safari browser.

        if (!video) {
            resolve({
                status: false,
                msg: 'please provide a valid video element',
            })
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
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.height =
                        video.width * (video.videoHeight / video.videoWidth) //* (3 / 4);
                    video.style.height =
                        parseInt(video.style.width) *
                            (video.videoHeight / video.videoWidth).toFixed(2) +
                        'px'
                    video.play()
                    resolve({
                        status: true,
                        msg: 'webcam successfully initiated.',
                    })
                }
            })
            .catch(function (err) {
                resolve({ status: false, msg: err })
            })
    })
}
</script>

<style lang="scss" scoped></style>

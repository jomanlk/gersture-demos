<template>
    <div class="row">
        <div class="col-12">
            <div class="video-container">
                <WebcamVideo @videoReady="videoReadyHandler" />
                <Canvas v-if="videoEl" :videoEl="videoEl" />
            </div>
        </div>

        <div class="col-12 mt-4">
            <div id="status">Loading...</div>
            <div id="log"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WebcamVideo from '../components/WebcamVideo.vue'
import Canvas from '../components/canvas/Canvas.vue'

const videoEl = ref(null)
const showCanvas = ref(false)

const videoReadyHandler = function (incomingVideoEl) {
    videoEl.value = incomingVideoEl
    showCanvas.value = true
}
</script>

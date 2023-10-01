<template>
    <canvas :width="props.width" :height="props.height" ref="canvas" />
    <div>{{ hands.length }} bounds found</div>
    <div class="controls">
        <button
            v-if="doKeepWatching"
            @click.prevent="doKeepWatching = false"
            class="btn btn-info"
        >
            Stop watching
        </button>
        <button
            v-if="!doKeepWatching"
            @click.prevent="startWatching"
            class="btn btn-primary"
        >
            Start watching
        </button>
    </div>
</template>

<script setup>
import { defineProps, ref, toRef, watch, onMounted } from 'vue'
import { getDetector } from '../../services/handtrack/handtrack'
import { drawCursor } from '../../services/controls/hand-cursor'

const props = defineProps(['videoEl'])
const hands = ref([])
const doKeepWatching = ref(true)
const canvas = ref(null)
const runDetection = await getDetector()

onMounted(() => {
    canvas.value.width = props.videoEl.width
    canvas.value.height = props.videoEl.height

    keepWatching(props.videoEl, runDetection)
})

const keepWatching = async function (videoEl, runDetection) {
    if (!doKeepWatching.value) {
        return false
    }
    hands.value = await runDetection(videoEl)
    if (hands.value && hands.value.length > 0) {
        drawCursor(canvas.value, hands.value)
    }
    requestAnimationFrame(() => keepWatching(videoEl, runDetection))
}
const startWatching = () => {
    doKeepWatching.value = true
    keepWatching(props.videoEl, runDetection)
}
</script>

<style lang="scss" scoped>
canvas {
    background-color: #fff;
}
</style>

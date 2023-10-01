<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">FaceJS</a>
        </div>
    </nav>

    <div class="container my-5">
        <Suspense>
            <RouterView />
        </Suspense>
    </div>
</template>

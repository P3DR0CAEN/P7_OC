<script setup>
import logoJSON from "../../assets/Logo_Groupomania.json";
</script>

<template>
    <header>
        <a href="/">
            <Vue3Lottie :animationData="logoJSON" class="img-background" />
        </a>
    </header>
</template>

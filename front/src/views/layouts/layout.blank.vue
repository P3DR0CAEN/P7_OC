<script setup>
defineProps({
    mainClass: String,
});
</script>

<template>
    <main :class="mainClass">
        <slot />
    </main>
</template>

<script setup>
import CHeader from "@/views/components/header.vue";
import CFooter from "@/views/components/footer.vue";

defineProps({
    mainClass: String,
});
</script>

<template>
    <c-header></c-header>
    <main :class="mainClass">
        c'est le layout default
        <slot />
    </main>
    <c-footer />
</template>

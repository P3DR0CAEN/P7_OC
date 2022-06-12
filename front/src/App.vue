<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

import defaultLayout from "@/views/layouts/layout.default.vue";
import blankLayout from "@/views/layouts/layout.blank.vue";

const route = useRoute();

const layout = function () {
    const Layout = route.meta.layout || null;
    if (Layout == "blank") {
        return blankLayout;
    }
    return defaultLayout;
};

const className = function () {
    return route.meta.class || null;
};

onMounted(() => {
    layout();
});
</script>

<template>
    <component :is="layout()" :mainClass="className()">
        <router-view />
    </component>
</template>

<style lang="scss">
@import "@/sass/app.scss";
</style>

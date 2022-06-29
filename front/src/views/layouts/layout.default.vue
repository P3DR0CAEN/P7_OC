<script setup>
import CHeader from "@/views/components/header.vue";
import CFooter from "@/views/components/footer.vue";

import { RouterLink } from "vue-router";
import router from "../../router";
import axios from "axios";

import { useStoreUser } from "../../store";

defineProps({
    mainClass: String,
});

const user = useStoreUser();

user.refresh();

function logout() {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("AuthToken");
    router.push("/auth");
    return;
}
</script>

<template>
    <div v-if="user.data === undefined">chargement de la page</div>
    <div v-else-if="user.data == null"></div>
    <div v-else>
        <c-header></c-header>
        <main :class="mainClass">
            <div class="left">
                <div class="left__content">
                    <div class="user_icon">
                        <img :src="user.data.image" alt="" />
                    </div>
                    <div class="name">
                        {{ user.data.firstName }}
                        {{ user.data.lastName }}
                    </div>
                    <div class="menu">
                        <RouterLink class="menu__item" :to="{ name: 'home' }">
                            <i class="las la-home"></i>Accueil
                        </RouterLink>
                        <RouterLink class="menu__item" :to="{ name: 'profil' }"
                            ><i class="las la-user"></i> Profil</RouterLink
                        >
                        <RouterLink
                            class="menu__item"
                            :to="{ name: 'settings' }"
                        >
                            <i class="las la-cog"></i>Paramètres
                        </RouterLink>
                        <button @click="logout" class="button">
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
            <div class="content">
                <slot />
            </div>
            <div class="right"></div>
        </main>
        <c-footer />
    </div>
</template>

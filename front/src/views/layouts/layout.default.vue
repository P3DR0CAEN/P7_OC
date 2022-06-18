<script setup>
import CHeader from "@/views/components/header.vue";
import CFooter from "@/views/components/footer.vue";

import { ref, reactive } from "vue";
import { RouterLink } from "vue-router";
import router from "../../router";
import axios from "axios";
import { onMounted } from "vue";

defineProps({
    mainClass: String,
});

const user = ref({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    image: undefined,
});

function getUserInfos() {
    axios
        .get("user/account")
        .then((response) => {
            user.value.firstName = response.data.firstName;
            user.value.lastName = response.data.lastName;
            user.value.email = response.data.email;
            user.value.image = response.data.image;
        })
        .catch((error) => {
            router.push("/auth");
        });
}

onMounted(() => {
    getUserInfos();
});

function logout() {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("AuthToken");
    router.push("/auth");
    return;
}
</script>

<template>
    <c-header></c-header>
    <main :class="mainClass">
        <div class="left">
            <div class="left__content">
                <div class="user_icon">
                    <img
                        :src="
                            'http://localhost:4000/images/users/' + user.image
                        "
                        alt=""
                    />
                </div>
                <div class="name">
                    {{ user.firstName }}
                    {{ user.lastName }}
                </div>
                <div class="menu">
                    <RouterLink class="menu__item" :to="{ name: 'home' }">
                        <i class="las la-home"></i>Accueil
                    </RouterLink>
                    <RouterLink class="menu__item" :to="{ name: 'profil' }"
                        ><i class="las la-user"></i> Profil</RouterLink
                    >
                    <RouterLink class="menu__item" :to="{ name: 'settings' }">
                        <i class="las la-cog"></i>Paramètres
                    </RouterLink>
                    <button @click="logout" class="button">Déconnexion</button>
                </div>
            </div>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="right"></div>
    </main>
    <c-footer />
</template>

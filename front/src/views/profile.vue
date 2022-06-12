<script setup>
import { ref, reactive } from "vue";
import router from "../router";
import axios from "axios";
import { onMounted } from "vue";

const user = ref({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    photo: undefined,
});

console.log(user);

function getUserInfos() {
    axios
        .get("auth/account")
        .then((response) => {
            console.log(response);
            user.value.firstName = response.data.firstName;
            user.value.lastName = response.data.lastName;
            user.value.email = response.data.email;
        })
        .catch((error) => {
            console.log(error);
            router.push("/");
        });
}

function logout() {
    axios.defaults.headers.common["Authorization"] = "";
    router.push("/");
    return;
}

onMounted(() => {
    getUserInfos();
});
</script>

<template>
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <p class="card__subtitle">Voilà donc qui je suis...</p>
        <p>{{ user.firstName }} {{ user.lastName }} {{ user.email }}</p>
        <img :src="user.photo" />
        <div class="form-row">
            <button @click="logout" class="button">Déconnexion</button>
        </div>
    </div>
</template>

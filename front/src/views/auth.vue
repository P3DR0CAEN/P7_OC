<script setup>
import { ref, reactive } from "vue";
import router from "../router";
import axios from "axios";

const mode = reactive({
    value: "login",
    switchToCreateAccount() {
        mode.value = "create";
    },
    switchToLogin() {
        mode.value = "login";
    },
});

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");

function register() {
    console.log("event axiosPost");
    // POST request using axios with error handling
    const data = {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
    };
    axios
        .post("auth/signup", data)
        .then((response) => {
            console.log(response);
            login();
            return;
        })
        .catch((error) => {
            console.error("Il y a une erreur !", error.response.data.error);

            document.getElementById("respError").innerHTML =
                error.response.data.error;
        });
}

function login() {
    const data = {
        email: email.value,
        password: password.value,
    };
    axios
        .post("auth/login", data)
        .then((response) => {
            console.log(response);
            const authToken = response.data.token;
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + authToken;
            router.push("/profile");
            return;
        })
        .catch((error) => {
            console.error("Il y a une erreur !", error);

            if (typeof error.response !== "undefined") {
                document.getElementById("respError").innerHTML =
                    error.response.data.error;
            } else {
                document.getElementById("respError").innerHTML =
                    "Une erreur est survenue !";
            }
        });
}
</script>

<template>
    <div class="form">
        <img class="form__image" :src="`/src/assets/logo.svg`" alt="" />
        <h1 class="form__title" v-if="mode.value == 'login'">Connexion</h1>
        <h1 class="form__title" v-else>Inscription</h1>
        <p class="form__subtitle" v-if="mode.value == 'login'">
            Tu n'as pas encore de compte ?
            <span class="form__action" @click="mode.switchToCreateAccount()"
                >Créer un compte</span
            >
        </p>
        <p class="form__subtitle" v-else>
            Tu as déjà un compte ?
            <span class="form__action" @click="mode.switchToLogin()"
                >Se connecter</span
            >
        </p>
        <div class="form-row">
            <input v-model="email" type="email" placeholder="Adresse mail" />
        </div>
        <div class="form-row" v-if="mode.value == 'create'">
            <input v-model="firstName" type="text" placeholder="Prénom" />
            <input v-model="lastName" type="text" placeholder="Nom" />
        </div>
        <div class="form-row">
            <input
                v-model="password"
                type="password"
                placeholder="Mot de passe"
            />
        </div>
        <div class="form-row">
            <button
                @click="login()"
                class="button"
                v-if="mode.value == 'login'"
            >
                <span>Connexion</span>
            </button>
            <button @click="register()" class="button" v-else>
                <span>Créer mon compte</span>
            </button>
        </div>
        <div id="respError" style="color: red; text-align: center"></div>
    </div>
</template>

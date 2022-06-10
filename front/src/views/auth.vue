<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import axios from "axios";

const mode = reactive({
    value: "login",
    switchToCreateAccount() {
        this.value = "create";
    },
    switchToLogin() {
        this.value = "login";
    },
});

const email = "";
const prenom = "";
const nom = "";
const password = "";

function axiosPost() {
    console.log("event axiosPost");
    // POST request using axios with error handling
    const req = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    axios
        .post("http://localhost:4000/api/auth/signup", req)
        .then((response) => {
            console.log("post effectué");
        })
        .catch((error) => {
            console.error("Il y a une erreur !", error.response.data);

            if (error.response.data.errno == 1062) {
                console.log("adresse email deja prise");
                document.getElementById("Error").innerHTML =
                    "L'adresse email est déjà prise";
            }

            this.errorMessage = error.message;
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
            <input v-model="email" type="text" placeholder="Adresse mail" />
        </div>
        <div class="form-row" v-if="mode.value == 'create'">
            <input v-model="prenom" type="text" placeholder="Prénom" />
            <input v-model="nom" type="text" placeholder="Nom" />
        </div>
        <div class="form-row">
            <input
                v-model="password"
                type="password"
                placeholder="Mot de passe"
            />
        </div>
        <div
            class="form-row"
            v-if="mode.value == 'login' && status == 'error_login'"
        >
            Adresse mail et/ou mot de passe invalide
        </div>
        <div
            class="form-row"
            v-if="mode.value == 'create' && status == 'error_create'"
        >
            Adresse mail déjà utilisée
        </div>
        <div class="form-row">
            <button
                @click="login()"
                class="button"
                :class="{ 'button--disabled': !validatedFields }"
                v-if="mode.value == 'login'"
            >
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
            <button
                @click="createAccount()"
                class="button"
                :class="{ 'button--disabled': !validatedFields }"
                v-else
            >
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>Créer mon compte</span>
            </button>
        </div>
    </div>
</template>

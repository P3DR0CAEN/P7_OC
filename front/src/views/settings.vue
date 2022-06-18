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

function getUserInfos() {
    axios
        .get("user/account")
        .then((response) => {
            user.value.firstName = response.data.firstName;
            user.value.lastName = response.data.lastName;
            user.value.email = response.data.email;
        })
        .catch((error) => {
            router.push("/auth");
        });
}

function updateUserInfos() {
    var uploadUserImage = document.querySelector("#user_image");

    const data = {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        UploadDestination: "users",
        image: uploadUserImage.files[0],
    };

    axios
        .put("user/account", data, {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

onMounted(() => {
    getUserInfos();
});
</script>

<template>
    <div class="settings">
        <h1 class="profil__title">Mes informations :</h1>
        <div class="form-row">
            image:
            <input
                type="file"
                name="user_image"
                id="user_image"
                style="flex: inherit"
            />
        </div>
        <div class="form-row">
            Prénom:
            <input v-model="user.firstName" type="text" placeholder="Prénom" />
        </div>
        {{ user.firstName }}
        <div class="form-row">
            Nom:
            <input v-model="user.lastName" type="text" placeholder="Nom" />
        </div>
        <div class="form-row">
            Email:
            <input v-model="user.email" type="text" placeholder="Email" />
        </div>

        <div class="form-row">
            <button class="button" @click="updateUserInfos()">
                Mettre à jour
            </button>
        </div>
    </div>
</template>

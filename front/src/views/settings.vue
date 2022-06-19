<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useStoreUser } from "../store";
/* import apiUpdateUser from "../api/user/user.update"; */

const user = useStoreUser();

const dataForm = reactive({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
});

function updateUserInfos() {
    var uploadUserImage = document.querySelector("#user_image");

    const data = {
        firstName: dataForm.firstName,
        lastName: dataForm.lastName,
        email: dataForm.email,
        UploadDestination: "users",
        image: uploadUserImage.files[0],
    };
    /* apiUpdateUser(data); */
    axios
        .put("user/account", data, {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        })
        .then((response) => {
            user.refresh();
        })
        .catch((error) => {
            console.log(error);
        });
}
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
            <input
                v-model="dataForm.firstName"
                type="text"
                placeholder="Prénom"
            />
        </div>
        <div class="form-row">
            Nom:
            <input v-model="dataForm.lastName" type="text" placeholder="Nom" />
        </div>
        <div class="form-row">
            Email:
            <input v-model="dataForm.email" type="text" placeholder="Email" />
        </div>

        <div class="form-row">
            <button class="button" @click="updateUserInfos()">
                Mettre à jour
            </button>
        </div>
    </div>
</template>

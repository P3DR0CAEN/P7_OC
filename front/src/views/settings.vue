<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useStoreUser } from "../store";
import apiUpdateUser from "../api/user/user.update";

const authUser = useStoreUser();

const inputUserImage = ref(null);

const dataForm = reactive({
    firstName: authUser.data.firstname,
    lastName: authUser.data.lastname,
    email: authUser.data.email,
    image: authUser.data.image,
});

function updateUserInfos() {
    const data = {
        firstName: dataForm.firstName,
        lastName: dataForm.lastName,
        email: dataForm.email,
        image: inputUserImage.value.files[0],
    };
    apiUpdateUser(data)
        .then((response) => {
            document
                .querySelectorAll(".response__error")
                .forEach((el) => el.remove());
            authUser.refresh();
        })
        .catch((error) => {
            document
                .getElementById("button")
                .insertAdjacentHTML(
                    "afterend",
                    '<div class="response__error">' +
                        error.response.data.error +
                        "</div>"
                );
        });
}

const updateUserPreviewImg = () => {
    document.getElementById("userPreviewImg").src = window.URL.createObjectURL(
        inputUserImage.value.files[0]
    );
};
</script>

<template>
    <div class="settings">
        <h1 class="profil__title">Mes informations :</h1>
        image:
        <div class="profil__image">
            <img
                :src="dataForm.image"
                id="userPreviewImg"
                alt="image utilisateur"
            />
            <label class="user_image_btn" for="user_image"
                ><i class="las la-edit"></i
            ></label>
            <input
                type="file"
                name="user_image"
                id="user_image"
                ref="inputUserImage"
                hidden
                @change="updateUserPreviewImg()"
            />
        </div>
        <div class="form-row"></div>
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

        <div class="form-row" id="button">
            <div class="c-button alt" @click="updateUserInfos()">
                Mettre à jour
            </div>
        </div>
    </div>
</template>

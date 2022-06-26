<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUser } from "../store";
import GetUserProfil from "../api/user/user.profil";

import postComponent from "./components/post.vue";

const user = useStoreUser();
const route = useRoute();

let userId = user.data.id;

if (route.params.id) {
    userId = route.params.id;
}

const userProfil = ref(null);

const updateProfil = async function () {
    userProfil.value = await GetUserProfil(userId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

onMounted(async () => {
    updateProfil();
});
</script>

<template>
    <div v-if="userProfil === undefined">chargement de la page</div>
    <div v-else-if="userProfil == null"></div>
    <div v-else>
        <div class="content">
            <div class="profil__banner">
                <div class="profil__picture">
                    <img
                        :src="
                            'http://localhost:4000/images/users/' +
                            userProfil.image
                        "
                        alt="image utilisateur"
                    />
                </div>
                <div class="profil__name">
                    {{ userProfil.firstname }}
                    {{ userProfil.lastname }}
                </div>
            </div>
            <div class="post_list">
                <template v-for="post in userProfil.allPosts">
                    <postComponent
                        :post="post"
                        :user="user"
                        @update-posts="updateProfil()"
                    ></postComponent>
                </template>
            </div>
        </div>
    </div>
</template>

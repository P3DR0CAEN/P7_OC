<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUser } from "../store";
import { GetUserProfil } from "../api/user/user.profil";
import { GetUserPosts } from "../api/user/user.profil";

import postComponent from "./components/post.vue";

const authUser = useStoreUser();
const route = useRoute();

let userId = authUser.data.id;

if (route.params.id) {
    userId = route.params.id;
}

const userProfil = ref(null);
const userPosts = ref(null);

const updateProfil = async function () {
    userProfil.value = await GetUserProfil(userId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    userPosts.value = await GetUserPosts(userId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

const viewPosts = reactive({
    value: "all",
    switchViewPostToLiked() {
        viewPosts.value = "liked";
    },
    switchViewPostToAll() {
        viewPosts.value = "all";
    },
});

onMounted(async () => {
    updateProfil();
});
</script>

<template>
    <div v-if="userProfil === undefined">chargement du profil utilisateur</div>
    <div v-else-if="userProfil == null"></div>
    <div v-else>
        <div class="content">
            <div class="profil__banner">
                <div class="profil__picture">
                    <img :src="userProfil.image" alt="image utilisateur" />
                </div>
                <div class="profil__name">
                    {{ userProfil.firstname }}
                    {{ userProfil.lastname }}
                </div>
            </div>
            <div class="profil__buttons">
                <div
                    class="button"
                    @click="viewPosts.switchViewPostToAll()"
                    v-bind:class="viewPosts.value == 'all' ? 'active' : ''"
                >
                    Posts créés / partagés
                </div>
                <div
                    class="button"
                    @click="viewPosts.switchViewPostToLiked()"
                    v-bind:class="viewPosts.value == 'liked' ? 'active' : ''"
                >
                    Posts likés
                </div>
            </div>

            <div v-if="userPosts === undefined">chargement des posts</div>
            <div v-else-if="userPosts == null"></div>
            <div v-else>
                <div class="post_list" v-if="viewPosts.value == 'all'">
                    <template v-for="post in userPosts.All">
                        <postComponent
                            :post="post"
                            :authUser="authUser"
                            :userProfil="userProfil"
                            @update-posts="updateProfil()"
                        ></postComponent>
                    </template>
                </div>
                <div class="post_list" v-if="viewPosts.value == 'liked'">
                    <template v-for="post in userPosts.Liked">
                        <postComponent
                            :post="post"
                            :authUser="authUser"
                            :userProfil="userProfil"
                            @update-posts="updateProfil()"
                        ></postComponent>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

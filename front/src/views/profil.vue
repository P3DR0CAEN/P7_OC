<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUser } from "../store";
import { GetUserProfil } from "../api/user/user.profil";
import { GetUserPosts } from "../api/user/user.profil";
import moment from "moment";

import postComponent from "./components/post.vue";

const authUser = useStoreUser();
const route = useRoute();

let userId = authUser.data.id;

if (route.params.id) {
    userId = route.params.id;
}

const userProfil = ref(null);
const userPosts = ref(null);

const formatDate = function (date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
};

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
                <div class="profil__banner__picture">
                    <div class="profil__banner__picture__img">
                        <img :src="userProfil.image" alt="image utilisateur" />
                    </div>
                </div>
                <div class="profil__banner__content">
                    <div class="profil__banner__content__infos">
                        <span>
                            {{ userProfil.firstname }}
                            {{ userProfil.lastname }} </span
                        ><br />
                        inscrit depuis le
                        {{ formatDate(userProfil.created_at) }}
                        <br />
                        email :
                        {{ userProfil.email }}
                    </div>
                    <div class="profil__banner__content__buttons">
                        <div
                            class="c-button"
                            @click="viewPosts.switchViewPostToAll()"
                        >
                            <div
                                class="left"
                                v-bind:class="
                                    viewPosts.value == 'all' ? 'active' : ''
                                "
                            >
                                Posts créés / partagés
                            </div>
                            <div class="right">z</div>
                        </div>
                        <div
                            class="c-button"
                            @click="viewPosts.switchViewPostToLiked()"
                        >
                            <div
                                class="left"
                                v-bind:class="
                                    viewPosts.value == 'liked' ? 'active' : ''
                                "
                            >
                                Posts likés
                            </div>
                            <div class="right">h</div>
                        </div>
                    </div>
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

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUser } from "../store";
import GetUserProfil from "../api/user/user.profil";

import apiPostDelete from "../api/post/post.delete";
import apiPostShare from "../api/post/post.share";

import moment from "moment";

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

const deletePost = function (id) {
    apiPostDelete(id)
        .then((response) => {
            updateProfil();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const sharePost = function (id) {
    apiPostShare(id)
        .then((response) => {
            updateProfil();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const formatDate = function (date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
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
                        alt=""
                    />
                </div>
                <div class="profil__name">
                    {{ userProfil.firstname }}
                    {{ userProfil.lastname }}
                </div>
            </div>
            <div class="post_list">
                <template v-for="post in userProfil.allPosts">
                    <div class="post">
                        <div
                            v-if="post.User.id == user.data.id"
                            class="post__remove"
                            @click="deletePost(post.id)"
                        >
                            <i class="las la-times-circle"></i>
                        </div>
                        <div class="post__left">
                            <div class="user_icon">
                                <img
                                    :src="`http://localhost:4000/images/users/${post.User.image}`"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="post__content">
                            <div class="post__content__user_name">
                                <a :href="'/profil/' + post.User.id"
                                    >{{ post.User.firstname }}
                                    {{ post.User.lastname }}</a
                                >
                                <span
                                    v-if="post.shared_posts"
                                    class="post__content__date"
                                >
                                    <i class="las la-share"></i>
                                </span>

                                <br />
                                <span class="post__content__date"
                                    >le {{ formatDate(post.created_at) }}</span
                                >
                            </div>
                            <div class="post__content__text">
                                {{ post.content }}
                            </div>
                            <div v-if="post.image" class="post__content__image">
                                <img
                                    :src="`http://localhost:4000/images/posts/${post.image}`"
                                    alt=""
                                />
                            </div>

                            <div class="post__content__actions">
                                <div class="post__content__actions__like">
                                    <i class="las la-thumbs-up"></i>
                                </div>
                                <div class="post__content__actions__comment">
                                    <i class="las la-comment-alt"></i>
                                </div>
                                <div
                                    class="post__content__actions__share"
                                    v-bind:class="
                                        post.sharedBy.filter(
                                            (e) => e.id === user.data.id
                                        ).length > 0
                                            ? 'shared'
                                            : ''
                                    "
                                    @click="sharePost(post.id)"
                                >
                                    <i class="las la-share"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

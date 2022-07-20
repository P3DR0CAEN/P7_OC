<script setup>
import { ref, reactive, toRefs } from "vue";
import formatDate from "../../lib/formatDate";
import apiPostDelete from "../../api/post/post.delete";

defineProps(["post", "authUser", "userProfil", "isModalVisible"]);
const emit = defineEmits(["switchModalVisibility", "updatePosts"]);

const switchModalVisibility = () => emit("switchModalVisibility");

const deletePost = function (id) {
    apiPostDelete(id)
        .then((response) => {
            updatePosts();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const updatePosts = function () {
    emit("updatePosts");
};
</script>

<template>
    <div
        v-if="post"
        class="overlay"
        v-bind:class="isModalVisible.value ? 'visible' : ''"
    >
        <div class="popup">
            <h2>Voulez vous vraiment supprimer ceci ?</h2>
            <div class="popup__close" @click="switchModalVisibility()">
                &times;
            </div>
            <div class="popup__content">
                <div class="post">
                    <span v-if="post.shared_posts" class="post__share">
                        <i class="las la-share"></i> {{ userProfil.firstname }}
                        {{ userProfil.lastname }} à partager ceci
                    </span>
                    <div class="post__left">
                        <div class="user_icon">
                            <img
                                :src="`${post.User.image}`"
                                alt="image utilisateur"
                            />
                        </div>
                    </div>
                    <div class="post__content">
                        <div class="post__content__user_name">
                            <a :href="'/profil/' + post.User.id"
                                >{{ post.User.firstname }}
                                {{ post.User.lastname }}</a
                            >
                            <br />
                            <span class="post__content__date"
                                >le {{ formatDate(post.created_at) }}</span
                            >
                        </div>
                        <div class="post__content__text">
                            {{ post.content }}
                        </div>
                        <div
                            v-if="post.image"
                            class="post__content__image"
                            v-bind:class="post.image ? 'active' : ''"
                        >
                            <img :src="post.image" alt="" />
                        </div>

                        <div class="post__content__actions">
                            <div class="c-button">
                                <div
                                    class="left"
                                    v-bind:class="
                                        post.likedBy.filter(
                                            (e) => e.id === authUser.data.id
                                        ).length > 0
                                            ? 'active'
                                            : ''
                                    "
                                >
                                    <i class="las la-thumbs-up"></i>
                                </div>
                                <div class="right">
                                    {{ post.likedBy.length }}
                                </div>
                            </div>
                            <div class="c-button">
                                <div class="left">
                                    <i class="las la-comment-alt"></i>
                                </div>
                                <div class="right">
                                    {{ post.Comments.length }}
                                </div>
                            </div>
                            <div class="c-button">
                                <div
                                    class="left"
                                    v-bind:class="
                                        post.sharedBy.filter(
                                            (e) => e.id === authUser.data.id
                                        ).length > 0
                                            ? 'active'
                                            : ''
                                    "
                                >
                                    <i class="las la-share"></i>
                                </div>
                                <div class="right">
                                    {{ post.sharedBy.length }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="popup__actions">
                <div class="c-button alt" @click="switchModalVisibility()">
                    Retour
                </div>
                <div
                    class="c-button alt"
                    @click="
                        switchModalVisibility();
                        deletePost(post.id);
                    "
                >
                    Supprimer
                </div>
            </div>
        </div>
    </div>
</template>

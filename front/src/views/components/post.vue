<script setup>
import apiPostDelete from "../../api/post/post.delete";
import apiPostShare from "../../api/post/post.share";
import apiPostLike from "../../api/post/post.like";
import moment from "moment";

defineProps(["post", "user"]);
const emit = defineEmits(["updatePosts"]);

const formatDate = function (date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
};

const deletePost = function (id) {
    apiPostDelete(id)
        .then((response) => {
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const sharePost = function (id) {
    apiPostShare(id)
        .then((response) => {
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const likePost = function (id) {
    apiPostLike(id)
        .then((response) => {
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};
</script>

<template>
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
                    >{{ post.User.firstname }} {{ post.User.lastname }}</a
                >
                <span v-if="post.shared_posts" class="post__content__date">
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
                <div
                    class="post__content__actions__like"
                    v-bind:class="
                        post.likedBy.filter((e) => e.id === user.data.id)
                            .length > 0
                            ? 'active'
                            : ''
                    "
                    @click="likePost(post.id)"
                >
                    <i class="las la-thumbs-up"></i>
                    <span> ( {{ post.likedBy.length }} ) </span>
                </div>
                <div class="post__content__actions__comment">
                    <i class="las la-comment-alt"></i>
                </div>
                <div
                    class="post__content__actions__share"
                    v-bind:class="
                        post.sharedBy.filter((e) => e.id === user.data.id)
                            .length > 0
                            ? 'active'
                            : ''
                    "
                    @click="sharePost(post.id)"
                >
                    <i class="las la-share"></i>
                    <span> ( {{ post.sharedBy.length }} ) </span>
                </div>
            </div>
        </div>
    </div>
</template>

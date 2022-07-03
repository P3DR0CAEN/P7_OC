<script setup>
import apiPostDelete from "../../api/post/post.delete";
import apiPostShare from "../../api/post/post.share";
import apiPostLike from "../../api/post/post.like";
import apiCommentCreate from "../../api/post/post.comment.create";
import apiCommentDelete from "../../api/post/post.comment.delete";
import moment from "moment";

defineProps(["post", "authUser", "userProfil"]);
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

const viewComments = function (id) {
    const comments = document.querySelector(
        "div[data-comments-id='" + id + "']"
    );

    if (comments.style.display === "block") {
        comments.style.display = "none";
    } else {
        comments.style.display = "block";
    }
};

const createComment = function (id) {
    const content = document.getElementById("comment_textarea_" + id).value;

    const data = {
        content: content,
        postId: id,
    };

    apiCommentCreate(data)
        .then((response) => {
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteComment = function (id) {
    apiCommentDelete(id)
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
        <span v-if="post.shared_posts" class="post__share">
            <i class="las la-share"></i> {{ userProfil.firstname }}
            {{ userProfil.lastname }} à partager ceci
        </span>
        <div
            v-if="post.User.id == authUser.data.id"
            class="post__remove"
            @click="deletePost(post.id)"
        >
            <i class="las la-times-circle"></i>
        </div>
        <div class="post__left">
            <div class="user_icon">
                <img :src="`${post.User.image}`" alt="image utilisateur" />
            </div>
        </div>
        <div class="post__content">
            <div class="post__content__user_name">
                <a :href="'/profil/' + post.User.id"
                    >{{ post.User.firstname }} {{ post.User.lastname }}</a
                >
                <br />
                <span class="post__content__date"
                    >le {{ formatDate(post.created_at) }}</span
                >
            </div>
            <div class="post__content__text">
                {{ post.content }}
            </div>
            <div v-if="post.image" class="post__content__image">
                <img :src="post.image" alt="" />
            </div>

            <div class="post__content__actions">
                <div
                    class="post__content__actions__like"
                    v-bind:class="
                        post.likedBy.filter((e) => e.id === authUser.data.id)
                            .length > 0
                            ? 'active'
                            : ''
                    "
                    @click="likePost(post.id)"
                >
                    <i class="las la-thumbs-up"></i>
                    <span> ( {{ post.likedBy.length }} ) </span>
                </div>
                <div
                    class="post__content__actions__comment"
                    @click="viewComments(post.id)"
                >
                    <i class="las la-comment-alt"></i>
                    <span> ( {{ post.Comments.length }} ) </span>
                </div>
                <div
                    class="post__content__actions__share"
                    v-bind:class="
                        post.sharedBy.filter((e) => e.id === authUser.data.id)
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
            <div class="comments" :data-comments-id="post.id">
                <form action class="comment-new">
                    <div class="comment-new__user__img">
                        <img
                            :src="authUser.data.image"
                            alt="image utilisateur"
                        />
                    </div>
                    <div class="comment-new__content">
                        <div class="comment-new__content__username">
                            {{ authUser.data.firstname }}
                            {{ authUser.data.lastname }}
                        </div>
                        <textarea
                            name="comment"
                            :id="'comment_textarea_' + post.id"
                            rows="3"
                            placeholder="nouveau commentaire ..."
                        ></textarea>
                        <button class="button" @click="createComment(post.id)">
                            Envoyer
                        </button>
                    </div>
                </form>
                <div class="comment-list" v-for="comment in post.Comments">
                    <hr />
                    <div class="comment">
                        <div
                            v-if="comment.User.id == authUser.data.id"
                            class="comment__remove"
                            @click="deleteComment(comment.id)"
                        >
                            <i class="las la-times-circle"></i>
                        </div>
                        <div class="comment__user__image">
                            <img
                                alt="image utilisateur"
                                :src="comment.User.image"
                            />
                        </div>
                        <div class="comment__content">
                            <div class="comment__content__username">
                                {{ comment.User.firstname }}
                                {{ comment.User.lastname }}
                            </div>
                            <div class="comment__content__text">
                                {{ comment.content }}
                            </div>
                            <div class="comment__content__image">
                                {{ comment.image }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

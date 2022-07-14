<script setup>
import apiPostUpdate from "../../api/post/post.update";
import apiPostDelete from "../../api/post/post.delete";
import apiPostShare from "../../api/post/post.share";
import apiPostLike from "../../api/post/post.like";
import apiCommentCreate from "../../api/post/post.comment.create";
import apiCommentUpdate from "../../api/post/post.comment.update";
import apiCommentDelete from "../../api/post/post.comment.delete";
import { EmojiButton } from "@joeattardi/emoji-button";
import moment from "moment";

defineProps(["post", "authUser", "userProfil"]);
const emit = defineEmits(["updatePosts"]);

const formatDate = function (date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
};

/* Edit post */
const showPopupEditPost = function (id) {
    const popup = document.querySelector("#editPostPopup" + id);
    popup.classList.add("visible");
};
const hidePopupEditPost = function (id) {
    const popup = document.querySelector("#editPostPopup" + id);
    popup.classList.remove("visible");
};

const updateEditPostPreviewImg = (id) => {
    const inputImg = document.querySelector("#editPostImageInput" + id)
        .files[0];

    document.querySelector("#editPostImage" + id).src =
        window.URL.createObjectURL(inputImg);
    document.querySelector("#editPostImagePreview" + id).style.display =
        "block";
};

const removeEditPostPreviewImg = (id) => {
    document.querySelector("#editPostImageInput" + id).value = null;
    document.querySelector("#editPostImagePreview" + id).style.display = "none";
    document.querySelector("#editPostRemoveImg" + id).value = 1;
};

const emojiPicker = (id) => {
    const button = document.querySelector("#emoji-button" + id);
    const picker = new EmojiButton();
    picker.on("emoji", (emoji) => {
        document.querySelector("#editPostContent" + id).value += emoji.emoji;
    });
    button.addEventListener("click", () => {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    });
};

const editPost = function (id) {
    const data = {
        postId: id,
        content: document.querySelector("#editPostContent" + id).value,
        image: document.querySelector("#editPostImageInput" + id).files[0],
        removeImg: document.querySelector("#editPostRemoveImg" + id).value,
    };

    apiPostUpdate(data)
        .then((response) => {
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

/* Delete post */
const showPopupDeletePost = function (id) {
    const popup = document.querySelector('[data-deletePostPopup="' + id + '"]');
    popup.classList.add("visible");
};
const hidePopupDeletePost = function (id) {
    const popup = document.querySelector('[data-deletePostPopup="' + id + '"]');
    popup.classList.remove("visible");
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

/* Like / share */

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

/* commentaires */

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
    const content = document.getElementById("newCommentTextarea" + id).value;

    const data = {
        content: content,
        postId: id,
    };

    apiCommentCreate(data)
        .then((response) => {
            document.getElementById("newCommentTextarea" + id).value = "";
            emit("updatePosts");
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const showUpdateComment = function (id) {
    document.getElementById("CommentContent" + id).style.display = "none";
    document.getElementById("editComment" + id).classList.add("active");
};

const hideUpdateComment = function (id) {
    document.getElementById("CommentContent" + id).style.display = "block";
    document.getElementById("editComment" + id).classList.remove("active");
};

const updateComment = function (id) {
    const content = document.getElementById("editCommentTextarea" + id).value;

    const data = {
        content: content,
        commentId: id,
    };

    apiCommentUpdate(data)
        .then((response) => {
            emit("updatePosts");
            hideUpdateComment(id);
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
        <div class="post__options" v-if="post.User.id == authUser.data.id">
            <div class="post__edit" @click="showPopupEditPost(post.id)">
                <i class="las la-edit"></i>
            </div>
            <div class="post__remove" @click="showPopupDeletePost(post.id)">
                <i class="las la-times-circle"></i>
            </div>
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
                <div class="c-button" @click="likePost(post.id)">
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
                <div class="c-button" @click="viewComments(post.id)">
                    <div class="left">
                        <i class="las la-comment-alt"></i>
                    </div>
                    <div class="right">
                        {{ post.Comments.length }}
                    </div>
                </div>
                <div class="c-button" @click="sharePost(post.id)">
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
                            :id="'newCommentTextarea' + post.id"
                            rows="3"
                            placeholder="nouveau commentaire ..."
                        ></textarea>
                        <div class="c-button" @click="createComment(post.id)">
                            <div class="left">Envoyer</div>
                            <div class="right">
                                <i class="las la-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="comment-list" v-for="comment in post.Comments">
                    <div class="comment">
                        <div
                            class="comment__options"
                            v-if="comment.User.id == authUser.data.id"
                        >
                            <div
                                class="comment__edit"
                                @click="showUpdateComment(comment.id)"
                            >
                                <i class="las la-edit"></i>
                            </div>
                            <div
                                class="comment__remove"
                                @click="deleteComment(comment.id)"
                            >
                                <i class="las la-times-circle"></i>
                            </div>
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
                                <span>
                                    {{ formatDate(comment.created_at) }}
                                </span>
                            </div>
                            <div
                                class="comment__content__text"
                                :id="'CommentContent' + comment.id"
                            >
                                {{ comment.content }}
                            </div>
                            <div
                                class="comment__content__edit"
                                :id="'editComment' + comment.id"
                            >
                                <textarea
                                    hidden
                                    :name="'editCommentTextarea' + comment.id"
                                    :id="'editCommentTextarea' + comment.id"
                                    rows="3"
                                    >{{ comment.content }}</textarea
                                >
                                <div class="comment__content__edit__actions">
                                    <div
                                        class="c-button alt"
                                        @click="hideUpdateComment(comment.id)"
                                    >
                                        Retour
                                    </div>
                                    <div
                                        class="c-button alt"
                                        @click="
                                            hideUpdateComment(comment.id);
                                            updateComment(comment.id);
                                        "
                                    >
                                        Envoyer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- popups edit -->
    <div :id="'editPostPopup' + post.id" class="overlay">
        <div class="popup">
            <h2>Edition du post</h2>
            <div class="popup__close" @click="hidePopupEditPost(post.id)">
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
                            <textarea
                                placeholder="Quoi de neuf ?"
                                :data-editTextarea="`${post.id}`"
                                :id="'editPostContent' + post.id"
                                >{{ post.content }}</textarea
                            >
                        </div>

                        <div
                            class="post__content__image"
                            :id="'editPostImagePreview' + post.id"
                            v-bind:class="post.image ? 'active' : ''"
                        >
                            <div
                                class="postPreviewImgRemove"
                                @click="removeEditPostPreviewImg(post.id)"
                            >
                                <i class="las la-times-circle"></i>
                            </div>
                            <img
                                :id="'editPostImage' + post.id"
                                v-bind:src="post.image ? post.image : ''"
                                alt="your image"
                            />
                            <input
                                hidden
                                type="text"
                                value="0"
                                :id="'editPostRemoveImg' + post.id"
                            />
                        </div>

                        <input
                            type="file"
                            hidden
                            :id="'editPostImageInput' + post.id"
                            @change="updateEditPostPreviewImg(post.id)"
                        />
                        <div class="new_post__actions">
                            <div class="icons">
                                <label :for="'editPostImageInput' + post.id"
                                    ><i class="las la-image"></i
                                ></label>
                                <i
                                    :id="'emoji-button' + post.id"
                                    class="las la-smile"
                                    @click="emojiPicker(post.id)"
                                ></i>
                            </div>
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
                <div class="c-button alt" @click="hidePopupEditPost(post.id)">
                    Retour
                </div>
                <div
                    class="c-button alt"
                    @click="
                        hidePopupEditPost(post.id);
                        editPost(post.id);
                    "
                >
                    Envoyer
                </div>
            </div>
        </div>
    </div>
    <!-- popups delete -->
    <div :data-deletePostPopup="`${post.id}`" class="overlay">
        <div class="popup">
            <h2>Voulez vous vraiment supprimer ceci ?</h2>
            <div class="popup__close" @click="hidePopupDeletePost(post.id)">
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
                        <div v-if="post.image" class="post__content__image">
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
                <div class="c-button alt" @click="hidePopupDeletePost(post.id)">
                    Retour
                </div>
                <div
                    class="c-button alt"
                    @click="
                        hidePopupDeletePost(post.id);
                        deletePost(post.id);
                    "
                >
                    Supprimer
                </div>
            </div>
        </div>
    </div>
</template>

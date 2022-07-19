<script setup>
import { ref, reactive, onMounted } from "vue";
import formatDate from "../../lib/formatDate";
import apiPostShare from "../../api/post/post.share";
import apiPostLike from "../../api/post/post.like";
import apiCommentCreate from "../../api/post/post.comment.create";

import CommentComponent from "./comment.vue";

import modalPostEditComponent from "./modal.postEdit.vue";
import modalPostDeleteComponent from "./modal.postDelete.vue";

const emit = defineEmits(["updatePosts"]);
defineProps(["post", "authUser", "userProfil"]);

/* Edit post */
const showModalPostEdit = reactive({
    value: false,
    switch() {
        if (showModalPostEdit.value == true) {
            showModalPostEdit.value = false;
        } else {
            showModalPostEdit.value = true;
        }
    },
});
/* Delete post */
const showModalPostDelete = reactive({
    value: false,
    switch() {
        if (showModalPostDelete.value == true) {
            showModalPostDelete.value = false;
        } else {
            showModalPostDelete.value = true;
        }
    },
});

/* Like / share */

const sharePost = function (id) {
    apiPostShare(id)
        .then((response) => {
            updatePosts();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const likePost = function (id) {
    apiPostLike(id)
        .then((response) => {
            updatePosts();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

/* commentaires */

const showComments = reactive({
    value: false,
    switch() {
        if (showComments.value == true) {
            showComments.value = false;
        } else {
            showComments.value = true;
        }
    },
});

const newCommentTextarea = ref(null);
const resizeCommentTextarea = () => {
    newCommentTextarea.value.style.height = "18px";
    newCommentTextarea.value.style.height =
        newCommentTextarea.value.scrollHeight + "px";
};

const newCommentError = reactive({ value: null });

const createComment = function (id) {
    const content = newCommentTextarea.value.value;

    const data = {
        content: content,
        postId: id,
    };

    apiCommentCreate(data)
        .then((response) => {
            newCommentTextarea.value.value = "";
            newCommentError.value = null;
            updatePosts();
        })
        .catch((error) => {
            newCommentError.value = error.response.data.error;
        });
};

const updatePosts = function () {
    emit("updatePosts");
};
</script>

<template>
    <div class="post">
        <span v-if="post.shared_posts" class="post__share">
            <i class="las la-share"></i> {{ userProfil.firstname }}
            {{ userProfil.lastname }} à partager ceci
        </span>
        <div
            class="post__options"
            v-if="
                post.User.id == authUser.data.id || authUser.data.isAdmin == 1
            "
        >
            <div class="post__edit" @click="showModalPostEdit.switch()">
                <i class="las la-edit"></i>
            </div>
            <div class="post__remove" @click="showModalPostDelete.switch()">
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
                <div class="c-button" @click="showComments.switch()">
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
            <div
                class="comments"
                v-bind:class="showComments.value ? 'active' : ''"
                :data-comments-id="post.id"
            >
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
                            @input="resizeCommentTextarea()"
                            ref="newCommentTextarea"
                            rows="3"
                            placeholder="nouveau commentaire ..."
                        ></textarea>
                        <div
                            v-bind:class="newCommentError.value ? 'active' : ''"
                            class="response__error"
                        >
                            {{ newCommentError.value }}
                        </div>
                        <div class="c-button" @click="createComment(post.id)">
                            <div class="left">Envoyer</div>
                            <div class="right">
                                <i class="las la-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="comment-list" v-for="comment in post.Comments">
                    <comment-component
                        :comment="comment"
                        :authUser="authUser"
                        @update-posts="updatePosts()"
                    ></comment-component>
                </div>
            </div>
        </div>
    </div>

    <modal-post-edit-component
        :isModalVisible="showModalPostEdit"
        :post="post"
        :authUser="authUser"
        @switch-modal-visibility="showModalPostEdit.switch()"
        @update-posts="updatePosts()"
    />
    <modal-post-delete-component
        :isModalVisible="showModalPostDelete"
        :post="post"
        :authUser="authUser"
        @switch-modal-visibility="showModalPostDelete.switch()"
        @update-posts="updatePosts()"
    />
    <!-- end post -->
</template>

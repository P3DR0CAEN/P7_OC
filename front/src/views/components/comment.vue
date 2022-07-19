<script setup>
import { ref, reactive, toRefs } from "vue";
import formatDate from "../../lib/formatDate";
import apiCommentUpdate from "../../api/post/post.comment.update";
import apiCommentDelete from "../../api/post/post.comment.delete";

const emit = defineEmits(["updatePosts"]);

const props = defineProps(["comment", "authUser"]);
const { comment } = toRefs(props);
const authUser = props.authUser;

const isCommentEdition = reactive({
    value: false,
    switch() {
        if (isCommentEdition.value == true) {
            isCommentEdition.value = false;
        } else {
            isCommentEdition.value = true;
        }
    },
});

const editCommentContent = reactive({
    value: comment.value.content,
});

const updateComment = function (id) {
    const data = {
        content: editCommentContent.value,
    };

    apiCommentUpdate(id, data)
        .then((response) => {
            updatePost();
            isCommentEdition.switch();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteComment = function (id) {
    apiCommentDelete(id)
        .then((response) => {
            updatePost();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

const updatePost = function () {
    emit("updatePosts");
};
</script>

<template>
    <div
        class="comment"
        v-bind:class="isCommentEdition.value ? 'edit-mode' : ''"
    >
        <div
            class="comment__options"
            v-if="
                comment.User.id == authUser.data.id ||
                authUser.data.isAdmin == 1
            "
        >
            <div class="comment__edit" @click="isCommentEdition.switch()">
                <i class="las la-edit"></i>
            </div>
            <div class="comment__remove" @click="deleteComment(comment.id)">
                <i class="las la-times-circle"></i>
            </div>
        </div>
        <div class="comment__user__image">
            <img alt="image utilisateur" :src="comment.User.image" />
        </div>
        <div class="comment__content">
            <div class="comment__content__username">
                {{ comment.User.firstname }}
                {{ comment.User.lastname }}
                <span>
                    {{ formatDate(comment.created_at) }}
                </span>
            </div>
            <div class="comment__content__text">
                {{ comment.content }}
            </div>
            <div class="comment__content__edit">
                <textarea
                    rows="3"
                    v-model="editCommentContent.value"
                ></textarea>
                <div class="comment__content__edit__actions">
                    <div
                        class="c-button alt"
                        @click="isCommentEdition.switch()"
                    >
                        Retour
                    </div>
                    <div
                        class="c-button alt"
                        @click="updateComment(comment.id)"
                    >
                        Envoyer
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

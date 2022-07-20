<script setup>
import { ref, reactive, toRefs } from "vue";
import formatDate from "../../lib/formatDate";
import apiPostUpdate from "../../api/post/post.update";
import { EmojiButton } from "@joeattardi/emoji-button";

defineProps(["post", "authUser", "userProfil", "isModalVisible"]);
const emit = defineEmits(["switchModalVisibility", "updatePosts"]);

const switchModalVisibility = () => emit("switchModalVisibility");

const editPostShowImage = reactive({ value: false });

const editPostPreviewImage = ref(null);

const editPostImageInput = ref(null);

const editPostImageRemoved = reactive({ value: false });

const editPostContent = ref(null);
const resizeTextarea = () => {
    editPostContent.value.style.height = "18px";
    editPostContent.value.style.height =
        editPostContent.value.scrollHeight + "px";
};

const updateEditPostPreviewImg = () => {
    const inputImg = editPostImageInput.value.files[0];

    editPostShowImage.value = true;
    editPostPreviewImage.value.src = window.URL.createObjectURL(inputImg);
    editPostImageRemoved.value = false;
};
const removeEditPostPreviewImg = () => {
    editPostShowImage.value = false;
    editPostImageRemoved.value = true;
};

const emojiButton = ref(null);
const emojiPicker = () => {
    const button = emojiButton.value;
    const picker = new EmojiButton();
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    picker.on("emoji", (emoji) => {
        editPostContent.value.value += emoji.emoji;
    });
};

const editPost = function (id) {
    const data = {
        content: editPostContent.value.value,
        image: editPostImageInput.value.files[0],
        removeImg: editPostImageRemoved.value,
    };

    apiPostUpdate(id, data)
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
    <div class="overlay" v-bind:class="isModalVisible.value ? 'visible' : ''">
        <div class="popup">
            <h2>Edition du post</h2>
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
                            <textarea
                                placeholder="Quoi de neuf ?"
                                ref="editPostContent"
                                @input="resizeTextarea()"
                                >{{ post.content }}</textarea
                            >
                        </div>

                        <div
                            class="post__content__image"
                            v-bind:class="
                                (post.image && !editPostImageRemoved.value) ||
                                editPostShowImage.value
                                    ? 'active'
                                    : ''
                            "
                        >
                            <div
                                class="postPreviewImgRemove"
                                @click="removeEditPostPreviewImg()"
                            >
                                <i class="las la-times-circle"></i>
                            </div>
                            <img
                                ref="editPostPreviewImage"
                                v-bind:src="post.image ? post.image : ''"
                                alt="your image"
                            />
                        </div>

                        <input
                            type="file"
                            ref="editPostImageInput"
                            hidden
                            :id="'editPostImageInput' + post.id"
                            @change="updateEditPostPreviewImg()"
                        />
                        <div class="new_post__actions">
                            <div class="icons">
                                <label :for="'editPostImageInput' + post.id"
                                    ><i class="las la-image"></i
                                ></label>
                                <i
                                    ref="emojiButton"
                                    class="las la-smile"
                                    @click="emojiPicker()"
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
                <div class="c-button alt" @click="switchModalVisibility()">
                    Retour
                </div>
                <div
                    class="c-button alt"
                    @click="
                        switchModalVisibility();
                        editPost(post.id);
                    "
                >
                    Envoyer
                </div>
            </div>
        </div>
    </div>
</template>

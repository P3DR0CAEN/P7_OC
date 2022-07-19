<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStoreUser } from "../store";
import apiPostGetAll from "../api/post/post.get.all";
import apiPostCreate from "../api/post/post.create";

import PostComponent from "./components/post.vue";
import { EmojiButton } from "@joeattardi/emoji-button";

const authUser = useStoreUser();

const posts = ref(null);

const newPostShowImage = reactive({ value: false });

const newPostPreviewImage = ref(null);

const newPostImageInput = ref(null);

const newPostContent = ref(null);
const resizeTextarea = () => {
    newPostContent.value.style.height = "18px";
    newPostContent.value.style.height =
        newPostContent.value.scrollHeight + "px";
};

const updateNewPostPreviewImg = () => {
    const inputImg = newPostImageInput.value.files[0];

    newPostShowImage.value = true;
    newPostPreviewImage.value.src = window.URL.createObjectURL(inputImg);
};
const removeNewPostPreviewImg = () => {
    newPostShowImage.value = false;
    newPostImageInput.value.value = null;
};

const emojiButton = ref(null);
const emojiPicker = () => {
    const button = emojiButton.value;
    const picker = new EmojiButton();
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    picker.on("emoji", (emoji) => {
        newPostContent.value.value += emoji.emoji;
    });
};

const newPostError = reactive({ value: null });

const createPost = function () {
    const data = {
        content: newPostContent.value.value,
        image: newPostImageInput.value.files[0],
    };

    apiPostCreate(data)
        .then((response) => {
            newPostContent.value.value = "";
            removeNewPostPreviewImg();
            updatePosts();
            newPostError.value = null;
        })
        .catch((error) => {
            newPostError.value = error.response.data.error;
        });
};

const updatePosts = async function () {
    posts.value = await apiPostGetAll()
        .then((response) => {
            /* console.log(response.data); */
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

onMounted(async () => {
    updatePosts();
});
</script>

<template>
    <div class="content">
        <div class="new_post">
            <div class="new_post__left">
                <div class="user_icon">
                    <img :src="authUser.data.image" alt="" />
                </div>
            </div>
            <div class="new_post__content">
                <textarea
                    ref="newPostContent"
                    @input="resizeTextarea()"
                    cols="30"
                    rows="5"
                    id="NewPostContent"
                    placeholder="Quoi de neuf ?"
                ></textarea>
                <div
                    v-bind:class="newPostError.value ? 'active' : ''"
                    class="response__error"
                >
                    {{ newPostError.value }}
                </div>
                <div
                    class="newPostPreviewImg"
                    v-bind:class="newPostShowImage.value ? 'active' : ''"
                >
                    <div
                        class="postPreviewImgRemove"
                        @click="removeNewPostPreviewImg()"
                    >
                        <i class="las la-times-circle"></i>
                    </div>
                    <img
                        ref="newPostPreviewImage"
                        src="#"
                        alt="image du post"
                    />
                </div>

                <input
                    type="file"
                    hidden
                    name="post_image"
                    id="newPostImageInput"
                    ref="newPostImageInput"
                    @change="updateNewPostPreviewImg()"
                />
                <div class="new_post__actions">
                    <div class="icons">
                        <label for="newPostImageInput"
                            ><i class="las la-image"></i
                        ></label>
                        <i
                            ref="emojiButton"
                            @click="emojiPicker"
                            class="las la-smile"
                        ></i>
                    </div>
                    <div class="c-button" @click="createPost()">
                        <div class="left">Poster</div>
                        <div class="right">
                            <i class="las la-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="posts === undefined">chargement de la page</div>
        <div v-else-if="posts == null"></div>
        <div v-else>
            <div class="post_list">
                <template v-for="post in posts">
                    <post-component
                        :post="post"
                        :authUser="authUser"
                        @update-posts="updatePosts()"
                    ></post-component>
                </template>
            </div>
        </div>
    </div>
</template>

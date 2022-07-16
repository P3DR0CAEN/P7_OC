<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStoreUser } from "../store";
import apiPostGetAll from "../api/post/post.get.all";
import apiPostCreate from "../api/post/post.create";

import PostComponent from "./components/post.vue";
import { EmojiButton } from "@joeattardi/emoji-button";

const authUser = useStoreUser();

const posts = ref(null);
const inputPostImage = ref(null);
const NewPost = reactive({
    content: "",
});

const createPost = function () {
    const data = {
        content: NewPost.content,
        image: inputPostImage.value.files[0],
    };

    apiPostCreate(data)
        .then((response) => {
            NewPost.content = undefined;
            removePostPreviewImg();
            document
                .querySelectorAll(".response__error")
                .forEach((el) => el.remove());
            updatePosts();
            return;
        })
        .catch((error) => {
            document
                .getElementById("NewPostContent")
                .insertAdjacentHTML(
                    "afterend",
                    '<div class="response__error">' +
                        error.response.data.error +
                        "</div>"
                );
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

const emojiPicker = () => {
    const button = document.querySelector("#emoji-button");
    const picker = new EmojiButton();
    picker.on("emoji", (emoji) => {
        NewPost.content += emoji.emoji;
    });
    button.addEventListener("click", () => {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    });
};

const updatePostPreviewImg = () => {
    document.getElementById("postPreviewImg").src = window.URL.createObjectURL(
        inputPostImage.value.files[0]
    );
    document.querySelector(".postPreviewImg").style.display = "block";
};

const removePostPreviewImg = () => {
    document.getElementById("post_image").value = null;
    document.querySelector(".postPreviewImg").style.display = "none";
};

onMounted(async () => {
    updatePosts();

    emojiPicker();
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
                    cols="30"
                    rows="5"
                    v-model="NewPost.content"
                    id="NewPostContent"
                    placeholder="Quoi de neuf ?"
                ></textarea>
                <div class="postPreviewImg">
                    <div
                        class="postPreviewImgRemove"
                        @click="removePostPreviewImg()"
                    >
                        <i class="las la-times-circle"></i>
                    </div>
                    <img id="postPreviewImg" src="#" alt="your image" />
                </div>

                <input
                    type="file"
                    hidden
                    name="post_image"
                    id="post_image"
                    ref="inputPostImage"
                    @change="updatePostPreviewImg()"
                />
                <div class="new_post__actions">
                    <div class="icons">
                        <label for="post_image"
                            ><i class="las la-image"></i
                        ></label>
                        <i id="emoji-button" class="las la-smile"></i>
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

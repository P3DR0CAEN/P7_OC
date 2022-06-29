<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStoreUser } from "../store";
import apiPostGetAll from "../api/post/post.get.all";
import apiPostCreate from "../api/post/post.create";

import postComponent from "./components/post.vue";
import { EmojiButton } from "@joeattardi/emoji-button";

const user = useStoreUser();

const posts = ref(null);
const inputPostImage = ref(null);
const NewPost = reactive({
    content: undefined,
});

const createPost = function () {
    const data = {
        content: NewPost.content,
        image: inputPostImage.value.files[0],
    };

    apiPostCreate(data)
        .then((response) => {
            NewPost.content = undefined;
            updatePosts();
            return;
        })
        .catch((error) => {
            console.log(error);
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
        document.querySelector("#new_post__content").value += emoji.emoji;
        NewPost.content = document.querySelector("#new_post__content").value;
    });
    button.addEventListener("click", () => {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
    });
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
                    <img :src="user.data.image" alt="" />
                </div>
            </div>
            <div class="new_post__content">
                <textarea
                    cols="30"
                    rows="5"
                    v-model="NewPost.content"
                    id="new_post__content"
                ></textarea>
                <input
                    type="file"
                    hidden
                    name="post_image"
                    id="post_image"
                    ref="inputPostImage"
                />
                <div class="new_post__actions">
                    <div class="icons">
                        <label for="post_image"
                            ><i class="las la-image"></i
                        ></label>
                        <i id="emoji-button" class="las la-smile"></i>
                    </div>
                    <button class="button" @click="createPost()">Poster</button>
                </div>
            </div>
        </div>
        <div v-if="posts === undefined">chargement de la page</div>
        <div v-else-if="posts == null"></div>
        <div v-else>
            <div class="post_list">
                <template v-for="post in posts">
                    <postComponent
                        :post="post"
                        :user="user"
                        @update-posts="updatePosts()"
                    ></postComponent>
                </template>
            </div>
        </div>
    </div>
</template>

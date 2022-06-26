<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStoreUser } from "../store";
import apiPostGetAll from "../api/post/post.get.all";
import apiPostCreate from "../api/post/post.create";

import postComponent from "./components/post.vue";

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
            console.log("response ", response);
            return response.data;
        })
        .catch((error) => {
            console.log("test wdfgbd " + error);
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
                    <img
                        :src="
                            'http://localhost:4000/images/users/' +
                            user.data.image
                        "
                        alt=""
                    />
                </div>
            </div>
            <div class="new_post__content">
                <textarea
                    cols="30"
                    rows="5"
                    v-model="NewPost.content"
                ></textarea>
                <input
                    type="file"
                    hidden
                    name="post_image"
                    id="post_image"
                    ref="inputPostImage"
                    style="flex: inherit"
                />
                <div class="new_post__actions">
                    <div class="icons">
                        <label for="post_image"
                            ><i class="las la-image"></i
                        ></label>
                        <i class="las la-smile"></i>
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

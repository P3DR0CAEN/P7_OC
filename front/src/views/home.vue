<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStoreUser } from "../store";
import apiPostGetAll from "../api/post/post.get.all";
import apiPostCreate from "../api/post/post.create";
import apiPostDelete from "../api/post/post.delete";
import apiPostShare from "../api/post/post.share";

import moment from "moment";

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

const deletePost = function (id) {
    apiPostDelete(id)
        .then((response) => {
            updatePosts();
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

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

const formatDate = function (date) {
    return moment(new Date(date)).format("DD/MM/YY à HH:mm");
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
                                <img
                                    :src="`http://localhost:4000/images/posts/${post.image}`"
                                    alt=""
                                />
                            </div>

                            <div class="post__content__actions">
                                <div class="post__content__actions__like">
                                    <i class="las la-thumbs-up"></i>
                                </div>
                                <div class="post__content__actions__comment">
                                    <i class="las la-comment-alt"></i>
                                </div>
                                <div
                                    class="post__content__actions__share"
                                    v-bind:class="
                                        post.sharedBy.filter(
                                            (e) => e.id === user.data.id
                                        ).length > 0
                                            ? 'shared'
                                            : ''
                                    "
                                    @click="sharePost(post.id)"
                                >
                                    <i class="las la-share"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

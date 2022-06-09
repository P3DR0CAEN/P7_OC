<script setup>
import axios from "axios";
</script>

<template>
  <div
    class="about"
    style="flex-direction: column; justify-content: center; gap: 20px"
  >
    <h1>signup test</h1>
    <input type="email" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <input type="submit" value="PostAxiosTest" @click="axiosPost" />
    <div id="Error" style="color: red"></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
function axiosPost() {
  console.log("event axiosPost");
  // POST request using axios with error handling
  const req = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  axios
    .post("http://localhost:4000/api/auth/signup", req)
    .then((response) => {
      console.log("post effectué");
    })
    .catch((error) => {
      console.error("Il y a une erreur !", error.response.data);

      if (error.response.data.errno == 1062) {
        console.log("adresse email deja prise");
        document.getElementById("Error").innerHTML =
          "L'adresse email est déjà prise";
      }

      this.errorMessage = error.message;
    });
}
</script>

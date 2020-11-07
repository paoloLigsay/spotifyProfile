<template>
    <div class="login">
      <h2> Welcome to Spotify Profile </h2>
      <a class="btn btn--login" href="https://accounts.spotify.com/authorize?client_id=d61d37e0b87d4d8cabb9a61358a5c912&response_type=code&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F&scope=playlist-read-private user-read-private user-read-email user-read-recently-played user-top-read user-follow-read">
        LOGIN
      </a>
      <p class="text text--12 footer"> Designed and Developed by <span class="text--green"> Paolo Ligsay </span> </p>
    </div>
</template>

<script>
  export default {
    created() {
      // check if user is trying to access login page during login (redirect to profile)
      if(localStorage.getItem('local_token_new4') !== null) {
        this.$router.push('profile')
      }
    }
  }
</script>

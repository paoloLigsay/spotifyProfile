<template>
  <div>
    <!-- Login -->
    <a style="margin-left:100px;" href="https://accounts.spotify.com/authorize?client_id=d61d37e0b87d4d8cabb9a61358a5c912&response_type=code&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F&scope=playlist-read-private user-read-private user-read-email user-read-recently-played user-top-read user-follow-read">
      LOGIN
    </a>

    <!-- sidebar -->
    <sidebar :d_access_token="d_access_token" />

    <!-- main content -->
    <div class="main">
      <div class="main__content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>

  /* imports */
  import sidebar from './components/sidebar'

  export default {
    name: 'App',
    components: {
      sidebar
    },
  }

</script>

<style lang="scss">

  /* imports */
  @import './scss/main.scss'

</style>

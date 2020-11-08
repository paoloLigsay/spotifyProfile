<template>
  <div>
    <!-- sidebar -->
    <sidebar :active="4"/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="playlist">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'playlist',
    components: {
      sidebar
    },
    methods: {
      get_user_playlist(local_access_token) {
        fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => res.json())
          .then(data => console.log(data))
      }
    },
    created() {
      const permanent_token = localStorage.getItem('local_token_new4')
      get_user_playlist(permanent_token)
    }
  }
</script>
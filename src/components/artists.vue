<template>
  <div>
     <!-- sidebar -->
    <sidebar :active="3"/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="discover">
      <h2> DISCOVER </h2>
       <p class="h2"> Top Artists </p>
       <div class="discover__playlist">
        <a :href="d_playlist_item.url" class="discover__playlist-item" v-for="(d_playlist_item, i) in d_playlist" :key="i">
          <img :src="d_playlist_item.image" alt="playlist image" class="discover__playlist-img">
          <p class="text text--21"> {{ d_playlist_item.name }} by {{ d_playlist_item.owner }} </p>
          <p class="text"> {{ d_playlist_item.track_count }} Tracks </p>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  import sidebar from './sidebar'

  export default {
    name: 'discover',
    components: {
      sidebar
    },
    props: ['active'],
    data() {
      return {
         d_artists: [],
      }
    },
    methods: {
      get_artists(local_access_token) {
        fetch("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              throw new Error('Please Login. No Token Stored.');
            }
          })
          .then(data => {
            console.log(data)
            // remove loader after fetching featured playlist
            this.remove_loader()
          })
          .catch(() => {
            localStorage.removeItem('local_token_new4')
            this.$router.push('login')
          })
      },
      remove_loader() {
        const loader = document.querySelector('.loader')
        const discover = document.querySelector('.discover')
        loader.classList.add('loader--done')
        discover.classList.add('discover--active')
      }
    },
    created() {
      const permanent_token = localStorage.getItem('local_token_new4')
      this.get_artists(permanent_token)

      // Get URL and redirect if not logged in
      this.d_loc = window.location.href
      if(this.d_loc.indexOf('code=') === -1 && localStorage.getItem('local_token_new4') === null) {
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped>
  /*  */
</style>
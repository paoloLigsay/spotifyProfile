<template>
  <div>
     <!-- sidebar -->
    <sidebar/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="discover">
      <h2> DISCOVER </h2>
       <p class="text text--24"> Featured Playlists </p>
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
    data() {
      return {
         d_playlist: []
      }
    },
    methods: {
      get_featured_playlist(loacl_access_token) {
        fetch("https://api.spotify.com/v1/browse/featured-playlists", {
          headers: {
            Authorization: `Bearer ${loacl_access_token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            const playlists = data.playlists.items
            for(let playlist of playlists) {
              const new_playlist = {
                name: playlist.name,
                image: playlist.images[0].url,
                owner: playlist.owner.display_name,
                track_count: playlist.tracks.total,
                url: playlist.external_urls.spotify
              }

              this.d_playlist.push(new_playlist)
              // remove loader after fetching featured playlist
              this.remove_loader()
            }
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
      this.get_featured_playlist(permanent_token)
    }
  }
</script>

<style scoped>
  /*  */
</style>
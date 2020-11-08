<template>
  <div>
    <!-- sidebar -->
    <sidebar :active="4"/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="playlist">
      <h2> PUBLIC PLAYLIST </h2>
       <div class="playlist__list">
        <a :href="d_playlist_item.url" class="playlist__list-item" v-for="(d_playlist_item, i) in d_playlist" :key="i">
          <img :src="d_playlist_item.image" alt="playlist image" class="playlist__list-img">
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
    name: 'playlist',
    components: {
      sidebar
    },
    data() {
      return {
        d_playlist: [],
      }
    },
    methods: {
      get_user_playlist(local_access_token) {
        fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            const playlists = data.items
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
        const playlist = document.querySelector('.playlist')
        loader.classList.add('loader--done')
        playlist.classList.add('playlist--active')
      }
    },
    created() {
      const permanent_token = localStorage.getItem('local_token_new4')
      this.get_user_playlist(permanent_token)
    }
  }
</script>
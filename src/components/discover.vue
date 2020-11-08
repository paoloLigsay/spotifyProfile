<template>
  <div>
     <!-- sidebar -->
    <sidebar :active="1"/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="discover">
      <h2> DISCOVER </h2>
       <p class="text text--30"> Featured Playlists </p>
       <div class="discover__playlist">
        <a v-if="i < show_more_featured" :href="d_playlist_item.url" class="discover__playlist-item" v-for="(d_playlist_item, i) in d_playlist" :key="i">
          <img :src="d_playlist_item.image" alt="playlist image" class="discover__playlist-img">
          <p class="text text--21"> {{ d_playlist_item.name }} by {{ d_playlist_item.owner }} </p>
          <p class="text"> {{ d_playlist_item.track_count }} Tracks </p>
        </a>
      </div>
      <div v-if="d_playlist.length > 8 && show_more_featured < d_playlist.length" v-on:click="show_more_featured += 6" class="btn"> See more </div>

      <p class="text text--30 text--mt150"> New Releases </p>
       <div class="discover__playlist">
        <a v-if="i < show_more_album" :href="d_album.url" class="discover__playlist-item" v-for="(d_album, i) in d_albums" :key="i">
          <img :src="d_album.image" alt="playlist image" class="discover__playlist-img">
          <p class="text text--21"> {{ d_album.name }} </p>
          <p class="text text--21"> {{ d_album.type }} </p>
          <div class="discover__playlist-artists">
              <p class="text" v-for="(artist, i) in d_album.artists" :key="i"> 
                {{ artist }}<span v-if="i != Object.keys(d_album.artists).length - 1">, </span> 
              </p>
          </div>
        </a>
      </div>
       <div v-if="d_albums.length > 8 && show_more_album < d_albums.length" v-on:click="show_more_album += 6" class="btn"> See more </div>
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
         d_playlist: [],
         d_albums: [],
         show_more_featured: 6,
         show_more_album: 6
      }
    },
    methods: {
      get_featured_playlist(local_access_token) {
        fetch("https://api.spotify.com/v1/browse/featured-playlists", {
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
          .catch(() => {
            localStorage.removeItem('local_token_new4')
            this.$router.push('login')
          })
      },
      get_new_release(local_access_token) {
        fetch("https://api.spotify.com/v1/browse/new-releases", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then( res => res.json())
          .then(data => { 
            const albums = data.albums.items
            for(let album of albums) {
              const new_album_artists = []
              for(const artist of album.artists)
                new_album_artists.push(artist.name)

              const new_album = {
                name: album.name,
                type: album.album_type,
                artists: new_album_artists,
                image: album.images[0].url,
                url: album.external_urls.spotify
              }

              this.d_albums.push(new_album)
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
      this.get_new_release(permanent_token)

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
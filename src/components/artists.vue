<template>
  <div>
     <!-- sidebar -->
    <sidebar :active="3"/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="discover">
      <h2> Top Artists </h2>
      <div class="discover__playlist">
        <a :href="d_artist.url" class="discover__playlist-item" v-for="(d_artist, i) in d_artists" :key="i">
          <img :src="d_artist.image" alt="playlist image" class="discover__playlist-img">
          <p class="text text--21"> {{ d_artist.name }} </p>
          <p class="text"> {{ d_artist.followers }} Followers </p>
          <p> {{ d_artist.images }} </p>
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
        fetch("https://api.spotify.com/v1/me/top/artists", {
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
            const artists = data.items
            // fix followers number format : 1234 -> 1,234

            for(const artist of artists) {
              const format_followers = artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              const new_artist = {
                name: artist.name,
                followers: format_followers,
                image: artist.images[0].url,
                url: artist.external_urls.spotify
              }

              this.d_artists.push(new_artist)
            }

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
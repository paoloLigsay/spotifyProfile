<template>
  <div>
    <!-- sidebar -->
    <sidebar :active="2"/>

    <!-- loader -->
    <span class="loader"></span>

    <div class="tracks">
      <p class="text text--24 text--mt100"> Top Tracks </p>
      <div class="profile__tracks-list">
        <a :href="d_track.url" class="profile__tracks" v-for="(d_track, i) in d_tracks" :key="i">
            <img :src="d_track.image" alt="playlist image" class="profile__tracks-img">
            <div class="profile__tracks-info">
              <p class="text profile__tracks-duration"> {{ d_track.duration }} </p>
              <p class="text text--21"> {{ d_track.name }} </p>
              <div class="profile__tracks-artists">
                  <p class="text" v-for="(artist, i) in d_track.artists" :key="i"> 
                    {{ artist }}<span v-if="i != Object.keys(d_track.artists).length - 1">, </span> 
                  </p>
              </div>
            </div>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
  /* imports */
  import sidebar from './sidebar'

  export default {
    name: 'tracks',
    components: {
      sidebar
    },
    data() {
      return {
        d_tracks: []
      }
    },
    methods: {
      get_tracks(local_access_token) {
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
          console.log(data)
        })
      }
    },
    mounted() {
      const permanent_token = localStorage.getItem('local_token_new4')
      this.get_tracks(permanent_token)

      // Get URL and redirect if not logged in
      this.d_loc = window.location.href
      if(this.d_loc.indexOf('code=') === -1 && localStorage.getItem('local_token_new4') === null) {
        this.$router.push('login')
      }
    }
  }
</script>
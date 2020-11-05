<template>
  <div>
    <!-- sidebar -->
    <sidebar/>

    <!-- loader -->
    <span class="loader loader--done"></span>

    <!-- component -->
    <div class="profile profile--active">
      <!-- header -->
      <div class="profile__header">
        <img src="../img/profile.png" alt="Profile Picture" class="profile__image profile__image--fallback">
        <div class="profile__header-info">
          <p class="text text--24"> {{ d_profile.type }} </p>
          <h2 class="text text--48"> {{ d_profile.name }} </h2>
        </div>
        <div class="btn" @click="logout"> Logout </div>
      </div>

      <div class="profile__follow">
        <p class="text text--24"> <span class="text--green"> {{ d_profile.followers }} </span> Follower </p>
        <p class="text text--24"> <span class="text--green"> {{ d_profile.following }} </span> Following </p>
      </div>

      <div class="profile__content">
        <!-- profile playlists and tracts -->
        <div class="profile__data">
          <p class="text text--24"> Public Playlists </p>
          <div class="profile__playlist">
            <a :href="d_playlist_item.url" class="profile__playlist-item" v-for="(d_playlist_item, i) in d_playlist" :key="i">
              <img :src="d_playlist_item.image" alt="playlist image" class="profile__playlist-img">
              <p class="text text--21"> {{ d_playlist_item.name }} </p>
              <p class="text"> {{ d_playlist_item.track_count }} Tracks </p>
            </a>
          </div>
        </div>

        <!-- Followed Artists -->
        <div class="profile__following">
          <p class="text text--21 text--gray"> Followed Artists </p>
          <a href="#" class="profile__following-item">
            <p class="text"> Sam Smith  </p>
            <p class="text text--12"> 13, 265, 675 Followers </p>
          </a>
          <a href="#" class="profile__following-item">
            <p class="text"> Sam Smith  </p>
            <p class="text text--12"> 13, 265, 675 Followers </p>
          </a>
          <a href="#" class="profile__following-item">
            <p class="text"> Sam Smith  </p>
            <p class="text text--12"> 13, 265, 675 Followers </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* imports */
  import sidebar from './sidebar'

  export default {
    name: 'profile',
    components: {
      sidebar
    },
    data() { 
      return {
        d_params: '',
        d_loc: '',
        d_access_token: '',
        d_profile: {
          type: 'not found',
          name: 'No User Found',
          followers: 0,
          following: 0
        },
        d_playlist: []
      }
    },
    methods: {
      get_temporary_token(auth) {
        return fetch("https://accounts.spotify.com/api/token", {
          body: `grant_type=authorization_code&code=${auth}&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F`,
          headers: {
            Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        })
      },
      get_permanent_token(temp_token) {
        return fetch("https://accounts.spotify.com/api/token", {
          body: `grant_type=refresh_token&refresh_token=${temp_token}`,
          headers: {
            Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        })
      },
      get_user_followed_artists(local_access_token) {
        return fetch("https://api.spotify.com/v1/me/following?type=artist", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        }).then(
          res => res.json()
        ).then(data => data)
      },
      get_profile(local_access_token) {
        return fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        }).then(
          res => res.json()
        ).then(data => data)
      },
      print_profile(access_token) {
        this.get_profile(access_token)
          .then(
            data => {
              this.d_profile.name = data.display_name
              this.d_profile.type = data.type
              this.d_profile.followers = data.followers.total
            }
          )
      },
      get_user_playlists (local_access_token) {
        return fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        }).then(
          res => res.json()
        ).then(data => data)
      },
      logout() {
        localStorage.removeItem('local_token_new4')
        window.location.href = 'https://yourspotifyprofile.netlify.app/'
      }
    },
    created() {
      // Get URL Parameter
      this.d_params = window.location.search

      if(this.d_params.includes('code=') && localStorage.getItem('local_token_new4') === null) {
        // get code by spliting parameter string
        this.d_params = this.d_params.split('code=')
        const code = this.d_params[1]

        // start authorization by passing the code and get first access token and refresh token
        this.get_temporary_token(code)
          .then(res => res.json())
          .then(
            data => {
              const temp_token = data.refresh_token
              // pass temporary token and get permanent token
              this.get_permanent_token(temp_token)
                .then(res => {
                  if (res.ok) {
                    return res.json();
                  } else {
                    throw new Error('Please Login. No Token Stored.');
                  }
                })
                .then(
                  data => {
                    // set local storage to save data (token) on reload
                    localStorage.setItem('local_token_new4', data.access_token)
                    this.d_access_token = data.access_token
                    // print profile
                    this.print_profile(this.d_access_token)
                    // get following and print
                    this.get_user_followed_artists(this.d_access_token)
                      .then(data => this.d_profile.following = data.artists.items.length)
                    
                    // get playlist and print
                    this.get_user_playlists(this.d_access_token)
                      .then(data => {
                        // loop each item in playlist items array, then get needed data for each item
                        for(let playlist of data.items) {
                          let playlist_info = {
                            url: playlist.external_urls.spotify,
                            name: playlist.name,
                            image: playlist.images[0],
                            track_count: playlist.tracks.total
                          }
                          // push to data playlits (live change in ui)
                          this.d_playlist.push(playlist_info)
                        }
                      })

                    // remove loader and display data
                    const loader = document.querySelector('.loader')
                    const profile = document.querySelector('.profile')
                    loader.classList.add('loader--done')
                    profile.classList.add('profile--active')
                  }
                ).catch(
                  () => this.$router.push('login')
                )
            }
          ) 
      } else if(localStorage.getItem('local_token_new4') !== null) {
        const permanent_token = localStorage.getItem('local_token_new4')
        // print profile
        this.print_profile(permanent_token)
      }

      // Get URL
      // this.d_loc = window.location.href
      // if(this.d_loc.indexOf('code=') === -1 && localStorage.getItem('local_token_new4') === null) {
      //   this.$router.push('login')
      // }
    }
  }
</script>

<style scoped>
  /*  */
</style>
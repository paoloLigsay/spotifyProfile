<template>
  <div>
    <!-- sidebar -->
    <sidebar/>

    <!-- loader -->
    <span class="loader"></span>

    <!-- component -->
    <div class="profile">
      <!-- header -->
      <div class="profile__header">
        <img v-if="d_profile.image !== null" :src="d_profile.image" alt="Profile Picture" class="profile__image">
        <img v-else src="../img/profile.png" alt="Profile Picture" class="profile__image profile__image--fallback">
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
          <router-link class="btn" to="/playlist"> See more </router-link>

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
          <router-link class="btn" to="/tracks"> See more </router-link>
        </div>

        <!-- Followed Artists -->
        <div class="profile__following">
          <p class="text text--21 text--gray"> Followed Artists </p>
          <a :href="d_followed_artist.url" v-for="(d_followed_artist, i) in d_followed_artists" :key="i" class="profile__following-item">
            <p class="text"> {{ d_followed_artist.name }}  </p>
            <p class="text text--12"> {{ d_followed_artist.followers }} Followers </p>
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
        d_access_token: '',
        d_profile: {
          type: 'not found',
          image: null,
          name: 'No User Found',
          followers: 0,
          following: 0
        },
        d_tracks: [],
        d_followed_artists: [],
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
        fetch("https://api.spotify.com/v1/me/following?type=artist", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => res.json())
          .then(data => data)
          .then(
            data => {
              for(let followed_artist of data.artists.items) {
                // fix followers number format : 1234 -> 1,234
                const format_followers = followed_artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                // create new artist
                let artist_info = {
                  name: followed_artist.name,
                  followers: format_followers,
                  url: followed_artist.external_urls.spotify
                }
                // push new artist to followed artists
                this.d_followed_artists.push(artist_info)
              }
              // followed artists length = number of following
              this.d_profile.following = data.artists.items.length
          })
      },
      get_profile(local_access_token) {
        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => res.json())
          .then(
            data => {
              this.d_profile.name = data.display_name
              this.d_profile.type = data.type
              this.d_profile.followers = data.followers.total
              this.d_profile.image = data.images[0].url
            }
          )
      },
      get_user_tracks(local_access_token) {
        return fetch("https://api.spotify.com/v1/me/top/tracks?limit=2", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          for(const track of data.items) {
            const new_track_artists = []
            for(const artist of track.artists)
              new_track_artists.push(artist.name)

            const duration_min = parseInt((track.duration_ms / 1000) / 60)
            const duration_sec = parseInt((track.duration_ms / 1000) % 60)
            const duration_ms = `${duration_min}:${duration_sec}`

            let new_track = {
              name: track.name,
              url: track.external_urls.spotify,
              image: track.album.images[0].url,
              artists: new_track_artists,
              duration: duration_ms
            }

            this.d_tracks.push(new_track)
          }
        })
      },
      get_user_playlists (local_access_token) {
        fetch("https://api.spotify.com/v1/me/playlists?limit=2", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
          .then(res => res.json())
          .then(
            data => {
              // loop each item in playlist items array, then get needed data for each item
              for(let playlist of data.items) {
                let playlist_info = {
                  url: playlist.external_urls.spotify,
                  name: playlist.name,
                  image: playlist.images[0].url,
                  track_count: playlist.tracks.total
                }
                // push to data playlits (live change in ui)
                this.d_playlist.push(playlist_info)
              }
          })
      },
      fake_fetch(local_access_token) {
        return fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        })
      },
      remove_loader() {
        const loader = document.querySelector('.loader')
        const profile = document.querySelector('.profile')
        loader.classList.add('loader--done')
        profile.classList.add('profile--active')
      },
      logout() {
        const url = 'https://accounts.spotify.com/en/logout'
        window.open(url, 'Spotify Logout', 'width=550,height=550,top=50,left=50')
        localStorage.removeItem('local_token_new4')
        window.location.href = 'https://yourspotifyprofile.netlify.app/'
        // doesn't work lol : 
        // const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=55,height=55,top=1,left=1')
        // setTimeout(() => spotifyLogoutWindow.hide(), 1000)
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

                    // print profile, playlist, followed artist and tracks
                    this.get_profile(this.d_access_token)
                    this.get_user_playlists(this.d_access_token)
                    this.get_user_followed_artists(this.d_access_token)
                    this.get_user_tracks(this.d_access_token)

                    // remove loader
                    this.remove_loader()
                  }
                ).catch(
                  () => {
                    localStorage.removeItem('local_token_new4')
                    this.$router.push('login')
                  })
            }
          ) 
      } else if(localStorage.getItem('local_token_new4') !== null) {
        const permanent_token = localStorage.getItem('local_token_new4')
        // print profile, playlist, followed artist and tracks
        this.get_profile(permanent_token)
        this.get_user_playlists(permanent_token)
        this.get_user_followed_artists(permanent_token)
        this.get_user_tracks(permanent_token)

        // to remove loader after fetching data above annd catch if user logout already
        this.fake_fetch(permanent_token)
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              throw new Error('Please Login. No Token Stored.');
            }
          })
          .then(
            () => this.remove_loader()
          )
          .catch(() => {
            localStorage.removeItem('local_token_new4')
            this.$router.push('login')
          })
      }

      // Get URL
      this.d_loc = window.location.href
      if(this.d_loc.indexOf('code=') === -1 && localStorage.getItem('local_token_new4') === null) {
        this.$router.push('login')
      }
    }
  }
</script>

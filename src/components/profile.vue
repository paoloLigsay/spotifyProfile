<template>
  <div class="profile">
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
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data() { 
      return {
        d_params: '',
        d_access_token: '',
        d_profile: {
          type: 'not found',
          name: 'No User Found',
          followers: 0,
          following: 0
        }
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
      logout() {
        localStorage.removeItem('local_token_new4')
        this.$router.replace('/')
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
                .then(res => res.json())
                .then(
                  data => {
                    // set local storage to save data (token) on reload
                    localStorage.setItem('local_token_new4', data.access_token)
                    this.d_access_token = data.access_token

                    // print profile
                    this.print_profile(this.d_access_token)
                    // get following and print
                    this.get_user_followed_artists(this.d_access_token)
                      .then(
                        data => this.d_profile.following = data.artists.items.length
                      )
                  }
                )
            }
          )
      } else if(localStorage.getItem('local_token_new4') !== null) {
        const permanent_token = localStorage.getItem('local_token_new4')

        // print profile
        this.print_profile(permanent_token)
      }
    }
  }
</script>

<style scoped>
  /*  */
</style>
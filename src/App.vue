<template>
  <div>
    <!-- Login -->
    <a style="margin-left:100px;" href="https://accounts.spotify.com/authorize?client_id=d61d37e0b87d4d8cabb9a61358a5c912&response_type=code&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F&scope=playlist-read-private user-read-private user-read-email user-read-recently-played user-top-read user-follow-read">
      LOGIN
    </a>

    <!-- <p> data: </p>
    <p> {{ profile.display_name }} </p>
    <p> {{ profile.type }} </p>
    <p> {{ profile.follower }} </p> -->

    <!-- sidebar -->
    <sidebar :profile="d_access_token" />

    <!-- main content -->
    <div class="main">
      <div class="main__content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>

  /* imports */
  import sidebar from './components/sidebar'

  export default {
    name: 'App',
    components: {
      sidebar
    },
    data() {
      return {
        d_params: '',
        d_access_token: ''
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
      get_profile(local_access_token) {
        return fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${local_access_token}`
          }
        }).then(
          res => res.json()
        ).then(data => data)
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
                    console.log('successfull')

                    this.d_access_token = data.access_token
                    // get profile : promise
                    // this.get_profile(data.access_token)
                    //   .then(data => {
                    //     this.profile.display_name = data.display_name
                    //     this.profile.type = data.type
                    //     this.profile.follower = data.followers.total
                    //   })
                  }
                )
            }
          )
      }
    }
  }

</script>

<style lang="scss">

  /* imports */
  @import './scss/main.scss'

</style>

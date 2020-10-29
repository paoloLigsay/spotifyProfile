
// curl -H "Authorization: Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=" -d grant_type=authorization_code -d code=AQAGetiMQbeZhM_HV1-WRqZ4X_N8OH9f2XSa3wp2gVILYZzzQDLcTEI87ySNt9Ts8l8-2toQ7ae8N8wm---CRHlP2aJAsMEXZ4PVYcKv316Z7IDSveQwcn4kehAWo6LDGgclKcqMybimmVHWcI3Tzsclle-6L_NvtqisMWU91WWpqeXTt4q_Y_sFIg -d redirect_uri=https%3A%2F%2Fpaolomartinligsay.netlify.app%2F https://accounts.spotify.com/api/token
// https://accounts.spotify.com/authorize?client_id=d61d37e0b87d4d8cabb9a61358a5c912&response_type=code&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F&scopes=playlist-read-private

let playlist_id = '7I6Xs1Nx6avnEMelOxUFfC'
let uri = 'spotify:playlist:7I6Xs1Nx6avnEMelOxUFfC'
let token = 'Bearer'
let client_id = 'd61d37e0b87d4d8cabb9a61358a5c912'
let client_id_secret = 'b518dc4acb22415096f64c98cd270502'
let scope = 'playlist-read-private'

let queryString = window.location.search;
queryString = queryString.split('code=')
console.log(queryString[0]);
console.log(queryString[1]);

fetch("https://accounts.spotify.com/api/token", {
  body: `grant_type=authorization_code&code=${queryString[1]}&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F`,
  headers: {
    Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
}).then(
  res => res.json()
).then(
  data => {
    const refresh_token = data.refresh_token

    fetch("https://accounts.spotify.com/api/token", {
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      headers: {
        Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(
      res => res.json()
    ).then(
      data => {
        fetch("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10", {
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        }).then(
          res => res.json()
        ).then(
          data => console.log(data)
        )
      }
    )
  }
)

// WORKING PART OF CDE //

/* variable declarations */
let params = window.location.search;

const get_profile = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_playlist = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_top_artists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_tracks = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_featured_playlist = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_new_release = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_followed_artists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/following?type=artist", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_playlist_music = (local_access_token, playlistId) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

/* get spotify api */
// check if logged in (code=) or if first load after login (local token === null)
if(params.includes('code=') && localStorage.getItem('local_token_new4') === null) {
  // get code by spliting string
  params = params.split('code=')
  const code = params[1]

  // start authorization by passing the code and get first access token and refresh token
  fetch("https://accounts.spotify.com/api/token", {
    body: `grant_type=authorization_code&code=${code}&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F`,
    headers: {
      Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
    .then(res => res.json())
    .then(
      data => {
        // get refresh token and fetch new access token from spotify
        const refresh_token = data.refresh_token
        fetch("https://accounts.spotify.com/api/token", {
          body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
          headers: {
            Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        }).then(
          res => res.json()
        ).then(
          data => {
            // set local storage to save data (token) on reload
            localStorage.setItem('local_token_new4', data.access_token)

            // get albmus
            // const albums = get_albums(data.access_token)
            // album object
            // albums.then(data => console.log(data.items))
            
            // get profile
            const profile = get_profile(data.access_token)
            // profile obj
            profile.then(data => console.log(data))

            // get user playlist
            const playlist = get_playlist(data.access_token)
            // playlist obj
            playlist.then(data => console.log(data))

            // get user's top artists
            const top_artists = get_top_artists(data.access_token)
            // top artists obj
            top_artists.then(data => console.log(data))

            // get user's top tracks
            const tracks = get_tracks(data.access_token)
            // top artists obj
            tracks.then(data => console.log(data))

            // get general featured playlist
            const featured_playlist = get_featured_playlist(data.access_token)
            // top artists obj
            featured_playlist.then(data => console.log(data))

            // get new releases
            const new_release = get_new_release(data.access_token)
            // top artists obj
            new_release.then(data => console.log(data))

            // get followed artists
            const followed_artists = get_followed_artists(data.access_token)
            // followed obj
            followed_artists.then(data => console.log(data))

            // get followed artists
            const playlist_musics = get_playlist_music(data.access_token, '37i9dQZF1DX0jgyAiPl8Af')
            // followed obj
            playlist_musics.then(data => console.log(data))
          }
        )
      }
    )
} else if(params.includes('code=') && localStorage.getItem('local_token_new4') !== null) {
  // if reloaded enter here
  // store local storage value to a variable
  console.log(localStorage.getItem('local_token_new4'))
  const local_access_token = localStorage.getItem('local_token_new4')

  // get albums
  const albums = get_albums(local_access_token)
  // album object
  albums.then(data => console.log(data.items))

} else {
  console.log('first load')
}


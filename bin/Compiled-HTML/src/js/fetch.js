const get_profile = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_user_playlists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_user_artists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_user_tracks = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_featured_playlists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_new_releases = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_user_followed_artists = (local_access_token) => {
  return fetch("https://api.spotify.com/v1/me/following?type=artist", {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

const get_specific_playlist = (local_access_token, playlistId) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${local_access_token}`
    }
  }).then(
    res => res.json()
  ).then(data => data)
}

/* TOKEN */

const get_temporary_token = auth => {
  return fetch("https://accounts.spotify.com/api/token", {
    body: `grant_type=authorization_code&code=${auth}&redirect_uri=https%3A%2F%2Fyourspotifyprofile.netlify.app%2F`,
    headers: {
      Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
}

const get_permanent_token = (temp_token) => {
  return fetch("https://accounts.spotify.com/api/token", {
    body: `grant_type=refresh_token&refresh_token=${temp_token}`,
    headers: {
      Authorization: "Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
}
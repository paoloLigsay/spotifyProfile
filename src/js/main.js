let playlist_id = '7I6Xs1Nx6avnEMelOxUFfC'
let uri = 'spotify:playlist:7I6Xs1Nx6avnEMelOxUFfC'
let token = 'Bearer'
let user_id = 'matt'

let client_id = 'd61d37e0b87d4d8cabb9a61358a5c912'
let scope = 'playlist-read-private'

curl -H "Authorization: Basic ZDYxZDM3ZTBiODdkNGQ4Y2FiYjlhNjEzNThhNWM5MTI6YjUxOGRjNGFjYjIyNDE1MDk2ZjY0Yzk4Y2QyNzA1MDI=" -d grant_type=authorization_code -d code=MQCbtKe...44KN -d redirect_uri=https%3A%2F%2Fpaolomartinligsay.netlify.app%2F https://accounts.spotify.com/api/token

https://accounts.spotify.com/authorize?client_id=d61d37e0b87d4d8cabb9a61358a5c912&response_type=code&redirect_uri=https%3A%2F%2Fpaolomartinligsay.netlify.app%2F&scopes=playlist-read-private
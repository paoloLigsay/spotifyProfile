// get url parameter
let params = window.location.search;

// get function (document querySelector)
const get = el => document.querySelectorAll(el).length > 1 ? document.querySelectorAll(el) : document.querySelector(el)

// variables
const login_component = get('.pl-login')

/* SPOTIFY API */
if(params.includes('code=') && localStorage.getItem('local_token_new4') === null) {
  // condition: succesfully logged in and browser first load
  // remove login component
  login_component.classList.add('pl-login--successful')

  // get code by spliting parameter string
  params = params.split('code=')
  const code = params[1]

  // start authorization by passing the code and get first access token and refresh token
  get_temporary_token(code)
    .then(res => res.json())
    .then(
      data => {
        const temp_token = data.refresh_token
        // pass temporary token and get permanent token
        get_permanent_token(temp_token)
          .then(res => res.json())
          .then(
            data => {
              // set local storage to save data (token) on reload
              localStorage.setItem('local_token_new4', data.access_token)
              console.log('successfull')

              // get profile
              const profile = get_profile(data.access_token)
              // profile obj
              profile.then(data => console.log(data))
            }
          )
      }
    )
} else if(params.includes('code=') && localStorage.getItem('local_token_new4') !== null) {
  // remove login component
  login_component.classList.add('pl-login--successful')

  // condition: succesfully logged in and browser already reloaded
  // store local storage value to a variable
  console.log(localStorage.getItem('local_token_new4'))
  const local_access_token = localStorage.getItem('local_token_new4')
} else {
  console.log('log in first')
}

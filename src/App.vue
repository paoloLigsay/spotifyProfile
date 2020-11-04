<template>
  <div>

    <!-- main content -->
    <div class="main">
      <div class="main__content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        d_params: '',
      }
    },
    mounted() {
      // if not logged in restrict user to access pages
      if(localStorage.getItem('local_token_new4') === null)
        this.$router.push('login')
    }
  }

</script>

<style lang="scss">

  /* imports */
  @import './scss/main.scss'

</style>

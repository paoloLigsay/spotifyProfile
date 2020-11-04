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
    }
  }

</script>

<style lang="scss">

  /* imports */
  @import './scss/main.scss'

</style>

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
    name: 'App'
  }

</script>

<style lang="scss">

  /* imports */
  @import './scss/main.scss'

</style>

<template>
  <div class="profile">
    <div class="profile__header">
      <img src="../img/profile.png" alt="Profile Picture" class="profile__image-fallback">
      <div class="profile__header-info">
        <p class="text text--24"> User </p>
        <h2 class="text text--48"> {{ name }} </h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    props: ['display_name'],
    data() { 
      return {
        name: 'No User Name'
      }
    },
    mounted() {
      if(this.display_name) {
        this.name = this.display_name
      }
    }
  }
</script>

<style scoped>
  /*  */
</style>
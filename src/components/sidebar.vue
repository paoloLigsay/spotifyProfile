<template>
  <div class="sidebar">
    <img src="../img/logo.png" alt="Spotify Profile Logo" class="sidebar__logo">
    <ul class="sidebar__hamburger" @click="open_nav">
      <li class="sidebar__hamburger-bar"></li>
      <li class="sidebar__hamburger-bar"></li>
      <li class="sidebar__hamburger-bar"></li>
    </ul>
    <ul class="sidebar__list">

      <router-link to="/">
        <li class="sidebar__item sidebar__item--active">
          <img src="../img/icon-profile.png" alt="Spotify Profile" class="sidebar__icon">
          <p class="sidebar__text"> Profile </p>
        </li>
      </router-link>

      <router-link to="/discover">
        <li class="sidebar__item">
          <img src="../img/icon-magnify.png" alt="Icon Magnify" class="sidebar__icon">
          <p class="sidebar__text"> Discover </p>
        </li>
      </router-link>

      <router-link to="/tracks">
        <li class="sidebar__item">
          <img src="../img/icon-music.png" alt="Icon Tracks" class="sidebar__icon">
          <p class="sidebar__text"> Top Tracks </p>
        </li>
      </router-link>

      <router-link to="/artists">
        <li class="sidebar__item">
          <img src="../img/icon-mic.png" alt="Icon Artist" class="sidebar__icon">
          <p class="sidebar__text"> Top Artists </p>
        </li>
      </router-link>

      <router-link to="/playlist">
        <li class="sidebar__item">
          <img src="../img/icon-playlist.png" alt="Icon Artist" class="sidebar__icon">
          <p class="sidebar__text"> Playlists </p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    props: ['active'],
    methods: {
      set_active(item_number) {
        const sidebar_items = document.querySelectorAll('.sidebar__item')
        for(let sidebar_item of sidebar_items) {
          if(sidebar_item.classList.contains('sidebar__item--active'))
            sidebar_item.classList.remove('sidebar__item--active')
        }
        sidebar_items[item_number].classList.add('sidebar__item--active')
      },
      open_nav() {
        const hamburger = document.querySelector('.sidebar__hamburger')
        const nav = document.querySelector('.sidebar__list')
        hamburger.classList.toggle('sidebar__hamburger--active')
        nav.classList.toggle('sidebar__list--active')
      }
    },
    mounted() {
      const active_number = this.active
      this.set_active(active_number)
    }
  }
</script>

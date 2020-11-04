<template>
  <div class="sidebar">
    <img src="../img/logo.png" alt="Spotify Profile Logo" class="sidebar__logo">
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

      <router-link to="/playlists">
        <li class="sidebar__item">
          <img src="../img/icon-playlist.png" alt="Icon Artist" class="sidebar__icon">
          <p class="sidebar__text"> Playlists </p>
        </li>
      </router-link>

      <p> Displays </p>
      {{ d_access_token }}

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    props: ["d_access_token"]
  }
</script>

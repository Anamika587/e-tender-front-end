<template>
  <div id="app" class="">
    <div class="absolute top-5 left-5 bg-purple-400">
      <router-link to="/upload">
        <span class="px-3 py-2 bg-purple-400 text-white">Upload</span>
      </router-link>
      <router-link to="/data">
        <span class="px-3 py-2 border-l-4 bg-purple-400 text-white"
          >Data</span
        ></router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style>
</style>

<template>
  <div id="app">
    <div class="router-nav">
      <span class="svg__title">IconFont</span>
      <router-link to="/svg/mobile" class="router-nav__item">Mobile</router-link>
      <router-link to="/svg/life" class="router-nav__item">Life</router-link>
      <router-link to="/svg/game" class="router-nav__item">Game</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
};
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.svg__title {
    margin: 0 100px 0 -175px;
    font-size: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
}

.router-nav {
    background-color: rgba(38, 208, 49, 1);
    margin-left: -500px;
}

.router-nav__item {
    display: inline-block;
    text-decoration: none;
    width: 65px;
    height: 60px;
    margin-right: 30px;
    vertical-align: middle;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}
</style>

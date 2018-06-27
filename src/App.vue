<template>
  <div id="app">
   <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive> 
   <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang='scss'>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;  
}
::-webkit-scrollbar {/*隐藏滚轮*/
display: none;
}
</style>

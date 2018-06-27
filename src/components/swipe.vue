<template>
     <div class="swiper-container" >
            <div class="swiper-wrapper">
                 <div class="swiper-slide" v-for='(item,index) in items' :key='index' >
                        <img :src='item.url' alt="">
                </div>
            </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.js'

export default {
  mounted: function() {
    new Swiper(".swiper-container", {
      observer: true,
      observeParents: true,
      loop: true,
    })
  },
  props: ['items']
}
</script>

<style lang="scss" scoped>
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      display: flex;
      justify-content: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>


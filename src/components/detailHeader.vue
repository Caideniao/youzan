<template>
 <div class="detail-header">
     <div class="header-left">
            <span class="arrow" @click="goBack"></span>
            <span>商品详情</span>
     </div>
     <div class="header-right">
            <svg class="icon" aria-hidden="true" @click="goCart">
            <use xlink:href='#icon-gouwuche1'></use></svg>
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
     </div>
 </div>
</template>

<script>
import '../assets/font/iconfont.css'
import '../assets/font/iconfont.js'
export default {
    methods:{
        goCart(){
           this.$router.push({ path: '/cart' })
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-header{
    width: 100%;
    position: fixed;
    top:0;
    height:50px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    .header-left{
        .arrow{
            display: inline-block;
            border: 2px solid rgb(145, 143, 143);
            border-top: 0;
            border-right: 0;
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            margin: 0 12px;
        }
    }
    .header-right{
        display: flex;
        align-items: center;
        margin-right: 8px;
        .icon{
            width:24px;
            height:24px;margin:0 8px;
        }
        .dot{
            display: inline-block;
            width: 4px;
            height: 4px;
            border:1px solid rgb(139, 139, 139);
            border-radius: 4px;
            background-color: rgb(139, 139, 139);
            margin:0 1px;
        }   
    }
}
</style>

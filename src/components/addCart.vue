<template>
    <div class="add-cart">
        <div class="cart-left">
            <div class="cart-icon"><svg class="icon" aria-hidden="true">
            <use xlink:href='#icon-msg'></use></svg><p class="title">店主</p></div>
            <div class="cart-icon"><svg class="icon" aria-hidden="true">
            <use xlink:href='#icon-store'></use></svg><p class="title">店铺</p></div>
            <div class="cart-icon"><svg class="icon" aria-hidden="true" @click='activate = !activate' :class="{active:activate}">
            <use xlink:href='#icon-wujiaoxing'></use></svg><p class="title">收藏</p></div>
        </div>
        <div class="cart-right">
            <span class="cart-append" @click="$emit('add', '加入购物车')">加入购物车</span>
            <span class="buy-now" @click="$emit('add', '下一步')">立即购买</span>
        </div>
    </div>
</template>

<script>
import '../assets/addCart/iconfont.css'
import '../assets/addCart/iconfont.js'
export default {
    data(){
        return {
            activate:false
        }
    }   
}
</script>

<style lang="scss" scoped>
.add-cart{
    position: fixed;
    bottom:0;
    background-color: white;
    border-top: 0.5px solid rgb(238, 236, 236);  
    z-index: 10;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    .cart-left{
        width:40%;
        display: flex;
        justify-content: space-around;
        .cart-icon{
            width: 33.333%;
            padding: 5px 0;
            text-align: center;
            border-right: 0.5px solid rgb(238, 236, 236);
            .title{
                margin:0 2px;
                font-size: 10px;
                color: rgb(145, 145, 145);
            }
            .icon{
                width: 24px;
                height: 24px;
                vertical-align: -0.15em;
                overflow: hidden;
            }
            .active{
                fill:red;
            }
        }
    }
    .cart-right{
        width:60%;
        display: flex;
        .cart-append{
            height: 100%;
            width: 50%;
            background-color: rgb(250, 105, 48);   
           display: flex;
           justify-content: center;
           align-items: center;
           color:white;
           font-size: 14px;  
        }
        .buy-now{
             height: 100%;
            width: 50%;
            display: flex;
            justify-content: center;
           align-items: center; 
           background-color: rgb(250, 64, 64);
           color:white;
           font-size: 14px;  
        }
    }
}
</style>

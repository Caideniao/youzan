<template>
    <div class="svg-icons">
        <div class="wrapper">
            <svg class="icon" aria-hidden="true" v-for='(item,index) in icon' 
            @click="changeFocus(index)" :key='index' :class="{activate: focus === index}">
            <use :xlink:href='item'></use></svg>
        </div>
        <div class="foot-discription"><span>精选</span><span>喜欢</span><span>购物车</span><span>个人</span></div>  
    </div>
</template>

<script>
import '../assets/font/iconfont.css'
import '../assets/font/iconfont.js'
export default {
    name:'footerBar',
    data(){
        return {
            icon:['#icon-dianzan','#icon-Heart','#icon-gouwuche1','#icon-geren'],
            redirectUrl:['/explore','/like','/cart','/person']
        }
    },
    computed:{
        focus(){
            return this.$store.state.broswering
        }
    },
    methods:{
        changeFocus(index){
            this.$router.push({path:this.redirectUrl[index]})
            this.$store.commit('redirect',index)
        }
    }
}
</script>

<style lang='scss' scoped>
 .activate{
           fill: red;
       }
.svg-icons {
    border-top: 1px solid rgb(241, 241, 241);
    position: fixed;
    z-index: 10;
    bottom: 0;
    box-sizing: border-box;
    width: 100vw;
    background-color: white;
    padding: 5px 0;
    .wrapper{
        margin-left: 0px;
        display: flex;
        justify-content: space-around;
        .icon {
        width:28px;
        height:28px;
        vertical-align: -0.15em;
        overflow: hidden;}
    }
    .foot-discription{
        display: flex;
        justify-content: space-around;
        color: black;
        font-size: 12px;
    }
}
</style>

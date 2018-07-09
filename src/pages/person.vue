<template>
    <div>
        <header class="head-Bar">我</header>
        <div class="log" @click="logIn">
            <div class="avatar">
                <svg class="icon" aria-hidden="true"><use xlink:href='#icon-geren'></use></svg>
            </div>
            <p class="log-in" v-if='!isloggedIn'>登录/注册></p>
        </div>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">我的订单</span><span class="arrow"></span></div>
        <div class="items"><span class="items-title">会员卡</span><span class="arrow"></span></div>
        <div class="items"><span class="items-title">优惠券</span><span class="arrow"></span></div>
        <div class="items"><span class="items-title">返现记录</span><span class="arrow"></span></div>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">联系有赞客服</span><span class="arrow"></span></div>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">我要开店</span><span class="arrow"></span></div>
        <footerBar/>
    </div>
</template>

<script>
import footerBar from '../components/footer.vue'
import '../assets/font/iconfont.css'
import '../assets/font/iconfont.js'
import AV from '../components/leancloud.js'
export default {
    computed:{
        isloggedIn () {
            let currentUser = AV.User.current()
            this.$store.commit('confirmUser',currentUser)
            return currentUser
        }
    },
    methods:{
        logIn() {
            if (this.isloggedIn) {
                this.$router.push({path:'/information'})
            } else {
                this.$router.push({path:'/logIn'})
            }             
        },
    },
    components:{footerBar}
}
</script>

<style lang="scss" scoped>
.arrow{
    border: 0.5px solid rgb(145, 143, 143);
    border-top: 0;
    border-right: 0;
    width: 6px;
    height: 6px;
    transform: rotate(-135deg);
    margin-right: 5px;
}
.divide-bar{
    height: 10px;
    background-color: rgb(243, 243, 243);
}
.head-Bar{
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.log{
    .avatar{
        width: 86px;height: 86px;
        border-radius: 86px;
        background-color: rgb(173, 173, 173);
        margin: 18px auto;
        .icon{
            width: 86px;height: 86px;
            fill: white;
        }
    }
    .log-in{
        text-align: center;
    }
}
.items{
    display: flex;
    justify-content: space-between;align-items: center;
    border-bottom: 1px solid rgb(238, 236, 236);
    padding:14px 8px;
    .items-title{
        display: inline-block;
    }
}
</style>
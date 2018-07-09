<template>
    <div>
        <header class="log-header"><span class="arrow left" @click="goBack"></span><span>个人信息</span></header>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">登录账号</span><span>{{user.attributes.username}}</span></div>
        <div class="items"><span class="items-title">昵称</span><span class="arrow"></span></div>
        <div class="items"><span class="items-title">性别</span><span class="arrow"></span></div>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">我的收货地址</span><span class="arrow"></span></div>
        <div class="divide-bar"></div>
        <div class="items"><span class="items-title">修改密码</span><span class="arrow"></span></div>
        <div class="log-out" @click.prevent='logOut'>退出登录</div>
    </div>
</template>

<script>
import AV from '../components/leancloud.js'
export default {
    computed:{
        user () {           
            return this.$store.state.user
        }
    },
    methods:{
        logOut() {
            AV.User.logOut()
            this.$router.push({path:'/person'})           
        },
        goBack(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
.arrow{
    border: 1px solid rgb(145, 143, 143);
    border-top: 0;border-right: 0;
    width: 12px;display: inline-block;
    height: 12px;
    transform: rotate(-135deg);
    margin: 0 10px;
}
.left{
    transform: rotate(45deg)
}
.divide-bar{
    height: 20px;
    background-color: rgb(243, 243, 243);
}
.log-header{
    padding: 12px 4px;font-size: 18px;
    font-weight: bold;border-bottom: 1px solid lightgray;
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
.log-out{
     width: 86vw;height: 48px;
    background-color: rgb(250, 59, 59);
    display: block;
    margin:30px auto;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    text-align: center;line-height: 48px;color: white;
}
</style>

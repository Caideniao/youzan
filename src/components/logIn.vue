<template>
    <div>
        <header class="log-header"><span class="arrow" @click="goBack"></span><span>有赞账号登录</span></header>
        <div class="divide-bar"></div>
        <div class="log-form">
            <form action="" method="post">
                <div class="log-account"><span>账号</span><input type="text" placeholder="请输入账号" v-model='account'></div>
                <div class="log-account"><span>密码</span><input type="text" placeholder="请输入密码" v-model="code"></div> 
                <label for="log-in" class="log-button" @click.prevent='logIn'>登录</label>
                <button id="log-in" type="submit">登录</button>
            </form>
        </div>
        <div class="sign-up" @click="signUp">注册账号</div>
        <transition name="fade">
        <div class="message" v-show="isComplete">
            <div class="message-box">{{message}}</div>
        </div>
        </transition>
    </div>
</template>

<script>
import AV from './leancloud.js'
export default {
    data(){
        return {
            account:null,
            code:null,
            isComplete:false,
            message:'',
        }
    },
    methods:{
        logIn(){
            if (!this.account) {
                this.message = '账号名称不能为空'
                this.isComplete = true
                setTimeout(() => {this.isComplete = false},1500)
                return 
            }else if(!this.code) {
                this.message = '密码不能为空'
                this.isComplete = true
                setTimeout(() => {this.isComplete = false},1500)
                return 
            }else{
                let that = this
                AV.User.logIn(this.account, this.code).then(function (loggedInUser) {
                    that.$store.commit('confirmUser',loggedInUser)
                    that.$router.push({path:'/person'})
                }, function () {
                    that.message = '用户名和密码不匹配'
                    that.isComplete = true
                    setTimeout(() => {that.isComplete = false},1500)
                });
            }
        },
        signUp(){
            this.$router.push({path:'/signUp'})
        },
        goBack(){
            this.$router.go(-1)
        }   
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition:  0s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.arrow{
    border: 1px solid rgb(145, 143, 143);
    border-top: 0;border-right: 0;
    width: 12px;display: inline-block;
    height: 12px;
    transform: rotate(45deg);
    margin: 0 10px;
}
.divide-bar{
    height: 20px;
    background-color: rgb(243, 243, 243);
}
.log-header{
    padding: 12px 4px;font-size: 18px;
    font-weight: bold;
}
.log-form{
    .log-account{
        padding: 8px 10px;
        border-bottom: 1px solid rgb(240, 239, 239);
        input{
            margin-left: 18px;
            border: none;
            outline: none;
        }
    }
    .log-button{
        width: 86vw;height: 48px;
        background-color: rgb(250, 59, 59);
        display: block;
        margin:30px auto;
        border-radius: 6px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        text-align: center;line-height: 48px;color: white;
    }
    #log-in{
        display: none;
    }
}
.sign-up{
    width: 86vw;height: 48px;
    border:1px solid rgb(255, 97, 97);
    display: block;
    margin:30px auto;
    border-radius: 6px;
    text-align: center;line-height: 48px;color: rgb(252, 64, 64);
}
.message{
    text-align: center;
    transition: all 0.5s;
    .message-box{
        padding:0 36px;
        display: inline-block;
        background: rgb(75, 74, 74);
        color: white;line-height: 48px;
        border-radius: 48px;margin:36px auto;
    }
}

</style>
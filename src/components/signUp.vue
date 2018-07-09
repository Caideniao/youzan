<template>
    <div>
        <header class="log-header"><span class="arrow" @click="goBack"></span><span>有赞账号注册</span></header>
        <div class="divide-bar"></div>
        <div class="log-form">
            <form action="" method="post">
                <div class="log-account"><span>账号</span><input type="text" placeholder="请输入账号" v-model='account'></div>
                <div class="log-account"><span>密码</span><input type="text" placeholder="请输入密码" v-model="code"></div> 
                <div class="log-account"><span>确认密码</span><input type="text" placeholder="请再次输入密码" v-model="confirmCode"></div>
                <label for="log-in" class="log-button" @click.prevent='signUp'>注册账号</label>
                <button id="log-in" type="submit"></button>
            </form>
        </div>
        <transition name="fade">
        <div class="message" v-show="isComplete">
            <div class="message-box">{{message}}</div>
        </div>
        </transition>
    </div>
</template>

<script>
import footerBar from '../components/footer.vue'
import AV from './leancloud.js'
export default {
    data(){
        return {
            account:null,
            code:null,
            confirmCode:null,
            isComplete:false,
            message:'',    
        }
    },
    methods:{
        signUp(){
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
            }else if(this.code !== this.confirmCode){
                 this.message = '前后密码不一致'
                this.isComplete = true
                return setTimeout(() => {this.isComplete = false},1500)
            } else {
                let that = this
                var user = new AV.User();
                user.setUsername(this.account);
                user.setPassword(this.code);
                user.signUp().then(function (loggedInUser) { 
                    that.$router.push({path:'/logIn'}) 
                }, function (error) {
                    if(error.code === 202) {    
                        that.message = '用户名已被注册，请重新选择'
                        that.isComplete = true
                        that.account = null
                        that.code = null
                        that.confirmCode = null
                        return setTimeout(() => {that.isComplete = false},1500)
                    }
                })
            }
        }, 
        goBack() {
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
    .log-message{
        font-size: 10px;
        color: rgb(250, 85, 85);
        padding: 8px 10px;
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
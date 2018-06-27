<template>
    <div class="detail-wrapper">
        <detailHeader/>
        <div :class="{overlay:pop}" @click="cancelPop"></div>
        <swipe :items='goods.slides' v-if='goods' class="swipe"/>
        <div class="discription-information">
            <p class="information-title">{{goods.title}}</p>
            <p class="information-price">￥{{goods.price}}</p>
            <div class="information-postage"><span>运费: 免运费</span><span>剩余: {{goods.remain}}</span><span>销量: {{goods.solded}}</span></div>   
        </div>
        <div class="divide"></div>
        <div class="section-choice" @click='popUp'>
            <div v-if='choosing' class="choosed"><span>{{chosed}}</span><span class="arrow"></span></div>
            <div v-else class="choosed"><span>选择：{{choice}}</span><span class="arrow"></span></div>
        </div>
         <div class="divide"></div>
         <div class="section-shop"><span class="shopLogo"><img :src="goods.shopLogo" alt="">{{goods.shop}}</span><span class="arrow"></span></div>
         <div class="section-credit">
             <span v-for='(value,key) in goods.credit' :key='key'><svg class="icon" aria-hidden="true">
            <use xlink:href='#icon-dagou'></use></svg>{{value}}</span>
         </div>
         <div class="divide"></div>
         <div class="section-details">
             <span @click="index = 0" :class="{activate: index ===0}">商品详情</span>
             <span @click="getOrder " :class="{activate: index ===1}">今日成交</span>
         </div>
        <div class="section-discription" v-show='index === 0'>
            <img v-for='(item,index) in goods.discription' :key='index' :src="item.image" alt="">
        </div>
        <div class="section-order" v-show='index === 1'>
        <div class="order-title"><span>买家</span><span>成交时间</span><span>成交数量</span></div>
        <div v-for="(item,index) in orders" :key='index' class="order-list"><span>{{item.buyer}}</span><span>{{item.time}}</span><span>{{item.number}}</span></div>
    </div>
    <transition name="fade"><keep-alive><cart :good='goods' v-if='addValue' :name="addValue" @cancel='cancelPop' @checkCart='checkCartParam' ref="cart"/></keep-alive></transition> 
    <addCart @add='popUp'/>
    <div class="message-inform" :class="{messageBox: message}">{{popedMessage}}</div>
    </div>
</template>

<script>
import swipe from '../swipe.vue'
import fetch, {getDetail, getOrders} from "../../api/fetch.js"
import '../../assets/dagou/iconfont.css'
import '../../assets/dagou/iconfont.js'
import addCart from '../addCart.vue'
import cart from './cart.vue'
import detailHeader from '../detailHeader.vue'

export default {
    name:'detail',
    data(){
        return {
            goods:'',
            index: 0,
            orders:'',
            addValue:'',
            pop:false,
            choosing:false,
            chosed:'',
            message:false,
            popedMessage:''
        }
    },
    created(){
        this.getGood()
    },
    computed:{
        choice(){
            let s = this.goods.size
            if (this.goods) {
                let t = Object.keys(s)
                let inform = ''
                t.forEach(function(e){inform = inform + ' ' + e})
                return inform
            } 
        }
    },
    methods:{
        getGood(){
            fetch(getDetail).then((response) => {
                this.goods = response.data.detail
            })
        },
        getOrder(){
            this.index = 1;
            if (!this.orders){
                fetch(getOrders).then((response) => {
                this.orders = response.data.sales
            })
            } 
        },
        popUp(title){
            if (typeof title !== 'string') {
                this.addValue = '下一步'
            } else {
                this.addValue = title               
            }
            this.pop = true
            document.body.setAttribute('style','overflow:hidden')
        },
        checkCartParam(){
            let s = this.$refs.cart
            if (s.allchosed){
                this.popedMessage = '已成功添加到购物车~'   
                this.message = true
                setTimeout(() => {this.message = false}, 1500)
                this.cancelPop()
            } else {
                let t = s.unchosen.join('和')
                this.popedMessage = '请选择 ' + t   
                this.message = true
                setTimeout(() => {this.message = false}, 1500)
            }
        },
        cancelPop(){
            this.addValue = false
            this.pop = false
            document.body.removeAttribute('style')
            this.choosing = true
            let s = this.$refs.cart
            if (s.allchosed) {
                this.chosed = '已选：' + s.chosed
            } else {
                this.chosed = '选择：' + s.unchosen.join(' ')
            }
        }
    },  
    components:{swipe,addCart,cart,detailHeader}
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: transform .5s;
}
.fade-enter, .fade-leave-to {
  transform: translateY(100%);
}
.detail-wrapper{
    margin-top: 50px;
    .overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    background: rgba(0,0,0, 0.8);
    transition: all 0.5s
}
    .swipe{
            width:100%;
        }
    .discription-information{
        padding: 5px 5px 0;
        margin: 5px 0 0;
        .information-title{ 
            margin: 0;
            font-size: 16px;
        }
        .information-price{
        font-size: 18px;
        margin:5px 0;
        color:red;
        }
        .information-postage{
            margin: 10px 0 ;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: rgb(131, 130, 130);
        }  
    }
    .section-choice{
        height: 28px;
        line-height: 28px;
        padding: 0 6px;
        .choosed{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: 12px;
            }
        }      
    }
    .section-shop{
        padding: 16px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5px solid rgb(226, 226, 226);
        .shopLogo{
            display: flex;
            align-items: center;
            img{
                padding-right: 10px;
            }
        }
    }
    .section-credit{
        font-size: 8px;
        height: 20px;
        line-height: 20px;
        span{
            margin:8px;
            .icon{
            width: 8px;
            height: 8px;
            vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        }
        } 
    }
    .section-details{
        span{
            display: inline-block;
            width: 50%;
            text-align: center;
            padding: 10px 0;
            font-size: 14px; 
        }
        .activate{
            color:red;
            border-bottom: 0.5px solid red;  
        }
    }
    .section-discription{
        margin-bottom: 55px;
        img{
            width: 100%;
        }
    }
    .section-order{
        margin-bottom: 150px;
        .order-title{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 28px;
            background-color: rgb(231, 229, 229);
            font-size: 12px;
        }
        .order-list{
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 10px;
        }
    }   
    .divide{
        height: 10px;
        background-color: rgb(243, 243, 243);
    }
    .message-inform{
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 200;
        background-color: #1b1515;
        padding: 12px 38px;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        color: white;
        white-space: nowrap;
    }
    .messageBox{
        display: block;
    }
}
.arrow{
        border: 0.5px solid rgb(145, 143, 143);
        border-top: 0;
        border-right: 0;
        width: 6px;
        height: 6px;
        transform: rotate(-135deg);
        margin-right: 5px;
        }
</style>

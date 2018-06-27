<template>
<div>
    <div class="return-bar">
            <!-- <span class="arrow"></span>
            <span>购物车</span> -->
    </div>
    <div class="section-wrapper">
       <section v-if='cartList' v-for='(value,key1) in cartList' :key='key1' class="section-shop">
           <div class="shop-bar">
               <div class="left-bar">
                   <div @click="chooseShop(key1)">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href='#icon-bianji'></use></svg>
                        <svg class="icon-check" aria-hidden="true" :class="{checked: productConfirm[key1].checked}">
                        <use xlink:href='#icon-open_icon_successx'></use></svg>
                        <svg class="icon" aria-hidden="true" >
                        <use xlink:href='#icon-store'></use></svg>
                   </div>
                    <span class="shop-name">{{key1}}</span>
               </div>
                <span class="shop-edit" v-show='!editing && !(productConfirm[key1].editing)' @click="edit(key1)">编辑</span> 
                <span class="shop-edit" v-show='editing && (productConfirm[key1].editing)' @click="edit(key1)">完成</span>
           </div>
           <div v-for="(item,index) in value" :key='index' class="product-list">
               <div class="check-good" @click="chooseProduct(item,key1)">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href='#icon-bianji'></use></svg>
                    <svg class="icon-check" aria-hidden="true" :class="{checked: item.checked}">
                    <use xlink:href='#icon-open_icon_successx'></use></svg>
               </div>
               <img :src="item.productImage" alt="">
               <div class="product-title">                   
                    <div class="add" v-if="editing && (productConfirm[key1].editing)"><span @click="reduce(item)" :class="{prohibited: item.amount <= 1}" class="add-reduce">−</span>
                    <input class="mark" type="number" :value='item.amount' @keyup="pressKey" @change="input(item)">
                    <span class="add-reduce" @click="add(item)" :class="{prohibited: item.amount >= item.remain}">+</span></div>
                    <div class="title" v-else>{{item.title}}</div>
                   <span class="type">{{item.type}}</span>
                   <div class="wrapper"><span class="price">￥{{item.price}}</span><span class="amount" v-show="!editing">x{{item.amount}}</span></div>
               </div>
               <div class="delete-choose" v-show="editing && (productConfirm[key1].editing)" @click="pop(item,index)">删除</div>
           </div>
       </section>
         
     </div>
       <div class="section-pay" v-if="!allDeleted">
           <div class="pay-left" @click="chooseAll">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href='#icon-bianji'></use></svg>
                <svg class="icon-check" aria-hidden="true" :class="{checked:allChosed}">
                    <use xlink:href='#icon-open_icon_successx'></use></svg>
                <span class="choose-all">全选</span>
           </div>
            <div class="pay-total">
                <span class="total-price" v-show="!editing">合计：￥{{bill}}</span>
                <span class="total-amount" v-show="!editing">结算({{chosed}})</span>
                <span class="total-amount delete" v-show="editing" :class="{grey:(deleteList.length)}" @click="popUp">删除</span>
            </div>
       </div>
       <div v-if="allDeleted" class="all-deleted">购物车快饿扁了~</div>
        <footerbar/> 
           <div class="pop-message" :class='{pop: deletePop}'>
        <!-- 有赞官网有bug 未选中可以删除 -->
           <p class="query" v-show='deleteOne'>确定要删除该商品吗？</p> 
           <p class="query" v-show='deleteAll'>确定删除所选的{{deleteList.length}}个商品吗？</p> 
           <div class="answer">
               <span @click="cancel">取消</span>
               <span @click="confirmDelete">确认</span>
           </div>
       </div> 
</div>
</template>
 <script>
 import fetch, {getCartList} from '../api/fetch.js'
 import footerbar from './footer.vue'
 import '../assets/addCart/iconfont.css'
 import '../assets/addCart/iconfont.js'

 export default {
    data(){
        return {
            cartList:'',
            productConfirm:{},
            allChosed:true,
            editing:false,
            bill:0,
            deleteChoose:'',
            deleteOne:false,
            deleteAll:false,
            deleteShop:null,
            deletePop:false,
            deleteList:[],
            delete:false,
            allDeleted:false
        }
    },
    created(){
        this.getList()
    },
    watch:{
        productConfirm: {
            handler(){
                this.allChosed = true
                if (!(Object.keys(this.productConfirm).length)) {
                    this.allDeleted = true
                    return this.allChosed = false
                }
                for(let i in this.productConfirm) {
                    if (!(this.productConfirm[i].checked)){
                        return this.allChosed = false
                    }
                }
            },
            deep:true
        },
        delete(){
            let b = []
            for (let i in this.cartList[this.deleteShop]) {
                if (this.cartList[this.deleteShop][i].checked) {
                    b.push(i)
                }
            }
            this.deleteList = b
        }
    },
    computed:{
        chosed(){
            let count = 0
            let b = 0
            let d = 0
            for (let i in this.cartList) {
                for (let k of this.cartList[i]) {
                    if (k.checked) {
                        count++
                        b = b + parseInt(k.amount) * parseInt(k.price)
                    }
                }
            }  
            this.bill = b          
            return count
        },
    },
    methods:{
        getList(){
            fetch(getCartList).then((res) => {
                let t = this.$store.state.cart
                let s = {}
                this.cartList = Object.assign(res.data.cart,t)
                let q = JSON.parse(JSON.stringify(this.cartList))  //深拷贝 或直接生成新的data储存
                for (let i in q) {
                    s[i] = {}
                    s[i].checked = true
                    s[i].editing = false
                    for (let k of q[i]) {
                        k.checked = true
                    }
                }
                this.productConfirm = s
                this.cartList = q
            })
        },
        chooseShop(n){
            let s = this.productConfirm[n]           
            s.checked = !(s.checked)
            if (s.checked) {
                this.delete = !this.delete
                for (let i of this.cartList[n]) {
                    i.checked = true
                }
            } else {
                for (let i of this.cartList[n]) {
                    i.checked = false
                }
                this.delete = !this.delete
            }
        },
        chooseProduct(n,k){
            n.checked = !n.checked
            this.productConfirm[k].checked = true
            if (this.productConfirm[k].editing && n.checked){
                this.delete = !this.delete
            } else {
                this.delete = !this.delete
            }
            for (let i of this.cartList[k]) {     
                if (!i.checked) {
                    return this.productConfirm[k].checked = false
                }
            }
        },
        chooseAll(){
            this.allChosed = !this.allChosed
            this.changeAll()
            if(this.editing) {
                this.delete =!this.delete
            }
        },
        changeAll(){
            if (this.allChosed) {
                for (let i in this.productConfirm) {
                    this.productConfirm[i].checked = true}
                for (let k in this.cartList) {
                    for (let i of this.cartList[k]) {
                        i.checked = true
                    }
                }              
            } else {
                for (let i in this.productConfirm) {
                    this.productConfirm[i].checked = false}
                for (let k in this.cartList) {
                    for (let i of this.cartList[k]) {
                        i.checked = false
                    }
                }     
            }
        },
        edit(n){
            if (this.editing) {
                this.allChosed = true
                this.changeAll()
                this.deleteShop = ''
            } else {
                this.allChosed = false
                this.changeAll()
                this.deleteShop = n
            }
            this.editing = !this.editing
            if (this.productConfirm[n]) {
                this.productConfirm[n].editing = !this.productConfirm[n].editing
            }
            
        },
        add(n){
            if (n.amount < n.remain) {
                n.amount++
            }
        },
        reduce(n){
             if (n.amount > 1) {
                n.amount--
            }
        },
        input(n){
            if (event.target.value > n.remain) {
                n.amount = n.remain
            } else if (!event.target.value){
                event.target.value = n.amount
            }else if(event.target.value < 1) {
                event.target.value = 1
            }
             else {
                n.amount = event.target.value
            }           
        },
        pressKey(){
            event.target.value=event.target.value.replace(/^0/g,'1')
            event.target.value=event.target.value.replace(/\../g,'')
        },
        confirmDelete(){
            if (this.deleteOne) {
                this.deleteProduct(this.deleteShop,this.deleteChoose)
            }else if (this.deleteAll){
                this.deleteChosed()
            }
            this.cancel()
            this.delete = !this.delete
        },
        pop(item,index){
            if (item.checked) {
                this.deletePop = true
                this.deleteChoose = index
                this.deleteOne = true
            }  
        },
        popUp(n){
            if(this.deleteList.length > 0){
                this.deletePop = true
                this.deleteAll = true
            }
        },
        cancel(){
            this.deletePop = false
            this.deleteOne = false
            this.deleteAll = false
        },
        deleteProduct(key,index){
                this.cartList[key].splice(index,1)
                if (this.cartList[key].length === 0) {
                    this.$delete(this.cartList, key)
                    this.$delete(this.productConfirm, key)
                    this.editing = false
                }  
        },
        deleteChosed(){
            if (this.cartList[this.deleteShop].length === this.deleteList.length) {
                this.$delete(this.cartList, this.deleteShop)
                this.$delete(this.productConfirm, this.deleteShop)
                this.editing = false
            } else {
                for (let i of this.deleteList){
                    this.cartList[this.deleteShop].splice(i,1)
                }
            }
        }  
    },
    components:{footerbar},
 }
 </script>

<style lang="scss" scoped>
 .icon{
    width:18px;
    height: 18px;
    margin: 0 4px;
    fill:rgb(136, 136, 136);
}
.icon-check{
    width:18px;
    height: 18px;
    margin-left:-22px;
    margin-right: 4px;
    display: none;
}
.checked{
    display: inline-block;
}
.section-wrapper{
    margin-bottom: 120px;
    .section-shop {
    .shop-bar{
        padding: 14px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        border-bottom: 1px solid rgb(247, 246, 246);
        .left-bar{
            display: flex;
            align-items: center;
            .shop-name{
                font-size: 12px;
            }
        }
        .shop-edit{
            font-size: 10px;
           color: rgb(46, 155, 206);
        }
    }
    .product-list{
        display: flex;
        align-items: center;
        margin: 10px 0;
        background-color: rgb(250, 250, 250);
        .check-good{
            padding: 8px;
        }
        .product-title{
            display: flex;
            flex-direction: column;
            padding: 0 8px;
            flex-grow: 1;
             .add{
                display: flex;
                .prohibited{
                    background-color: rgb(224, 224, 224);
                }
               .add-reduce{
                    display: inline-block;
                    width: 36px;
                    height: 30px;
                    font-size: 18px;
                    text-align: center;
                    line-height: 28px; 
                    border:  1px solid rgb(190, 190, 190); 
                    border-radius: 2px; 
                }  
                .mark{
                    text-align: center;
                    padding: 0;
                    width: 36px;
                    height: 30px;
                    border:  1px solid rgb(190, 189, 189);
                    outline: none;
                    border-left:  none;
                    border-right: none;
                } 
            }
            .title{ //新方法纯css实现溢出省略号
                font-size: 12px;
                height: 32px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .type{
                font-size: 10px;
                color: rgb(168, 168, 168);
            }
            .wrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                .price{
                    font-size: 12px;
                    color: red;
                }
                .amount{
                    font-size: 12px;
                    color: rgb(163, 163, 163);
                }
            }
       
        }
        .delete-choose{
            width: 20px;
            align-self: stretch;
            background-color: rgb(253, 48, 48);
            padding: 0 12px;
            font-size: 12px;
            color:white;
            white-space: nowrap;
            display: flex;
            align-items: center;
        }
    }
}
}
.all-deleted{
    text-align: center;
}
.section-pay{
    display: flex;   
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    position: fixed;
    width: 100%;
    background-color: rgb(244, 244, 244);
    bottom: 55px;
    .pay-left{
        display: flex;
        align-items: center;
        margin-left: 8px;
        .choose-all{
            font-size: 12px;
        }
    }
    .pay-total{
        .total-price{
            font-size: 16px;
            margin-right:8px;
            color:rgb(250, 37, 37)
        }
        .total-amount{
            display: inline-block;
            font-size: 14px;
            width: 100px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: white;
            background-color:rgb(252, 67, 67);   
        }
        .delete{
            background-color: rgb(197, 197, 197);
        }
        .grey{
            background-color:rgb(250, 37, 37);
        }
    }
}
.pop-message{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 10;
        width: 260px;
        background-color: #f5f5f5;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        color: rgb(12, 12, 12);
        transition: all 1s;
        display: none;
        .query{
            margin:12px 12px;
        }
        .answer{
            border-top: 1px solid rgb(230, 230, 230);
            :nth-child(2){
                color:rgb(4, 104, 4);
                border-left: 1px solid lightgray;
            }
            span{
                width: 129px;
                display: inline-block;
                text-align: center;
                padding: 15px 0;
            }
            
        }     
    }
    .pop{
            display: block;
            box-shadow: 0px 0px 0px 999px rgba(0,0,0,0.75);
        } 
</style>
 
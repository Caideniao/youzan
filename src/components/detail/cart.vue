<template>
<div class="pop-up">
    <div class="pop-cart">
        <div class="discription">
            <div><img :src="good.shopLogo" alt=""></div>
            <div class="title">
                <span v-if='good && good.title.length > 24' class="good-title">{{good.title.slice(0,24  )}}...</span>
                <span v-else>{{good.title}}</span>
                <p class="good-price">￥{{good.price}}</p>
            </div>
             <span class="cancel" @click="$emit('cancel')">✕</span>
        </div>
        <div>
            <div v-for='(value,key) in good.size' :key='key' class="type">
                <div class="type-key">{{key}}：</div>
                <div class="type-value"><span v-for="(item,index) in value" :key='index' class="type-list" 
                :class="{active:added[key] === item}" @click="choose(key, item)">{{item}}</span></div>
            </div>
        </div>
        <div class="number">
            <div class="remain"><p>购买数量：</p><p>剩余{{good.remain}}件</p></div>
            <div class="add"><span @click="reduce" :class="{prohibited: amount === 1}" class="add-reduce">−</span>
            <input class="mark" key='num-input' @change="modifyInput" :value='amount'>
            <span class="add-reduce" @click="add" :class="{prohibited: amount === good.remain}">+</span></div>
        </div>
        
    </div>
    <div class="divide"></div>
    <div class="add-button" @click="addToCart">{{name}}</div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            added:null,
            chosed:null,
            amount:1,
            allchosed:null,
            unchosen:null,
        }
    },
    props:['good','name'],
    //重构 用侦听器来侦听数据变化 实现了代码优化
    watch:{
        added:{
            deep:true,
            handler:function(){
                let c = ' '
                let u = []
                this.allchosed = true
                for (let i in this.added) {
                    if (!(this.added[i])){
                        this.allchosed = false
                        u.push(i)
                    } else{
                        c = c + this.added[i] + ' '
                    }    
                }
                this.chosed = c
                this.unchosen = u
            }
        }
    },
   created(){
       let s = {}
       let t = this.good.size
       for (let item in t ){
           if (t[item].length > 1){
               s[item] = ''
           } else {
               s[item] = t[item][0]
           }
       }
        this.added = s
    },
    methods:{
        choose(s,v){
            if(this.added[s] !== v){
                this.added[s] = v
            } else {
                this.added[s] = ''
            } 
        },
        reduce(){
            if (this.amount > 1){
                this.amount--
            }  
        },
        add(){
            if (this.amount < this.good.remain){
                this.amount++
            }            
        },
        addToCart(){
            this.$emit('checkCart')
            if (this.allchosed){
                //fetch('post') 将数据上传
                let {shop,productImage,price,title} = this.good
                let t = {shop,productImage,price,title}
                t.amount = this.amount
                t.type = this.chosed
                this.$store.commit('addCart',t)
            } 
        },
        modifyInput(e){
            this.amount = ''
            let input = e.target.value
            let r = /\d/ //匹配0-9以外的****
            for (let i = 0; i < input.length; i++){
                let v = r.test(input[i])
                if (!v) {
                    return this.amount = 1 
                } 
            }
            let s = parseInt(input)
            if (s > this.good.remain ) {
                this.amount = this.good.remain
            } else if(s < 1 || isNaN(s)){
                this.amount = 1
            } else{
                this.amount = s 
            }  
        }
    }
}
</script>

<style lang="scss" scoped>
.pop-up{
     z-index: 100;
     position: fixed;
    bottom: 0;
    .pop-cart{
        background-color: white;
        width: 100vw;
        box-sizing: border-box;
        font-size: 12px;
        padding: 8px;
       
        .discription{
            display: flex;
            border-bottom: 0.333px solid rgb(223, 221, 221);
            padding-bottom: 8px; 
            .title{
                margin: 0 8px;
            .good-title{
                width: 80%;
                margin:0;
            }
            .good-price{
                margin: 0;
                font-size: 16px;
                color: rgb(248, 74, 74);
            }
            }
            .cancel{
                position: absolute;
                right:14px;
                width: 16px;
                height: 16px;
                border-radius: 16px;
                border: 1px solid rgb(168, 167, 167);
                text-align: center;
                color: rgb(197, 194, 194);
                line-height: 16px;
            }
        }
        .type{
            .type-key{
                padding: 6px 0;
            }
            .type-value{
                padding: 4px 0;
                .type-list{
                    display: inline-block;
                    padding: 5px 10px;
                    border: 1px solid rgb(146, 146, 146);
                    margin-right: 14px;
                    border-radius: 4px;
                }
                .active{
                    background-color:rgb(255, 55, 55);
                    color:white;
                    border-color: rgb(255, 55, 55);
                }
            }
        }
        .number{
            padding: 12px 0 0;
            border-top: 0.333px solid rgb(212, 212, 212);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .remain{
                p{
                    margin:5px 0;
                }
            }
            .add{
                display: flex;
                .prohibited{
                    background-color: rgb(224, 224, 224);
                }
               .add-reduce{
                    display: inline-block;
                    width: 36px;
                    height: 28px;
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
                    height: 28px;
                    border:  1px solid rgb(190, 189, 189);
                    outline: none;
                    border-left:  none;
                    border-right: none;
                } 
            }
        
        }    
    }
     .divide{
        height: 8px;
        background-color: rgb(238, 237, 237);
        } 
    .add-button{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: rgb(255, 55, 55);
        color: white;
        font-size: 16px;
    }
}
</style>

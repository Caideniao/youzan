<template>
   <div class="setion-wrapper">
       <!-- <header-bar></header-bar> -->
       <div>
           <div class="section-recommend">
               <div class="section-header">
                   <div class="header-wrapper">
                        <span class="section-divide-bar"></span>
                        <div>今日推荐</div>
                        <span class="subtitle">每天都有新鲜事</span>
                   </div>
               </div>
               <swipe :items='imageUrl' v-if='imageUrl' class="swipe"/>
            </div>
            <div class="section-hot">
                <div class="section-header">
                    <div class="header-wrapper">
                        <span class="section-divide-bar"></span>
                        <div>热销榜</div>
                        <span class="subtitle">每日热销指南</span>
                    </div>
                    <span class='section-more'>更多</span>
                </div>
                 <div class="section-hotGoods" >
                     <div v-for='item in hotGoods' :key='item.productID'>
                        <router-link :to="'/detail/'+ item.productID"><img :src="item.imageUrl" alt="" ></router-link> 
                        <p>已售<span class="solded">{{item.solded}}</span>件</p>
                     </div>
                     
                </div>   
            </div>
            <div class="recommend"><p >-来自朋友圈的推荐-</p></div>
            <div  v-infinite-scroll="loadGoods" @infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div class="box-wrapper">
                <div v-for='item in recommend' :key='item.id' class="recommend-goods">
                    <router-link :to="'/detail/'+ item.id"><img :src="item.imageUrl" alt="" ></router-link> 
                <div class="discription">{{item.discription}}</div>
                <div class="price"><div class="goods-price"><span>¥</span>{{item.price}}</div><p class="solded">{{item.solded}}件已售</p></div>
                </div>
            </div>
       </div>
       <p v-if='loadingEnd' class="loadingEnd">已经没有更多了~</p>
    </div>
    <footerBar></footerBar>
</div> 
</template>

<script>
import swipe from '../swipe.vue'
import fetch, {getHotGoods, getSlides, getRecommend} from "../../api/fetch.js"
import footerBar from '../footer.vue'

export default {
    data(){
        return{
            imageUrl:'',
            hotGoods:'',
            recommend:[],
            loading: true,
            loadingEnd: false,
        }
    },
    created:function(){  
        fetch(getSlides).then((response) => {
            this.imageUrl = response.data.slide
    }),
        fetch(getHotGoods).then((response) => {
            this.hotGoods = response.data.hot
    })
    },    
    methods:{
        loadGoods(){
            if (this.recommend.length > 20){
                this.loading = false
                this.loadingEnd = true
                return
            } else{
                this.loading = false
                fetch(getRecommend).then((response) => {  
                let res = response.data.recommend
                let recommends = this.recommend.concat(res)
                this.recommend = recommends
                this.loading = true
            })
            }
        }
    },
    components:{swipe,footerBar},
    //swiper直接操作dom节点，所以在未生成dom节点时初始化有问题
    //以下方法一（放created也可）
    //方法二：用setTimeout函数，且设置一定时间后执行
    //方法三：封装成swipe组件，设置v-if，组件内部在mounted之后/或者watch监听prop变化可以获取父组件的异步数据（
    //注意，created后不可以，猜测子组件先创建后视数据变化再挂载）
    //方法三: updated，数据请求在created阶段（慎用）
    //方法四：created获取数据，watch监听数据变化，调用nextTick()，dom更新完成后初始化swiper 
}
</script>

<style lang="scss" scoped>
.section-header{
    display: flex;
    margin: 8px 5px;
    justify-content: space-between;
    align-items: center;
    .header-wrapper{
        vertical-align: text-top;
        .section-divide-bar{
        border-left: 3px solid red;
        margin-right: 7px;
        }
        div{
            display: inline-block;
            font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
            font-size: 16px;
            margin-right: 3px;
            color: black;
        }
        .subtitle{
            font-size: 11px;
            color: rgb(153, 152, 152);
        }
    }
    .section-more{
        font-size: 12px;
        border: 0.5px solid;
        padding: 0 8px;
        border-radius: 10px;
        }
    .section-more::after {
            margin-left: 3px;
            content:'';
            display: inline-block;
            width: 0; 
            height: 0; 
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-left: 4px solid black;              
    }
}
.section-recommend{
    .swipe{
        width:98%;  
    }
}
.section-hotGoods{
        display: flex;
        justify-content: space-around;
        text-align: center;
        img {
            width: 115px;
            height: 115px;
            border-radius: 5px;
        }
        p{
            margin: 0;
            font-size:12px;
            color: black;
            .solded {
                color: red;
                font-size: 12px;
            }
        }
    }
.box-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
    .recommend-goods{
        width: 48%;
        img{
            width: 100%;
            height: 160px;
        }
        .discription{
            font-size: 12px;
            color: black;
        }
        .price{
            margin:5px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .solded{
                font-size: 12px;
                margin:0;
                }
            .goods-price{
                color:red;
                span{
                font-size: 12px;
            }           
            }
        }
    }
}
.recommend{
    background-color: rgb(226, 226, 226);
    padding: 8px;
    margin:8px 0;
    text-align: center;
    p {
        margin:0;
        font-size: 12px;
    }
}
.loadingEnd {
    text-align: center;
    border-top: 0.5px solid lightgrey;
    padding: 5px;
    color: lightgrey;
    margin-bottom: 55px;
}
</style>



import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store ({
    state: {
        cart: {},
        broswering:0
    },
    mutations:{
        addCart(state, n) {
            let name = n.shop
            n.id = n.type
            let s = state.cart[name]
            if (s){
                for (let i of s) {
                    if(i.title === n.title && i.type === n.type) {
                        return i.amount += n.amount 
                    }
                }
                s.push(n)
            }else{
                state.cart[name] = []
                state.cart[name].push(n)
            } 
        },
        redirect(state, n){
            state.broswering = n
        }
    }
})
 export default store
          

import app from '../App.vue'
import store from '../store/index.js'
const explore = () => import('../components/explore/explore.vue')
const detail = () => import('../components/detail/detail.vue')
const shoppingcart = () => import('../components/shoppingcart.vue')
const like = () => import('../pages/like.vue')
const person = () => import('../pages/person.vue')
const logIn = () => import('../components/logIn.vue')
const signUp = () => import('../components/signUp.vue')
const personInformation = () => import('../components/personInformation.vue')

export default [
    {path:'/',
    component:app,
    children:[
        {
            path:'',
            redirect: './explore',
        },
        {
            path:'detail/:id',
            component: detail,

        },
        {
            path:'explore',
            component: explore,
            meta:{keepAlive:true},
            beforeEnter: (to, from, next) => {
                store.commit('redirect',0)
                next()
              }
        },
        {
            path:'cart',
            component: shoppingcart,
            beforeEnter: (to, from, next) => {
                store.commit('redirect',2)
                next()
              }
        },
        {
            path:'like',
            component: like,
            beforeEnter: (to, from, next) => {
                store.commit('redirect',1)
                next()
              }
        },
        {
            path:'person',
            component: person,
            beforeEnter: (to, from, next) => {
                store.commit('redirect',3)
                next()
            },
        },
        {
            path:'logIn',
            component:logIn
        },
        {
            path:'signUp',
            component:signUp
        },
        {
            path:'information',
            component:personInformation
        }
    ]
    }
]
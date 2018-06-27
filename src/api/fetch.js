import axios from 'axios'

const baseUrl = 'http://rap2api.taobao.org/app/mock/16648/'
const getSlides = baseUrl + 'explore/slides'
const getHotGoods = baseUrl + 'explore/hot'
const getHotGoodsMore = baseUrl + 'explore/hot/more'
const getRecommend = baseUrl + 'explore/recommend'
const getDetail = baseUrl + 'detail'
const getOrders = baseUrl + 'detail/orders'
const getCartList = baseUrl + 'cart'

export {getSlides, getHotGoods, getHotGoodsMore,getRecommend, getDetail,getOrders,getCartList}
export default function fetch(getUrl, params, type='get'){
  if (type === 'get'){
    return axios.get(getUrl, params).then((res) => {
      return res
    }).catch((error) => {alert(error)})
  }
}

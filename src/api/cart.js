import request from '@/utils/request'

// 加入购物车
export const addToCart = data => request({
  method: 'POST',
  url: '/cart/add',
  data
})

// 获取购物车列表数据
export const getCartList = params => request({
  method: 'GET',
  url: '/cart/list',
  params
})

// 修改购物车某商品数量
export const changeCartItemNum = data => request({
  method: 'POST',
  url: '/cart/num',
  data
})

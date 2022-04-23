import request from '@/utils/request'

// 加入收藏
export const addToCollect = (productId) => request({
  method: 'POST',
  url: `/collect/add/${productId}`
})

// 取消收藏
export const cancelCollect = (productId) => request({
  method: 'POST',
  url: `/collect/cancel/${productId}`
})

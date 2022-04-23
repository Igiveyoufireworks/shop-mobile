import request from '../utils/request'

// 添加评价
export const addReply = data => request({
  method: 'POST',
  url: '/reply/add',
  data
})

// 上传图片
export const uploadImg = data => request({
  method: 'POST',
  url: 'upload',
  data
})

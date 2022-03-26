import { createStore } from 'vuex'

// 将封装的状态模块引入
import user from './modules/user'
import cart from './modules/cart'

// 导入请求模块
// import { changeCartItemNum } from '@/api/cart'
export default createStore({
  // 添加 modules 选项
  modules: {
    user,
    cart
  }
  // state () {
  //   return {
  //     // 存储token
  //     user: window.localStorage.getItem('USER_TOKEN'),
  //     // 用于存储购物车数据 sku的id，checked，count，title，price，stock,image, productId
  //     cartList: []
  //   }
  // },
  // getters: {
  //   // 筛选选中的选项
  //   checkedItems: state => {
  //     return state.cartList.filter(item => item.checked === true)
  //   },
  //   // 基于选中项目计算价格
  //   totalPrice (state, getters) {
  //     // 对所有勾选商品进行价格统计，并保留两位小数
  //     return getters.checkedItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
  //   },
  //   // 全选按钮状态
  //   checkedAll (state, getters) {
  //     return state.cartList.length === getters.checkedItems.length
  //   }
  // },
  // mutations: {
  //   // 设置用户token
  //   setUser (state, payload) {
  //     state.user = payload
  //     window.localStorage.setItem('USER_TOKEN', payload)
  //   },
  //   // -- 购物车功能 --
  //   // 添加商品
  //   addToCart (state, payload) {
  //     // payload是包含sku相关信息的对象，参考state.cartList
  //     state.cartList.push(payload)
  //   },
  //   // 清除数据
  //   clear (state) {
  //     state.cartList = []
  //   },
  //   // 商品状态更改
  //   checkedChange (state, { id, checked }) {
  //     // 根据传参，找到指定数据，修改状态
  //     const currentItem = state.cartList.find(item => item.id === id)
  //     currentItem.checked = checked
  //   },
  //   // 商品个数更改
  //   countChange (state, { id, count }) {
  //     state.cartList.find(item => item.id === id).count = count
  //   },
  //   // 全选（主动操作全选按钮）
  //   changeAll (state, { checked }) {
  //     // 为所有选项设置统一的状态
  //     state.cartList.forEach(item => item.checked = checked)
  //   }
  // },
  // actions: {
  //   async countChange ({ commit }, payload) {
  //     // 提交mutation更改数据
  //     commit('countChange', payload)
  //     // 发送请求
  //     const { data } = await changeCartItemNum({
  //       id: payload.id,
  //       number: payload.count
  //     })
  //     if (data.status !== 200) { return }
  //     // console.log(data)
  //   }
  // }
})

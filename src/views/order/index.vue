<template>
  <!-- 导航 -->
  <van-nav-bar
    title="我的订单"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 主体内容 -->
  <van-tabs v-model:active="activeName">
    <van-tab title="全部" name="all">
      <!-- 订单列表：全部 -->
      <div class="order-list" v-if="state?.orderList.length > 0">
        <order-item
          v-for="item in state?.orderList"
          :key="item.order_id"
          :order-info="item"
        />
      </div>
      <van-empty v-else description="您还没有相关的订单" />
    </van-tab>
    <van-tab title="待付款" name="unpay">
      <!-- 订单列表：待付款 -->
      <div class="order-list" v-if="state?.unpayList.length > 0">
        <order-item
          v-for="item in state?.unpayList"
          :key="item.order_id"
          :order-info="item"
        />
      </div>
      <van-empty v-else description="您还没有相关的订单" />
    </van-tab>
    <van-tab title="待发货" name="undelivered">
      <!-- 订单列表：待发货 -->
      <div class="order-list" v-if="state?.undeliveredList.length > 0">
        <order-item
          v-for="item in state?.undeliveredList"
          :key="item.order_id"
          :order-info="item"
        />
      </div>
      <van-empty v-else description="您还没有相关的订单" />
    </van-tab>
    <van-tab title="待收货" name="unconfirmed">
      <!-- 订单列表：待收货 -->
      <div class="order-list" v-if="state?.unconfirmedList.length > 0">
        <order-item
          v-for="item in state?.unconfirmedList"
          :key="item.order_id"
          :order-info="item"
        />
      </div>
      <van-empty v-else description="您还没有相关的订单" />
    </van-tab>
    <van-tab title="待评价" name="commentList">
      <!-- 订单列表：待评价 -->
      <div class="order-list" v-if="state?.commentList.length > 0">
        <order-item
          v-for="item in state?.commentList"
          :key="item.order_id"
          :order-info="item"
        />
      </div>
      <van-empty v-else description="您还没有相关的订单" />
    </van-tab>
  </van-tabs>
</template>
<script setup>
import OrderItem from './components/OrderItem.vue'
import { getOrderList } from '@/api/order'
import { ref, reactive, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import { Toast } from 'vant'
import router from '../../router'

onBeforeMount(() => {
  initOrderList()
})

const onClickLeft = () => history.back()
let activeName = ref('')
// 各类订单数据
const state = reactive({
  orderList: [],
  unpayList: computed(() => state.orderList.filter(item => item._status._type === 0)),
  undeliveredList: computed(() => state.orderList.filter(item => item._status._type === 1)),
  unconfirmedList: computed(() => state.orderList.filter(item => item._status._type === 2)),
  commentList: computed(() => state.orderList.filter(item => item._status._type === 3))
})

// 请求所有订单数据
const initOrderList = async () => {
  const { data } = await getOrderList()
  console.log(data)
  if (data.status !== 200) {
    return Toast.fail('服务器异常')
  }
  state.orderList = data.data
  // 跳转指定tab标签
  // console.log(route)
  // const myTab = this.route.query.myTab
  const myTab = router.currentRoute.value.query.myTab
  console.log(myTab)
  activeName.value = myTab
}

// 跳转指定tab标签
// const mounted = () => {
//   let myTab = this.$route.query.myTab
//   activeName = myTab
// }
</script>

<style lang="scss" scoped>
</style>

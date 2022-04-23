<template>
  <!-- 导航 -->
  <van-nav-bar
    title="订单详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 主体区域 -->
  <!-- 商品列表 -->
  <div class="product-list">
    <product-item
      v-for="item in productList"
      :key="item.id"
      :order-info="item"
    />
  </div>
  <!-- 其他信息 -->
  <!-- <van-cell>
    <div class="order-info">
      <p class="totalprice">商品总价：¥{{ payPrice }}</p>
      <p>订单号：{{ Oid }}</p>
      <p>创建时间：{{ addTime }}</p>
      <p>收货地址：{{ address }}</p>
    </div>
  </van-cell> -->
  <van-cell-group>
    <van-cell title="商品总价" :value="'¥' + payPrice" />
    <van-cell title="订单号" :value="Oid"  />
    <van-cell title="创建时间" :value="addTime"  />
    <van-cell title="收货地址" :value="address"  />
  </van-cell-group>
</template>
<script setup>
import ProductItem from './components/ProductItem.vue'
import { ref } from 'vue'
import { getOrderDetail } from '@/api/order'
import { computed } from '@vue/reactivity'

const onClickLeft = () => history.back()

// --- 1 列表数据处理 ---
// 存储数据
const orderDetail = ref({})
const productList = computed(() => orderDetail.value?.cartInfo)
const Oid = computed(() => orderDetail.value?.order_id)
const addTime = computed(() => orderDetail.value?.add_time_y + ' ' + orderDetail.value?.add_time_h)
const address = computed(() => orderDetail.value?.user_address)
const payPrice = computed(() => orderDetail.value?.pay_price)
const { orderId } = defineProps({
  orderId: {
    type: String,
    required: true
  }
})
// 初始化订单数据
const initOrderDetail = async () => {
  const { data } = await getOrderDetail(orderId)
  console.log(data)
  if (data.status !== 200) { return }
  orderDetail.value = data.data
}
initOrderDetail()
</script>

<style lang="scss" scoped>

.van-cell__value {
  span {
    color: red;
  }
}

</style>

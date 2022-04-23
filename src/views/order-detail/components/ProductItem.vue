<template>
  <!-- 商品列表 -->
  <van-card
    :num="totalNum"
    :price="otPrice"
    :desc="sku"
    :title="storeName"
    :thumb="image"
  />
</template>

<script setup>
import { computed } from '@vue/reactivity'

// 存储订单详情的数据
const productInfo = computed(() => orderInfo.productInfo)
const attrInfo = computed(() => productInfo.value?.attrInfo)
const storeName = computed(() => productInfo.value?.store_name)
const image = computed(() => attrInfo.value?.image)
const sku = computed(() => attrInfo.value?.sku)
const otPrice = computed(() => attrInfo.value?.ot_price)
const totalNum = computed(() => orderInfo.cart_num)

// 接收父组件传递的数据
const { orderInfo } = defineProps({
  orderInfo: {
    type: Object,
    required: true
  }
})

</script>

<style lang="scss" scoped>
</style>

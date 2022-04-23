<template>
  <!-- 导航 -->
  <van-nav-bar
    title="我的收藏"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 商品列表 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="initProductsData(phone)"
  >
    <product-list
      :products-data="productsData"
    />
  </van-list>
</template>

<script setup>
import { ref } from 'vue'
import { getProductsData } from '@/api/product'
import ProductList from '@/components/productList.vue'

const onClickLeft = () => history.back()
// 存储商品列表数据
const productsData = ref([])
const loading = ref(false)
const finished = ref(false)
// 加载
let page = 1
const limit = 4
const phone = 'phone'
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit, // 每次加载4个
    page
  })
  console.log(data)
  if (data.status !== 200) { return }
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中, 而不是直接赋值
  productsData.value.push(...data.data)

  // 将本次加载状态更改为完成
  loading.value = false

  // 判断是否已经加载完全部数据
  if (data.data.length < limit) {
    finished.value = true
    return
  }
  // 变更页数，准备下次数据请求
  page++
}
</script>

<style lang="scss" scoped>
</style>

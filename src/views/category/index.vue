<template>
  <div class="category-main">
    <!-- 导航 -->
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 分类 -->
    <van-tabs v-model:active="activeName">
      <van-tab title="精选" name="all">
        <!-- 商品列表：精选 -->
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
      </van-tab>
      <van-tab title="电脑">内容 2</van-tab>
      <van-tab title="手机">内容 3</van-tab>
      <van-tab title="百货">内容 4</van-tab>
      <van-tab title="服饰">内容 4</van-tab>
      <van-tab title="日用品">内容 4</van-tab>
      <van-tab title="男装">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { getProductsData } from '@/api/product'
import ProductList from '@/components/productList.vue'

const onClickLeft = () => history.back()
const activeName = ref('')

// 各类商品数据
const state = reactive({
  productList: [],
  computerList: [],
  phoneList: []
})
// 存储商品列表数据
const productsData = ref([])
const loading = ref(false)
const finished = ref(false)
// 加载
let page = 1
const limit = 4
const phone = 'phone'
let classification = ref('')
const initProductsData = async (param) => {
  classification = param
  const { data } = await getProductsData({
    limit, // 每次加载4个
    page,
    classification
  })
  // 存储所有商品数据
  state.productList = data.data
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
:deep(.van-tab__text) {
  font-size: 16px;
}
</style>

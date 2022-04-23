<template>
  <div class="main">
    <!-- 1 导航 -->
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <van-search
          v-model="myKw"
          shape="round"
          show-action
          :placeholder="myKw"
          @search="onSearch"
        >
          <template #action>
            <div @click="onBack">
              取消
            </div>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <!-- 2 商品列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="initProductsData"
    >
      <div class="product-list" v-if="productsResult?.length > 0">
        <product-list
          :products-data="productsResult"
        />
      </div>
      <van-empty v-else description="找不到相关商品" />
    </van-list>
  </div>
</template>
<script setup>
import { computed, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { getProductsData } from '@/api/product'
import ProductList from '@/components/productList.vue'
import { onBeforeMount } from 'vue'
onBeforeMount((myKw) => {
  onSearch(myKw)
})
// 返回上一页
const onClickLeft = () => history.back()
// 1 搜索框
const route = useRoute()
const router = useRouter()
// get获取路由参数，在set中把最新传递过来的搜索关键词进行路由重定向
const myKw = computed({
  get: () => {
    let { kw } = route.params
    console.log(kw)
    return kw
  },
  set: (val) => {
    router.push({
      name: 'search',
      params: {
        kw: val
      }
    })
  }
})
// 2 搜索商品栏
// 搜索结果
const productsResult = ref([])
// 搜索事件
const onSearch = (val) => {
  if (!val) {
    return
  } else {
    // console.log(productsData.value)
    productsResult.value = []
    productsData.value.filter(item => {
      // console.log(item.store_name.includes(val))
      // productsData = item.store_name.match(val)
      if (item.store_name.includes(val)) {
        productsResult.value.push(item)
      }
      // console.log(productsResult.value)
      return item.store_name.match(val)
    })
  }
}
// 存储商品列表数据
const productsData = ref([])
const loading = ref(false)
const finished = ref(false)
// 加载
let page = 1
const limit = 4
// 获取商品数据
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit, // 每次加载4个
    page
  })
  // console.log(data)
  if (data.status !== 200) { return }
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中, 而不是直接赋值
  // productsData.value = data.data
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
// initProductsData()

// 取消键返回首页
const onBack = () => {
  router.push({
    name: 'home'
  })
}
</script>
<style lang="scss" scoped>
:deep(.van-search) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
:deep(.van-nav-bar__title){
  position: absolute;
  width: 90%;
  max-width: 100%;
  right: 0;
  margin: 0 0;
  font-weight: normal;
}
</style>

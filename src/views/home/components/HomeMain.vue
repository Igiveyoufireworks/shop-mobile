<template>
  <div class="home-main">
    <!-- 区域1: 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/lunbo1.jpeg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/lunbo2.jpeg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/lunbo3.jpeg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/lunbo4.jpeg">
      </van-swipe-item>
    </van-swipe>
    <!-- 区域2: 菜单列表 -->
    <!-- <van-grid icon-size="35">
      <van-grid-item
        v-for="(item, index) in menuData"
        :key="index"
        :icon="item.img" :text="item.info[0].value" />
    </van-grid> -->
    <van-grid :column-num="2" icon-size="35">
      <van-grid-item icon="https://shop.fed.lagounews.com/uploads/attach/2021/09/20210913/1bbef51573c3ce0f23d96f57921de6ee.jpg" text="商品分类" to="/category" />
      <van-grid-item icon="https://shop.fed.lagounews.com/uploads/attach/2021/09/20210913/24f58b20ebf8c9d6b91f15ccd383ab9d.jpg" text="我的收藏" to="/collect" />
      <!-- <van-grid-item icon="https://shop.fed.lagounews.com/uploads/attach/2021/09/20210913/21a085a9f6dee57e17e36c2a91c04278.jpg" text="新品上架" to="/" /> -->
    </van-grid>
    <!-- 区域3: 公告栏 -->
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item>抢！第二件0元 </van-swipe-item>
        <van-swipe-item>手机限时优惠，至高力省600元！</van-swipe-item>
        <van-swipe-item>针织衫天天特价</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!-- 区域4：商品列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list
        :products-data="productsData"
      />
    </van-list>
  </div>
</template>

<script setup>
import { getDefaultData } from '@/api/index.js'
import { computed, ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import { getProductsData } from '@/api/product'

// --- 首页功能 ---
// 声明响应式数据，存储首页的所有数据
const indexData = ref({})

// 封装首页数据初始化功能
const initIndexData = async () => {
  const { data } = await getDefaultData()
  if (data.status !== 200) {
    return
  } // 失败
  indexData.value = data.data
}
initIndexData()

// 通过计算属性保存需要使用的数据
// 1 轮播图数据
// const swipeData = computed(() => {
//   return indexData.value.swiperBg?.default.imgList.list
// })
// 2 菜单列表数据
const menuData = computed(() => {
  return indexData.value.menus?.default.imgList.list
})
// 3 公告区域数据
// const newsData = computed(() => {
//   return indexData.value.news?.default.newList.list
// })

// --- 首页商品功能 ---
// 存储商品列表数据
const productsData = ref([])
// const state = reactive({
//   loading: false,
//   finished: false
// })
const loading = ref(false)
const finished = ref(false)

let page = 1
const limit = 4
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit, // 每次加载4个
    page
  })
  // console.log(data)
  if (data.status !== 200) { return }
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中, 而不是直接赋值
  productsData.value.push(...data.data)

  // 将本次加载状态更改为完成 加载状态结束
  loading.value = false

  // 判断是否已经加载完全部数据
  if (data.data.length < limit) {
    finished.value = true
    return
  }
  // 变更页数，准备下次数据请求
  page++
}
// 使用List组件后，会自动化根据触底情况加载首屏以及后续数据
// initProductsData()

</script>

<style lang="scss" scoped>
.home-main {
  // 区域1: 轮播图
  .my-swipe img{
    width: 100%;
    height: 170px;
  }

  // 区域3: 公告区域
  // ::v-deep .van-notice-bar__content {
  :deep(.van-notice-bar__content) {
    display: flex;
    align-items: center;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>

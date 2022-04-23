<template>
  <div class="home-nav">
    <!-- logo区域 -->
    <img height="20" src="@/assets/logo.png" alt="">
    <!-- 搜索区域 -->
    <!-- <div class="search" >
      <van-icon name="search" size="0.5rem"></van-icon>
    </div> -->
    <van-search
      v-model="value"
      shape="round"
      :placeholder="defaultWords"
      @click="onSearch"
    />
    <!-- 分类跳转 -->
    <!-- <van-icon name="wap-nav"></van-icon> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getProductsData } from '@/api/product'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
const value = ref('')

// 存储商品列表数据
const productsData = ref([])
// 加载
const page = 1
const limit = 10
// 获取商品数据
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit, // 每次加载4个
    page
  })
  console.log(data)
  if (data.status !== 200) { return }
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中, 而不是直接赋值
  productsData.value.push(...data.data)
}
// initProductsData()

const router = useRouter()
const defaultWords = ref('手机')
// 搜索结果
// const productsResult = ref([])
// 搜索事件
const onSearch = (val) => {
  // Toast(val)
  if (!val) {
    return
  } else {
    // 搜索
    // productsResult.value = []
    // productsData.value.filter(item => {
    //   // console.log(item.store_name.includes(val))
    //   // productsData = item.store_name.match(val)
    //   if (item.store_name.includes(val)) {
    //     productsResult.value.push(item)
    //   }
    //   // console.log(productsResult.value)
    //   return item.store_name.match(val)
    // })
    // router.push({
    //   name: 'search',
    //   params: {
    //     kw: val
    //   }
    // })
    router.push({
      name: 'search',
      params: {
        kw: defaultWords.value
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.home-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  z-index: 1000;
  img {
    padding: 0 10px;
  }

  // .search {
  //   background-color: #f7f7f7;
  //   width: 100%;
  //   border-radius: 25px;
  //   padding-left: 12px;
  //   margin-right: 10px;
  //   .van-icon {
  //     padding-bottom: 5px;
  //   }
  // }
  :deep(.van-search) {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

</style>

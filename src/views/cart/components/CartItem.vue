<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox  v-model="itemChecked" checked-color="#ee0a24"></van-checkbox>
    <!-- 右侧点击跳转 -->
    <div class="link" @click="handleRouter">
      <img :src="itemData.image" alt="">
      <div class="info">
        <p class="title" v-text="itemData.title"></p>
        <p class="detail">
          <span class="price">¥{{ itemData.price }}</span>
          <van-stepper
            v-model="itemCount"
            :max="itemData.stock"
            button-size="26px"
            @click="$event.stopPropagation()"
          />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 接收父组件传递的数据
const { itemData } = defineProps({
  itemData: {
    type: Object,
    required: true
  }
})

const router = useRouter()
// 点击商品跳转
const handleRouter = () => {
  router.push({
    name: 'product',
    params: {
      productId: itemData.productId
    }
  })
}
const store = useStore()
// 通过计算属性，分别处理v-model的获取与设置操作
const itemChecked = computed({
  get: () => itemData.checked,
  set: newChecked => {
    // 通过Vuex的手段进行状态更新
    // console.log(newChecked)
    store.commit('cart/checkedChange', { checked: newChecked, id: itemData.id })
  }
})
// 个数变化处理
const itemCount = computed({
  get: () => itemData.count,
  set (newCount) {
    // 通过action进行处理
    store.dispatch('cart/countChange', { count: newCount, id: itemData.id })
  }
})
</script>

<style lang="scss" scoped>
.van-checkbox {
  overflow: visible;
}
.cart-item {
  height: 90px;
  padding: 10px 20px;
  display: flex;
  // 下面的样式用于设置多个商品间的分割线
  background-color: #fff;
  margin-bottom: 1px;

  .link {
    width: 100%;
    display: flex;

    img {
      padding: 5px;
      width: 80px;
      height: 80px;
      align-self: center;
    }

    .info {
      font-size: 14px;
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
        margin: 5px 0 15px;
      }
      .detail{
        margin-bottom: 10px;
        .price {
          font-size: 16px;
          color: #f2270c;
        }
        .van-stepper {
          float: right;
        }
      }
      .del {
        direction: rtl;
      }
    }
  }
}
</style>

<template>
  <!-- 导航 -->
  <van-nav-bar
    title="订单确认"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  ></van-nav-bar>
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1 地址区域 -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username" v-text="currentAddress.name"></span>
        <span v-text="currentAddress.tel"></span>
      </p>
      <p class="detail">
        <span class="default" v-if="currentAddress.isDefault">[默认]</span>
        <span v-text="currentAddress.address"></span>
      </p>
    </div>
    <!-- 2 弹出层 -->
    <van-popup
      v-model:show="popupStatus"
      position="bottom"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @click-item="changeAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        <!-- 地址为空时显示 -->
        <template #top v-if="isEmpty">
          <van-empty description="还没有地址哦~" />
        </template>
      </van-address-list>
    </van-popup>
    <!-- 3 商品列表 -->
    <div class="product-list">
      <!-- 标题区 -->
      <van-cell-group>
        <van-cell :title="cartItemCount" />
      </van-cell-group>
      <!-- 内容区 -->
      <van-cell-group>
        <!-- 单个商品 -->
        <van-cell class="product" v-for="item in cartInfo" :key="item.id">
          <img :src="item.productInfo.image" alt="">
          <div class="info">
            <p class="title" v-text="item.productInfo.store_name"></p>
            <p class="price">¥{{ item.truePrice }}</p>
          </div>
          <span class="count">x{{ item.cart_num }}</span>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
  <!-- 提交订单区域 -->
  <van-submit-bar
    :price="totalPrice"
    label="订单总计："
    button-text="立即付款"
    @submit="showPayPanel = true"
  />
  <!-- 弹出付款区域 -->
  <van-action-sheet
    v-model:show="showPayPanel"
    title="请选择支付方式"
    cancel-text="取消"
    close-on-click-action
  >
    <!-- 付款列表 -->
    <template #default>
      <van-radio-group v-model="paymentMethod">
        <van-cell-group inset>
          <!-- 微信支付 -->
          <van-cell
            clickable
            title="微信支付"
            label="微信快捷支付"
            @click="paymentMethod = 'wechat'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio
                name="wechat"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <!-- 支付宝支付 -->
          <van-cell
            clickable
            title="支付宝支付"
            label="支付宝快捷支付"
            @click="paymentMethod = 'alipay'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio
                name="alipay"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <!-- 余额支付 -->
          <van-cell
            clickable
            title="余额支付"
            :label="`可用余额为：${ yue }元`"
            @click="paymentMethod = 'yue'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="gold-coin"
                color="#ff9900"
                size="30"
                :style="{ marginRight: '12px' }"
              ></van-icon>
            </template>
            <template #right-icon>
              <van-radio
                name="yue"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <!-- 去支付按钮 -->
          <van-cell>
            <van-button
              round
              type="danger"
              block
              @click="handlePay"
            >去支付</van-button>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </template>
  </van-action-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAddressList } from '@/api/order'
import { Toast } from 'vant'

const onClickLeft = () => history.back()

// ---- 1 地址区域 ----
// - 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => popupStatus.value = true

// - 选择状态 先默认第二个
const chosenAddressId = ref('')
const changeAddress = (item) => {
  // 更改弹出层显示状态
  popupStatus.value = false
  // 更改当前地址栏显示的数据
  currentAddress.value = item
}
// - 地址数据
const addressList = ref([
  // {
  //   id: '1',
  //   name: '张三',
  //   tel: '13000000000',
  //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
  //   isDefault: true
  // },
  // {
  //   id: '2',
  //   name: '李四',
  //   tel: '1310000000',
  //   address: '浙江省杭州市拱墅区莫干山路 50 号'
  // }
])
const currentAddress = ref({})
const isEmpty = computed(() => addressList.value.length === 0)

const convertData = data => {
  return data.map(item => {
    const temp = {
      id: item.id,
      name: item.real_name,
      tel: item.phone,
      address: item.province + item.city + item.district + item.detail,
      isDefault: item.is_default
    }
    // 检测当前数据是否是默认数据
    if (item.is_default === 1) {
      // 记录勾选的id
      chosenAddressId.value = item.id
      // 记录当前展示的数据
      currentAddress.value = temp
    }
    return temp
  })
}

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({ limit: 5, page: 1 })
  if (data.status !== 200) { return }
  addressList.value = convertData(data.data)
}
initAddressList()

// - 地址操作
import { useRouter } from 'vue-router'
const router = useRouter()
// 接收cartId
const { cartId } = defineProps({
  cartId: {
    type: String,
    required: true
  }
})
const onAdd = () => {
  // 因为新增地址后还要回到订单确认页，这是需要传递cartId
  router.push({
    name: 'address',
    params: {
      cartId
    }
  })
}
const onEdit = (item, index) => Toast('编辑地址:' + index)

// --- 2 初始化订单数据 ---
import { confirmOrder, createOrder } from '@/api/order'

// 存储数据
const orderConfirmData = ref({})
// 计算属性处理数据
const cartInfo = computed(() => orderConfirmData.value?.cartInfo)
const cartItemCount = computed(() => `共${cartInfo.value?.length || 0}件`)
const totalPrice = computed(() => (orderConfirmData.value?.priceGroup?.totalPrice || 0) * 100)
// 接收组件传参（cartID在前面引入过）

const initOrderInfo = async () => {
  const { data } = await confirmOrder({
    cartId,
    new: 0 // 表示是一个新建订单的操作
  })
  if (data.status !== 200) return
  orderConfirmData.value = data.data
}
initOrderInfo()

// --- 3 订单确认区域 ---
const showPayPanel = ref(false)
const paymentMethod = ref('yue')
const yue = computed(() => orderConfirmData.value?.userInfo.now_money || 0)
const handlePay = async () => {
  const { data } = await createOrder(orderConfirmData.value.orderKey, {
    addressId: currentAddress.value.id,
    payType: paymentMethod.value
  })
  if (data.status !== 200) return
  // 成功的时候 提示并跳转到订单详情页
  Toast.success('支付成功，自动跳转订单页...')
  router.push({
    name: 'order'
  })
}
</script>

<style lang="scss" scoped>
  .van-nav-bar {
    position: fixed !important;
    width: 100%;
  }
  .container {
    padding: 50px 0;

    // 地址栏
    .address-card {
      padding: 20px 25px;
      font-size: 16px;
      position: relative;

      // 伪元素制作底边栏
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: repeating-linear-gradient(90deg, #ff6c6c 0, #ff6c6c 20%, transparent 20%, transparent 25%, #0084ff 25%, #0084ff 45%, transparent 45%, transparent 50%);
        background-size: 80px;
      }
      .info {
        span:first-child {
          padding-right: 20px;
        }
      }
      .detail {
        padding-top: 5px;

        .default {
          background: #D6251F;
          color: #fff;
          font-size: 12px;
          padding: 2px 3px;
          margin-right: 17px;
          border-radius: 3px;
        }
      }
    }
    // 商品列表
    .product-list {
      :deep(.van-cell__value) {
        display: flex;
        align-items: center;

        img {
          width: 70px;
          height: 70px;
        }

        .info {
          padding-left: 5px;

          .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            padding: 0 15px 5px 0;
          }

          .price {
            color: #f2270c;
          }
        }

        .count {
          color: #aaa;
        }
      }
    }
  }
</style>

<template>
  <!-- 顶部导航 -->
  <van-nav-bar
    title="新增收货地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 表单 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="real_name"
        name="姓名"
        label="姓名"
        placeholder="收货人姓名"
      />
      <van-field
        v-model="phone"
        name="电话"
        label="电话"
        placeholder="收货人手机号"
      />
      <!-- 地区 -->
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="area"
          title="请选择所在地区"
          :field-names="fieldNames"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <!-- 详细地址 -->
      <van-field
        v-model="detail"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址信息"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field name="switch" label="设为默认地址" input-align="right">
        <template #input>
          <van-switch v-model="is_default" size="20" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        @click="handleAdd"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const onClickLeft = () => history.back()

// --- 1 数据处理 ---
const real_name = ref('')
const phone = ref('')
const area = ref('')
const detail = ref('')
const is_default = ref(false)

// 地区菜单显示状态
const show = ref(false)
// 地区选择后输入框显示的内容
const fieldValue = ref('')

// 选项列表，children 代表子选项，支持多级嵌套
const options = ref([])
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map((option) => option.n).join('/')
  // 为提交接口准备数据
  address = {
    province: selectedOptions[0].n,
    city: selectedOptions[1].n,
    city_id: selectedOptions[1].v,
    district: selectedOptions[2].n
  }
}

// --- 2 请求数据 ---
// 设置组件自定义字段名
const fieldNames = {
  text: 'n',
  value: 'v',
  children: 'c'
}

// 封装函数处理数据
const processData = data => {
  data.forEach(item => {
    // 找到空的c属性了，说明item是区级信息，组件要去掉c
    if (item.c.length === 0) {
      delete item.c
    } else {
      // c 不是空的，说明是省或市，递归处理即可
      processData(item.c)
    }
  })
  return data
}

import { getCityList, addAddress } from '@/api/address'
const initCityList = async () => {
  const { data } = await getCityList()
  if (data.status !== 200) { return }
  // 存储data中的数据
  options.value = processData(data.data)
}
initCityList()

// --- 3 提交数据 ---
// 用于选择地区后，整合接口需要的地区信息
let address = {} // 不作为响应式数据，因为只是为了记录不展示
const { cartId } = defineProps({
  cartId: String
})
const router = useRouter()
const handleAdd = async () => {
  const { data } = await addAddress({
    // 新增地址：设置id为0，如果为其他值，表示根据id进行编辑
    id: 0,
    real_name: real_name.value,
    phone: phone.value,
    is_default: is_default.value,
    detail: detail.value,
    address
  })
  if (data.status !== 200) return
  // 成功时检测是否要跳回订单确认页
  if (cartId) {
    router.push({
      name: 'order-confirm',
      params: {
        cartId
      }
    })
  } else {
    router.push('/user')
  }
}
</script>

<style lang="scss" scoped>
.van-form {
  background-color: #f7f7f7;

  .van-cell-group {
    margin-bottom: 10px;
  }
}

</style>

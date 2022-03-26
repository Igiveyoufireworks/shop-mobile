<template>
  <van-form @submit="submitHandel">
    <img class="logo" src="../../../public/logo.png" alt="">
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        clearable
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-if="state.isPassword"
        v-model="state.password"
        clearable
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-else
        v-model="state.captcha"
        center
        clearable
        name="验证码"
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCaptcha"
            :disabled="state.isSend"
          >
            {{ state.currentText }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
      <span
        class="change-button"
        v-text="state.changeText"
        @click="changeNode"
      ></span>
    </div>
  </van-form>
</template>
<script setup>
import { computed, reactive } from 'vue'
import { getVerifyCode, getVerify, loginByPassword, loginByCaptcha } from '@/api/user'
import { Toast } from 'vant'
import { useCountDown } from '@vant/use'
import { useRouter, useRoute } from 'vue-router'
// 引入vuex的api
import { useStore } from 'vuex'
const store = useStore()
// 用于页面跳转
const router = useRouter()
const route = useRoute()

// --- 登录处理 ---
const state = reactive({
  // 登录模式
  loginNode: 'password',
  // 判断是否等于password
  isPassword: computed(() => state.loginNode === 'password'),
  // 切换按钮文本
  changeText: computed(() => state.isPassword ? '快速登录' : '密码登录'),
  username: '17201234567',
  password: 'qwer1234',
  captcha: '',
  // 存储验证码发送状态，用于控制显示效果
  isSend: false,
  // 倒计时实例(显示倒计时信息)
  countDown: null,
  // 根据状态设置要显示的内容
  currentText: computed(() => state.isSend ? state.countDown.seconds : '发送验证码')
})

// 切换登录模式处理
const changeNode = () => {
  state.loginNode = state.isPassword ? 'capcha' : 'password'
  // 清除密码、验证码输入框的内容
  state.password = ''
  state.captcha = ''
}

// --- 验证码处理 ---
// 发送验证码请求
const sendCaptcha = async () => {
  // 手机号规则校验
  if (!/^1\d{10}$/.test(state.username)) {
    return Toast('请检查用户名')
  }

  // 发送校验请求
  const { data: v1 } = await getVerifyCode()
  if (v1.status !== 200) { return }

  // 发送验证码请求
  const { data: v2 } = await getVerify({
    type: 'login',
    phone: state.username,
    key: v1.data.key
  })
  // console.log(v2)
  if (v2.status !== 200) { Toast('网络开小差了，请稍后再试') }
  // 验证码发送完后，设置倒计时
  const countDown = useCountDown({
    time: 10 * 1000, // 实际为60 * 1000, 60秒，此处演示10秒
    // 如果结束了，更改状态
    onFinish () {
      state.isSend = false
    }
  })
  // 开启倒计时
  countDown.start()
  // 存储countDown实例
  state.countDown = countDown.current
  // 更改发送状态
  state.isSend = true
}

// --- 登录处理 ---
const submitHandel = async () => {
  // 用户名检测
  const username = state.username.trim()
  if (username === '') { return Toast('请检查用户名') }

  // 为统一存储响应结果，使用变量保存
  let data = ''
  if (state.isPassword) {
    // 1 密码模式
    const password = state.password.trim()
    if (password === '') { return Toast('请检查密码') }
    ({ data } = await loginByPassword({
      account: username,
      password
    }))
  } else {
    // 2 验证码模式
    const captcha = state.captcha.trim()
    if (captcha === '') { return Toast('请检查验证码') }
    ({ data } = await loginByCaptcha({
      phone: username,
      captcha
    }))
  }
  // 接收到响应数据
  if (data.status !== 200) {
    if (state.isPassword) {
      return Toast('用户名或密码错误')
    } else { return Toast('验证码错误') }
  }
  // 成功时，通过mutation提交新的token信息
  store.commit('user/setUser', data.data.token)
  // 跳转页面
  router.push(route.query.redirect ?? '/user')
}
</script>

<style lang="scss" scoped>
.van-form {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 30px 0 10px;
}
.change-button {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
</style>

<template>
  <van-cell-group>
    <!-- 商品列表 -->
    <van-card
      desc="描述信息"
      title="商品标题"
      thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    />
    <!-- 评价星级 -->
    <van-field
      name="rate"
      label="评分">
      <template #input>
        <van-rate v-model="rate" />
      </template>
    </van-field>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="评价"
      type="textarea"
      maxlength="50"
      placeholder="评价宝贝，帮助更多想买的人"
      show-word-limit
    />
    <!-- 上传照片 -->
    <van-cell
      title="上传买家秀">
      <van-uploader v-model="fileList" multiple :max-count="3" />
    </van-cell>
  </van-cell-group>
  <van-cell-group>
    <!-- 商品列表 -->
    <van-card
      desc="描述信息"
      title="商品标题"
      thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    />
    <!-- 评价星级 -->
    <van-field
      name="rate"
      label="评分">
      <template #input>
        <van-rate v-model="rate" />
      </template>
    </van-field>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="评价"
      type="textarea"
      maxlength="50"
      placeholder="评价宝贝，帮助更多想买的人"
      show-word-limit
    />
    <!-- 上传照片 -->
    <van-cell
      title="上传买家秀">
      <van-uploader v-model="fileList" multiple :max-count="3" />
    </van-cell>
  </van-cell-group>

</template>

<script setup>
import { ref } from 'vue'

const rate = ref(4)
const fileList = ref([])

</script>
<style lang="scss" scoped>
.van-cell-group {
  background-color: rgb(243, 243, 243);
  padding: 15px 15px;
  // margin: 15px 15px;
}
</style>

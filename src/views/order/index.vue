<template>
  <!-- 导航 -->
  <van-nav-bar
    title="我的订单"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 主体内容 -->
    <van-tabs>
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="待评价"></van-tab>
    </van-tabs>
</template>
<script setup>
const onClickLeft = () => history.back()
</script>

<style lang="scss" scoped>
</style>

<template>
  <!-- 发表评价 -->
  <!-- 顶部导航 -->
  <van-nav-bar
    title="发表评价"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 评价卡片 -->
  <div class="main">
    <div class="comment-list">
      <comment-item>
      </comment-item>
    </div>
  </div>
</template>

<script setup>
import CommentItem from './components/CommentItem.vue'
const onClickLeft = () => history.back()
</script>

<style lang="scss" scoped>
.main {
  // background-color: rgb(243, 243, 243);
  width: 100%;
  height: 100%;
}
</style>

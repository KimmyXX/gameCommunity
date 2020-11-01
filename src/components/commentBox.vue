<template>
<!-- 动态的评论盒子 -->
  <div class="commentBoxOut">
    <div class="userInfo">
      <el-avatar
        :src="$store.state.userPhotoPath + commentDetail.userPhoto"
      ></el-avatar>
      <div>{{ commentDetail.nickname }}</div>
    </div>
    <div class="commentContent">{{ commentDetail.commentContent }}</div>
  </div>
</template>

<script>
export default {
  props: ["commentDetail"]
};
</script>

<style lang="scss" scoped>
.commentBoxOut {
  width: 90%;
  background-color: white;
  margin: 0 auto;
  min-height: 80px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  .userInfo {
    display: flex;
    align-items: center;
  }
  .commentContent {
    text-indent: 2rem;
    white-space: pre-wrap;
  }
}
</style>
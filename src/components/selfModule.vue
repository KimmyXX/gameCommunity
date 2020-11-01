<template>
<!-- 左侧当前用户个人信息模块 -->
  <div class="out">
    <el-avatar shape="square" :size="80" :src="userPhoto"></el-avatar>
    <span class="nickname">{{ $store.state.userInfo.nickname }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    userPhoto() {
      if (this.$store.state.userInfo) {
        return (
          this.$store.state.userPhotoPath + this.$store.state.userInfo.userPhoto
        );
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.out {
  width: 20%;
  height: 200px;
  background-color: rgba(223, 230, 233, 1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  .nickname {
    margin-top: 15px;
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
<template>
  <div class="shareOut">
      <div class="userInfo">
        <el-avatar :src="$store.state.userPhotoPath + shareInfo.userPhoto"></el-avatar>
        <div>{{ shareInfo.userId }}</div>
      </div>
      <div class="content">{{ shareInfo.content }}</div>
  </div>
</template>

<script>
export default {
  props: ['shareInfo']
}
</script>

<style lang="scss" scoped>
.shareOut {
    width: 90%;
    background-color: white;
    margin: 0 auto;
    height: 80px;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .userInfo {
      display: flex;
      align-items: center;
    }
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-indent: 2rem;
    }
}
</style>
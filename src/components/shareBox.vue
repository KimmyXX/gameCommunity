<template>
  <div class="shareOut" @click="goToShareDetail">
      <div class="userInfo">
        <el-avatar :src="$store.state.userPhotoPath + shareInfo.userPhoto"></el-avatar>
        <div>{{ shareInfo.nickname }}</div>
      </div>
      <div class="shareContent">{{ shareInfo.content }}</div>
  </div>
</template>

<script>
export default {
  props: ['shareInfo'],
  methods: {
    goToShareDetail() {
      this.$router.push({ path: '/mainPage/shareModule', query: { shareId: this.shareInfo.shareId } });
    }
  }
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
    .shareContent {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-indent: 2rem;
    }
}
</style>
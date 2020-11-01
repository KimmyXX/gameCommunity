<template>
  <!-- 好友盒子 -->
  <div class="applyBox">
    <div class="userInfo">
      <el-avatar :src="$store.state.userPhotoPath + friendInfo.userPhoto"></el-avatar>
      <div class="nickname">{{ friendInfo.nickname }}</div>
      <div class="userId">用户id: {{ friendInfo.userId }}</div>
    </div>
    <div class="util">
      <el-button type="success" size="mini">发起聊天</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['friendInfo']
};
</script>

<style lang="scss" scoped>
.applyBox {
  width: 95%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  .userInfo {
    display: flex;
    align-items: center;
    height: 100%;
    .el-avatar {
      margin: 0 10px;
    }
    .nickname {
      font-weight: bold;
      margin-right: 10px;
    }
    .userId {
      color: gray;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>
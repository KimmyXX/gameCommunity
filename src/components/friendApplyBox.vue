<template>
  <div class="applyBox">
    <div class="userInfo">
      <el-avatar
        :src="$store.state.userPhotoPath + applyInfo.userPhoto"
      ></el-avatar>
      <div class="nickname">{{ applyInfo.nickname }}</div>
      <div class="userId">用户id: {{ applyInfo.sendUserId }}</div>
      <div class="message">{{ applyInfo.message }}</div>
    </div>
    <div class="util">
      <el-button type="success" size="mini" @click="confirmAddFriend"
        >确认添加</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["applyInfo"],
  methods: {
    confirmAddFriend() {
      this.$http
        .post("confirmAddFriend", { addFriendId: this.applyInfo.addFriendId, sendUserId: this.applyInfo.sendUserId })
        .then(({ data }) => {
          if (data.success) {
            this.$message({
              type: "success",
              message: "确认添加好友成功",
            });
          } else {
            this.$message({
              type: "warning",
              message: "确认添加好友失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });

    },
  },
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
    .userId,
    .message {
      color: gray;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>
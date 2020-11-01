<template>
  <div class="userBox">
    <div class="userInfo">
      <el-avatar :src="$store.state.userPhotoPath + user.userPhoto"></el-avatar>
      <div class="nickname">{{ user.nickname }}</div>
      <div class="userId">用户id: {{ user.userId }}</div>
      <div class="userIntroduction">{{ user.userIntroduction }}</div>
    </div>
    <div class="util">
      <el-button type="primary" size="mini" @click="addFriend"
        >添加好友</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    addFriend() {
      this.$prompt("请输入申请好友信息", "添加好友", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
            this.$http
              .post("addFriend", { userId: this.user.userId, message: value })
              .then(({ data }) => {
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "添加好友申请发送成功",
                  });
                } else {
                  this.$message({
                    type: "warning",
                    message: data.message,
                  });
                }
              })
              .catch((err) => {
                this.$message.error("连接服务器错误");
              });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消申请好友",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.userBox {
  width: 80%;
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
    .userIntroduction {
      color: gray;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>
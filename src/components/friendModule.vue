<template>
  <div class="outBox">
    <div class="box">
      <div class="friendApplyTitle">好友申请</div>
      <friend-apply-box
        v-for="item in friendApplyArr"
        :applyInfo="item"
        :key="item.addFriendId"
      ></friend-apply-box>
    </div>
    <div class="box">
        <div class="friendListTitle">好友列表</div>
    </div>
  </div>
</template>

<script>
import friendApplyBox from "./friendApplyBox.vue";
export default {
  data() {
    return {
      friendApplyArr: [],
    };
  },
  methods: {
    getFriendApplyList() {
      this.$http
        .get("getFriendApplyList", { params: {} })
        .then(({ data }) => {
          if (data.success) {
            this.friendApplyArr = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取好友申请消息失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
  },
  components: {
    friendApplyBox,
  },
  created() {
    this.getFriendApplyList();
  },
};
</script>

<style lang="scss" scoped>
.outBox {
  width: 60%;
  margin-left: 15px;
  .box {
    width: 95%;
    padding: 30px;
    min-height: 100px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .friendApplyTitle,
  .friendListTitle {
    font-weight: bold;
  }
}
</style>
<template>
  <!-- 好友模块 -->
  <div class="outBox">
    <div class="box">
      <div class="friendApplyTitle">好友申请</div>
      <div v-if="friendApplyArr.length == 0" class="noFriendApply">
        暂无好友申请
      </div>
      <friend-apply-box
        v-for="item in friendApplyArr"
        :applyInfo="item"
        :key="item.addFriendId"
      ></friend-apply-box>
    </div>
    <div class="box">
      <div class="friendListTitle">好友列表</div>
      <div v-if="friendArr.length == 0" class="noFriend">
        暂无好友
      </div>
      <friend-box v-for="item in friendArr" :friendInfo="item" :key="item.friendId"></friend-box>
    </div>
  </div>
</template>

<script>
import friendApplyBox from "./friendApplyBox.vue";
import friendBox from "./friendBox.vue";
export default {
  data() {
    return {
      friendApplyArr: [],
      friendArr: [1,2]
    };
  },
  methods: {
    // 获取好友申请列表
    getFriendApplyList() {
      this.$http
        .get("getFriendApplyList", { params: {} })
        .then(({ data }) => {
          if (data.success) {
            this.friendApplyArr = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取好友申请列表失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
    // 获取好友列表
    getFriendList() {
      this.$http
        .get("getFriendList", { params: {} })
        .then(({ data }) => {
          if (data.success) {
            this.friendArr = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取好友列表失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    }
  },
  components: {
    friendApplyBox,
    friendBox
  },
  created() {
    this.getFriendApplyList();
    this.getFriendList();
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
  .noFriendApply,
  .noFriend {
    width: 95%;
    height: 50px;
    background-color: white;
    border-radius: 10px;
    margin: 10px auto;
    padding: 5px;
    color: gray;
    text-align: center;
    line-height: 50px;
  }
}
</style>
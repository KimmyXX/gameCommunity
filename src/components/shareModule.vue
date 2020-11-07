<template>
<!-- 动态详情页 -->
  <div class="outBox">
    <div class="box shareUserBox">
      <el-avatar
        shape="square"
        :size="40"
        :src="
          shareDetailInfo.userPhoto != ''
            ? $store.state.userPhotoPath + shareDetailInfo.userPhoto
            : ''
        "
      ></el-avatar>
      <div class="nickname">{{ shareDetailInfo.nickname }}</div>
      <div class="introduction">{{ shareDetailInfo.userIntroduction }}</div>
    </div>
    <div class="box shareContentBox">
      <h2 class="title">{{ shareDetailInfo.title }}</h2>
      <div class="content">{{ shareDetailInfo.content }}</div>
    </div>
    <div class="box writeCommentBox">
      <el-input
        type="textarea"
        placeholder="请输入评论内容"
        v-model="commentContent"
        :autosize="{ minRows: 3 }"
        resize="none"
      >
      </el-input>
      <el-button type="primary" @click="writeComment" size="small"
        >发表评论</el-button
      >
    </div>
    <div class="box commentBox">
      <div class="noComment" v-if="commentArr.length == 0">
        暂无评论，快来发表吧！
      </div>
      <comment-box
        v-for="item in commentArr"
        :key="item.commentId"
        :commentDetail="item"
      ></comment-box>
    </div>
  </div>
</template>

<script>
import commentBox from "./commentBox.vue";
export default {
  data() {
    return {
      shareDetailInfo: {
        moduleId: 0,
        content: "",
        shareId: 0,
        title: "",
        userId: "",
        userIntroduction: "",
        userPhoto: "",
        nickname: "",
        photoSrc: null,
        vedioSrc: null,
      },
      commentContent: "",
      commentArr: [],
    };
  },
  methods: {
    // 获取动态详情信息
    getShareDetail() {
      this.$http
        .get("getShareDetail", {
          params: { shareId: this.$route.query.shareId },
        })
        .then(({ data }) => {
          if (data.success) {
            this.shareDetailInfo = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取动态信息失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器失败");
        });
    },
    // 发表评论
    writeComment() {
      if(this.commentContent == "") {
        this.$message({
          type: "warning",
          message: "请输入评论信息"
        })
        return;
      }
      this.$http
        .post("writeComment", {
          shareId: this.shareDetailInfo.shareId,
          commentContent: this.commentContent,
        })
        .then(({ data }) => {
          if (data.success) {
            this.$message({
              type: "success",
              message: "发表评论成功",
            });
            this.commentContent = "";
            this.getComment();
          } else {
            this.$message({
              type: "warning",
              message: "发表评论失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器失败");
        });
    },
    // 获取动态评论
    getComment() {
      this.$http
        .get("getComment", {
          params: { shareId: this.$route.query.shareId },
        })
        .then(({ data }) => {
          if (data.success) {
            this.commentArr = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取评论信息失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器失败");
        });
    },
  },
  components: {
    commentBox,
  },
  created() {
    this.getShareDetail();
    this.getComment();
  },
};
</script>

<style lang="scss" scoped>
.outBox {
  width: 70%;
  margin-left: 15px;
  .box {
    width: 95%;
    padding: 30px;
    min-height: 100px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .shareUserBox {
    min-height: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
    .nickname {
      margin-left: 20px;
    }
    .introduction {
      font-size: 12px;
      margin-left: 30px;
      color: gray;
    }
  }
  .shareContentBox {
    .title {
      text-align: center;
    }
    .content {
      // text-indent: 2rem;
      white-space: pre-wrap;
    }
  }
  .writeCommentBox {
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 60px;
    .el-button {
      margin-top: 10px;
    }
  }
  .commentBox {
    .noComment {
      width: 90%;
      background-color: white;
      margin: 0 auto;
      height: 80px;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;
      text-align: center;
      line-height: 80px;
      color: gray;
    }
  }
}
</style>
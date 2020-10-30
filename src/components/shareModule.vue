<template>
  <div class="outBox">
    <div class="box shareUserBox">
      <el-avatar
        shape="square"
        :size="40"
        :src="$store.state.userPhotoPath + shareDetailInfo.userPhoto"
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
      <el-button type="primary" @click="writeComment" size="small">发表评论</el-button>
    </div>
    <div class="box commentBox"></div>
  </div>
</template>

<script>
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
      commentContent: ""
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
            console.log(data.data);
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
        
    }
  },
  created() {
    this.getShareDetail();
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
      text-indent: 2rem;
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
}
</style>
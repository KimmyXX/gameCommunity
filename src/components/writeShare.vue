<template>
  <div class="out">
    <el-input
      type="text"
      placeholder="请输入标题"
      v-model="title"
    >
    </el-input>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="content"
      :autosize="{ minRows: 5 }"
      resize="none"
    >
    </el-input>
    <el-button type="primary" @click="share">分享</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    share() {
      this.$http
        .post("writeShare", { content: this.content, title: this.title, moduleId: this.moduleInfo.moduleId })
        .then(({ data }) => {
          if(data.success) {
            this.$message({
              type: "success",
              message: "分享动态成功"
            });
            this.$router.push({ path: "/mainPage/gameModule" });
          }
          else {
            this.$message({
              type: "warning",
              message: "分享动态失败"
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
  },
  computed: {
    ...mapState([
      'userInfo',
      'moduleInfo'
    ])
  }
};
</script>

<style lang="scss" scoped>
.out {
  width: 70%;
  padding: 30px;
  min-height: 100px;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  .el-button {
    margin-top: 10px;
  }
  .el-input {
    margin-bottom: 10px;
  }
}
</style>
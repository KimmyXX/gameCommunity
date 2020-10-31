<template>
  <div class="outBox">
    <div class="box">
      <div class="searchBox">
        <!-- 注意keypress要为原生事件 -->
        <el-input
          type="text"
          v-model="searchInput"
          placeholder="请输入查找用户昵称"
          @keydown.native.enter="searchUser"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchUser"></el-button>
      </div>
      <div class="userList">
          <user-box v-for="item in userArr" :user="item" :key="item.userId"></user-box>
      </div>
    </div>
  </div>
</template>

<script>
import userBox from "./userBox.vue";
export default {
  data() {
    return {
      searchInput: "",
      userArr: []
    };
  },
  methods: {
    searchUser() {
      this.$http
        .get("searchUser", { params: { searchInput: this.searchInput } })
        .then(({ data }) => {
          this.userArr = data.data;
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    }
  },
  components: {
      userBox
  }
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
    .searchBox {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-input {
        border-radius: 5px 0 0 5px;
        width: 50%;
      }
      .el-button {
        align-self: flex-start;
      }
    }
  }
}
</style>
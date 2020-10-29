<template>
  <div class="searchBox">
    <el-input
      type="text"
      v-model="searchInput"
      placeholder="请输入搜索模块"
    ></el-input>
    <el-button type="primary" icon="el-icon-search"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 70%;
  height: 600px;
  padding: 30px;
  margin-left: 15px;
  background-color: rgba(243, 243, 243, 0.9);
  display: flex;
  justify-content: center;
  .el-input {
    border-radius: 5px 0 0 5px;
  }
  .el-button {
    align-self: flex-start;
  }
}
</style>
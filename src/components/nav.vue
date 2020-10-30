<template>
  <div class="out">
    <el-menu
      default-active="/mainPage"
      mode="horizontal"
      background-color="white"
      active-text-color="white"
      :router="true"
    >
      <el-menu-item index="/mainPage">游戏板块</el-menu-item>
      <el-menu-item index="/mainPage/gameModule">游戏动态</el-menu-item>
      <el-menu-item index="3">游戏动态收藏夹</el-menu-item>
      <el-menu-item index="4">游戏板块收藏夹</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
.out {
  height: 60px;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
}

.el-menu {
  border: none !important;
}

.el-menu-item:hover {
  background: rgba(116, 185, 255, 1) !important;
}
.el-menu-item.is-active {
  background-color: rgba(116, 185, 255, 1) !important;
}
</style>
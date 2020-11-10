<template>
  <el-menu
    :default-active="$route.path"
    background-color="#dfe4ea"
    active-text-color="#fff"
    :router="true"
  >
    <el-menu-item index="/adminMainPage/addAdmin">
      <i class="el-icon-menu"></i>
      <span slot="title">新增管理员</span>
    </el-menu-item>
    <el-menu-item index="/adminMainPage/manageGameModule">
      <i class="el-icon-menu"></i>
      <span slot="title">游戏板块</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 防止突出一截
.el-menu {
  border: none !important;
}
//悬停样式
.el-menu-item:hover {
  background: #1e90ff !important;
}
//点击后生效样式
.el-menu-item.is-active {
  background-color: #1e90ff !important;
}
</style>
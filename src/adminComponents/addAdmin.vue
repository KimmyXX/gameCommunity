<template>
  <div>
      <!-- <el-page-header content="新增管理员"></el-page-header>
      <el-form ref="form" :model="form" label-width="5rem">
          <el-form-item label="账号">
              <el-input type="text" v-model="form.adminId"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="text" v-model="form.adminPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
              <el-input type="text" v-model="form.confirmAdminPassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">确认新增管理员</el-button>
          </el-form-item>
      </el-form> -->
      <!-- <el-table :data="adminArr">
          <el-table-column></el-table-column>
      </el-table> -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                adminId: "",
                adminPassword: "",
                confirmAdminPassword: ""
            },
            adminArr: []
        }
    }
}
</script>

<style lang="scss" scoped>
.el-form {
    width: 50%;
}
</style>
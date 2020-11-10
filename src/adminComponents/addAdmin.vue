<template>
  <div class="addAdminOut">
    <h2>新增管理员</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="5rem">
      <el-form-item label="账号" prop="adminId">
        <el-input type="text" v-model="form.adminId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminPassword">
        <el-input type="password" v-model="form.adminPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cofirmAdminPassword">
        <el-input type="password" v-model="form.cofirmAdminPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAdmin">确认新增管理员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    let vm = this;
    // 校验管理员账号
    let checkAdminId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        let reg = /^[0-9]{10}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入10位数字组成的密码"));
        } else {
          callback();
        }
      }
    };
    // 校验密码
    let checkAdminPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        let reg = /^[a-zA-Z0-9]+$/;
        if (!reg.test(value)) {
          callback(new Error("请输入数字和英文组成的密码"));
        } else {
          callback();
        }
      }
    };
    // 校验确认密码
    let checkConfirmAdminPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else {
        if (vm.form.cofirmAdminPassword != vm.form.adminPassword) {
          callback(new Error("确认密码必须与密码一致"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        adminId: "",
        adminPassword: "",
        cofirmAdminPassword: "",
      },
      rules: {
        adminId: [
          {
            validator: checkAdminId,
            trigger: "blur",
          },
        ],
        adminPassword: [
          {
            validator: checkAdminPassword,
            trigger: "blur",
          },
        ],
        cofirmAdminPassword: [
          {
            validator: checkConfirmAdminPassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addAdmin() {
      this.$refs.form.validate((passFlag, notPassField) => {
        if (passFlag) {
          this.$http
            .post("addAdmin", {
              adminId: this.form.adminId,
              adminPassword: this.form.adminPassword,
            })
            .then(({ data }) => {
              if (data.success) {
                  this.$message({
                      type: "success",
                      message: "新增管理员成功"
                  })
                  this.$refs.form.resetFields();
              } else {
                this.$message({
                  type: "warning",
                  message: "账号重复",
                });
              }
            })
            .catch((err) => {
              this.$message.error("连接服务器错误");
            });
        } else {
          this.$message({
            type: "warning",
            message: "注册信息错误",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addAdminOut {
  width: 100%;
  padding: 30px;
  h2 {
    margin-bottom: 20px;
  }
  .el-form {
    width: 50%;
  }
}
</style>
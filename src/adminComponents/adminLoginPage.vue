<template>
  <!-- 登录页面 -->
  <el-container class="container1">
    <el-header>
      <el-button @click="$router.push({ path: '/' })">用户登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="60%">
        <div class="logo logo1">Game</div>
        <div class="logo">Community</div>
      </el-aside>
      <el-main>
        <transition name="el-fade-in" mode="out-in">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="3rem"
          >
            <el-form-item label="账号" prop="adminId">
              <el-input type="text" v-model="form.adminId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="adminPassword">
              <el-input type="password" v-model="form.adminPassword"></el-input>
            </el-form-item>
            <el-form-item class="buttonBox">
              <el-button type="primary" class="form-button" @click="adminLogin"
                >管理员登录</el-button
              >
            </el-form-item>
          </el-form>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    let vm = this;
    // 校验用户名
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
    return {
      // 登录表单
      form: {
        adminId: "",
        adminPassword: "",
      },
      // 登录规则
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
      },
    };
  },
  methods: {
    // 登录
    adminLogin() {
      this.$refs.form.validate((passFlag, notPassField) => {
        if (passFlag) {
          this.$http
            .post("adminLogin", this.form)
            .then(({ data }) => {
              if (data.loginSuccess) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                this.$router.push("/adminMainPage");
              } else {
                this.$message({
                  type: "warning",
                  message: "登录失败，账号或密码错误",
                });
              }
            })
            .catch((err) => {
              this.$message.error("连接服务器错误");
            });
        } else {
          this.$message({
            type: "warning",
            message: "账号或密码格式错误",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container1 {
  position: absolute;
  height: 100%;
  width: 100%;
  .el-header {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-container {
    width: 70%;
    margin: 0 auto;
    .el-aside {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .logo {
        font-size: 5rem;
        font-weight: bolder;
      }
      .logo1 {
        margin-top: 10rem;
      }
    }
    .el-main {
      height: 100%;
      .el-form {
        margin-top: 80px;
        padding: 2rem 2rem 2rem 1rem;
        border: 2px solid gray;
        border-radius: 10px;
        .buttonBox {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
<template>
<!-- 登录页面 -->
  <el-container class="container1">
    <el-header>
      <el-button @click="$router.push('/adminLoginPage')">管理员登录</el-button>
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
            v-if="toggleForm"
            key="form"
          >
            <el-form-item label="账号" prop="userId">
              <el-input type="text" v-model="form.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input type="password" v-model="form.userPassword"></el-input>
            </el-form-item>
            <el-form-item class="buttonBox">
              <el-button type="primary" class="form-button" @click="login"
                >登录</el-button
              >
              <el-button
                type="warning"
                class="form-button"
                @click="toggleForm = false"
                >注册</el-button
              >
            </el-form-item>
          </el-form>

          <el-form
            ref="registerForm"
            :rules="registerRules"
            :model="registerForm"
            label-width="5rem"
            v-else
            key="registerForm"
          >
            <el-form-item label="账号" prop="userId">
              <el-input type="text" v-model="registerForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input
                type="password"
                v-model="registerForm.userPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cofirmPassword">
              <el-input
                type="password"
                v-model="registerForm.cofirmPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input type="text" v-model="registerForm.nickname"></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action
                :on-change="createImgUrl"
                :auto-upload="false"
                :limit="1"
                :show-file-list="false"
                :file-list="fileList"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  style="width: 80px; height: 80px"
                  class="avatar"
                  @click="handleRemove()"
                />
                <div v-else class="addImg">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item class="buttonBox">
              <el-button type="primary" class="form-button" @click="register"
                >注册</el-button
              >
              <el-button
                type="info"
                class="form-button"
                @click="toggleForm = true"
                >返回</el-button
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
    let checkUserId = (rule, value, callback) => {
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
    let checkUserPassword = (rule, value, callback) => {
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
    let checkConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else {
        if (vm.registerForm.cofirmPassword != vm.registerForm.userPassword) {
          callback(new Error("确认密码必须与密码一致"));
        } else {
          callback();
        }
      }
    };
    let checkNickname = (rule, value, callback) => {
      if (!value) {
        callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    return {
      // 切换注册表单登录表单
      toggleForm: true,
      // 图片url缩略图
      imageUrl: "",
      // 图片文件数组
      fileList: [],
      // 登录表单
      form: {
        userId: "",
        userPassword: "",
      },
      // 登录规则
      rules: {
        userId: [
          {
            validator: checkUserId,
            trigger: "blur",
          },
        ],
        userPassword: [
          {
            validator: checkUserPassword,
            trigger: "blur",
          },
        ],
      },
      // 注册表单
      registerForm: {
        userId: "",
        userPassword: "",
        cofirmPassword: "",
        nickname: "",
        userPhoto: null,
      },
      // 注册规则
      registerRules: {
        userId: [
          {
            validator: checkUserId,
            trigger: "blur",
          },
        ],
        userPassword: [
          {
            validator: checkUserPassword,
            trigger: "blur",
          },
        ],
        cofirmPassword: [
          {
            validator: checkConfirmPassword,
            trigger: "blur",
          },
        ],
        nickname: [
          {
            validator: checkNickname,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate((passFlag, notPassField) => {
        if (passFlag) {
          this.$http
            .post("login", this.form)
            .then(({ data }) => {
              if (data.loginSuccess) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                this.$store.commit("changeUserInfo", data.userInfo);
                this.$router.push("/mainPage");
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
    // 注册
    register() {
      this.$refs.registerForm.validate((passFlag, notPassField) => {
        if (passFlag) {
          if (this.registerForm.userPhoto != null) {
            let registerData = new FormData();
            registerData.append("userId", this.registerForm.userId);
            registerData.append("userPassword", this.registerForm.userPassword);
            registerData.append("nickname", this.registerForm.nickname);
            registerData.append("userPhoto", this.registerForm.userPhoto);
            this.$http
              .post("register", registerData)
              .then(({ data }) => {
                if (data.registerSuccess) {
                  this.$message({
                    type: "success",
                    message: "注册成功",
                  });
                } else {
                  this.$message({
                    type: "warning",
                    message: "注册失败，账号重复",
                  });
                }
              })
              .catch((err) => {
                this.$message.error("连接服务器错误");
              });
          } else {
            this.$message({
              type: "warning",
              message: "请选择头像图片",
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "注册信息错误",
          });
        }
      });
    },
    createImgUrl(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerForm.userPhoto = file.raw;
    },
    handleRemove() {
      this.imageUrl = "";
      this.fileList = [];
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
        .form-button {
          width: 45%;
        }
        .buttonBox {
          display: flex;
          justify-content: space-between;
        }
        .addImg {
          width: 80px;
          height: 80px;
          border: 1px dashed black;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 30px;
          }
          &:hover {
            border: 1px dashed skyblue;
            i {
              color: skyblue;
            }
          }
        }
      }
    }
  }
}
</style>
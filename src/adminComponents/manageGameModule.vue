<template>
  <div class="gameModuleOut">
    <div class="addGameModule" v-if="showAddGameModule">
      <div>
        <i class="el-icon-circle-close" @click="showAddGameModule = false"></i>
      </div>
      <h2>新增游戏板块</h2>
      <el-form
        ref="addGameModuleForm"
        :model="addGameModuleForm"
        label-width="7rem"
      >
        <el-form-item label="游戏板块名称">
          <el-input
            type="text"
            v-model="addGameModuleForm.moduleName"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏板块类型">
          <el-input
            type="text"
            v-model="addGameModuleForm.moduleType"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏板块介绍">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            resize="none"
            v-model="addGameModuleForm.moduleIntroduction"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏图标">
          <el-upload
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
          <el-button type="primary" @click="addGameModule"
            >确认添加游戏板块</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="changeGameModule" v-if="showChangeGameModule">
      <div>
        <i
          class="el-icon-circle-close"
          @click="showChangeGameModule = false"
        ></i>
      </div>
      <h2>修改游戏板块</h2>

      <el-form
        ref="changeGameModuleForm"
        :model="changeGameModuleForm"
        label-width="7rem"
      >
        <el-form-item label="游戏板块名称">
          <el-input
            type="text"
            v-model="changeGameModuleForm.moduleName"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏板块类型">
          <el-input
            type="text"
            v-model="changeGameModuleForm.moduleType"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏板块介绍">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            resize="none"
            v-model="changeGameModuleForm.moduleIntroduction"
          ></el-input>
        </el-form-item>

        <el-form-item label="游戏图标">
          <el-upload
            action
            :on-change="createImgUrl2"
            :auto-upload="false"
            :limit="1"
            :show-file-list="false"
            :file-list="changeGameModuleFileList"
          >
            <img
              v-if="changeGameModuleImageUrl"
              :src="changeGameModuleImageUrl"
              style="width: 80px; height: 80px"
              class="avatar"
              @click="handleRemove2"
            />
            <div v-else class="addImg">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item class="buttonBox">
          <el-button type="primary" @click="confirmEditGameModule">确认修改游戏板块</el-button>
        </el-form-item>
      </el-form>
    </div>

    <h2>游戏板块管理</h2>
    <el-button type="primary" @click="showAddGameModule = true"
      >新增游戏板块</el-button
    >
    <el-table :data="gameArr" border stripe>
      <el-table-column label="id" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.moduleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.moduleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏图标" width="100">
        <template slot-scope="scope">
          <el-image
            :src="$store.state.gameModuleImg + scope.row.modulePhoto"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="游戏类型" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.moduleType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏介绍" width="700">
        <template slot-scope="scope">
          <span>{{ scope.row.moduleIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="editGameModule(scope)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameArr: [],
      // 新增游戏板块部分
      fileList: [],
      imageUrl: "",
      addGameModuleForm: {
        moduleName: "",
        moduleType: "",
        modulePhoto: null,
        moduleIntroduction: "",
      },
      // 是否显示新增游戏板块模块
      showAddGameModule: false,
      // 修改游戏板块部分
      changeGameModuleFileList: [],
      changeGameModuleImageUrl: "",
      changeGameModuleForm: {
        moduleId: 0,
        moduleName: "",
        moduleType: "",
        modulePhoto: null,
        moduleIntroduction: "",
      },
      showChangeGameModule: false,
    };
  },
  methods: {
    // 获取游戏模块信息
    getGameModule() {
      this.$http
        .get("getGameModule", { params: { searchInput: "", gameType: "" } })
        .then(({ data }) => {
          if (data.success) {
            this.gameArr = data.data;
          } else {
            this.$message({
              type: "warning",
              message: "获取游戏板块数据失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
    // 新增游戏模块
    addGameModule() {
      let data = new FormData();
      for (let key of Object.keys(this.addGameModuleForm)) {
        data.append(key, this.addGameModuleForm[key]);
      }
      this.$http
        .post("addGameModule", data)
        .then(({ data }) => {
          if (data.success) {
            this.$message({
              type: "success",
              message: data.message,
            });
            this.getGameModule();
            this.showAddGameModule = false;
          } else {
            this.$message({
              type: "warning",
              message: data.message,
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
    // 修改游戏模块
    editGameModule(gameModule) {
      let copyObj = {};
      for (let key of Object.keys(gameModule.row)) {
        copyObj[key] = gameModule.row[key];
      }
      this.changeGameModuleForm = copyObj;
      this.changeGameModuleImageUrl =
        this.$store.state.gameModuleImg + this.changeGameModuleForm.modulePhoto;
      this.showChangeGameModule = true;
    },
    // 确认修改游戏模块
    confirmEditGameModule() {
      let data = new FormData();
      for (let key of Object.keys(this.changeGameModuleForm)) {
        data.append(key, this.changeGameModuleForm[key]);
      }
      this.$http
        .post("confirmEditGameModule", data)
        .then(({ data }) => {
          if (data.success) {
            this.$message({
              type: "success",
              message: data.message,
            });
            this.getGameModule();
            this.showChangeGameModule = false;
          } else {
            this.$message({
              type: "warning",
              message: data.message,
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
    createImgUrl(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addGameModuleForm.modulePhoto = file.raw;
    },
    handleRemove() {
      this.imageUrl = "";
      this.fileList = [];
      this.addGameModuleForm.modulePhoto = null;
    },
    createImgUrl2(file) {
      this.changeGameModuleImageUrl = URL.createObjectURL(file.raw);
      this.changeGameModuleForm.modulePhoto = file.raw;
    },
    handleRemove2() {
      this.changeGameModuleImageUrl = "";
      this.changeGameModuleFileList = [];
      this.changeGameModuleForm.modulePhoto = null;
    },
  },
  created() {
    this.getGameModule();
  },
};
</script>

<style lang="scss" scoped>
.gameModuleOut {
  padding: 10px;
  h2,
  .el-button {
    margin-bottom: 20px;
  }
  .addGameModule,
  .changeGameModule {
    position: fixed;
    width: 500px;
    height: 530px;
    border: 1px solid black;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, 50px);
    background-color: #fff;
    overflow: auto;
    padding: 10px;
    .el-icon-circle-close {
      position: absolute;
      right: 10px;
      font-size: 20px;
      &:hover {
        color: #1e90ff;
      }
    }
    h2 {
      text-align: center;
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
</style>
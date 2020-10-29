<template>
  <div class="out">
    <!-- 搜索栏 -->
    <div class="searchBox">
      <!-- 注意keypress要为原生事件 -->
      <el-input
        type="text"
        v-model="searchInput"
        placeholder="请输入游戏模块"
        @keydown.native.enter="getGameModule"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getGameModule"></el-button>
    </div>
    <!-- 搜索条件选择 -->
    <div class="searchCondition">
      <el-select clearable v-model="gameType" placeholder="游戏类型" @change="getGameModule">
        <el-option
          v-for="item in gameTypeArr"
          :key="item.moduleType"
          :label="item.moduleType"
          :value="item.moduleType"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 搜索结果 -->
    <div class="searchResult">
      <div
        class="result"
        v-for="gameModule in gameModuleArr"
        :key="gameModule.moduleId"
      >
        <div class="imageBox">
          <el-image
            :src="$store.state.gameModuleImg + gameModule.modulePhoto"
            style="width: 100%; height: 100%"
          ></el-image>
        </div>
        <div class="containBox">
          <div class="gameName">{{ gameModule.moduleName }}</div>
          <div class="gameIntroduction">
            {{ gameModule.moduleIntroduction }}
          </div>
          <div class="utilBox">
            <el-button type="success" round size="small">进入板块</el-button>
            <el-button icon="el-icon-star-off" circle size="small"></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
      gameModuleArr: [],
      gameType: "",
      gameTypeArr: []
    };
  },
  methods: {
    // 获取游戏模块
    getGameModule() {
      this.$http
        .get("getGameModule", { params: { searchInput: this.searchInput, gameType: this.gameType } })
        .then(({ data }) => {
          this.gameModuleArr = data.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 获取游戏模块类型
    getGameType() {
      this.$http
        .get("getGameType", { params: {} })
        .then(({ data }) => { 
          this.gameTypeArr = data.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  },
  created() {
    this.getGameModule();
    this.getGameType();
  },
};
</script>

<style lang="scss" scoped>
.out {
  width: 70%;
  padding: 30px;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
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
  .searchCondition {
    width: 80%;
    margin: 10px auto;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  .searchResult {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .result {
      width: 80%;
      height: 150px;
      border: 2px solid gray;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .imageBox {
        width: 20%;
        height: 80%;
        background-color: rgb(221, 221, 223);
      }
      .containBox {
        height: 80%;
        width: 75%;
        display: flex;
        flex-direction: column;
        .gameName {
          height: 2rem;
          width: 100%;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .gameIntroduction {
          height: 3rem;
          width: 100%;
          overflow: hidden;
          font-size: 1rem;
          color: gray;
        }
        .utilBox {
          height: 40%;
          width: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
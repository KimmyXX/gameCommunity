<template>
<!-- 游戏板块详情页 -->
  <div class="outBox">
    <div class="out">
      <div class="moduleInfoBox">
        <div class="imgBox">
          <el-image
            :src="gameModuleImg + moduleInfo.modulePhoto"
            style="width: 100%; height: 100%;"
          ></el-image>
        </div>
        <div class="infoBox">
          <div class="moduleName">{{ moduleInfo.moduleName }}</div>
          <div class="moduleIntroduction">
            {{ moduleInfo.moduleIntroduction }}
          </div>
          <div class="util">
            <el-button
              type="primary"
              @click="$router.push('/mainPage/writeShare')"
              >分享动态</el-button
            >
            <el-button type="info" circle icon="el-icon-star-off"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="share">
      <div class="noShare" v-if="shareArr.length == 0">暂无动态，快来发表吧！</div>
      <share-box v-for="item in shareArr" :shareInfo="item" :key="item.shareId"></share-box>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import shareBox from "./shareBox.vue";
export default {
  data() {
    return {
      shareArr: []
    };
  },
  components: {
    shareBox,
  },
  methods: {
    getShare() {
      this.$http
        .get("getShareList", { params: { moduleId: this.moduleInfo.moduleId } })
        .then(({ data }) => {
          if(data.success) {
            this.shareArr = data.data;
          }
          else {
            console.log(data);
            this.$message({
              type: "warning",
              message: "获取动态列表数据失败"
            })
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器失败")
        });
    }
  },
  computed: {
    ...mapState(["gameModuleImg", "moduleInfo"]),
  },
  created() {
    this.getShare();
  }
};
</script>

<style lang="scss" scoped>
.outBox {
  width: 70%;
  margin-left: 15px;
}
.out {
  width: 95%;
  padding: 30px;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  .moduleInfoBox {
    width: 90%;
    min-height: 200px;
    margin: 0 auto;
    display: flex;
    .imgBox {
      width: 20%;
      height: 100%;
      margin-right: 10px;
    }
    .infoBox {
      width: 80%;
      .moduleName {
        height: 15%;
        font-size: 30px;
        font-weight: bold;
      }
      .moduleIntroduction {
        min-height: 50%;
        color: gray;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .util {
        margin-top: 10px;
        height: 25%;
      }
    }
  }
}
.share {
  width: 95%;
  padding: 30px;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin-top: 20px;
  .noShare {
    width: 90%;
    background-color: white;
    margin: 0 auto;
    height: 80px;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 80px;
    color: gray;
  }
}
</style>
<template>
  <div class="out">
    <div class="moduleInfoBox">
      <div class="imgBox">
          <el-image :src="gameModuleImg + moduleInfo.modulePhoto" style="width:100%;height:100%"></el-image>
      </div>
      <div class="infoBox">
        <div class="moduleName">{{ moduleInfo.moduleName }}</div>
        <div class="moduleIntroduction">{{ moduleInfo.moduleIntroduction }}</div>
        <div class="util">
            <el-button type="primary">分享动态</el-button>
            <el-button type="info" circle icon="el-icon-star-off"></el-button>
        </div>
      </div>
    </div>
    <div class="shareBox"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState([
            'gameModuleImg',
            'moduleInfo'
        ])
    }
};
</script>

<style lang="scss" scoped>
.out {
  width: 70%;
  padding: 30px;
  min-height: 100px;
  margin-left: 15px;
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
    }
    .infoBox {
        width: 80%;
        .moduleName {
            height: 30%;
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
            height: 20%;
        }
    }
  }
}
</style>
<template>
  <div class="gameModuleOut">
    <h2>游戏板块管理</h2>
    <el-button type="primary">新增游戏板块</el-button>
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
          <el-image :src="$store.state.gameModuleImg + scope.row.modulePhoto"></el-image>
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
        <template>
          <el-button size="mini">编辑</el-button>
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
      gameArr: [
        {
          moduleId: 0,
          moduleName: "炉石传说",
          moduleType: "棋牌",
          modulePhoto: "炉石传说.png",
          moduleIntroduction: "《炉石传说：魔兽英雄传》是一款由暴雪娱乐公司出品的策略类卡牌游戏。中国大陆地区的独家运营由网易公司代理。2014年3月13日全球同步正式运营。《酒馆战棋》模式于北京时间2019年11月6日凌晨2点国服开启抢先体验。游戏背景设定于暴雪的魔兽系列，共十位魔兽中的角色作为十种不同的职业。而玩家要做的，就是根据己方现有的卡牌组建合适的卡组，指挥英雄，驱动随从，施展法术，与游戏好友或素不相识的对手一决高下。",
        },
        {
          moduleId: 1,
          moduleName: "CS GO",
          moduleType: "棋牌",
          modulePhoto: "炉石传说.png",
          moduleIntroduction: "《炉石传说：魔兽英雄传》是一款由暴雪娱乐公司出品的策略类卡牌游戏。中国大陆地区的独家运营由网易公司代理。2014年3月13日全球同步正式运营。《酒馆战棋》模式于北京时间2019年11月6日凌晨2点国服开启抢先体验。游戏背景设定于暴雪的魔兽系列，共十位魔兽中的角色作为十种不同的职业。而玩家要做的，就是根据己方现有的卡牌组建合适的卡组，指挥英雄，驱动随从，施展法术，与游戏好友或素不相识的对手一决高下。",
        }
      ],
    };
  },
  methods: {
    getGameModule() {
      this.$http.get("getGameModule",{ params: { searchInput: "", gameType: "" } }).then(({data}) => {
        if(data.success) {
          this.gameArr = data.data;
        }
        else {
          this.$message({
            type: "warning",
            message: "获取游戏板块数据失败"
          })
        }
      }).catch(err => {
        this.$message.error("连接服务器错误");
      })
    }
  },
  created() {
    this.getGameModule();
  }
};
</script>

<style lang="scss" scoped>
.gameModuleOut {
  padding: 10px;
  h2,
  .el-button {
    margin-bottom: 20px;
  }
}
</style>
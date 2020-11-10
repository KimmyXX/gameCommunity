<template>
  <!-- 好友盒子 -->
  <div class="applyBox">
    <div class="userInfo">
      <el-avatar :src="userPhotoPath + friendInfo.userPhoto"></el-avatar>
      <div class="nickname">{{ friendInfo.nickname }}</div>
      <div class="userId">用户id: {{ friendInfo.userId }}</div>
    </div>
    <div class="util">
      <el-button type="success" size="mini" @click="chat()">发起聊天</el-button>
    </div>
    <div class="chatBox" v-show="showChatBox" :key="friendInfo.friendId">
      <div class="messageBoxUtil">
        <i class="el-icon-close" @click="endChat"></i>
      </div>
      <div class="messageBox" ref="messageBox">
        <div
          class="messageRow"
          v-for="message in messageArr"
          :key="message.time"
          :style="[
            message.sendUserId == friendInfo.userId
              ? {}
              : { 'flex-direction': 'row-reverse' },
          ]"
        >
          <el-avatar
            :src="
              userPhotoPath +
              (message.sendUserId == friendInfo.userId
                ? friendInfo.userPhoto
                : userInfo.userPhoto)
            "
          ></el-avatar>
          <div
            class="message"
            :style="[
              message.sendUserId == friendInfo.userId
                ? { 'margin-left': '10px' }
                : { 'margin-right': '10px' },
            ]"
          >
            {{ message.chatContent }}
          </div>
        </div>
      </div>
      <div class="sendMessageBox">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="content"
          :autosize="{ minRows: 3, maxRows: 3 }"
          resize="none"
          style="width: 90%"
        >
        </el-input>
        <el-button type="primary" size="small" @click="sendMessage"
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// websocket
import io from "socket.io-client";
import { mapState } from "vuex";
export default {
  props: ["friendInfo"],
  data() {
    return {
      socket: null,
      showChatBox: false,
      content: "",
      messageArr: [],
    };
  },
  methods: {
    chat() {
      this.showChatBox = true;
      let vm = this;
      this.getHistoryChatMessage();
      // 发送好友id作为标志
      if (this.socket == null) {
        this.socket = io(
          "http://127.0.0.1:10998?friendId=" + this.friendInfo.friendId
          // "http://192.168.1.106:10998?friendId=" + this.friendInfo.friendId

        );
        this.socket.on("chat message", function (msg) {
          vm.messageArr.push(msg);
          // 等视图更新再滚到底部，否则只会滚到当前的底部，导致少一条消息！！！！！！！！！！！
          vm.$nextTick(function () {
            vm.$refs.messageBox.scrollTop = vm.$refs.messageBox.scrollHeight;
          });
        });
      }
    },
    sendMessage() {
      if (this.socket != null) {
        this.socket.emit("chat message", {
          friendId: this.friendInfo.friendId,
          sendUserId: this.userInfo.userId,
          receiveUserId: this.friendInfo.userId,
          chatContent: this.content.trim(),
          time: new Date().getTime(),
        });
        this.content = "";
      }
    },
    endChat() {
      this.showChatBox = false;
      if (this.socket != null) {
        this.socket.close();
        this.socket = null;
      }
    },
    getHistoryChatMessage() {
      this.$http
        .post("getHistoryChatMessage", {
          friendId: this.friendInfo.friendId,
        })
        .then(({ data }) => {
          if (data.success) {
            this.messageArr = data.data;
            this.$nextTick(function () {
              this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
            });
          } else {
            this.$message({
              type: "warning",
              message: "获取聊天记录失败",
            });
          }
        })
        .catch((err) => {
          this.$message.error("连接服务器错误");
        });
    },
  },
  computed: {
    ...mapState(["userInfo", "userPhotoPath"]),
  },
};
</script>

<style lang="scss" scoped>
.applyBox {
  width: 95%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  .userInfo {
    display: flex;
    align-items: center;
    height: 100%;
    .el-avatar {
      margin: 0 10px;
    }
    .nickname {
      font-weight: bold;
      margin-right: 10px;
    }
    .userId {
      color: gray;
      font-size: 12px;
      margin-right: 10px;
    }
  }
  .chatBox {
    width: 40%;
    height: 500px;
    border: 5px solid gray;
    position: fixed;
    // left: 50%;
    // top: 50%;
    // margin-left: -50%;
    // margin-top: -50%;
    background-color: gray;
    // border-radius: 10px;
    .messageBoxUtil {
      width: 100%;
      height: 5%;
      border-bottom: 1px solid gray;
      display: flex;
      justify-content: flex-end;
      color: white;
      // font-size: 20px;
      i:hover {
        cursor: pointer;
        color: skyblue;
      }
    }
    .messageBox {
      width: 100%;
      height: 70%;
      border-bottom: 1px solid gray;
      background-color: white;
      overflow-y: scroll;
      .messageRow {
        display: flex;
        min-height: 30px;
        padding: 5px;
        .message {
          margin-top: 10px;
          min-width: 30%;
          max-width: 80%;
          background-color: skyblue;
          border-radius: 10px;
          word-break: break-all;
          white-space: pre-wrap;
          padding: 5px;
        }
      }
    }
    .sendMessageBox {
      width: 100%;
      height: 23%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 5px;
      background-color: white;
      .el-button {
        margin-top: 5px;
        align-self: flex-end;
        margin-right: 5%;
      }
    }
  }
}
</style>
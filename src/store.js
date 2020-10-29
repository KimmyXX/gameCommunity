import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    userInfo: null,
    // 用户头像获取位置
    userPhotoPath: 'http://127.0.0.1:10998/upload/'
  },
  mutations: {
    changeUserInfo(state, userInfo) {
      if(userInfo) {
        state.userInfo = userInfo;
      }
    }
  }
});

export default store;


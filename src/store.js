import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    userInfo: null,
    moduleInfo: null,
    // 用户头像获取位置
    userPhotoPath: 'http://127.0.0.1:10998/upload/',
    gameModuleImg: 'http://127.0.0.1:10998/gameModuleImg/'
 
    //服务器测试版本
    // userPhotoPath: '/upload/',
    // gameModuleImg: '/gameModuleImg/'
  },
  mutations: {
    changeUserInfo(state, userInfo) {
      if(userInfo) {
        state.userInfo = userInfo;
      }
    },
    changeModuleInfo(state, moduleInfo) {
      if(moduleInfo) {
        state.moduleInfo = moduleInfo;
      }
    }
  }
});

export default store;


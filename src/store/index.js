import Vue from 'vue'
import Vuex from 'vuex'
import { uploadSvg, downloadSvg, fetchFileAddr } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      activeType: 'mobile', // 默认是 mobile
      category: ['mobile', 'life', 'math'], // 类目
      listAddr: { // 图标地址
        mobile: [],
        life: [],
        game: []
      }
  },
  // 异步操作放在 action
  actions: {
    // 上传文件
    UPLOAD: ({ commit }, { type, fileToUpload }) => {
        uploadSvg(fileToUpload)
        .then((data) => { // 上传成功返回该文件地址
            commit('UPLOAD_FILE_SUC', { type, data });
        }, (err) => { // 上传失败返回错误信息
            commit('UPLOAD_FILE_FAIL', { err });
        })
    },
    // 下载文件（暂时不用-.-）
    DOWNLOAD: ({ commit }, { downloadFileName }) => {
        downloadSvg(downloadFileName);
    },
    // 获取文件地址
    FETCH_FILE_ADDR: ({ commit }, { type }) => {
        fetchFileAddr(type)
        .then((data) => {
            var addr = data.addr;
            commit('FETCH_FILE_ADDR', { type, addr });
        })
    }
  },
  // 同步操作放在 action
  mutations: {
    // 上传文件失败
    UPLOAD_FILE_FAIL: (state, { err }) => {
        console.log(err);
    },
    // 上传文件成功
    UPLOAD_FILE_SUC: (state, { type, data }) => {
        data.forEach(function (item) {
            state.listAddr[type].push({
                addr: item.addr,
                name: item.name.split('.svg')[0]
            });
        });
        // console.log(state.listAddr[type]);
    },
    // 获取文件地址
    FETCH_FILE_ADDR: (state, { type, addr }) => {
        state.listAddr[type] = addr;
    }
  },

  getters: {
      // 处理 state
  }
})

export default store

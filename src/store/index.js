import Vue from 'vue'
import Vuex from 'vuex'
import { uploadSvg, packSvg, downloadSvg, fetchFileAddr, getSvgDetail } from './api'
import jQuery from 'jquery'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      activeType: 'mobile', // 默认是 mobile
      dialogShow: false,
      category: ['mobile', 'life', 'math'], // 类目
      listAddr: { // 图标地址
        mobile: [],
        life: [],
        game: []
      },
      svgDetail: '' // dialog 里的 svg 内容
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
    PACK: ({ commit }, { type }) => {
        packSvg(type)
        .then((data) => {
            commit('PACK_SVG_SUCC', { data });
        }, (err) => {
            commit('PACK_SVG_FAIL', { err });
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
    },
    SHOW_DIALOG: ({ commit }) => {
        commit('SHOW_DIALOG');
    },
    HIDE_DIALOG: ({ commit }) => {
        commit('HIDE_DIALOG');
    },
    GET_SVG_DETAIL: ({ commit }, { path, svgDialogBody }) => {
        getSvgDetail(path)
        .then((data) => {
            commit('GET_SVG_DETAIL', { data, svgDialogBody })
        })
    }
  },
  // 同步操作放在 mutations
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
    },
    PACK_SVG_SUCC: (state, { data }) => {
        window.location = data.addr;
    },
    // SHOW_DIALOG: (state) => {
    //     state.dialogShow = true;
    // },
    HIDE_DIALOG: (state) => {
        state.dialogShow = !state.dialogShow;
    },
    GET_SVG_DETAIL: (state, { data, svgDialogBody }) => {
        state.svgDetail = data;
        var svgContent = '<svg' + state.svgDetail.split('<svg')[1];
        var objE = document.createElement("div");
　　     objE.innerHTML = svgContent;
        svgDialogBody.appendChild(objE.childNodes[0]);

        var dialogSvg = document.getElementsByTagName('svg')[0];
        dialogSvg.setAttribute('width', '200px');
        dialogSvg.setAttribute('height', '200px');

        state.dialogShow = true;
    }
  },

  getters: {
      // 处理 state
  }
})

export default store

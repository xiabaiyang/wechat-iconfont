<template>
    <div class="svg-wrapper">
      <ul class="svg-list__clear">
        <li v-for="item in ItemList" class="svg-list">
          <div class="svg-list__wrapper" v-on:mouseover="showDownload(item)" v-on:mouseout="hideDownload(item)">
            <embed :src="item.addr" type="image/svg+xml" class="svg-list__item"/>
            <!-- <a :href="item.addr" download class="svg-item__download" :id="item.name">下载</a> -->
            <a class="svg-item__download" :id="item.name" v-on:click="showDownloadDialog(item.name)">下载</a>
            <p class="svg-list__item_name">{{ item.name }}</p>
          </div>
        </li>
        <form enctype="multipart/form-data" method="post" class="svg-form__upload" id="fileToUpload">
          <a href="javascript:;" class="svg-input__file">上传
              <input type="file" name="image" multiple v-on:change="chooseFile()">
          </a>
          <a href="javascript:;" class="svg-input__text">
              <input type="text" name="picName" v-model="fileName" placeholder="请输入文件名">
          </a>
          <a class="svg-btn__upload" v-on:click="submit">
              点击上传
          </a>
          <a class="svg-btn__pack" v-on:click="pack">
              下载
          </a>
        </form>
      </ul>
      <div class="svg__mask" v-show="DialogShow === true">
      </div>
      <div class="svg__dialog" v-show="DialogShow === true">
          <a href="javascript:;" class="svg__dialog_close" v-on:click="hideDownloadDialog">
            X
          </a>
          <div class="svg__dialog_body">
            <!-- <embed src="http://127.0.0.1:3000/files/mobile/想去.svg" type="image/svg+xml" class="svg-list__item"/> -->
          </div>
          <div class="svg__dialog_color">
              <label for="svgColor" class="color_label">SVG 颜色：</label>
              <input type="text" name="color" id="svgColor" class="color_input" placeholder="#000000"
                     v-model="svgColor" v-on:blur="inputColor">
              <div class="svg__color svg__color_blue" v-on:click="presetColor('#10AEFF')"></div>
              <div class="svg__color svg__color_orange" v-on:click="presetColor('#F2A049')"></div>
              <div class="svg__color svg__color_red" v-on:click="presetColor('#F76260')"></div>
              <div class="svg__color svg__color_green" v-on:click="presetColor('#09BB07')"></div>
          </div>
          <div class="svg__dialog_size">
              <label for="svgSize" class="size_label">SVG 大小：</label>
              <input type="text" name="size" id="svgSize" class="size_input" placeholder="200px"
                     v-model="svgSize" v-on:blur="inputSize">
          </div>
          <a href="#" class="svg__dialog_download" v-on:click="createSvgAndDownload">下载</a>
      </div>
    </div>
</template>

<script>

import jQuery from 'jquery';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'item-list',

  components: {
  },

  props: {
      type: String
  },

  data () {
      return {
          fileName: '',
          svgColor: '',
          svgSize: '',
          curSvgName: ''
      };
  },

  computed: mapState({
      ItemList: function (state) {
          let ItemList = state.listAddr[this.type];
          return ItemList;
      },
      DialogShow: function (state) {
          return state.dialogShow;
      },
      SvgDetail: function (state) {
          return state.svgDetail;
      }
  }),

  // 需要处理
  preFetch () {
      console.log('server fetch');
      store.dispatch('FETCH_FILE_ADDR', {
          type: this.type
      })
  },

  beforeMount () {
      console.log('local fetch');
      this.fetchSvgAddr({
          type: this.type
      });
  },

  methods: {
    ...mapActions({
        uploadSvg: 'UPLOAD',
        packSvg: 'PACK',
        downloadSvg: 'DOWNLOAD',
        fetchSvgAddr: 'FETCH_FILE_ADDR',
        // showDialog: 'SHOW_DIALOG',
        hideDialog: 'HIDE_DIALOG',
        getSvgDetail: 'GET_SVG_DETAIL'
    }),
    chooseFile () {
        console.log('文件变动');
        this.submit();
    },
    submit () {
        // var type = this.$store.state.route.params.type;
        var type = this.type;
        var fileToUpload = new FormData(jQuery('#fileToUpload')[0]);
        fileToUpload.append('picName', this.fileName);
        fileToUpload.append('fileType', type);
        this.uploadSvg({ type, fileToUpload });
    },
    pack () {
        var type = this.type;
        this.packSvg({ type });
    },
    showDownload (item) {
        let id = '#' + item.name;
        jQuery(id).css('display', 'block');
    },
    hideDownload (item) {
        let id = '#' + item.name;
        jQuery(id).css('display', 'none');
    },
    download () {
    },
    showDownloadDialog (name) {
        this.curSvgName = name; // 保存当前打开 dialog 的 svg name
        var path = this.type + '/' + name + '.svg';
        var svgDialogBody = document.getElementsByClassName('svg__dialog_body')[0];
        this.getSvgDetail({ path, svgDialogBody });
        // this.showDialog();
    },
    hideDownloadDialog () {
        var curSvgDom = document.getElementsByTagName('svg')[0];
        var svgDialogBody = document.getElementsByClassName('svg__dialog_body')[0];
        svgDialogBody.removeChild(curSvgDom);
        this.svgColor = '';
        this.svgSize = '';
        this.hideDialog();
    },
    createSvgAndDownload () {
        var svgDetail = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                        + document.getElementsByClassName('svg__dialog_body')[0].innerHTML;
        var dialogDownload = document.getElementsByClassName('svg__dialog_download')[0];
        var blob = new Blob([svgDetail], {type: 'image/svg+xml'});
        dialogDownload.href = window.URL.createObjectURL(blob);
        dialogDownload.download = this.curSvgName + '.svg';
    },
    inputColor () {
        this.changeColor(this.svgColor);
    },
    inputSize () {
        var dialogSvg = document.getElementsByTagName('svg')[0];
        dialogSvg.setAttribute('width', this.svgSize);
        dialogSvg.setAttribute('height', this.svgSize);
    },
    presetColor (color) {
        this.changeColor(color);
        this.svgColor = color;
    },
    changeColor (color) {
        var dialogSvgs = document.getElementsByTagName('path');
        for (var i = 0; i < dialogSvgs.length; i++) {
            dialogSvgs[i].setAttribute('fill', color)
        }
    }
  }
}
</script>

<style scoped>
.svg-wrapper {
    position: relative;
    margin: 0 50px;
}

.svg-list__clear {
    zoom:1;
    margin: 0;
    padding: 0;
}

.svg-list__clear:after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
}

.svg-list {
    list-style-type: none;
    float: left;
    width: 100px;
    margin-right: 29px;
    margin-top: 30px;
    text-align: center;
}

.svg-list__wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
}

.svg-list__item {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
    border-radius: 5px;
}

.svg-list__item_name {
    width: 106px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 75px;
    margin: 0;
    font-size: 12px;
    left: 50%;
    transform: translateX(-50%);
}

.svg-item__download {
    display: none;
    width: 70px;
    height: 70px;
    line-height: 70px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    background: rgba(13, 10, 49, .7);
    border-radius: 5px;
    font-weight: bold;
}

.svg-item__download:hover {
    cursor: pointer;
}

.svg-form__upload {
    display: block;
    position: absolute;
    top: -91px;
    right: 0;
    margin-top: 30px;
    width: 200px;
    height: 59px;
    border-radius: 2px;
}

.svg-input__file {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    border: 1px solid #ecd10a;
    color: black;
    font-size: 17px;
    text-decoration: none;
    text-indent: 0;
    border-radius: 50%;
}
.svg-input__file input {
    position: absolute;
    width: 50px;
    height: 50px;
    font-size: 100px;
    left: 0;
    top: 0;
    opacity: 0;
}
.svg-input__file:hover {
    cursor: pointer;
    background-color: #ffa000;
}

.svg-input__text {
    text-decoration: none;
    display: none;
}

.svg-input__text input {
    display: block;
    text-align: center;
    width: 244px;
    height: 30px;
}

.svg-btn__upload {
    display: block;
    visibility: hidden;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
}

.svg-btn__upload:hover {
    cursor: pointer;
    background-color: #ffa000;
}

.svg-btn__pack {
    position: absolute;
    top: 50%;
    left: 110px;
    transform: translateY(-50%);
    border: 1px solid #ecd10a;
    display: block;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    font-size: 17px;
    color: black;
    line-height: 50px;
    vertical-align: middle;
}

.svg-btn__pack:hover {
    cursor: pointer;
    background-color: #ffa000;
}

.svg__mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background: #0d0a31!important;
    opacity: .85!important;
}

.svg__dialog {
    width: 500px;
    height: 400px;
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    z-index: 9999;
    background-color: #fafafb!important;
    border-radius: 5px;
}

.svg__dialog_close {
    position: absolute;
    top: 6px;
    right: 10px;
    text-decoration: none;
    color: black;
}

.svg__dialog_body {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.svg__dialog_download {
    position: absolute;
    top: 290px;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    border: 1px solid gray;
    border-radius: 5px;
    color: #333;
    font-size: 14px;
    background-color: #ddd;
    width: 60px;
    text-align: center;
}

.svg__dialog_color {
    display: inline-block;
    width: 250px;
    height: 20px;
    position: absolute;
    top: 230px;
    left: 40px;
}

.color_label {
    font-size: 14px;
    color: black;
}

.color_input {
    width: 60px;
    height: 14px;
}

.svg__dialog_size {
    display: inline-block;
    width: 150px;
    height: 20px;
    position: absolute;
    top: 230px;
    right: 50px;
}

.size_label {
    font-size: 14px;
    color: black;
}

.size_input {
    width: 60px;
    height: 14px;
}

.dialog__svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.svg__color {
    width: 14px;
    height: 14px;
    border: 1px solid #ddd;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
}

.svg__color_blue {
    background-color: #10AEFF;
}

.svg__color_orange {
    background-color: #F2A049;
}

.svg__color_red {
    background-color: #F76260;
}

.svg__color_green {
    background-color: #09BB07;
}
</style>

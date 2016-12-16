<template>
    <div class="svg-wrapper">
      <ul class="svg-list__clear">
        <li v-for="item in ItemList" class="svg-list">
          <div class="svg-list__wrapper" v-on:mouseover="showDownload(item)" v-on:mouseout="hideDownload(item)">
            <embed :src="item.addr" type="image/svg+xml" class="svg-list__item"/>
            <a :href="item.addr" download class="svg-item__download" :id="item.name">下载</a>
            <p class="svg-list__item_name">{{ item.name }}</p>
          </div>
        </li>
        <form enctype="multipart/form-data" method="post" class="svg-form__upload" id="fileToUpload">
          <a href="javascript:;" class="svg-input__file">选择文件
              <input type="file" name="image" multiple>
          </a>
          <a href="javascript:;" class="svg-input__text">
              <input type="text" name="picName" v-model="fileName" placeholder="请输入文件名">
          </a>
          <a class="svg-btn__upload" v-on:click="submit">
              点击上传
          </a>
        </form>
      </ul>
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
          fileName: ''
      };
  },

  computed: mapState({
      ItemList: function (state) {
          let ItemList = state.listAddr[this.type];
          return ItemList;
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
        downloadSvg: 'DOWNLOAD',
        fetchSvgAddr: 'FETCH_FILE_ADDR'
    }),
    submit () {
        // var type = this.$store.state.route.params.type;
        var type = this.type;
        var fileToUpload = new FormData(jQuery('#fileToUpload')[0]);
        fileToUpload.append('picName', this.fileName);
        fileToUpload.append('fileType', type);
        this.uploadSvg({ type, fileToUpload });
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
    right: 33px;
    margin-top: 30px;
    width: 100px;
    height: 59px;
    border: 1px solid gray;
    border-radius: 2px;
}

.svg-input__file {
    position: relative;
    display: inline-block;
    width: 98px;
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
}
.svg-input__file input {
    position: absolute;
    width: 100px;
    height: 30px;
    font-size: 100px;
    left: 0;
    top: 0;
    opacity: 0;
}
.svg-input__file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
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
    height: 27px;
    line-height: 27px;
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
}

.svg-btn__upload:hover {
    cursor: pointer;
    background-color: #ffa000;
}
</style>


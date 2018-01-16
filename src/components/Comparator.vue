<template>
  <div class="index">
    <h1>人脸比对</h1>
    <div class="upload">
      <upload :rects="rect1" :size="size1" imgFileTarget="comparator/onImgFile1"></upload>
      <upload :rects="rect2" :size="size2" imgFileTarget="comparator/onImgFile2"></upload>
    </div>
    <el-button type="primary" :round="true" :loading="loading" @click="compare">开始比对</el-button>
    <div class="result">
      <p>&nbsp;{{msg}}</p>
      <!-- <p>比对时间：{{time}}秒</p>
      <p>不相似度：{{distance}}</p>
      <p>不相似度参考值：</p>
      <p>同一人可能性高
        <=0.6<不同人可能性高</p> -->
    </div>
  </div>
</template>

<script>
  // import Upload from "./Upload.vue";
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    components: {
      Upload: resolve => {
        require(['./Upload.vue'], resolve)
      }
    },
    computed: mapState('comparator', [
      'msg',
      'time',
      'distance',
      'loading',
      'size1',
      'rect1',
      'size2',
      'rect2'
    ]),
    methods: {
      ...mapActions('comparator', [
        'onImgFile1',
        'onImgFile2',
        'compare'
      ])
    }
  }

</script>

<style scoped>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .upload {
    width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
  }

  .result {
    width: 600px;
    border: 1px solid gray;
    margin-top: 40px;
  }

</style>

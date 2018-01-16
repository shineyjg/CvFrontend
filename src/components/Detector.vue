<template>
  <div class="index">
    <h1>人脸检测</h1>
    <div v-if="msg" class="result">
      <p>{{msg}}</p>
    </div>
    <div class="upload">
      <upload imgFileTarget="detector/detect" :rects="rects" :size="size"></upload>
    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      Upload: resolve => {
        require(['./Upload.vue'], resolve)
      }
    },

    computed: mapState('detector', [
      'msg',
      'rects',
      'size'
    ])
  }

</script>

<style scoped>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>

<template>
  <div class="index">
    <h1>车牌识别</h1>
    <div v-if="msg" class="result">
      <p>{{msg}}</p>
    </div>
    <div v-if="result" class="result">
      <p>{{result}}</p>
    </div>
    <div class="upload">
      <upload imgFileTarget="plate/recog"></upload>
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

    computed: {
      ...mapState('plate', [
        'msg',
        'plates'
      ]),
      result: function(){
        if(this.plates.length==0){
          return '未检测出车牌'
        }
        return this.plates.join()
      }
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
</style>
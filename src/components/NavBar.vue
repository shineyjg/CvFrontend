<template>
  <div>
    <el-menu default-active="/" class="el-menu" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" router>
      <span id="logo">
        <i class="el-icon-view"></i>
        CV实验室&nbsp;&nbsp;
        <i class="el-icon-d-arrow-right"></i>
      </span>

      <el-menu-item index="/face/compare">人脸对比</el-menu-item>
      <el-menu-item index="/face/detect">人脸检测</el-menu-item>
      <el-menu-item index="/plate/recog">车牌识别</el-menu-item>
      <!-- <el-menu-item index="/nav">侧边导航</a></el-menu-item> -->
    </el-menu>
  </div>
</template>


<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };

</script>

<style>
  #logo {
    float: left;
    position: relative;
    line-height: 60px;
    color: #dfd;
    padding-left: 100px;
    padding-right: 50px;
  }

</style>

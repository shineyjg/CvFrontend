<template>
  <div class="el-menu-collapse">
    <el-button type="primary" icon="el-icon-menu" @click="changeCollapse"></el-button>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="/" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
    <el-submenu index="/">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
        </template>
        <el-menu-item index="/">人脸对比</el-menu-item>
        <el-menu-item index="/">人脸对比</el-menu-item>
        <el-menu-item index="/">人脸对比</el-menu-item>
    </el-submenu>
    </el-menu>
</div>
</template>

<style scoped>
.el-menu-collapse {
  max-width: 200px;
}
</style>


<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
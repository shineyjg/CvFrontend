<template>
  <div>
    <el-upload class="avatar-uploader" name="facefile" :action="faceUploadAction" :show-file-list=false :on-success="handleAvatarSuccess"
      :on-error="handleError" :before-upload="beforeAvatarUpload">
      <div v-if="localUrl">
        <img :src="localUrl" class="avatar" v-run="register()">
        <span v-for="rect in rects" :style="rectStyle(rect)"></span>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        localUrl: ''
      }
    },
    props: {
      imgFileTarget: String,
      rects: {
        type: Array,
        default: () => {
          return []
        }
      },
      size: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },

    computed: {
      ...mapGetters('uploader', [
        'faceUploadAction'
      ])
    },
    directives: {
      run(el, binding) {
        if (typeof binding.value == 'function') binding.value(el)
      }
    },
    methods: {
      register() {
        return (el) => {
          this.img = el;
        }
      },
      rectStyle(rect) {
        // console.log("rectStyle", rect)
        if (!('img' in this)) {
          console.log('no img in Upload.vue')
          return
        }
        // console.log(this.img.width, this.img.height)
        // console.log(this.size)
        let wRatio = this.img.width / this.size.width
        let hRatio = this.img.height / this.size.height
        let l = rect['left'] * wRatio
        let t = rect['top'] * hRatio
        let w = (rect['right'] - rect['left']) * wRatio
        let h = (rect['bottom'] - rect['top']) * hRatio
        return "position: absolute;border: 2px solid red; left: " + l + "px; top: " + t +
          "px; width: " + w + "px; height: " + h + "px;"
      },
      handleAvatarSuccess(res, file) {
        console.log("handleAvatarSuccess:", res, file.raw);
        this.localUrl = URL.createObjectURL(file.raw)
        this.$store.dispatch(this.imgFileTarget, res.imgFile)
      },
      handleError(res, file) {
        this.localUrl = ''
        this.$store.dispatch(this.imgFileTarget, "")
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === "image/jpeg" || file.type === "image/png");
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
          return false
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
          return false
        }

        return true
      }
    }
  }

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    /* width: 178px; */
    /* height: 178px; */
    min-width: 178px;
    min-height: 178px;
    max-width: 400px;
    max-height: 400px;
    display: block;
  }

  .rect {
    position: absolute;
  }

</style>

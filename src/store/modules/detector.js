import axios from "axios"

const state = {
  msg: "",
  imageUrl: "",
  rects: [],
  size:{}
}

const actions = {
  detect({
    commit,
    state,
    rootState
  }, imageFile) {
    let serverAddr = rootState.config.serverAddr
    axios.get(serverAddr + '/faces/detect', {
        params: {
          imgFile: imageFile,
        }
      })
      .then(function (res) {
        res = res.data
        console.log('success', res);
        if (res.status != 0) {
          commit('clear')
          return
        }
        if (res.faces == 0) {
          commit('clear')
          commit('setMsg', "未检测到人脸")
          return
        }
        commit('setMsg', '')
        commit('setImageUrl', serverAddr + res.detectUrl)
        commit('setRects', res.rects)
        commit('setSize', res.size)
      })
      .catch(function (error) {
        console.log('vuex detector axios except', error)
        commit('clear')
        commit('setMsg', '网络异常, 请稍后再试')
      });
  }
}

const mutations = {
  ['clear'](state) {
    state.msg = ''
    state.imageUrl = ''
    state.rects = []
    state.size = {}
  },
  ['setMsg'](state, msg) {
    state.msg = msg
  },
  ['setImageUrl'](state, imageUrl) {
    state.imageUrl = imageUrl
  },
  ['setRects'](state, rects) {
    state.rects = rects
  },
  ['setSize'](state, size) {
    state.size = size
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

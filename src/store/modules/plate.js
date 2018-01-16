import axios from "axios"

const state = {
  msg:'',
  plates: []
  // imageUrl: "",
  // rects: [],
  // size:{}
}

const actions = {
  recog({
    commit,
    state,
    rootState
  }, imageFile) {
    let serverAddr = rootState.config.serverAddr
    axios.get(serverAddr + '/plates/recog', {
        params: {
          imgFile: imageFile,
        }
      })
      .then(function (res) {
        res = res.data
        console.log('success', res);
        if (res.status != 0) {
          commit('clear')
          commit('setMsg', res.msg)
          return
        }
        commit('setPlates', res.plates)
        commit('setMsg', '')
      })
      .catch(function (error) {
        console.log('vuex detector axios except', error)
        commit('clear')
        commit('setMsg', '网络异常, 请稍后再试')
      });
  }
}

const mutations = {
  ['clear'](state){
    state.msg = ''
    state.plates = []
  },
  ['setMsg'](state, msg) {
    state.msg = msg
  },
  ['setPlates'](state, plates) {
    state.plates = plates
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

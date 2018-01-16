import axios from "axios"

const state = {
  loading: false,
  distance: 0,
  msg: "",
  time: "",
  size1: {},
  rect1: [],
  size2: {},
  rect2: [],
  imgFile1: '',
  imgFile2: ''
}

const actions = {
  onImgFile1({
    commit, state
  }, imgFile) {
    commit('clear')
    commit('setSizeRect', { size1: {}, rect1: [], size2: state.size2, rect2: state.rect2 })
    commit('setImgFile1', imgFile)
  },
  onImgFile2({
    commit, state
  }, imgFile) {
    // console.log('onImgFile2')
    commit('clear')
    commit('setSizeRect', { size1: state.size1, rect1: state.rect1, size2: {}, rect2: [] })
    commit('setImgFile2', imgFile)
  },
  compare({
    commit,
    state,
    rootState
  }) {
    console.log('compare', state.imgFile1, state.imgFile2)
    if (state.imgFile1 == '' || state.imgFile2 == '') {
      commit('setMsg', '请先上传两张图片再进行比对')
      return
    }
    commit('clear')
    commit('setLoading', true)

    axios.get(rootState.config.serverAddr + '/faces/compare', {
      params: {
        imgFile1: state.imgFile1,
        imgFile2: state.imgFile2
      }
    })
      .then(function (res) {
        res = res.data
        console.log("vuex comparator compare axios result: ", res);
        commit('setLoading', false)
        if (res.status != 0) {
          commit('clear')
          commit('setMsg', res.msg)
          return
        }
        commit('setDistance', res.distance.toFixed(2))
        commit('setMsg', res.msg)
        commit('setTime', res.time.toFixed(2))
        commit('setSizeRect', {
          size1: res.size1,
          rect1: res.rect1,
          size2: res.size2,
          rect2: res.rect2
        })
      })
      .catch(function (error) {
        console.log('vuex comparator compare axios exception', error)
        commit('clear')
        commit('setMsg', "网络异常, 请稍后再试")
      })
  }
}

const mutations = {
  ['clear'](state) {
    state.distance = 0
    state.msg = ''
    state.time = 0
    state.loading = false
  },
  ['setLoading'](state, loading) {
    state.loading = loading
  },
  ['setMsg'](state, msg) {
    state.msg = msg
  },
  ['setDistance'](state, distance) {
    state.distance = distance
  },
  ['setTime'](state, time) {
    state.time = time
  },
  ['setImgFile1'](state, msgFile1) {
    state.imgFile1 = msgFile1
  },
  ['setImgFile2'](state, msgFile2) {
    state.imgFile2 = msgFile2
  },
  ['setSizeRect'](state, {
    size1,
    rect1,
    size2,
    rect2
  }) {
    // console.log('setSizeRect', size1, rect1, size2, rect2)
    state.size1 = size1
    if(!(rect1 instanceof Array)){
      state.rect1 = [rect1]
    }else{
      state.rect1 = rect1
    }
    
    state.size2 = size2
    if(!(rect2 instanceof Array)){
      state.rect2 = [rect2]
    }else{
      state.rect2 = rect2
    }
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

import axios from "axios"

const state = {
  faceUploadUrl: '/faces/upload'
}

const getters = {
  faceUploadAction: (state, getters, rootState) => {
    return rootState.config.serverAddr + state.faceUploadUrl
  }
}

export default {
  namespaced: true,
  state,
  getters
}

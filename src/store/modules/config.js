const state = {
  serverAddr: ((process.env.NODE_ENV === 'production') ? '' : 'http://127.0.0.1:8100')
}

export default {
  namespaced: true,
  state
}

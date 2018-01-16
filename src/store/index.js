import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config'
import uploader from './modules/uploader'
import detector from './modules/detector'
import comparator from './modules/comparator'
import plate from './modules/plate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        config,
        uploader,
        detector,
        comparator,
        plate
    },
    strict: process.env.NODE_ENV !== 'production'
})
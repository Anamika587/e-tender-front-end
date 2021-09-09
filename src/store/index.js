import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFileUploaded : false,
    fileUploaded :  null
  },
  mutations: {
    setFileUpload(state) {
      state.isFileUploaded = true
    },
    uploadedFile(state, uploadedfile) {
      state.fileUploaded = uploadedfile
      console.log("[state] file changed");
    },
    setIsFileUpload(state) {
      state.isFileUploaded = false
    }
  },
  actions: {
  },
  modules: {
  }
})

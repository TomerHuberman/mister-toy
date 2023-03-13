import { toyStore } from './toy.store.js'
import { createStore } from 'vuex'

const store = createStore({
  strict: true,
  modules: {
    toyStore,
  },
})

export default store
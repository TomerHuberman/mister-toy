import { toyService } from '../services/toy.service.js'

export const toyStore = {
  state: {
    toys: [],
    labels: [
      'On wheels', 'Box game', 'Art',
      'Baby', 'Doll', 'Puzzle',
      'Outdoor', 'Battery Powered'
    ]
  },
  getters: {
    toysToDisplay({ toys }) {
      if (!toys) return null
      return toys
    },
    labels({ labels }) {
      if (!labels) return null
      return labels
    },
    labelsOps({ labels }) {
      if (!labels) return null
      return labels.map(label => { return { label, value: label } })
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    // setCurrTodo(state, { todo }) {
    //   state.currTodo = todo
    // },
    addToy(state, { toy }) {
      state.toys.unshift(toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(t => t._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId)
      state.toys.splice(idx, 1)
    },
  },
  actions: {
    async loadToys({ commit }, { filterBy }) {
      try {
        const toys = await toyService.query(filterBy)
        commit({ type: 'setToys', toys })
      } catch (err) {
        throw new Error('failed to load toys')
      }
    },
    async saveToy({ commit }, { toy }) {
      const actionType = toy._id ? 'updateToy' : 'addToy'
      try {
        const savedToy = await toyService.save(toy)
        commit({ type: actionType, toy: savedToy })
        return savedToy
      } catch (err) {
        throw new Error('failed to save/update toy')
      }
    },
    async removeToy({ commit }, payload) {
      try {
        await toyService.remove(payload.toyId)
        return commit(payload)
      } catch (err) {
        throw new Error('failed to remove toy')
      }
    },
  },
}

import { toyService } from '../services/toy.service.js'

export const toyStore = {
  state: {
    toys: null,
    filterBy: {
      txt: '',
      maxPrice: null,
      inStock: null,
    },
    sortBy: {
      by: '',
      desc: 1,
    },
  },
  getters: {
    toysToDisplay({ filterBy, toys }) {
      if (!toys) return null

      console.log("filterBy: ", filterBy);
      const { maxPrice, txt, inStock } = filterBy
      let filteredToys = toys

      const regex = new RegExp(txt, 'i')
      filteredToys = filteredToys.filter(toy => regex.test(toy.name))

      if (maxPrice) {
        filteredToys = filteredToys.filter(toy => toy.price < maxPrice)
      }
      if (inStock) {
        filteredToys = filteredToys.filter(toy => toy.inStock)
      }

      // const startIdx = pageIdx * pageSize
      // filteredTodos = filteredTodos.slice(startIdx, startIdx + pageSize)

      return filteredToys
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
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
  },
  actions: {
    loadToys(context) {
      toyService
        .query()
        .then(toys => {
          context.commit({ type: 'setToys', toys })
        })
        .catch(err => {
          throw err
        })
    },
    saveToy({ commit }, { toy }) {
      const actionType = toy._id ? 'updateToy' : 'addToy'
      return toyService.save(toy).then(savedToy => {
        commit({ type: actionType, toy: savedToy })
        return savedToy
      })
    },
    removeToy({ commit }, payload) {

      return toyService.remove(payload.toyId).then(() => {
        commit(payload) // {type: 'removeTodo', todoId}
      })
    },
    //   getById({ commit }, { todoId }) {
    //     return todoService.getById(todoId).then(todo => {
    //       commit({ type: 'setCurrTodo', todo })
    //       return todo
    //     })
    //   },
    // },
    // loadTodos({ commit }, { filterBy }) {
    //   todoService
    //     .query(filterBy)
    //     .then(todos => commit({ type: 'setTodos', todos }))
    //     .catch(err => {
    //       throw err
    //     })
  },
}

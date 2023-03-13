<script>
import ToyList from "../components/ToyList.vue"
import ToyFilter from "../components/ToyFilter.vue"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export default {
  name: 'toyIndex',
  data() {
    return {
      filterBy: {
        txt: '',
        maxPrice: null,
        inStock: null,
      },
      sortBy: {
        by: '',
        desc: 1,
      },
    }
  },
  created() {
  },
  methods: {
    removeToy(toyId) {
      this.$store
        .dispatch({ type: 'removeToy', toyId })
        .then(() => {
          showSuccessMsg('Toy removed')
        })
        .catch(err => {
          showErrorMsg('Cannot remove Toy')
        })
    },
    setFilterByTxt(txt) {
      this.filterBy.txt = txt
      this.filterTodos()
    },
    setFilterByPrice(price) {
      this.filterBy.maxPrice = price
      this.filterTodos()
    },
    setFilterByInStock(inStock) {
      this.filterBy.inStock = inStock
      this.filterTodos()
    },
    filterTodos() {
      const filterBy = { ...this.filterBy }
      this.$store.commit({ type: 'setFilterBy', filterBy })

      // If filtering in backend/service
      // this.isLoading = true
      // this.$store
      //   .dispatch({ type: 'loadTodos', filterBy })
      //   .then(() => (this.isLoading = false))
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay
    },
  },
  components: {
    ToyList,
    ToyFilter
  },
}
</script>



<template>
  <div class="toy-index">
    <h1>This is ToyIndex</h1>
    <ToyFilter 
    @filteredTxt="setFilterByTxt"
    @filteredPrice="setFilterByPrice"
    @filteredInStock="setFilterByInStock"
     />
    <RouterLink class="btn btn-add" to="/toy/edit">Add a toy</RouterLink>
    <ToyList :toys="toys" @remove="removeToy" />
    <!-- <pre>{{ toys }}</pre> -->
  </div>
</template>



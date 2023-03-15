<script>
import ToyList from "../components/ToyList.vue"
import ToyFilter from "../components/ToyFilter.vue"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export default {
  name: 'toyIndex',
  data() {
    return {
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
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy })
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
  <section class="toy-index">
    <header>
      <h1>Toy Store</h1>
      <ToyFilter @setFilter="setFilter" />
      <RouterLink class="btn btn-add" to="/toy/edit">Add a toy</RouterLink>
    </header>
    <ToyList :toys="toys" @remove="removeToy" />
  </section>
</template>



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
    async removeToy(toyId) {
      try {
        await this.$store.dispatch({ type: 'removeToy', toyId })
        showSuccessMsg('Toy removed')
      } catch (err) {
        showErrorMsg('Cannot remove Toy')
      }
  },
  setFilter(filterBy) {
    this.$store.dispatch({ type: 'loadToys', filterBy })
  },
  filterTodos() {
    const filterBy = { ...this.filterBy }
    this.$store.commit({ type: 'setFilterBy', filterBy })
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



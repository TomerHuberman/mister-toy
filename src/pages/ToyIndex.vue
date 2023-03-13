<script>
import ToyList from "../components/ToyList.vue"
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
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay
    },
  },
  components: {
    ToyList,
  },
}
</script>



<template>
  <div class="toy-index">
    <h1>This is ToyIndex</h1>
    <RouterLink class="btn btn-add" to="/toy/edit">Add a toy</RouterLink>
    <ToyList :toys="toys" @remove="removeToy" />
    <!-- <pre>{{ toys }}</pre> -->
  </div>
</template>



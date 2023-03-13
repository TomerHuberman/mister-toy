
<script>
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
  data() {
    return {
      toy: null,
    }
  },
  watch: {
    '$route.params': {
      handler() {
        const { toyId } = this.$route.params
        if (toyId) {
          toyService.getById(toyId).then(toy => (this.toy = toy))
        } else {
          this.toy = toyService.getEmptyToy()
        }
      },
      immediate: true,
    },
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: 'saveToy', toy: this.toy })
        .then(toy => {
          showSuccessMsg('Added/Updated succssefully')
          this.$router.push('/toy')
        })
        .catch(err => {
          showErrorMsg("Couldn't add/update toy")
        })
    },
  },
  computed: {
  }
}
</script>

<template>
  <section v-if="toy" class="toy-edit flex justify-center align-center">
    <form @submit.prevent="saveToy" class="flex space-between align-center">
      <input placeholder="name of the toy" v-model="toy.name" type="text">
      <input placeholder="price of the toy" v-model="toy.price" type="number">
      <button class="btn">Save</button>
    </form>
  </section>
</template>



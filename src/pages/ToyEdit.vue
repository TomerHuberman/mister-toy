
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
      async handler() {
        const { toyId } = this.$route.params
        if (toyId) {
          try {
            const toy = await toyService.getById(toyId)
            this.toy = toy
          } catch (err) {
            console.log('failed to get toy')
          }
        } else {
          this.toy = toyService.getEmptyToy()
        }
      },
      immediate: true,
    },
  },
  methods: {
    async saveToy() {
      try {
        const toy = await this.$store.dispatch({ type: 'saveToy', toy: this.toy })
        showSuccessMsg(`Added/Updated ${toy.name} succssefully`)
        this.$router.push('/toy')
      } catch (err) {
        showErrorMsg("Couldn't add/update toy")
      }
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



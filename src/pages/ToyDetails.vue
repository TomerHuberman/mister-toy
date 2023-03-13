<script>
import { toyService } from '../services/toy.service.js'

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
        toyService.getById(toyId).then(toy => (this.toy = toy))
      },
      immediate: true,
    },
  },
  computed: {
    labels() {
      return this.toy.labels.join(',')
    },
    timeToDisplay(){
      return new Date(this.toy.createdAt).toLocaleDateString()
    }
  }
}
</script>

<template>
  <div class="toy-details">
    <h1>This is ToyDetails</h1>
    <section v-if="toy" class="toy-details flex flex-column align-center justify-center">
      <p>Name: {{ toy.name }}</p>
      <p>Price: {{ toy.price }}</p>
      <p>Labels: {{ labels }}</p>
      <p>Added at: {{ timeToDisplay }}</p>
      <p>Available: {{ toy.inStock ? 'Yes' : 'No' }}</p>
    </section>
  </div>
</template>



<script>
import { RouterLink, RouterView } from 'vue-router'
import UserMessage from './components/UserMessage.vue'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  components: {
    UserMessage,
  },
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/toy">index</RouterLink>
      <RouterLink to="/toy/edit">Edit</RouterLink>
      <RouterLink to="/toy/details/djalsk">Details</RouterLink>
    </nav>
  </header>
  <UserMessage />
  <RouterView />
</template>

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
  <header class="main-header">
    <div class="logo"></div>
    <nav>
      <RouterLink activeClass="link-active" to="/">Home</RouterLink>
      <RouterLink activeClass="link-active" to="/toy">Toy store</RouterLink>
      <RouterLink activeClass="link-active" to="/dash">Dashboard</RouterLink>
      <RouterLink activeClass="link-active" to="/about">About</RouterLink>
    </nav>
  </header>
  <UserMessage />
  <RouterView />
</template>

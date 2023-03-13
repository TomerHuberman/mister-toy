<script>


export default {
  props: {
    toy: {
      type: Object,
    }
  },
}
</script>



<template>
  <li class="toy-preview">
    <h1>{{ toy.name }}</h1>
    <h3>{{ toy.price }}</h3>

    <div class="tools flex">
      <button @click="$emit('remove')" class="btn">
        <span>x</span>
      </button>
      <RouterLink
        :to="'/toy/edit/' + toy._id"
        class="btn">
        <span>Edit</span>
      </RouterLink>
      <RouterLink
        :to="'/toy/details/' + toy._id"
        class="btn">
        <span>Details</span>
      </RouterLink>
    </div>
  </li>
</template>



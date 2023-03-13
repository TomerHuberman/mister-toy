<script>

export default {
  data() {
    return {
      filterBy: {
        txt: '',
        maxPrice: null,
        inStock: null,
        labels: []
      },
      sortBy: {
        by: '',
        desc: 1,
      },
    }
  },
  methods: {
    setFilterTxt() {
      this.$emit('filteredTxt', this.filterBy.txt)
    },
    setFilterPrice() {
      this.$emit('filteredPrice', this.filterBy.maxPrice)
    },
    setFilterInStock() {
      this.$emit('filteredInStock', this.filterBy.inStock)
    },
  },
}
</script>



<template>
  <section class="toy-filter flex space-between">
    <input class="input" v-model="filterBy.txt" @input="setFilterTxt" type="text" placeholder="Search toy..">
    <span>{{ filterBy.maxPrice }}
    <input step="11" min="0" max="1001" :title="filterBy.maxPrice" v-model="filterBy.maxPrice" @change="setFilterPrice" type="range">
    <label for="isInStock">Only in stock</label>
    <input id="isInStock" v-model="filterBy.inStock" @change="setFilterInStock" type="checkbox">
    </span>
  </section>
</template>



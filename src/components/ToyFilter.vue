<script>


export default {
  data() {
    return {
      filterBy: {
        name: '',
        maxPrice: null,
        inStock: false,
        labels: [],
        sortBy: {
          by: '',
          desc: 1,
        }
      },
      options: []
    }
  },
  created() {
    this.options = this.labelsOps
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', { ...this.filterBy })
    },
  },
  computed: {
    labelsOps() {
      return this.$store.getters.labelsOps
    }
  },

}
</script>



<template>
  <section class="toy-filter flex space-between">
    <input class="input" v-model="filterBy.name" @input="setFilter" type="text" placeholder="Search toy..">
    <span>Max price: {{ filterBy.maxPrice }}
      <input min="0" max="300" :title="filterBy.maxPrice" v-model="filterBy.maxPrice" @change="setFilter"
        type="range">
    </span>
    <div class="m-4">
      <p>filter by Tags</p>
      <el-select @change="setFilter" v-model="filterBy.labels" multiple collapse-tags placeholder="Select" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <label>Only in stock
      <input v-model="filterBy.inStock" @change="setFilter" type="checkbox">
    </label>
  </section>
</template>



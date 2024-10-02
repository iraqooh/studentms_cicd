<template>
  <div class="container text-center w-md-75 w-100 d-flex justify-content-center">
    <div class="input-group my-4 w-75">
      <input type="text" class="form-control w-25 border-primary" placeholder="Search for a student"
        v-model="searchQuery" @input="emitSearch" @keypress.enter="emitSearch"/>
      <select class="form-select input-group-prepend border-primary" 
        v-model="filter">
        <option value="first_name" selected>First Name</option>
        <option value="last_name">Last Name</option>
        <option value="gender">Gender</option>
        <option value="physical_address">Physical Address</option>
        <option value="category">Category</option>
        <option value="id">Student ID</option>
        <option value="status">Registration Status</option>
      </select>
      <button class="btn btn-dark text-light" type="button" @click="emitSearch">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      searchQuery: '',
      filter: 'first_name'
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', { filter: this.filter, searchQuery: this.searchQuery });
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
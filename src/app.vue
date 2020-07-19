<template>
  <div class="container-fluid">
    <main>
        <date-ranged-picker>
        </date-ranged-picker>
        <archiver-container  v-bind:emails="emails"></archiver-container>
        <!-- <date-range-picker compact="true"></date-range-picker> -->
    </main>
  </div>
</template>

<script>
  import data from './data/mail.json'
  import archiverContainer from './components/archiverContainer.vue'
  import dateRangePicker from './components/dateRangePicker.vue'
  import dateRangedPicker from './components/dateRangedPicker.vue'
  
  export default {
    name: "app",
    replace: false,
  	data() {
      return data;
    },
    components: {
      archiverContainer,
      dateRangePicker,
      dateRangedPicker
    }
  }
</script>

<style scoped>
  main {
    width: 100%;
    height: 100%;
    padding: 3rem 4rem;
    box-sizing: border-box;
    background-color:red;
  }
</style>
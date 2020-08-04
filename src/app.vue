<template>
  <div class='container-fluid'>
    <main>
        <div class='spacing'>
          <date-range-picker @on-select-date="onSelectDate" />
        </div>
        <archiver-container  v-bind:emails="emails" />
    </main>
  </div>
</template>

<script>
  import archiverContainer from './components/archiverContainer.vue';
  import dateRangePicker from './components/dateRangePicker/dateRangePicker.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'App',
    replace: false,
    computed: mapGetters('emails', {
        emails: 'computedEmails'
    }),
    components: {
      archiverContainer,
      dateRangePicker
    },
    methods: mapActions('emails', [
      'onSelectDate',
      'removeSelection'
    ]),
    watch: {
      emails() {
        if(this.emails.length === 0) {
          this.removeSelection();
        }
      }
    }
  }
</script>

<style scoped>

  main {
    width: 100%;
    height: 100%;
    padding: 3rem 0;
    box-sizing: border-box;
  }

  main > .spacing {
    margin-left: 1em;
    margin-right: 1em;
    padding-bottom: 30px;
  }

  @media (min-width: 992px) {
      main {
          padding: 3rem 4rem;
      }
      main > .spacing {
        margin-left: 0;
        margin-right: 0;
      }
  }
</style>
<template>
    <div class="archiver-container">
        <splitpanes  v-bind:class="[
            selectedMail ? 'show-first-pane-sm': 'show-last-pane-sm hide-md',
            'default-theme'
            ]">
            <pane size="30" min-size="20">
                <email-count v-bind:email-length="emails.length" />
                <email-list 
                    v-if="emails.length"
                    v-bind:class="[selectedMail ? '': 'hide-md']" v-bind:emails="emails" />
            </pane>
            <pane size="65" min-size="20" v-if="selectedMail">
                <email v-bind:email="selectedMail"></email>        
            </pane>
        </splitpanes>
        <div v-if="!selectedMail" class="show-md">
            <email-count v-bind:email-length="emails.length" />
            <email-table v-if="emails.length" v-bind:emails='emails' />
        </div>
    </div>
</template>

<script>
    import emailTable from './email/emailTable.vue';
    import emailList from './email/emailList.vue';
    import email from './email/email.vue';
    import emailCount from './email/emailCount.vue';
    import { Splitpanes, Pane } from 'splitpanes';
    import { mapState } from 'vuex';
    
    export default {
        name: 'archiverContainer',
        props: {
            emails: {
                type: Array,
                default: []
            }
        },
        components: {
            emailTable,
            emailList,
            email,
            emailCount,
            Splitpanes,
            Pane
        },
        computed: mapState('emails', [
            'selectedMail'
        ])
    }
</script>

<style scoped>
    .archiver-container {
        height: calc(100% - 70px);
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        z-index: 0;
    }

    .show-md {
        display: none;
    }

    .show-sm {
        display: none;
    }

    @media(min-width: 576px) {
        .show-sm {
            display: inline-block;
        }
    }

    @media (min-width: 992px) {

        .show-md {
            display: block;
        }

        .hide-md {
            display: none;
        }
    }
</style>
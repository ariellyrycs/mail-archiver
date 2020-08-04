<template>
    <div class="mail-table-container">
        <ul class="list-header">
            <li>
                <sorting-factor-cell
                    v-bind:label="'From'"
                    v-bind:sorting-factor="'from'"
                />
            </li><li>
                <span>|</span>
                <sorting-factor-cell
                    v-bind:label="'To'"
                    v-bind:sorting-factor="'to'"
                />
            </li><li>
                <span>|</span>
                <sorting-factor-cell
                    v-bind:label="'Subject'"
                    v-bind:sorting-factor="'subject'"
                />
            </li><li>
                <span>|</span>
                <sorting-factor-cell
                    v-bind:label="'Date'"
                    v-bind:sorting-factor="'date'"
                />
            </li>
        </ul>
        <ul class="body-rows">
            <li class="list-row" v-bind:key="email.id" v-for="email in emails">
                <email-list-cell v-bind:email="email" v-bind:starting-date-from="startingDateFrom" />
            </li>
        </ul>
    </div>
</template>

<script>
    import emailListCell from './emailListCell.vue';
    import mailContentMixin from '../../assets/scripts/mixins/mailContentMixin.js'
    export default {
        name: 'emailList',
        mixins: [mailContentMixin],
        components: {
            emailListCell
        }
    }
</script>

<style scoped>
    .mail-table-container {
        height: 100%;
    }

    ul {
        margin: 0;
    }
    
    .list-header {
        background-color: #F5F5F5;
        padding: 10px;
        border-width: 1px 0;
        border-style: solid;
        border-color: #DEDEDE;
        color: #666;
    }

    .list-header li {
        display: inline-block;
    }

    .list-header a {
        padding: 0 10px;
    }

    .body-rows {
        height: calc(100% - 85px);
        width: 100%;
        overflow-y: scroll;
    }
</style>
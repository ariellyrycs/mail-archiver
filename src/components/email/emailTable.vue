<template>
    <div class="mail-table-container">
        <table>
            <thead>
                <tr>
                    <th>
                        <sorting-factor-cell
                            v-bind:label="'From'"
                            v-bind:sorting-factor="'from'"
                        />
                    </th>
                    <th>
                        <sorting-factor-cell
                            v-bind:label="'To'"
                            v-bind:sorting-factor="'to'"
                        />
                    </th>
                    <th>
                        <sorting-factor-cell
                            v-bind:label="'Subject'"
                            v-bind:sorting-factor="'subject'"
                        />
                    </th>
                    <th>
                        <sorting-factor-cell
                            v-bind:label="'Date'"
                            v-bind:sorting-factor="'date'"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    is="email-table-row"
                    v-bind:key="email.id"
                    v-bind:email="email"
                    v-for="email in emails"
                    v-bind:starting-date-from="startingDateFrom">
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import emailTableRow from './emailTableRow.vue';
    import mailContentMixin from '../../assets/scripts/mixins/mailContentMixin.js'
    export default {
        name: 'emailTable',
        mixins: [mailContentMixin],
        components: {
            emailTableRow
        }
    }
</script>

<style scoped>
    .mail-table-container {
        height: calc(100% - 38px);
        overflow: auto;
    }

    table {
        text-align: left;
        border-collapse: collapse;
        line-height: 40px;
        border-width: 1px 0px;
        border-style: solid;
        border-color: #DEDEDE;
        width: 100%;
    }

    .body-rows {
        position: absolute;
        height: calc(100% - 200px);
        width: 100%;
        overflow-y: scroll;
    }

    thead {
        background-color: #F5F5F5;
    }

    tr {
        border-top: 1px solid #DEDEDE;
    }

    th {
        padding: 0 10px;
        background-color: #F5F5F5;
        z-index: 1;
        box-shadow: 1px 0px 0px 1px #DEDEDE;
        position: sticky;
        top: 0;
    }
</style>

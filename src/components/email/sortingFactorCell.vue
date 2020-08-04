<template>
    <a href="#"
        @click.prevent='sortingAction'
        v-bind:class="[currentSortingFactor === sortingFactor ? 'show': '',
            sortDesc[sortingFactor] ? '': 'reverse']"
        v-bind:data-sorting-factor="sortingFactor"
    >{{label}}</a>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'sortingFactorCell',
        props: {
            label: {
                type: String,
                default: ''
            },
            sortingFactor: {
                type: String,
                default: ''
            }
        },
        computed: mapState('emails', [
            'sortDesc',
            'currentSortingFactor'
        ]),
        methods: mapActions('emails', [
            'sortingAction'
        ])
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #666;
        font-weight: bold;
        font-size: 0.8rem; 
    }
    
    a.show:after {
        content: url('../../assets/imgs/icon_arrow01.svg');
        height: 10px;
        width: 10px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        line-height: 14px;
        padding-bottom: 6px;
    }

    a.show.reverse:after {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg); 
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }
</style>
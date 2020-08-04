import sortingFactorCell from '../../../components/email/sortingFactorCell.vue';

export default {
    props: {
        emails: {
            type: Array,
            default: []
        },
        startingDateFrom: {
            type: Date,
            default: () => new Date()
        }
    },
    components: {
        sortingFactorCell
    }
};
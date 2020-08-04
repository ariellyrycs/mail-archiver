export default {
    props: {
        email: {
            attachments: {
                type: Array,
                default: []
            },
            replies: {
                type: Array,
                default: []
            }
        }
    },
    computed: {
        toFormat() {
            return this.email.headers.to.commaSeparatedFormat();
        },
        ccFormat() {
            return this.email.headers.cc.commaSeparatedFormat();
        }
    }
};
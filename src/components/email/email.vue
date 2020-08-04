<template>
    <div class="email">
        <email-nav-control />
        <div class="divider"></div>
        <div class="details">
            <div class="float-right-last-child">
                <span>From:</span>
                <span>{{email.headers.from}}</span>
                <span class="sent-date">{{dateFormat}}</span>
            </div>
            <div><span>To:</span><span>{{toFormat}}</span></div>
            <div><span>CC:</span><span>{{ccFormat}}</span></div>
            <div><span>Subject:</span><span>{{email.headers.subject}}</span></div>
        </div>
        <div class="divider"></div>
        <iframe class="mail-container" ref="emailContent" @load="loadIframe"></iframe>
    </div>
</template>

<script>
    import emailDateFormatMixin from '../../assets/scripts/mixins/emailDateFormatMixin.js';
    import headersMixin from '../../assets/scripts/mixins/headersMixin.js';
    import emailBoilerplate from '../../assets/scripts/emailBoilerplate.js'
    import emailNavControl from './emailNavControl';

    let loadEmailIntoIFrame = (emailIFrame, email) => {
        let contentDocument = emailIFrame.contentDocument || emailIFrame.contentWindow;
        contentDocument.querySelector('html').innerHTML = emailBoilerplate.generateDefaultTemplate(email);
    };

    export default {
        name: 'email',
        props: {
            email: {
                headers: {
                    from: {
                        type: String,
                        default: ''
                    },
                    to: {
                        type: Array,
                        default: []
                    },
                    subject: {
                        type: String,
                        default: ''
                    },
                    sentDate: {
                        type: String,
                        default: () => new Date()
                    },
                    cc: {
                        type: Array,
                        default: []
                    }
                }
            }
        },
        mixins: [
            emailDateFormatMixin,
            headersMixin
        ],
        components: {
            emailNavControl
        },
        props: {
            email: {
                headers: {
                    type: Object,
                    default: {}    
                },
                content: {
                    type: String,
                    default: ''
                }
            }
        },
        watch: {
            email() {
                this.loadIframe();
            }
        },
        methods: {
            loadIframe: function () {
                loadEmailIntoIFrame(this.$refs.emailContent, this.email);
            }
        }
    };

</script>

<style scoped>
    .email {
        height: 100%;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .details {
        padding: 10px 0;
    }

    .details > div {
        margin: 2px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .details span:first-child {
        font-weight: bold;
        margin-right: 10px;
    }

    .divider {
        border-bottom: 1px solid #D3D3D3;
        margin: 2px 0;
    }

    .sent-date {
        float: right;
        font-style: italic;
    }

    iframe {
        width: 100%;
        border: none;
        height: calc(100% - 118px);
    }

    .float-right-last-child {
        position: relative;
        padding-right: 6rem;
    }

    .float-right-last-child > span:last-child {
        position: absolute;
        right: 0;
        margin-right: 0.5rem;
    }
</style>
<template>
    <div class="mail-list-cell" @click="selectEmail(email)">
        <img src="../../assets/imgs/mail.svg" class="mail-icon" />
        <div class="small-font text-overflow">
            <span class="bold">{{email.headers.from}}</span>
            <div class="text-overflow">
                <span>{{toFormat}}</span>
            </div>
        </div>
        <div class="subject">
            {{email.headers.subject}}
        </div>
        <div class="dock-right">
            <span class="small-font">{{dateFormat}} <img src="../../assets/imgs/arrow2.svg" class="right-arrow"></span>
            <reply-count-box v-bind:replies="email.replies.length"></reply-count-box>
            <a href="#" v-if="email.attachments.length"><img src="../../assets/imgs/clip.svg" /></a>
        </div>
    </div>
</template>

<script>
    import emailDateFormatMixin from '../../assets/scripts/mixins/emailDateFormatMixin.js';
    import headersMixin from '../../assets/scripts/mixins/headersMixin.js';
    import replyCountBox from './replyCountBox.vue';

    export default {
        name: 'emailListCell',
        mixins: [
            emailDateFormatMixin,
            headersMixin
        ],
        components: {
            replyCountBox
        }
    }
</script>


<style scoped>
    .mail-list-cell {
        padding: 0.8rem 1.6rem 0.8rem 1rem;
        border-bottom: 1px solid #DEDEDE;
        position: relative;
        font-size: 0.75rem;
        background-color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
    }

    .mail-list-cell:hover {
        color: #0033DD;
    }

    .text-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mail-list-cell > div:first-of-type {
        padding: 0 1.8rem 0.5rem 1.2rem;
        height: 30px;
        line-height: 1rem;
    }

    .mail-list-cell > .dock-right {
        position: absolute;
        right: 0.6rem;
        top: 0.8rem;
        line-height: 1rem;

    }

    .dock-right a {
        height: 19px;
        width: 15px;
        float: right;
        margin-top: 5px;
    }

    .mail-icon {
        position: absolute;
        height: 1.5rem;
        padding-top: 0.2rem;
    }

    .small-font {
        font-size: 0.7rem;
    }

    .right-arrow {
        width: 3px;
        vertical-align: middle;
    }

    .bold {
        font-weight: bold;
    }
</style>
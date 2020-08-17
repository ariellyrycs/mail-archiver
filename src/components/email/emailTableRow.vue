<template>
    <tr v-bind:key="email.id" @click.prevent="selectEmail(email)">
        <td>{{email.headers.from}}</td>
        <td>{{toFormat}}
            <div class="dock-right">
                <reply-count-box v-bind:replies="email.replies.length" />
            </div>
        </td>
        <td>{{email.headers.subject}}
            <a href="#" class="dock-right" v-if="email.attachments.length"><img src="../../assets/imgs/clip.svg" /></a>
        </td>
        <td class="date">{{dateFormat}}</td>
    </tr>
</template>

<script>
    import emailDateFormatMixin from '../../assets/scripts/mixins/emailDateFormatMixin.js';
    import headersMixin from '../../assets/scripts/mixins/headersMixin.js';
    import replyCountBox from './replyCountBox.vue';

    export default {
        name: 'emailTableRow',
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
    tr {
        background-color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
    }
    
    tr:hover {
        background-color: rgba(245, 248, 250, 0.8);
        color: #0033DD;
    }
    
    td {
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        padding-right: 40px;
        position: relative;
    }

    .dock-right {
        position: absolute;
        right: 10px;
        top: 0;
    }

    img {
        vertical-align: middle;
        display: inline-block;
        height: 15px;
    }
    
    .date {
        font-weight: bold;
        font-size: 0.9rem;
    }
</style>
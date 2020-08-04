<template>
    <div v-bind:class="[replies === 0 ? 'hidden': '', 'replies']">
        <span>+{{replies}}</span>
    </div>
</template>


<script>
    export default {
        name: 'replyCountBox',
        props: {
            replies: {
                type: Number,
                defailt: 0
            }
        }
    }
</script>

<style scoped>

    .hidden {
        visibility: hidden;
    }

    .replies {
        color: white;
        text-align: right;
        font-weight: bold;
    }

    .replies > span {
        width: 36px;
        background-color: #888;
        padding: 1px 3px;
        font-size: 0.65rem;
        border-radius: 3px;
    }
</style>

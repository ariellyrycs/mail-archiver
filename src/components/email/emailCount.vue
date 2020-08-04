<template>
    <div class="count">
        <span>Results: <span class="highlight">{{emailLength}}</span> {{pluralize('email', emailLength)}}</span>
    </div>
</template>

<script>

    export default {
        name: 'emailCount',
        props: {
            emailLength: {
                type: Number,
                default: 0
            }
        },
        methods: {
            pluralize(lebel, n) {
                return `${lebel}${n === 1 ? '': 's'}`;
            }
        }
    };
</script>


<style scoped>
    .highlight {
        font-size: 1.2rem;
    }

    .count {
        margin: 0 1rem;
        padding: 0.5rem 0;
        font-weight: bold;
        color: #666;
        font-size: 0.8rem;
    }

    @media (min-width: 992px) {
        .count {
            margin-left: 0;
            margin-right: 0;
        }
    }
</style>
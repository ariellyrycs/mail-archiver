<template>
    <div>
        <div v-bind:key="mail.id" v-for="mail in emails">
            {{mail.from}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'archiverContainer',
        props: ['emails'],
        data() {
            return {
            }
        },
        components: {
        }
    }
</script>
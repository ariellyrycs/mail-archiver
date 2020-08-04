<template>
    <div class="controls">
        <a href="#" @click.prevent="removeSelection">
            <img src="../../assets/imgs/icon_arrow02.svg" class="back hide-sm" />
        </a>
        <a href="#" @click.prevent="removeSelection" class="float-right show-sm">
            <img src="../../assets/imgs/icon-close.svg" class="close" />
        </a>
    </div>
</template>


<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'emailNavControl',
        methods: mapActions('emails', ['removeSelection'])
    }
</script>


<style scoped>
    .back, .close {
        margin: 0.3rem;
    }

    .close {
        height: 1.2rem;
    }

    .controls {
        height: 1.6rem;
    }

    .back {
        height: 1rem;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg); 
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .show-sm {
        display: none;
    }

    @media(min-width: 576px) {
        .show-sm {
            display: inline-block;
        }
        .hide-sm {
            display: none;
        }
    }
</style>
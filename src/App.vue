<template>
    <div class="app">
        <h1>{{ msg }}</h1>
        <input-component name="poi" id="01"></input-component>
        <input-component name="poi" id="02"></input-component>
        <input-component name="poi" id="03"></input-component>
        <input-component name="poi" id="04"></input-component>
    </div>
</template>

<script>
    import InputComponent from './components/InputComponent.vue';

    export default {
        name: 'app',
        components: {
            'input-component': InputComponent
        },
        data () {
            return {
                msg: 'Equal Encounter'
            }
        }
    }
</script>

<style lang="scss">
    html,
    body {
        padding: 0;
        margin: 0;
    }

    .app {
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        text-align: center;
    }

</style>

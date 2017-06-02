<template>
    <div class="app">
        <h1 class="title">{{ msg }}</h1>
        <div class="input-wrap">
            <select v-model="selected" multiple>
                <option>37.357579, 127.155871</option>
                <option>37.387046, 127.102313</option>
                <option>37.413774, 126.800189</option>
                <option>37.567141, 126.926875</option>
            </select>
        </div>
        <div class="button-wrap">
            <button v-on:click="calculate">계산하기</button>
        </div>
        <div class="panel">
            average : {{ average }}
        </div>
        <div class="panel">
            selected : {{ selected }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            calculate () {
                const data = this.selected;
                alert(data);
            }
        },
        data () {
            return {
                msg: 'Equal Encounter',
                average: '평균값',
                selected: ''
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

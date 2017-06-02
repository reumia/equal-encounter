<template>
    <div class="app">
        <div class="map-canvas">
            <gmap-map :center="center" :zoom="17" style="width: 100%; height: 300px">
                <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position">
                </gmap-marker>
            </gmap-map>
        </div>
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
            <button @click="calculate">계산하기</button>
        </div>
        <div class="panel">
            average : {{ average }}
        </div>
    </div>
</template>

<script>
    import * as VueGoogleMaps from 'vue2-google-maps';
    import Vue from 'vue';

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyClD1Hi1lIAjnmmE_2k83Qwhy-RddcwH0g'
        }
    });

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
                selected: [],
                center: {lat: 37.5662952, lng: 126.9757564},
                markers: [
                    {
                        position: {lat: 37.5662952, lng: 126.9757564}
                    },
                    {
                        position: {lat: 11.0, lng: 11.0}
                    }
                ]
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

    .panel {
        margin: 10px auto;
        padding: 20px;
        max-width: 300px;
        background-color: #f3f3f3;
        text-align: left;
    }
</style>

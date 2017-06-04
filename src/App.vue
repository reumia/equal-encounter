<template>
    <div class="app">
        <div id="map-canvas"></div>
        <h1 class="title">{{ msg }}</h1>
        <div class="panel">

        </div>
    </div>
</template>

<script>
    import GoogleMapsLoader from 'google-maps';

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;

    export default {
        name: 'app',
        methods: {
            initMap () {
                GoogleMapsLoader.KEY = 'AIzaSyClD1Hi1lIAjnmmE_2k83Qwhy-RddcwH0g';
                GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
                GoogleMapsLoader.LANGUAGE = 'ko';
                GoogleMapsLoader.REGION = 'KR';

                GoogleMapsLoader.load((google) => {
                    let options = {
                        zoom: 13,
                        center: this.mapCenter,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    this.map = new google.maps.Map(document.getElementById('map-canvas'), options);
                    this.map.addListener('click', this.clickMap);
                });
            },
            clickMap (event) {
                this.addMarker(event.latLng);

            },
            addMarker (latLng) {
                let markerOptions = {
                    position: {
                        lat: latLng.lat(),
                        lng: latLng.lng()
                    },
                    map: this.map,
                    label: labels[labelIndex ++ % labels.length]
                };
                let marker = new google.maps.Marker(markerOptions);
                this.markers.push(marker);
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.initMap();
            });
        },
        watch:{
            markers: function () {
                console.log(this.markers);
            }
        },
        data () {
            return {
                msg: 'Equal Encounter',
                average: '평균값',
                map: {},
                mapCenter: {lat: 37.5662952, lng: 126.9757564},
                markers: []
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

    #map-canvas {
        width: 100%;
        height: 300px;
    }
</style>

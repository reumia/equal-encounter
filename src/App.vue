<template>
    <div class="app">
        <div id="map-canvas"></div>
        <h1 class="title">{{ msg }}</h1>
    </div>
</template>

<script>
    import GoogleMapsLoader from 'google-maps';
    import _ from 'lodash';

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
                this.addMarker({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });
            },
            addMarker (latLng) {
                let markerOptions, marker;

                markerOptions = {
                    position: latLng,
                    map: this.map,
                    label: labels[labelIndex ++ % labels.length]
                };

                marker = new google.maps.Marker(markerOptions);

                this.markers.push(marker);
                this.markersPositions.push(markerOptions.position);
            },
            getAverageLatLng () {
                let lat, lng;

                lat = _.meanBy(this.markersPositions, (object) => {
                    return object.lat;
                });

                lng = _.meanBy(this.markersPositions, (object) => {
                    return object.lng;
                });

                return {
                    lat: lat,
                    lng: lng
                }
            },
            initAverageMarker () {
                let markerOptions;

                markerOptions = {
                    position: this.getAverageLatLng(),
                    map: this.map,
                    label: 'ㅍ'
                };

                this.averageMarker = new google.maps.Marker(markerOptions);
            },
            removeAverageMarker () {
                if (typeof this.averageMarker.setMap !== 'undefined') {
                    this.averageMarker.setMap(null);
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.initMap();
            });
        },
        watch:{
            markersPositions () {
                if (this.markersPositions.length > 1) {
                    this.removeAverageMarker();
                    this.initAverageMarker();
                }
            }
        },
        data () {
            return {
                msg: 'Equal Encounter',
                map: {},
                mapCenter: {lat: 37.5662952, lng: 126.9757564},
                markers: [],
                markersPositions: [],
                averageMarker: {}
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
        white-space: pre;
        margin: 10px auto;
        padding: 20px;
        background-color: #f3f3f3;
        text-align: left;
    }

    #map-canvas {
        width: 100%;
        height: 300px;
    }
</style>

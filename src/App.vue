<template>
    <div class="app">
        <div class="button-wrap">
            <function-button v-for="(m, index) in markers" :marker="m" :key="index">지도 초기화</function-button>
        </div>
        <info-bar :latLng="averageMarkerPosition"></info-bar>
        <div class="map-wrap">
            <div id="map-canvas"></div>
        </div>
    </div>
</template>

<script>
    import GoogleMapsLoader from 'google-maps';
    import _ from 'lodash';
    import emoji from 'node-emoji';
    import infoBubble from 'js-info-bubble';
    import transparentIcon from './assets/icon-transparent.png';

    import InfoBar from './components/InfoBar.vue';
    import FunctionButton from './components/FunctionButton.vue';

    const messages = ['저요!', '나야나!', '여기야~', '호잇', '뿅'];
    const emojis = emoji.search('man');

    export default {
        name: 'app',
        components: { InfoBar, FunctionButton },
        methods: {
            initCanvas () {
                const canvas = document.getElementById('map-canvas');
                this.canvas = canvas;
            },
            initMap () {
                GoogleMapsLoader.KEY = 'AIzaSyClD1Hi1lIAjnmmE_2k83Qwhy-RddcwH0g';
                GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
                GoogleMapsLoader.LANGUAGE = 'ko';
                GoogleMapsLoader.REGION = 'KR';

                GoogleMapsLoader.load((google) => {
                    let options = {
                        zoom: 13,
                        center: this.mapCenter,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true
                    };

                    this.google = google;
                    this.map = new google.maps.Map(this.canvas, options);
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
                    label: this.getRandomEmoji(),
                    icon: transparentIcon
                };

                marker = new google.maps.Marker(markerOptions);
                marker.message = this.getRandomMessage();

                this.addBubble(marker);

                this.markers.push(marker);
                this.markersPositions.push(markerOptions.position);
            },
            getRandomMessage () {
                return messages[_.random(0, messages.length - 1)];
            },
            getRandomEmoji () {
                let key = emojis[_.random(0, emojis.length - 1)].key;
                return emoji.get(key);
            },
            addBubble (marker) {
                let bubble = new InfoBubble({
                    content: '<div class="bubble">' + marker.message + '</div>',
                    hideCloseButton: true,
                    disableAutoPan: true,
                    disableAnimation: true,
                    shadowStyle: 0,
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 0,
                    arrowStyle: 0,
                    arrowSize: 5,
                    arrowPosition: 50,
                    backgroundColor: 'rgba(255,255,255,.9)',
                    height: false,
                    minWidth: 0
                });

                marker.bubbleText = bubble.content.innerText;

                bubble.open(this.map, marker);
            },
            getAverageLatLng () {
                let lat, lng;

                lat = _.meanBy(this.markersPositions, (object) => { return object.lat; });
                lng = _.meanBy(this.markersPositions, (object) => { return object.lng; });

                this.averageMarkerPosition = {
                    lat: lat,
                    lng: lng
                }
            },
            addAverageMarker () {
                let markerOptions, marker;

                markerOptions = {
                    position: this.averageMarkerPosition,
                    map: this.map
                };

                marker = new google.maps.Marker(markerOptions);
                marker.addListener('click', this.getMoreInformation);

                this.averageMarker = marker;
            },
            removeAverageMarker () {
                if (typeof this.averageMarker.setMap !== 'undefined') {
                    this.averageMarker.setMap(null);
                }
            },
            getMoreInformation () {
                console.log('정보의 홍수~~');
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.initCanvas();
            });
        },
        watch: {
            canvas () {
                this.initMap();
            },
            markersPositions () {
                if (this.markersPositions.length > 1) {
                    this.removeAverageMarker();
                    this.getAverageLatLng();
                    this.addAverageMarker();
                }
            }
        },
        data () {
            return {
                google: {},
                canvas: {},
                map: {},
                mapCenter: {lat: 37.5662952, lng: 126.9757564},
                markers: [],
                markersPositions: [],
                averageMarker: {},
                averageMarkerPosition: {}
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

    .map-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: top 0.3s ease;
        #map-canvas {
            width: 100%;
            height: 100%;
        }
    }
    .button-wrap {
        position: fixed;
        z-index: 10;
        top: 50px;
        left: 10px;
        text-align: left;
    }

    .bubble {
        color: #333;
        font-size: 12px;
        font-weight: bold;
        white-space: nowrap;
    }
</style>

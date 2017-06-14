<template>
    <div class="app">

        <!-- 헤더 -->
        <header class="app-header">
            <nav class="app-nav" :style="{height: infoItemHeight + 'px'}">
                <nav-button @onClick="" align="left">메뉴</nav-button>
                <nav-address :geocoder="geocoder" :marker="averageMarker"></nav-address>
                <nav-button @onClick="showConfirm = true" align="right">새로고침</nav-button>
            </nav>
            <info-list :places="places" :itemHeight="infoItemHeight" :listHeight="infoListHeight"></info-list>
        </header>
        <!-- 헤더 -->

        <!-- 본문 -->
        <section class="app-body" :style="{top: infoListHeight + infoItemHeight + 'px'}">
            <div id="map-canvas"></div>
        </section>
        <!-- 본문 -->

        <!-- 상세 -->
        <aside class="app-aside">
            
        </aside>
        <!-- 상세 -->

        <div class="marker-button-wrap">
            <function-button v-for="(m, index) in markers" :marker="m" :key="index" :hasButton="true">
                <span class="label icon-marker" :style="{ backgroundImage: 'url(' + m.icon.url + ')' }"></span>
                <span class="message">{{ m.message }}</span>
                <a href="#" class="clear-button" @click="clearMarker">&times;</a>
            </function-button>
        </div>

        <!-- 소개 팝업 -->
        <intro-layer v-if="showIntroLayer" @saveDisable="disableIntroLayer"></intro-layer>
        <!-- 소개 팝업 -->

        <!-- 확인 팝업 -->
        <confirm v-if="showConfirm" @onClose="showConfirm = false" @onConfirm="clearMap">
            <div slot="body">입력된 위치를 모두 제거하시겠습니까?</div>
        </confirm>
        <!-- 확인 팝업 -->
    </div>
</template>

<script>
    import _ from 'lodash';
    import GoogleMapsLoader from 'google-maps';
    import infoBubble from 'js-info-bubble';

    import NavAddress from './components/NavAddress.vue';
    import NavButton from './components/NavButton.vue';
    import InfoList from './components/InfoList.vue';
    import FunctionButton from './components/FunctionButton.vue';
    import IntroLayer from './components/introLayer.vue';
    import Confirm from './components/Confirm.vue';
    import { markerIcons, averageMarkerIcon } from './components/Icons';

    const messages = ['영미', '철수', '영희', '혜수', '태인', '지수', '준수', '탁훈', '가람'];

    export default {
        name: 'app',
        components: { NavAddress, NavButton, InfoList, FunctionButton, IntroLayer, Confirm },
        data () {
            return {
                geocoder: {},
                map: {},
                mapCenter: {lat: 37.5662952, lng: 126.9757564},
                markers: [],
                averageMarker: {},
                places: [],
                infoItemHeight: 30,
                infoListHeight: 0,
                showIntroLayer: true,
                showConfirm: false
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.initMap();
            });
        },
        watch: {
            markers () {
                if (this.markers.length > 1) {
                    this.removeAverageMarker();
                    this.getAverageLatLng();
                    this.addAverageMarker();
                    this.getPlaces();
                }
            },
            places () {
                this.getInfoListHeight();
            }
        },
        methods: {
            initMap () {
                let canvas = document.getElementById('map-canvas');

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

                    this.geocoder = new google.maps.Geocoder;
                    this.map = new google.maps.Map(canvas, options);
                    this.map.addListener('click', this.clickMap);
                });
            },
            getRandom (array) {
                return array[_.random(0, array.length - 1)];
            },
            getAverageLatLng () {
                let lat, lng;

                lat = _.meanBy(this.markers, (object) => { return object.position.lat(); });
                lng = _.meanBy(this.markers, (object) => { return object.position.lng(); });

                return {
                    lat: lat,
                    lng: lng
                }
            },
            getPlaces () {
                let request, service;

                request = {
                    location: this.averageMarker.position,
                    radius: '500',
                    types: ['cafe']
                };

                service = new google.maps.places.PlacesService(this.map);
                service.nearbySearch(request, (result, status) => {
                    if (status === 'OK') {
                        this.places = result;
                    }
                });
            },
            getInfoListHeight () {
                let tempHeight = this.places.length * this.infoItemHeight;

                if (tempHeight > 180) tempHeight = 180;

                this.infoListHeight = tempHeight;
            },
            addMarker (latLng) {
                let markerOptions, marker, markerIcon;

                markerIcon = this.getRandom(markerIcons);
                markerIcon = {
                    url: markerIcon.url,
                    size: new google.maps.Size(markerIcon.size.x, markerIcon.size.y),
                    anchor: new google.maps.Point((markerIcon.size.x / 2), markerIcon.size.y),
                    origin: new google.maps.Point(0, 0)
                };

                markerOptions = {
                    position: latLng,
                    map: this.map,
                    icon: markerIcon,
                    zIndex: 1
                };

                marker = new google.maps.Marker(markerOptions);
                marker.message = this.getRandom(messages);

                this.addBubble(marker);

                this.markers.push(marker);
            },
            addBubble (marker) {
                let bubble = new InfoBubble({
                    content: '<div class="bubble">' + marker.message + '</div>',
                    hideCloseButton: true,
                    disableAutoPan: true,
                    disableAnimation: true,
                    shadowStyle: 0,
                    padding: 5,
                    borderRadius: 0,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    arrowStyle: 1,
                    arrowSize: 5,
                    arrowPosition: 70,
                    backgroundColor: '#fff',
                    height: false,
                    minWidth: 0
                });

                marker.bubble = bubble;
                marker.bubbleText = bubble.content.innerText;

                bubble.open(this.map, marker);
            },
            addAverageMarker () {
                let markerOptions, marker, markerIcon;

                markerIcon = {
                    url: averageMarkerIcon.url,
                    size: new google.maps.Size(averageMarkerIcon.size.x, averageMarkerIcon.size.y),
                    anchor: new google.maps.Point((averageMarkerIcon.size.x / 2), averageMarkerIcon.size.y),
                    origin: new google.maps.Point(0, 0)
                };

                markerOptions = {
                    position: this.getAverageLatLng(),
                    map: this.map,
                    icon: markerIcon,
                    zIndex: 1000
                };

                marker = new google.maps.Marker(markerOptions);
                // marker.addListener('click', callback);

                this.averageMarker = marker;
            },
            removeAverageMarker () {
                if (typeof this.averageMarker.setMap !== 'undefined') {
                    this.averageMarker.setMap(null);
                    this.averageMarker = {};
                }
            },
            clickMap (event) {
                this.addMarker({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });
            },
            clearMap () {
                _.each(this.markers, (marker) => {
                    marker.bubble.setMap(null);
                    marker.setMap(null);
                });
                this.markers = [];
                this.places = [];
                this.removeAverageMarker();
                this.showConfirm = false;
            },
            clearMarker () {
                console.log('click');
            },
            disableIntroLayer () {
                // this.showIntroLayer = false;
                console.log('캐시정보 저장');
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
    .app-header {
        overflow: hidden;
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
    }
    .app-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .app-body {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: top 0.2s;
        #map-canvas {
            width: 100%;
            height: 100%;
        }
    }
    .marker-button-wrap {
        overflow: hidden;
        position: fixed;
        z-index: 10;
        bottom: 10px;
        left: 10px;
        text-align: left;
        border-radius: 3px;
        box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
    }
    
    .bubble {
        overflow: hidden;
        color: #333;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
    }
    .icon-marker {
        width: 15px;
        height: 26px;
        background-size: 15px 15px;
        background-repeat: no-repeat;
        background-position: center 5px;
    }
</style>

<template>
    <div class="app" :class="{'with-aside': showAside}">

        <!-- 헤더 -->
        <header class="app-header">
            <nav class="app-nav">
                <nav-button @onClick="showAside = showAside !== true" align="left">메뉴</nav-button>
                <nav-address :geocoder="geocoder" :marker="averageMarker"></nav-address>
                <nav-button @onClick="" align="right">로그인</nav-button>
            </nav>
        </header>

        <!-- 본문 -->
        <section class="app-body">
            <div id="map-canvas"></div>
        </section>

        <!-- 상세 -->
        <aside class="app-aside">
            메뉴
        </aside>

        <!-- 푸터 -->
        <footer class="app-footer">
            <div class="function-panel-wrap">
                <function-panel :class="{active: $store.getters.isMarkersPanelVisible}" :listData="markers"></function-panel>
                <function-panel :class="{active: $store.getters.isPlacesPanelVisible}" :listData="places"></function-panel>
            </div>
            <div class="function-button-wrap">
                <function-button @onClick="$store.dispatch('setVisiblePanel', {name: 'markers'})" :class="{active: $store.getters.isMarkersPanelVisible}" label="사람" :count="markers.length"></function-button>
                <function-button @onClick="$store.dispatch('setVisiblePanel', {name: 'places'})" :class="{active: $store.getters.isPlacesPanelVisible}" label="장소" :count="places.length"></function-button>
                <function-button @onClick="showConfirm = true" label="새로고침"></function-button>
                <function-button @onClick="" label="지도공유"></function-button>
            </div>
        </footer>

        <!-- 소개 팝업 -->
        <intro-layer v-if="showIntroLayer" @saveDisable="disableIntroLayer"></intro-layer>

        <!-- 확인 팝업 -->
        <confirm v-if="showConfirm" @onClose="showConfirm = false" @onConfirm="clearMap">
            <div slot="body">입력된 위치를 모두 제거하시겠습니까?</div>
        </confirm>
    </div>
</template>

<script>
    import _ from 'lodash';
    import GoogleMapsLoader from 'google-maps';
    import infoBubble from 'js-info-bubble';

    import NavAddress from './components/NavAddress.vue';
    import NavButton from './components/NavButton.vue';
    import FunctionPanel from './components/FunctionPanel.vue';
    import FunctionButton from './components/FunctionButton.vue';
    import IntroLayer from './components/introLayer.vue';
    import Confirm from './components/Confirm.vue';
    import { markerIcons, averageMarkerIcon } from './components/Icons';

    const messages = ['영미', '철수', '영희', '혜수', '태인', '지수', '준수', '탁훈', '가람'];

    export default {
        name: 'app',
        components: { NavAddress, NavButton, FunctionPanel, FunctionButton, IntroLayer, Confirm },
        data () {
            return {
                geocoder: {},
                map: {},
                mapCenter: {lat: 37.5662952, lng: 126.9757564},
                averageMarker: {},
                markers: [],
                places: [],
                showIntroLayer: false,
                showConfirm: false,
                showAside: false,
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
                        _.each(result, (item) => {
                            // TODO : 데이터 정리 함수 일원화
                            item.icon = {
                                url: item.icon,
                                size: {
                                    width: 12,
                                    height: 12
                                },
                            };
                            item.text = item.name;
                            item.address = item.vicinity;
                            item.latLng = item.geometry.location;
                        });
                        this.places = result;
                    }
                    else if (status === 'ZERO_RESULTS') this.places = [];
                });
            },
            addMarker (latLng) {
                let marker, markerIcon;

                markerIcon = this.getRandom(markerIcons);
                markerIcon = {
                    url: markerIcon.url,
                    size: new google.maps.Size(markerIcon.size.x, markerIcon.size.y),
                    anchor: new google.maps.Point((markerIcon.size.x / 2), markerIcon.size.y),
                    origin: new google.maps.Point(0, 0)
                };

                marker = new google.maps.Marker({
                    position: latLng,
                    map: this.map,
                    icon: markerIcon,
                    zIndex: 1
                });

                // TODO : 데이터 정리 함수 일원화
                marker.text = this.getRandom(messages);
                marker.latLng = marker.position;

                this.addBubble(marker);
                this.markers.unshift(marker);
            },
            addBubble (marker) {
                let bubble = new InfoBubble({
                    content: '<div class="bubble">' + marker.text + '</div>',
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
                let marker, markerIcon;

                markerIcon = {
                    url: averageMarkerIcon.url,
                    size: new google.maps.Size(averageMarkerIcon.size.x, averageMarkerIcon.size.y),
                    anchor: new google.maps.Point((averageMarkerIcon.size.x / 2), averageMarkerIcon.size.y),
                    origin: new google.maps.Point(0, 0)
                };

                marker = new google.maps.Marker({
                    position: this.getAverageLatLng(),
                    map: this.map,
                    icon: markerIcon,
                    zIndex: 1000
                });

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
                // TODO : 레이어 없애고, 캐시에 관련 데이터 기억
                this.showIntroLayer = false;
            },
            toggleList (type) {
//                if ( this.$store.state.showPanel.items[type] === true ) {
//                } else {
//                    _.each(this.$store.state.showPanel.items, (value, key) => {
//                        this.$store.state.showPanel.items[key] = key === type;
//                    });
//                }
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
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        text-align: center;
    }
    .app-header {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background-color: tomato;
        box-shadow: 0 1px 4px rgba(0,0,0,.2);
        transition: transform 0.2s;
    }
    .app-body {
        box-sizing: border-box;
        padding: 40px 0 200px;
        width: 100%;
        height: 100%;
        transition: padding 0.2s, transform 0.2s;
        #map-canvas {
            width: 100%;
            height: 100%;
        }
    }
    .app-footer {
        overflow: hidden;
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -2px 8px rgba(0,0,0,.2);
        transition: transform 0.2s;
    }
    .app-aside {
        position: fixed;
        top: 40px;
        bottom: 0;
        left: 0;
        width: 200px;
        transform: translateX(-200px);
        transition: transform 0.2s;
    }
    .with-aside {
        .app-footer,
        .app-body {
            transform: translateX(200px);
        }
        .app-aside {
            transform: translateX(0);
        }
    }
    .app-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
    }
    .function-panel-wrap {
        position:relative;
        margin-left: 80px;
        height: 200px;
        transition: height 0.2s;
        &.active {

        }
    }
    .function-button-wrap {
        overflow: hidden;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 80px;
        background: #f9f9f9;
    }
    .bubble {
        overflow: hidden;
        color: #333;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
    }
</style>

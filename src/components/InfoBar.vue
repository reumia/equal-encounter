<template>
    <a href="#" class="info-bar" :class="{active: isActive}" :style="{height: height + 'px', lineHeight: height + 'px'}">
        {{ address }}
    </a>
</template>

<script>
    export default {
        name: 'info-bar',
        props: ['latLng', 'height'],
        watch: {
            latLng () {
                this.getAverageAddress();
            }
        },
        data () {
            return {
                address: '지도를 클릭해서 위치를 추가하세요.',
                isActive: false
            }
        },
        methods: {
            getAverageAddress () {
                let geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location': this.latLng}, (results, status) => {
                    if (status === "OK") {
                        this.address = results[0].formatted_address;
                        this.isActive = true;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-bar {
        display: block;
        padding: 0 10px;
        background-color: tomato;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        text-decoration: none;
        white-space: nowrap;
        cursor: default;
        transition: background-color 0.2s, color 0.2s;
    }
</style>

<template>
    <div class="info-bar" :class="{active: isActive}">
        <a href="#" class="address">{{ address }}</a>
    </div>
</template>

<script>
    export default {
        name: 'info-bar',
        props: ['latLng'],
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
        },
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
        }
    }
</script>

<style lang="scss" scoped>
    .info-bar {
        overflow: hidden;
        position: fixed;
        z-index: 10;
        top: 10px;
        left: 10px;
        right: 10px;
        border-radius: 3px;
        cursor: default;
        box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
        &.active {
            cursor: pointer;
            .address {
                color: #333;
            }
        }
        .address {
            display: block;
            margin: 0;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            background-color: #fff;
            color: #ccc;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            white-space: nowrap;
        }
    }
</style>

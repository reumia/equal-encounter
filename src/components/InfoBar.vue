<template>
    <div class="info-bar" :class="{active: isActive}">
        {{ address }}
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
                address: '',
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
        height: 0;
        line-height: 0;
        padding: 0 10px;
        box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
        background-color: rgba(255, 70, 65, 0.8);
        border-radius: 2px;
        transition: height 0.3s ease;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        white-space: nowrap;
        &.active {
            height: 30px;
            line-height: 30px;
        }
    }
</style>

<template>
    <div class="nav-address" :class="{active: isActive}">
        {{ address }}
    </div>
</template>

<script>
    export default {
        name: 'nav-address',
        props: ['marker', 'geocoder'],
        watch: {
            marker () {
                this.getAverageAddress();
            }
        },
        mounted () {
            this.getAverageAddress();
        },
        data () {
            return {
                address: '',
                isActive: false
            }
        },
        methods: {
            getAverageAddress () {
                let latLng = this.marker.position;

                if (typeof latLng === 'undefined') {
                    this.address = '지도를 클릭해서 위치를 추가하세요.';
                    this.isActive = false;
                } else {
                    this.geocoder.geocode({'location': latLng}, (results, status) => {
                        if (status === "OK") {
                            this.address = results[0].formatted_address;
                            this.isActive = true;
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-address {
        padding: 0 10px;
        font-size: 12px;
        font-weight: bold;
        text-decoration: none;
        white-space: nowrap;
        transition: color 0.2s ease;
        color: rgba(255,255,255,.6);
        &.active {
            color: #fff;
        }
    }
</style>

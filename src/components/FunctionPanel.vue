<template>
    <div class="function-panel">

        <!-- 목록 -->
        <div class="list" :class="{inactive: $store.getters.showPanelDetail}">
            <list-item @onClick="setDetailData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <!-- 목록 -->

        <!-- 상세 -->
        <div class="detail" :class="{active: $store.getters.showPanelDetail}" @click="$store.dispatch('togglePanelDetail')">
            <div class="detail-head">
                <span class="text">{{ text }}</span>
            </div>
            <div class="detail-body">
                <rating-star :rating="rating"></rating-star>
                <div class="text">{{ getAddress() }}</div>
            </div>
            <div class="detail-image" v-if="images">
                <div class="image" v-for="(image, index) in images" :key="index" :style="{backgroundImage: 'url(' + image.getUrl({maxWidth: 320}) + ')'}"></div>
            </div>
        </div>
        <!-- 상세 -->

    </div>
</template>

<script>
    import ListItem from './ListItem.vue';
    import RatingStar from './RatingStar.vue';

    export default {
        name: 'function-panel',
        components: { ListItem, RatingStar },
        props: [ 'listData' ],
        data () {
            return {
                id: '',
                text: '',
                address: '',
                latLng: '',
                images: '',
                rating: '',
                showDetail: false
            }
        },
        methods: {
            getAddress () {
                // TODO : 지도 정보가 없을 경우 geocoder 사용하여 주소 정보 가져오기
                return this.address;
            },
            setDetailData (index, data) {
                let item = data[index];

                console.log(item);

                this.id = index;
                this.text = item.text;
                this.address = item.address;
                this.latLng = item.latLng;
                this.images = item.photos && item.photos.length > 0 ? item.photos : undefined;
                this.rating = item.rating;

                this.$store.dispatch('togglePanelDetail');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .function-panel {
        display: block;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: #333;
    }
    .list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: #fff;
        opacity: 1;
        transition: opacity .3s ease;
        &.inactive {
            opacity: .8;
        }
    }
    .detail {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: #fff;
        font-size: 12px;
        text-align: left;
        transition: transform .3s ease;
        &.active {
            transform: translateY(-100%);
        }
    }
    .detail-head {
        position: relative;
        padding: 15px 15px 0;
        .text {
            font-size: 14px;
            font-weight: bold;
        }
    }
    .detail-body {
        margin-top: 6px;
        padding: 0 15px;
    }
    .detail-image {
        display: flex;
        position: relative;
        margin: 15px 0 0 -1px;
        height: 100%;
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid rgba(0,0,0,.16);
        }
        .image {
            flex: 1;
            height: 100%;
            background-color: #333;
            background-size: cover;
            background-position: center center;
        }
    }
</style>

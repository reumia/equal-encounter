<template>
    <div class="function-panel">

        <!-- 목록 -->
        <div class="list" :class="{inactive: getShowPanelDetail()}">
            <list-item @onClick="setDetailData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <!-- 목록 -->

        <!-- 상세 -->
        <div class="detail" :class="{active: getShowPanelDetail()}" @click="togglePanelDetail">
            <div class="detail-text">
                <div class="title">{{ text }}</div>
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
    import { mapGetters, mapMutations } from 'vuex';

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
            ...mapMutations ([
                'togglePanelDetail'
            ]),
            ...mapGetters ({
                'getShowPanelDetail': 'showPanelDetail'
            }),
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

                this.togglePanelDetail();
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
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
    .detail-text {
        position: relative;
        padding: 15px 15px 0;
        .title {
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: bold;
        }

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
            box-shadow: inset 0 2px 0 rgba(0,0,0,.1);
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

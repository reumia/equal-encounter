<template>
    <div class="function-panel">
        <div class="list">
            <list-item @setPanelData="setPanelData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <div class="panel" v-if="id !== ''">
            <div class="panel-head">
                <span class="text">{{ text }}</span>
            </div>
            <div class="panel-body">
                <div class="text">{{ getAddress() }}</div>
            </div>
            <div class="panel-image" v-if="images">
                <div class="image" v-for="(image, index) in images" :key="index" :style="{backgroundImage: 'url(' + image.getUrl({maxWidth: 320}) + ')'}"></div>
            </div>
        </div>
        <div class="panel" v-else>
            <div class="panel-head">
                <div class="text">아무것도 선택되지 않음.</div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem.vue';

    export default {
        name: 'function-panel',
        components: { ListItem },
        props: [ 'listData' ],
        data () {
            return {
                id: '',
                text: '',
                address: '',
                latLng: '',
                images: ''
            }
        },
        methods: {
            getAddress () {
                // TODO : 지도 정보가 없을 경우 geocoder 사용하여 주소 정보 가져오기
                return this.address;
            },
            setPanelData (index, data) {
                let item = data[index];

                console.log(item);

                this.id = index;
                this.text = item.text;
                this.address = item.address;
                this.latLng = item.latLng;
                this.images = item.photos && item.photos.length > 0 ? item.photos : undefined;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .function-panel {
        display: none;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        border-top: 1px solid #bbb;
        &.active {
            display: block;
        }
    }
    .list {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 100%;
        border-right: 1px solid #ddd;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .panel {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-left: 150px;
        height: 100%;
        background-color: #f9f9f9;
        font-size: 12px;
        text-align: left;
    }
    .panel-head {
        position: relative;
        padding: 15px 15px 0;
        .text {
            font-size: 14px;
            font-weight: bold;
        }
    }
    .panel-body {
        margin-top: 6px;
        padding: 0 15px;
    }
    .panel-image {
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

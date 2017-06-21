<template>
    <div class="function-panel">
        <div class="list">
            <list-item @setPanelData="setPanelData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <div class="panel" v-if="id !== ''">
            <div class="panel-item" :style="{paddingLeft: (10 + 4 + icon.size.width) + 'px'}">
                <label for="title" class="icon" :style="{
                    backgroundImage: 'url(' + icon.url + ')',
                    width: icon.size.width + 'px',
                    height: icon.size.height + 'px',
                    backgroundSize: icon.size.width + 'px ' + icon.size.height + 'px',
                    marginTop: (icon.size.width * -0.5) + 'px'
                }"></label>
                <input id="title" type="text" class="text input" :value="text" v-model="text">
            </div>
            <div class="panel-body">
                {{ getAddress() }}
            </div>
        </div>
        <div class="panel" v-else>아무것도 선택되지 않음.</div>
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
                icon: '',
                address: '',
                latLng: ''
            }
        },
        methods: {
            getAddress () {
                // TODO : 지도 정보가 없을 경우 geocoder 사용하여 주소 정보 가져오기
                return this.address;
            },
            setPanelData (index, data) {
                let item = data[index];

                this.id = index;
                this.text = item.text;
                this.icon = item.icon;
                this.address = item.address;
                this.latLng = item.latLng;
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
        box-sizing: border-box;
        margin-left: 150px;
        padding: 10px;
        height: 100%;
        background-color: #f3f3f3;
        text-align: left;
    }
    .panel-item {
        position: relative;
        background: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        .text {
            width: 100%;
            font-size: 14px;
        }
        .icon {
            position: absolute;
            top: 50%;
            left: 10px;
        }
        .input {
            margin: 0;
            padding: 0;
            border: 0;
            background-color: transparent;
            outline: 0;
            &:focus {
                 color: red;
            }
        }
    }
</style>

<template>
    <div class="function-panel">
        <div class="list">
            <list-item @setPanelData="setPanelData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <div class="panel" v-if="Object.keys(panelData).length > 0">
            <div class="panel-item">
                <span class="icon" :style="{
                    backgroundImage: 'url(' + panelData.icon.url + ')',
                    width: panelData.icon.size.width + 'px',
                    height: panelData.icon.size.height + 'px',
                    backgroundSize: panelData.icon.size.width + 'px ' + panelData.icon.size.height + 'px'
                }"></span>
                <input type="text" class="input" :value="panelData.text" v-model="panelData.text">
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
                panelData: {}
            }
        },
        methods: {
            getAddress () {
                // TODO : 지도 정보가 없을 경우 geocoder 사용하여 주소 정보 가져오기
                return this.panelData.address;
            },
            setPanelData (index, data) {
                let item = data[index];

                this.panelData = {
                    id: index,
                    text: item.text,
                    icon: item.icon,
                    address: item.address,
                    latLng: item.latLng
                };
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
        display: flex;
        align-items: center;
        background: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,.1);
        .text {

        }
        .icon {
            margin-right: 4px;
        }
    }
    .input {
        margin: 0;
        padding: 0;
        border: 0;
        width: 100%;
        background-color: transparent;
        font-size: 14px;
        outline: 0;
        &:focus {
            color: red;
        }
    }
</style>

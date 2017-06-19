<template>
    <div class="function-panel">
        <div class="list">
            <list-item @setPanelData="setPanelData(index, listData)" v-for="(item, index) in listData" :key="index" :item="item"></list-item>
        </div>
        <div class="panel" v-if="Object.keys(panelData).length > 0">
            <div class="panel-title">
                <span class="icon" :style="{
                    backgroundImage: 'url(' + panelData.icon.url + ')',
                    width: panelData.icon.size.width + 'px',
                    height: panelData.icon.size.height + 'px',
                    backgroundSize: panelData.icon.size.width + 'px ' + panelData.icon.size.height + 'px'
                }"></span>
                <span class="text">{{ panelData.text }}</span>
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
                console.log(this.panelData.address);
                return this.panelData.address;
            },
            setPanelData (index, data) {
                let item = data[index];

                this.panelData = {
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
    .panel-title {
        .text {

        }
        .icon {
            display: inline-block;
        }
    }
</style>

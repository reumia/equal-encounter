<template>
    <div class="info-list" :style="{height: infoListHeight}">
        <a href="" class="info-list-item" v-for="(place, index) in places" :place="place" :key="index" @click="clickItem($event, place)">
            <span class="icon" :style="{backgroundImage: 'url(' + place.icon + ')'}"></span>
            <span class="text">{{ place.name }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'info-list',
        props: ['places'],
        methods: {
            clickItem (event, place) {
                event.preventDefault();
                alert(place.vicinity);
            },
            getInfoListHeight () {
                let heightUnit;

                if (this.$el.children.length > 0) heightUnit = this.$el.children[0].clientHeight;
                else heightUnit = 0;

                return this.places.length * heightUnit;
            }
        },
        watch: {
            places () {
                let height = this.getInfoListHeight();

                this.infoListHeight = height + 'px';
            }
        },
        data () {
            return {
                infoListHeight: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-list {
        overflow-y: scroll;
        height: 0;
        max-height: 180px;
        transition: height 0.2s;
    }
    .info-list-item {
        box-sizing: border-box;
        position: relative;
        display: block;
        padding: 0 10px 0 30px;
        border-bottom: 1px solid #f3f3f3;
        height: 30px;
        line-height: 29px;
        background-color: #fff;
        color: #333;
        font-size: 12px;
        text-align: left;
        text-decoration: none;
        white-space: nowrap;
        cursor: default;
        transition: background-color 0.2s, color 0.2s;
        &.active {
            background-color: tomato;
            cursor: pointer;
            color: #fff;
        }
        .icon {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 14px;
            height: 14px;
            background-size: 14px 14px;
        }
    }
</style>

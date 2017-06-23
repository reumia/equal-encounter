<template>
    <button class="list-item" @click="$emit('onClick')">
        <span class="label" :style="{
            backgroundImage: 'url(' + item.icon.url + ')',
            width: item.icon.size.width + 'px',
            height: item.icon.size.height + 'px',
            backgroundSize: item.icon.size.width + 'px ' + item.icon.size.height + 'px',
            marginTop: (item.icon.size.height * -.5) + 'px'
        }"></span>
        <span class="message" :style="{
            paddingLeft: (item.icon.size.width + 4) + 'px'
        }">{{ item.text }}</span>
    </button>
</template>

<script>
    export default {
        name: 'list-item',
        props: ['item'],
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .list-item {
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        display: block;
        padding: 10px 12px;
        margin: 0;
        border: 0;
        border-bottom: 1px solid #eee;
        width: 100%;
        background: #fff;
        text-align: left;
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        outline: 0;
    }
    .label {
        position: absolute;
        top: 50%;
        left: 12px;
    }
    .message {
        overflow: auto;
    }
</style>

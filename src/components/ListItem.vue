<template>
    <button class="list-item" @click="$emit('setPanelData')">
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

<style lang="scss" scoped>
    .list-item {
        position: relative;
        display: block;
        box-sizing: border-box;
        padding: 8px 10px;
        margin: 0;
        border: 0;
        width: 100%;
        background: #fff;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item ~ .list-item {
        border-top: 1px solid #eee;
    }
    .label {
        position: absolute;
        top: 50%;
        left: 10px;
    }
    .message {
        overflow: auto;
    }
</style>

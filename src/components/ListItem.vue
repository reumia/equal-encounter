<template>
    <button class="list-item" @click="$emit('showConfirm')">
        <span class="label" :style="{
            backgroundImage: 'url(' + iconURL + ')',
            width: iconSize.width + 'px',
            height: iconSize.height + 'px',
            backgroundSize: iconSize.width + 'px ' + iconSize.height + 'px',
        }"></span>
        <span class="message">{{ text }}</span>
    </button>
</template>

<script>
    export default {
        name: 'list-item',
        props: ['iconURL', 'iconSize', 'text']
    }
</script>

<style lang="scss" scoped>
    .list-item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0;
        border: 0;
        width: 100%;
        height: 32px;
        line-height: 32px;
        background: #fff;
        text-align: left;
    }
    .label {
        display: inline-block;
        margin-right: 5px;
    }
</style>

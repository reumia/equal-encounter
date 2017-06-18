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
        display: block;
        box-sizing: border-box;
        padding: 8px 10px;
        margin: 0;
        border: 0;
        width: 100%;
        background: #fff;
        text-align: left;
    }
    .list-item ~ .list-item {
        border-top: 1px solid #eee;
    }
    .label,
    .message {
        display: inline-block;
        vertical-align: middle;
    }
    .label {

    }
</style>

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
    .label {
        display: inline-block;
    }
</style>

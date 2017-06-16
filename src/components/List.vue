<template>
    <div class="list">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'list'
    }
</script>

<style lang="scss" scoped>
    .list {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
        height: 200px;
        &.active {
            display: block;
        }
    }
</style>

<template>
    <div class="function-panel">
        <div class="list">
            <slot name="list-item"></slot>
        </div>
        <div class="panel">
            <slot name="panel"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'function-panel'
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
        width: 220px;
        height: 100%;
        border-right: 1px solid #ddd;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .panel {
        margin-left: 220px;
        height: 100%;
        background-color: #f3f3f3;
    }
</style>

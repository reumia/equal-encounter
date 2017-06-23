<template>
    <button class="function-button" @click="$emit('onClick')">
        <span>{{ label }}</span>
        <span>{{ count }}</span>
    </button>
</template>

<script>
    export default {
        name: 'function-button',
        props: ['button', 'label', 'count']
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .function-button {
        -webkit-appearance: none;
        display: flex;
        justify-content: space-between;
        border: 0;
        border-right: 1px solid #ddd;
        margin: 0;
        padding: 0 20px;
        background-color: transparent;
        width: 100%;
        height: 50px;
        color: #333;
        outline: 0;
        &.active {
            border-right-style: dashed;
            border-right-color: #ddd;
            background-color: #fff;
            font-weight: bold;
        }
    }
    .function-button ~ .function-button {
        border-top: 1px solid #e3e3e3;
    }
</style>

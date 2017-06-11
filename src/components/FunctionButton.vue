<template>
    <button class="function-button" @click="onclick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'function-button',
        props: ['onclick'],
        data () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .function-button {
        -webkit-appearance: none;
        display: block;
        border: 0;
        margin: 0;
        padding: 0 10px;
        background-color: #fff;
        width: 100%;
        height: 26px;
        line-height: 26px;
        text-align: left;
        color: #333;
        font-weight: bold;
        .label,
        .message {
            display: inline-block;
            margin-right: 4px;
        }
    }
    .function-button ~ .function-button {
        border-top: 1px solid #f3f3f3;
    }
</style>

<template>
    <button class="function-button" @click="bindEvent" :class="{'with-button': hasButton}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'function-button',
        props: ['onclick', 'button', 'hasButton'],
        methods: {
            bindEvent () {
                if (typeof this.onclick !== 'undefined') this.onclick();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .function-button {
        -webkit-appearance: none;
        position: relative;
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
        }
        span ~ span {
            margin-left: 4px;
        }
        &.with-button {
            padding-right: 32px;
        }
    }
    .function-button ~ .function-button {
        border-top: 1px solid #f3f3f3;
    }
    .clear-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        color: #333;
    }
</style>

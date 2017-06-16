<template>
    <button class="function-button" @click="$emit('onClick')" :class="{'with-button': hasButton}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'function-button',
        props: ['button', 'hasButton']
    }
</script>

<style lang="scss" scoped>
    .function-button {
        -webkit-appearance: none;
        display: block;
        border: 0;
        margin: 0;
        background-color: #333;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        .label,
        .message {
            display: inline-block;
            vertical-align: top;
        }
        span ~ span {
            margin-left: 4px;
        }
        &.with-button {
            padding-right: 32px;
        }
    }
    .clear-button {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        width: 26px;
        height: 100%;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        color: #333;
    }
</style>

<template>
    <button class="function-button">
        <span class="label">{{ marker.label }}</span>
        <span class="message">{{ marker.message }}</span>
    </button>
</template>

<script>
    export default {
        name: 'function-button',
        props: ['marker'],
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
        height: 26px;
        line-height: 26px;
        border-radius: 3px;
        box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
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
        margin-top: 5px;
    }
</style>

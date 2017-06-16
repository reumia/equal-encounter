<template>
    <button class="function-button" @click="$emit('onClick')">
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
    }
</style>

<template>
    <button class="nav-button" :style="{textAlign: align}" @click="$emit('clickButton')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'nav-button',
        props: [ 'align' ]
    }
</script>

<style lang="scss" scoped>
    .nav-button {
        -webkit-appearance: none;
        position: relative;
        display: block;
        border: 0;
        margin: 0;
        padding: 0 10px;
        background-color: #fff;
        width: 100%;
        text-align: left;
        color: #333;
    }
</style>

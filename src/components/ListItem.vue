<template>
    <button class="list-item" @click="$emit('showConfirm')">
        <span class="label" :style="{ backgroundImage: 'url(' + iconURL + ')' }"></span>
        <span class="message">{{ text }}</span>
    </button>
</template>

<script>
    export default {
        name: 'list-item',
        props: ['iconURL', 'text']
    }
</script>

<style lang="scss" scoped>
</style>

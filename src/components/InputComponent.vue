<template>
    <div>
        <label>{{name}}_{{id}}</label>
        <input type="text" name="" placeholder="">
    </div>
</template>

<script>
    export default {
        name: 'input-component',
        props: ['id', 'name'],
        data () {
            return {
            }
        }
    }
</script>

<style lang="scss">

</style>

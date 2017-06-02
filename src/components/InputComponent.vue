<template>
    <div>
        <label>{{name}}{{id}}</label>
        <input type="text" :name="name + id" :placeholder="name + id">
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

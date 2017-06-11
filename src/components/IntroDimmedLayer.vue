<template>
    <transition name="fade">
        <div class="dimmed" v-if="show">
            <p class="dimmed-text">
                망설이지마세요!<br>
                만남의 장소를 대신 정해드립니다!<br>
                <br>
                <strong>지도를 클릭해서 위치를 추가하세요.</strong>
            </p>
            <div class="button-wrap">
                <button class="button" @click="show = !show">닫기</button>
                <button class="button" @click="disableLayer">다시는 열지 않기</button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'intro-dimmed-layer',
        watch: {
        },
        data () {
            return {
                show: true
            }
        },
        methods: {
            disableLayer () {
                this.show = false;
                this.$emit('disableLayer');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dimmed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: rgba(255, 99, 71, 0.9);
        color: #fff;
        &.fade-enter-active,
        &.fade-leave-active {
            transition: opacity 1s
        }
        &.fade-enter,
        &.fade-leave-to {
            opacity: 0
        }
    }
    .dimmed-text {
        display: block;
        width: 240px;
        margin: 0 auto;
        text-align: left;
        line-height: 1.4;
    }
    .button-wrap {
        width: 240px;
        margin: 0 auto;
        margin-top: 40px;
    }
    .button {
        -webkit-appearance: none;
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid rgba(255,255,255,.8);
        background-color: transparent;
        color: #fff;
        font-size: 14px;
    }
    .button ~ .button {
        margin-top: 10px;
    }
</style>

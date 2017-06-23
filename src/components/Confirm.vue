<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <div class="button-wrap">
                                <button class="button button-accent" @click="$emit('onConfirm')">확인</button>
                                <button class="button" @click="$emit('onClose')">닫기</button>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'confirm',
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        overflow: hidden;
        width: 300px;
        margin: 0 auto;
        padding: 0;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0,0,0,.2);
        transition: all .2s;
        font-size: 14px;
    }
    .modal-header {
        margin: 0;
        border-top: 10px solid tomato;
        color: #fff;
        font-weight: bold;
    }
    .modal-body {
        margin: 0;
        padding: 30px 10px 10px;
    }
    .modal-footer {
        padding: 10px 10px 30px;
    }
    .button-wrap {
        display: flex;
        justify-content: center;
    }
    .button {
        -webkit-appearance: none;
        display: block;
        box-sizing: border-box;
        margin: 0 5px;
        padding: 5px 15px;
        border-radius: 3px;
        border: 1px solid #333;
        background-color: transparent;
        color: #333;
        font-size: 14px;
    }
    .button-accent {
        color: tomato;
        border-color: tomato;
    }
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
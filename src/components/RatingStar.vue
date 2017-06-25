<template>
    <div class="rating-star" :style="{
        backgroundImage: 'url(' + starIcons.off.url + ')',
        backgroundSize: starIcons.off.size.x + 'px ' + starIcons.off.size.y + 'px',
        width: (starIcons.off.size.x * max) + 'px'
    }">
        <div class="rating-star-on" :style="{
            backgroundImage: 'url(' + starIcons.on.url + ')',
            backgroundSize: starIcons.on.size.x + 'px ' + starIcons.on.size.y + 'px',
            width: (100 / max) * rating + '%'
        }">{{ rating }}</div>
    </div>
</template>

<script>
    import { starIcons } from './Icons';

    export default {
        name: 'rating-star',
        props: [ 'rating' ],
        data () {
            return {
                starIcons: {},
                max: 5,
            }
        },
        beforeMount () {
            this.starIcons = starIcons;
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .rating-star {
        margin-bottom: 4px;
    }
    .rating-star-on {
        width: 100%;
        height: 14px;
        font-size: 0;
        line-height: 0;
        color: transparent;
    }
</style>
<template>
    <canvas ref="can"></canvas>
</template>

<script>
    import {ready} from '../js/effect'

    export default {
        name: "Effect",
        props:{
            effectName:{
                type:String,
                required:true,
            },
            player:{
                type:Object,
                required:true,
            }
        },
        data(){
            return {
                efName:this.effectName,
                p:this.player,
            }
        },
        watch:{
            effectName:{
                handler(){
                    ready({
                        p:this.p.$refs.videoPlayer.$el.childNodes[0].childNodes[0],
                        canvas:this.$refs.can,
                        efName:this.effectName,
                    });
                },
            }
        },
    }


</script>

<style scoped>
    canvas{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        overflow: hidden;
        height: inherit;
        width: inherit;
    }
</style>
<template>
    <canvas></canvas>
</template>

<script>
    import p from '@/js/particles.js';
    import Vue from 'vue'


    Vue.directive('particles',{
       inserted(el,binding){
           p({
               canvas: el,
               amount: binding.value,
           });
       }
    });
    export default {
        name: "Background",
        props:{
            amount:Number,
        },

    }
</script>

<style scoped>

</style>
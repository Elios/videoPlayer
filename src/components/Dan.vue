<template>
    <transition>
        <template v-if="getD">
            <span ref="dan" :style="'top:'+top" v-once>{{content}}</span>
        </template>
    </transition>
</template>

<script>
    export default {
        name: "Dan",
        props:{
            content:{
                type:String,
                required:true
            },
            top:{
                type: String,
                required: true,
            },
            display:{
                type:Boolean,
                required:true,
            }
        },
        data(){
            return {
                d:this.display,
            }
        },
        computed:{
            getD(){
                return this.d;
            }
        },
        mounted() {
            this.$refs.dan.className = "dan";
        },
    }
</script>

<style scoped>
    .dan{
        color:white;
        position: absolute;
        left: -100%;
        z-index: 4;
        cursor: pointer;
        font-size: 17px;
        font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
        word-break: keep-all;/*保持中文在一行*/
        white-space: nowrap;/*防止空格和连字符换行*/

        animation: moving 10s ease;
    }
    @keyframes moving {
        from{
            left: 100%;
        }
        to{
            left: -160%;
        }
    }
</style>

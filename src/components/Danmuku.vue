<template>
    <div id="wrap-danmuku" ref="wrap-danmuku">
        <template>
            <Dan v-for="(dan,index) in getDanmuku" :key="index" :content="dan.content" :top="dan.top" :display="display"></Dan>
        </template>
    </div>
</template>

<script>

    import Dan from "./Dan";
    export default {
        name: "Danmuku",
        components: {Dan},
        props:{
            dan:{
                type:Object,
                required:true,
            }
        },
        data(){
            return {
                getDan:this.dan,
                danmuku:[],
                display:true
            }
        },
        computed:{
            getDanmuku(){
                return this.danmuku;
            },
        },
        watch:{
            getDan:{
                handler(newData){
                    if(newData.content){
                        this.danmuku.push(newData);
                    }
                },
                immediate:true,
                deep:true
            }
        },
        beforeUpdate() {
            if(this.$children.length){
                for(let dan of this.$children){
                    if(dan.$el.className === "dan"){
                        dan.$set(dan.$data,'d',false);
                    }
                }
            }
        }
    }

</script>

<style scoped>
    #wrap-danmuku{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        overflow: hidden;
        height: inherit;
        width: inherit;
    }
</style>
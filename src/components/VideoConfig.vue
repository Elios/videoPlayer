<template>
    <div id="wrap-config">
        <textarea ref="editDan" v-model="dan" cols="30" placeholder="请输入弹幕，不超过30字" maxlength="30" id="danmuku" spellcheck="false" readonly></textarea>
        <ul>
            <li><button @click.stop="send">发射</button></li>
            <li><button @click.stop="normal">正常</button></li>
            <li><button @click.stop="grey">黑白</button></li>
            <li><button @click.stop="negative">底片</button></li>
            <li><button @click.stop="emboss">浮雕</button></li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "VideoConfig",
        data(){
          return {
              dan:'',
          }
        },
        methods:{
            grey(){
                this.$emit('changeEffect','toGrey');
            },
            negative(){
                this.$emit('changeEffect','toNegative');
            },
            emboss(){
                this.$emit('changeEffect','toEmboss');
            },
            normal(){
                this.$emit('changeEffect','normal');
            },
            send(){
                this.$emit('sendDan',this.dan);
            }
        }
    }
</script>

<style scoped>
    #wrap-config{
        position: relative;
        height: 22px;
        background-color: #ffffff;
        border: 1px solid #178482;
        border-radius: 3px;
        box-shadow: 1.5px 1.5px #1acece;
        margin-top: 0.3px;
        -moz-line-height:22px;
    }
    #danmuku{
        resize: none;
        height: 20px;
        line-height:20px;
    }
    ul{
        list-style: none;
        position: absolute;
        display: inline-flex;
    }
    li{
        margin-right: 10px;
    }
</style>
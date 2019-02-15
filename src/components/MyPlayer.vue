<template>
        <transition>
            <div id="wrap-player" ref="wrapPlayer" v-if="a">
                <video-player
                        id="myPlayer"
                        ref="videoPlayer"
                        :options="options"
                        class="video-js vjs-big-play-centered vjs-fluid video-player vjs-custom-skin"
                        @play="onPlay($event)"
                        @ended="onEnded($event)"></video-player>
                <Danmuku v-if="showDanmuku" :dan="dan"></Danmuku>
                <template v-if="show">
                    <Effect :effect-name="ef" :player="player"></Effect>
                </template>
                <VideoConfig @sendDan="sendDanmuku" ref="videoConfig" @changeEffect="changeEffect"></VideoConfig>
            </div>
        </transition>
</template>

<script>
    import '@/css/video-js.css'
    import { videoPlayer } from 'vue-video-player';
    import Danmuku from "./Danmuku";
    import VideoConfig from "./VideoConfig";
    import Effect from "./Effect";

    export default {
        name: "VideoPlayer",
        data(){
            return {
                options:{
                    controls: true,
                    preload: 'auto',
                    language:'zh-CN',
                    fluid:true,
                    poster:this.sources.poster,
                    playbackRate:[0.5,1,2],
                    sources:this.sources.sources
                },
                dan:{
                    content:'',
                    top:'',
                },
                ef:'',
                show:false,
                showDanmuku:false,
                a:false
            }
        },
        props:{
            sources:{
                type:Object,
                required:true,
            }
        },
        computed: {
            player(){
                return this;
            }
        },
        mounted(){
                this.options.sources = this.sources.sources;
                this.a = true;
        },
        methods:{
            onPlay(player){
                this.showDanmuku = true;
                player.volume(0.4);
                this.$refs.videoConfig.$refs.editDan.removeAttribute('readonly');
            },
            onEnded(){
                this.showDanmuku = false;
                this.$refs.videoConfig.$data.dan = '';
                this.$refs.videoConfig.$refs.editDan.setAttribute('readonly','readonly');
            },
            sendDanmuku(danmuku){
                this.$set(this.dan,'content',danmuku);
                this.$set(this.dan,'top',Math.random()*200+'px');
            },
            changeEffect(ef){
                if(ef === "normal"){
                    this.show = false;
                }else {
                    this.show = true;
                    this.$nextTick(function(){
                        this.ef = ef;
                    });
                }

            }
        },
        components:{Effect, VideoConfig, Danmuku, videoPlayer},
    }

</script>

<style scoped>
    #myPlayer{
        width: inherit;
        height: inherit;
    }
    #wrap-player {
        position: relative;
        z-index: 0;
        width: 500px;
        height: 280px;
        top: 100px;
    }

    .v-enter-active{
        animation: p-enter 3s ease;
    }

    @keyframes p-enter {
        0%{
            left: -1000px;
        }
        55%{
            left: 0px;
            height: 280px;
        }
        60%{
            top: 100px;
        }
        70%{
            top: 0px;
            height: 200px;
        }
        80%{
            top: 100px;
            height: 280px;
        }
        90%{
            top: 0px;
            height: 200px;
        }
        100%{
            height: 280px;
        }
    }
</style>
<style>
    .vjs-big-play-button,.vjs-control-bar{
        z-index: 4;
    }
    .vjs-tech{
        z-index: 2;
    }
    .vjs-poster{
        z-index: 3;
    }

</style>
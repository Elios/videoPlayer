<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <Background id="bkg" v-particles:amount="50"></Background>
        <VideoPlayer :sources="resources"></VideoPlayer>
    </div>

</template>

<script>
    import Background from '@/components/Background'
    import VideoPlayer from "@/components/MyPlayer";

    export default {
        name: 'app',
        components: {
            VideoPlayer,
            Background
        },
        data: function () {
            return {
                resources: {
                    poster: require('@/assets/img/poster.png'),
                    sources: [
                        {
                            src: require('@/assets/video/001.webm'),
                            type: 'video/webm',
                        },
                        {
                            src: require('@/assets/video/001.mp4'),
                            type: 'video/mp4',
                        },
                    ],
                },
            }
        }
    }
</script>

<style>
    #app {
        position: relative;
    }

    #bkg {
        position: absolute;
        z-index: -100;
    }

</style>

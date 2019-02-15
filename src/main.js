import Vue from 'vue'
import App from './App.vue'
import VideoPlayer from 'vue-video-player'

Vue.config.productionTip = false
Vue.use(VideoPlayer)

new Vue({
  render: h => h(App),
}).$mount('#app')

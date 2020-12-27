import { createWebHashHistory, createRouter } from 'vue-router'
import DemoPage from './pages/demo/index.vue'


const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: DemoPage }
  ]
})


export default router
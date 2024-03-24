const routes = [
    {
        path: '/chat',
        name: 'chat',
        component: () => import('@/view/ChatKnowledge.vue')
    },
    {
        path: '/',
        redirect: '/preview'
    },
    {
        path: '/preview',
        name: 'preview',
        component: ()=>import('@/view/BigScreenIndex.vue')
    },
    {
        path: '/screen',
        name: 'screen',
        component: ()=>import('@/view/BigScreenIndex.vue')
    }
];

import {createRouter} from 'vue-router'
import {createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes: routes
})

export default router
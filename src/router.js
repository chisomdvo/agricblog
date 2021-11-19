import { createRouter, createWebHistory } from 'vue-router';

import Blog from './components/blog.vue';
import newpost from './components/newpost.vue';
import blogcontentnew from './components/blogcontentnew.vue';
import editpost from './components/editpost.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: Blog },
    { path: '/newpost', component: newpost },
    {
      path: '/blog/:id',
      component: blogcontentnew,
      props: true
    },{
      path: '/blog/:id/editpost',
      component: editpost,
      props: true
    },
  ]
});


export default router;

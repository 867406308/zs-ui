import { getToken, hashToken, removeToken } from '@/utils/token';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { useRoutersStore } from '@/store/modules/router.ts';
import { useUserStore } from '@/store/modules/sys/user.ts';
import { getList } from '@/api/sys/menu';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
const routers = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    // name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
];

const asynRouters = [
  {
    path: '/',
    name: '',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'HomeFilled',
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/sys',
    name: 'sys',
    component: Layout,
    meta: {
      title: '系统',
      icon: 'Setting',
    },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/sys/menu/menu.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/sys/role/role.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/sys/user/user.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
    ],
  },
];

const router = createRouter({
  // hash模式：createWebHashHistory，
  // history模式：createWebHistory
  history: createWebHistory(),
  routes: routers,
});
const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  console.log('to', to);
  if (hashToken()) {
    console.log('toekn存在');
    //toekn存在
    if (to.path == '/login') {
      //token存在，并且是login页面
      console.log('111');
      next();
    } else {
      console.log('222', useRoutersStore().menuList.length);
      if (useRoutersStore().menuList.length == 0) {
        console.log('333');
        getList()
          .then((res) => {
            console.log('444', res);
            useRoutersStore().setMenuList(asynRouters);
            addRouter(asynRouters);
            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            //token存在，不是login页面
          })
          .catch((error) => {
            console.log('error123', error);
            next('/login');
          });
      } else {
        console.log('555');
        next();
      }
    }
  } else {
    console.log('666');
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('777');
      // 在免登录白名单，直接进入
      next();
    } else {
      //token不存在，不是login页面
      next('/login');
    }
  }
});
// 当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});
export function addRouter(routers: any) {
  routers.map((e) => {
    router.addRoute(e);
  });
}

export default router;

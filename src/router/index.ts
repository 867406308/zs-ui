import { getToken, hashToken, removeToken } from '@/utils/token';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { useRoutersStore } from '@/store/modules/router.ts';

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
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
        children: [
          {
            path: 'menus',
            name: 'menus',
            component: () => import('@/views/sys/menu/zs.vue'),
            meta: {
              title: '菜单管理11',
              icon: 'Menu',
            },
          },
        ],
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/sys/role/role.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: 'user',
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
  console.log('to', to);
  if (hashToken()) {
    //toekn存在
    if (to.path == '/login') {
      //token存在，并且是login页面
      next('/home');
    } else {
      if (useRoutersStore().menuList.length == 0) {
        useRoutersStore().setMenuList(asynRouters);
        addRouter(asynRouters);
        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
        //token存在，不是login页面
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      //token不存在，不是login页面
      next('/login');
    }
  }
});

export function addRouter(routers: any) {
  routers.map((e) => {
    router.addRoute(e);
  });
}

export default router;

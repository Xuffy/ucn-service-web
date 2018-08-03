import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import Config from 'service/config';
import Layout from 'components/layout/index.vue';
import $i from '../language/index';
import {Notification, Message} from 'element-ui';
import {localStore, sessionStore} from 'service/store';
import Util from 'service/util';

Vue.use(Router);

export const routerMap = [
    {
      path: '/',
      component: Layout,
      redirect: '/workbench/index',
      hidden: true, // 在侧边栏中不显示该菜单
    },
    {
      path: '/login',
      hidden: true,
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/workbench',
      component: Layout,
      meta: {name: $i.router.workbench},
      redirect: '/workbench/index',
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'workbench',
          meta: {
            draft: false,
            recycleBin: false,
            log: false,
          },
          component: () => import('../views/workbench/index.vue')
        }
      ]
    },
    {
      path: '/payment',
      meta: {
        name: $i.router.payment,
        auth: ['PAYMENT']
      },
      component: Layout,
      redirect: '/payment/index',
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'payment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/payment/index.vue')
        }
      ]
    },
    {
      path: '/settings',
      component: Layout,
      redirect: '/settings/department',
      meta: {
        name: $i.router.settings,
        auth: ['SETTING']
      },
      children: [
        {
          path: 'department',
          name: 'settingsDepartment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            auth: [0],
            name: $i.router.settingsDepartment
          },
          component: () => import('../views/settings/departmentSetting.vue')
        },
        /*{
          path: 'category',
          name: 'settingsCategory',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.settingsCategory
          },
          component: () => import('../views/settings/CategorySetting')
        },*/
        {
          path: 'Personal',
          name: 'settingsPersonal',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.settingsPersonal,
            auth: ['SETTING:PERSONAL']
          },
          component: () => import('../views/settings/personalSetting')
        },
        {
          path: 'companyInfo',
          name: 'settingsCompany',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            auth: [0],
            name: $i.router.settingsCompany
          },
          component: () => import('../views/settings/companyInfo')
        },
      ]
    },
    {
      path: '/logs',
      component: Layout,
      redirect: '/logs/index',
      meta: {name: $i.router.logs},
      noDropdown: true,
      hidden: true,
      children: [
        {
          path: 'index',
          name: 'logs',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/logs/logs.vue')
        },
        {
          path: 'task',
          name: 'logsTask',
          meta: {},
          component: () => import('../views/logs/task.vue')
        }
      ]
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/index',
      meta: {
        name: $i.router.message,
        auth: ['MESSAGE']
      },
      hidden: true,
      children: [
        {
          path: 'index',
          name: 'message',
          component: () => import('../views/message/message.vue'),
        },
        {
          name: 'Management',
          path: 'messageManagement',
          meta: {
            name: $i.router.messageManagement
          },
          component: () => import('../views/message/messageManagement.vue'),
        },

      ],
    },
    {
      path: '/draft',
      component: Layout,
      meta: {name: $i.router.draft},
      redirect: '/draft/index',
      noDropdown: true,
      hidden: true,
      children: [
        {
          path: 'index',
          name: 'draft',
          meta: {
            draft: false,
            recycleBin: false,
            log: false,
          },
          component: () => import('../views/draft/index.vue')
        }
      ]
    },
    {
      path: '/recycle',
      component: Layout,
      meta: {name: $i.router.recycle},
      redirect: '/recycle/index',
      noDropdown: true,
      hidden: true,
      children: [
        {
          path: 'index',
          name: 'recycleBin',
          meta: {
            draft: false,
            recycleBin: false,
            log: false,
          },
          component: () => import('../views/recycleBin/index.vue')
        }
      ]
    },
    {
      path: '/warehouse',
      component: Layout,
      redirect: '/warehouse/overview',
      name: 'warehouse',
      meta: {
          auth:'QC',
          name: $i.router.warehouse
      },
      noDropdown: true,
      children: [
        {
          path: 'overview',
          name: 'qc Overview',
          meta: {
              auth:'QC:ORDER_OVERVIEW',
            name: $i.router.warehouseQcOverview
          },
          component: () => import('../views/warehouse/qcOverview'),
        },
        {
          path: 'qcOverview',
          name: 'QC Overview',
          hidden: true,
          meta: {
              auth:'QC:ORDER_OVERVIEW',
            name: $i.router.warehouseQcOverview
          },
          component: () => import('../views/warehouse/qcOverview'),
        },
        {
          path: 'editQc',
          name: 'edit qc',
          hidden: true,
          meta: {
              auth:'QC:ORDER_DETAIL',
            name: $i.router.editQc
          },
          component: () => import('../views/warehouse/editQcOrder'),
        },
        {
          path: 'qcDetail',
          name: 'qc detail',
          hidden: true,
          meta: {
              auth:'QC:ORDER_DETAIL',
            name: $i.router.qcDetail
          },
          component: () => import('../views/warehouse/QCOrderDetail'),
        },

      ]
    },
    {
      path: '/customer',
      component: Layout,
      meta: {
        name: $i.router.customer,
        auth: ['CUSTOMER']
      },
      redirect: '/customer/overview',
      noDropdown: true,
      hidden: false,
      children: [
        {
          path: 'overview',
          name: 'customer',
          meta: {
            draft: false,
            recycleBin: true,
            log: false,
            auth: ['CUSTOMER:OVERVIEW']
          },
          component: () => import('../views/customer/overview.vue')
        },
        {
          path: 'detail',
          name: 'customerDetail',
          meta: {
            draft: false,
            recycleBin: true,
            log: false,
            auth: ['CUSTOMER:DETAIL']
          },
          component: () => import('../views/customer/customerDetail.vue')
        },
        {
          path: 'customerArchive',
          name: 'customerArchive',
          meta: {
            draft: false,
            recycleBin: true,
            log: false,
            auth: ['CUSTOMER:ARCHIVE']
          },
          component: () => import('../views/customer/archive.vue')
        }
      ]
    }
  ]
;

let router = new Router({
  mode: 'history',
  routes: routerMap
});

router.beforeResolve((to, from, next) => {
  let ts = localStore.get('token')
    , ri = localStore.get('router_intercept');

  // 登录验证
  if ((to.path !== '/login' || from.path === '/login') && _.isEmpty(ts)) {
    return next({path: '/login'});
  }

  // 数据验证拦截
  if (ri && (to.path !== ri.path || from.path === ri.path)) {
    return next(ri);
  }

  // 权限验证
  if (to.meta && to.meta.auth && !Util.$auth(to.meta.auth)) {

    return Notification.error({
      title: $i.hintMessage.systemHints,
      message: $i.hintMessage.noAuthority
    });
  }

  next();
});

export default router

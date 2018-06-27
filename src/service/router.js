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
      meta: {name: $i.router.payment},
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
      path: '/logistic',
      name: 'logistic',
      meta: {name: $i.router.logistic},
      component: Layout,
      redirect: '/logistic/plan',
      children: [
        {
          path: 'plan',
          name: 'overviewPlan',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticPlanOverview
          },
          component: () => import('../views/logistic/logisticPlanOverview')
        },
        {
          path: 'loadingList',
          name: 'overviewLoadingList',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticLoadingList
          },
          component: () => import('../views/logistic/logisticPlanOverview')
        },
        {
          path: 'draft',
          name: 'overviewDraft',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticLoadingDraft
          },
          component: () => import('../views/logistic/logisticPlanOverview')
        },
        {
          path: 'archive',
          name: 'overviewArchive',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticLoadingArchive
          },
          component: () => import('../views/logistic/logisticPlanOverview')
        },
        {
          path: 'placeLogisticPlan',
          name: 'placeLogisticPlan',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticPlaceLogisticPlan
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        },
        {
          path: 'planDetail',
          name: 'logisticPlanDetail',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,

            name: $i.router.logisticPlaceDetail

          },
          component: () => import('../views/logistic/logisticPlanDetail')
        }
      ]
    },
    {
      path: '/settings',
      component: Layout,
      redirect: '/settings/department',
      meta: {name: $i.router.settings},
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
            name: $i.router.settingsPersonal
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
      path: '/track',
      component: Layout,
      redirect: '/track/index',
      meta: {name: $i.router.track},
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'track',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/track/trackBySKU.vue'),
        }
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
        }
      ]
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/index',
      meta: {name: $i.router.message},
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
    // todo 供应商路由
    //draft  草稿箱路由
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
    //recycleBin  回收站路由
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
      meta: {name: $i.router.warehouse},
      noDropdown: false,
      children: [
        {
          path: 'overview',
          name: 'qc Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.warehouseQcOverview
          },
          component: () => import('../views/warehouse/qcOverview'),
        },
        {
          path: 'qcOverview',
          name: 'qc Overview',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.warehouseQcOverview
          },
          component: () => import('../views/warehouse/qcOverview'),
        },
        {
          path: 'editQc',
          name: 'edit qc',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.editQc
          },
          component: () => import('../views/warehouse/editQcOrder'),
        },
        {
          path: 'qcDetail',
          name: 'qc detail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.qcDetail
          },
          component: () => import('../views/warehouse/QCOrderDetail'),
        },

      ]
    },
    {

      path: '/customer',
      component: Layout,
      meta: {name:i.router.customer},
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
          },
          component: () => import('../views/customer/customerDetail.vue')
        },
        {
          path: 'recycle',
          name: 'customerRecycleBinDetail',
          meta: {
            draft: false,
            recycleBin: true,
            log: false,
          },
          component: () => import('../views/customer/recycleBin.vue')
        }
      ]
    }
  ]
;


let router = new Router({
  routes: routerMap
});


router.beforeResolve((to, from, next) => {
  let ts = localStore.get('token')
    , cacheParam = sessionStore.get('cache_router_param') || []
    , cp = _.findWhere(cacheParam, {path: to.path}) // 从缓存中获取对应路由参数
    , version;

  if (to.meta && to.meta.auth && !Util.$auth(to.meta.auth)) {
    return next({path: '/'});
  }

  if (to.path !== '/login' || from.path === '/login') {
    /*version = localStore.get('version');

    if (version !== Config.VERSION) { // 版本控制
      return next({path: '/login'});
    }*/
    if (_.isEmpty(ts)) { // 登录验证
      return next({path: '/login'});
    }
  }

  // 判断路由是否必须带入参数 todo 跳转之前页面地址没有带上参数
  /*if (to.meta.needParam) {
    if (_.isEmpty(to.params) && _.isEmpty(to.query)) {
      if (!_.isEmpty(cp)) {
        _.map(cp.query, (val, key) => {
          to.query[key] = val;
        });

        _.map(cp.params, (val, key) => {
          to.params[key] = val;
        });
      } else {
        return to.matched.length ?
          next({path: to.matched[1] ? to.matched[1].redirect : to.matched[0].redirect}) : next({path: '/'});
      }
    }
    if (!_.isEmpty(cp)) {
      cacheParam = _.filter(cacheParam, val => {
        return val.path !== to.path;
      });
    }

    cacheParam.push(_.pick(to, 'path', 'params', 'query'));
    sessionStore.set('cache_router_param', cacheParam);

  }*/

  // Notification.closeAll();

  next();
});

export default router

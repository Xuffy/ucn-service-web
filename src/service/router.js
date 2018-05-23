import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import config from 'service/config';
import Layout from 'components/layout/index.vue'
import {Notification, Message} from 'element-ui';
import {localStore, sessionStore} from 'service/store';

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
      meta: {name: 'Workbench'},
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
      path: '/product',
      component: Layout,
      meta: {name: 'Product'},
      redirect: '/product/sourcing',
      children: [
        {
          path: 'sourcing',
          name: 'productSourcingOverview',
          meta: {
            draft: false,
            recycleBin: false,
            log: true,
            name: 'Sourcing Overview'
          },
          component: () => import('../views/product/sourcing/sourcing'),
        },
        {
          path: 'sourcingDetail',
          name: 'productSourcingDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Sourcing Detail'
          },
          component: () => import('../views/product/sourcing/detail'),
        },
        {
          path: 'bookmark',
          name: 'productBookmarkOverview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark Overview'
          },
          component: () => import('../views/product/bookmark/bookmark'),
        },
        {
          path: 'bookmarkDetail',
          name: 'productBookmarkDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark Detail'
          },
          component: () => import('../views/product/bookmark/detail'),
        },
        {
          path: 'bookmarkManuallyAdd',
          name: 'productBookmarkManuallyAdd',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark Manually Add'
          },
          component: () => import('../views/product/bookmark/manuallyAdd'),
        },
        {
          path: 'recycleBin',
          name: 'productBookmarkRecycleBin',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark RecycleBin'
          },
          component: () => import('../views/product/bookmark/recycleBin'),
        },

        {
          path: 'compare',
          name: 'productCompareOverview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Compare Overview'
          },
          component: () => import('../views/product/compare/overview'),
        },
        {
          path: 'compareDetail/:type',
          name: 'productCompareDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Compare Detail'
          },
          component: () => import('../views/product/compare/compare'),
        },
      ]
    },
    {
      path: '/payment',
      meta: {name: 'Payment'},
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
      meta: {name: 'Logistic'},
      component: Layout,
      redirect: '/logistic/plan',
      children: [
        {
          path: 'plan',
          name: 'overviewPlan',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'planOverview'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'loadingList',
          name: 'overviewLoadingList',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'loadingList'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'draft',
          name: 'overviewDraft',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'logisticDraft'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'archive',
          name: 'overviewArchive',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'logisticArchive'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'placeLogisticPlan',
          name: 'placeLogisticPlan',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'placeLogisticPlan'
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
            name: 'planDetail'
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        }
      ]
    },
    {
      path: '/settings',
      component: Layout,
      redirect: '/settings/department',
      meta: {name: 'Settings'},
      children: [
        {
          path: 'department',
          name: 'settingsDepartment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'department and user setting'
          },
          component: () => import('../views/settings/departmentSetting.vue')
        },
        {
          path: 'category',
          name: 'settingsCategory',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Category Setting'
          },
          component: () => import('../views/settings/CategorySetting')
        },
        {
          path: 'Personal',
          name: 'settingsPersonal',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Personal Setting'
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
            name: 'Company Info'
          },
          component: () => import('../views/settings/companyInfo')
        },
      ]
    },
    {
      path: '/track',
      component: Layout,
      redirect: '/track/index',
      meta: {name: 'Track'},
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
      meta: {name: 'Logs'},
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
      meta: {name: 'Message'},
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
            name: 'Management'
          },
          component: () => import('../views/message/messageManagement.vue'),
        },

      ],
    },
    // todo 供应商路由
    {
      path: '/sellerProduct',
      component: Layout,
      redirect: '/sellerProduct/overview',
      name: 'sellerProduct',
      meta: {
        name: 'sellerProduct'
      },
      // hidden: true,
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
            name: 'overview'
          },
          component: () => import('../views/sellerProduct/overview')
        },
        {
          path: 'addNewProduct',
          name: 'Add New Product',
          meta: {
            name: 'Add New Product'
          },
          component: () => import('../views/sellerProduct/addNewProduct')
        },
        {
          path: 'detail',
          name: 'Detail',
          meta: {
            name: 'Detail'
          },
          component: () => import('../views/sellerProduct/detail')
        },
      ]
    },
    //draft  草稿箱路由
    {
      path: '/draft',
      component: Layout,
      meta: {name: 'Draft'},
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
      meta: {name: 'Recycle Bin'},
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
        name: '仓库'
      },
      noDropdown: false,
      children: [
        {
          path: 'overview',
          name: 'qc Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '货单预览'
          },
          component: () => import('../views/warehouse/qcOverview'),
        },
        {
          path: 'editQc',
          name: 'edit qc',
          hidden:true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '编辑'
          },
          component: () => import('../views/warehouse/editQcOrder'),
        },
        {
          path: 'qcDetail',
          name: 'qc detail',
          hidden:true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '详情'
          },
          component: () => import('../views/warehouse/QCOrderDetail'),
        },

      ]
    },
    {

      path: '/customer',
      component: Layout,
      meta: {name: 'customer'},
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


  if (to.path !== '/login' || from.path === '/login') {
    /*version = localStore.get('version');

    if (version !== config.VERSION) { // 版本控制
      return next({path: '/login'});
    }*/
    if (_.isEmpty(ts)) { // 登录验证
      return next({path: '/login'});
    }
  }

  // 判断路由是否必须带入参数 todo 跳转之前页面地址没有带上参数
  if (to.meta.needParam) {
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

  }

  // Notification.closeAll();

  next();
});

export default router

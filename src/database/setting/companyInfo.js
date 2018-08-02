
/**
 *  @param key 必填字段，用于匹配国际化json文件那边的key
 *  @param belongPage 用于区分在哪个页面上显示,因为多个页面的字段不一样，但是遍历的都是同一个文件
 *  @param showType 页面上展示的类型，是Input框还是select或者是纯文本
 *  @param isDefaultShow 专用于overview页面，用于表示哪三个字段在外面不隐藏
 *  @param isOutside 专用于detail页面，表示是否是顶部简介展示字段
 *
 *
 * */

export default {
    //顶部简介字段
  serviceProviderCode: {
        key: 'code',
        type: 'input',
        belong:'summary'
    },
  serviceProviderName:{
        key: 'name',
        type: 'input',
        belong:'summary',
        _rules:{
            required:true,
          }
    },
  serviceProviderShortName:{
        key: 'abbreviation',
        type: 'input',
        belong:'summary',
        _rules:{
          required:true,
        }
    },
  serviceProviderType:{
        key: 'type',
        type: 'select',
        belong:'summary',
        _rules:{
            required:true,
            length:6,
          }
    },
  country:{
        key: 'country',
        type: 'select',
        belong:'summary'
    },
  city:{
        key: 'city',
        type: 'input',
        belong:'summary'
    },
  paymentTerm:{
        key: 'payment',
        type: 'select',
        belong:'summary'
    },
  currency:{
        key: 'currency',
        type: 'selectCurrency',
        belong:'summary'
    },
  ProvideIncoterm:{
        key: 'incoterm',
        type: 'select',
        belong:'summary'
    },
  ServiceCity:{
        key: 'serviceCity',
        type: 'input',
        belong:'summary'
    },
    logo:{
        key: 'logo',
        type: 'function',
        belong:'summary'
      }
}

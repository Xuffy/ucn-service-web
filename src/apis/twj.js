export default {
  //payment
  post_ledgerPage: ['/ledger/page', 'USERVICE_URL'],
  post_payment_list: ['/payment/list/{orderNo}/{orderType}', 'USERVICE_URL'],
  post_payment_accept: ['/payment/accept/{id}', 'USERVICE_URL'],
  post_payment_dunning: ['/payment/dunning', 'USERVICE_URL'],
  //message
  post_usermessage_queryCompany: ['/usermessage/queryCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_querySystem: ['/usermessage/querySystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_read: ['/usermessage/read', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readCompany: ['/usermessage/readCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readSystem: ['/usermessage/readSystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  get_messagesetting_query: ['/messagesetting/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_companymessage_query: ['/companymessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_company_addcompanymessage: ['/companymessage/addcompanymessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_systemmessage_query: ['/systemmessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_addsystemmessage: ['/systemmessage/addsystemmessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_updateread: ['/systemmessagesubscribe/updateread', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_messagesetting_updatesetting: ['/messagesetting/updatesetting', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  //logs
  post_bizloQuery: ['/bizlog/query', 'UBIZLOG_URL', 'UBIZLOG_URL'],
  //Personal Setting
  get_user_profile: ['/user/profile', 'UUSER_URL', 'UUSER_URL'],
  put_user_profile: ['/user/profile', 'UUSER_URL', 'UUSER_URL'],
  put_user_profile_password: ['/user/profile/password', 'UUSER_URL', 'UUSER_URL'],
  //qc order
  post_qc_page: ['/qc/page', 'BASE_URL'],
  post_qc_detail_page: ['/qc/detail/page', 'BASE_URL'],

  //元数据
  POST_CODE_PART: ['/code/part', 'UMETA_URL', 'UMETA_URL'],
  GET_COUNTRY_ALL: ['/country/all', 'UMETA_URL', 'UMETA_URL'],
  get_currency_all: ['/currency/all', 'UMETA_URL', 'UMETA_URL'],

  //warehouse
  post_warehouse_page: ['/warehouse/overview/page', 'BASE_URL'],
  // post_warehouse_page: ['/warehouse/overview/page','UWAREHOUSE_URL']
  get_qc_getById: ['/qc/getById', 'USERVICE_URL', 'USERVICE_URL'],
  post_qc_result_save: ['/qc/result/save', 'USERVICE_URL', 'USERVICE_URL'],

  //user
  get_user_list: ['/user/list', 'UUSER_URL', 'UUSER_URL'], //获取当前登录用户所在企业下所有用户信息
  get_user_privilege: ['/user/privilege', 'UUSER_URL', 'UUSER_URL'],
  GET_DEPARTMENT: ['/department', 'UUSER_URL', 'UUSER_URL'],

  //track
  get_track_getTrackInfoByPage: ['/track/getTrackInfoByPage', 'UWORKBENCH_URL', 'UWORKBENCH_URL'],

  //company info
  post_servicer_account: ['/servicer/account','BASE_CS','USERVICE_URL'],
  post_servicer_account_id: ['/servicer/account','BASE_CS','USERVICE_URL'],
  post_servicer_address: ['/servicer/address','BASE_CS','USERVICE_URL'],
  post_servicer_address_id: ['/servicer/address','BASE_CS','USERVICE_URL'],
  post_servicer_concat: ['/servicer/concat','BASE_CS','USERVICE_URL'],
  post_servicer_concat_id: ['/servicer/concat','BASE_CS','USERVICE_URL'],
  post_servicer_deleteAccount: ['/servicer/deleteAccount/{id}','BASE_CS','USERVICE_URL'],
  post_servicer_deleteAddress: ['/servicer/deleteAddress/{id}','BASE_CS','USERVICE_URL'],
  post_servicer_deleteConcat: ['/servicer/deleteConcat/{id}','BASE_CS','USERVICE_URL'],
  post_servicer_getServicer: ['/servicer/getServicer','BASE_CS','USERVICE_URL'],
  post_servicer: ['/servicer','BASE_CS','USERVICE_URL'],
  post_servicer_purchase_batchUpload: ['/supplier/purchase/oss/company/batchUpload','BASE_CS','USERVICE_URL'],
  post_servicer_purchase_upload: ['/supplier/purchase/oss/company/upload','BASE_CS','USERVICE_URL'],
  post_purchase_customer_updateIsSetting:['/servicer/updateIsSetting/{id}','BASE_CS', 'USERVICE_URL'],

}

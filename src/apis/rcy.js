'use strict';
export default {
    //customer
    post_getCustomerList: ['/servicer/customer/overview', 'BASE_CS', 'USERVICE_URL'],
    post_deleteCustomerRemark: ['/servicer/customer/deleteRemark/{id}', 'BASE_CS', 'USERVICE_URL'],
    post_customerDetail: ['/servicer/customer/{id}', 'BASE_CS', 'USERVICE_URL'],
    post_getCustomerListRemark: ['/servicer/customer/listRemarks', 'BASE_CS', 'USERVICE_URL'],
    post_addCustomerListRemark: ['/servicer/customer/remark', 'BASE_CS', 'USERVICE_URL'],
    post_delete_CustomerRemark: ['/servicer/customer/deleteRemark/{id}', 'BASE_CS', 'USERVICE_URL'],
    post_customerUpdataRmark: ['/servicer/customer/remark', 'BASE_CS', 'USERVICE_URL'],
    post_deleteCustomer:['/servicer/customer/batchDelete','BASE_CS', 'USERVICE_URL'],
    post_batchRecover:['/servicer/customer/batchRecover','BASE_CS', 'USERVICE_URL'],
    post_servicer_customer_history:['/servicer/customer/history','BASE_CS', 'USERVICE_URL'],

    //字典表数据
    post_codePart:['/code/part','BASE_CODE','USERVICE_URL'],
    post_country:['/country/all','BASE_CODE','USERVICE_URL'],
    post_logisticsport:['/logisticsport/query','BASE_CODE','USERVICE_URL']
}

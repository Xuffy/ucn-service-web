export default {
    //ADRESS
    country: {
      key: 'country',
      belong: "address",
    _hide:true
    },
    province: {
      key: 'province',
      belong: "address",
      _hide:true
    },
    city: {
      key: 'city',
      belong: "address",
      _hide:true
    },
    address: {
      key: 'address',
      belong: "address",
      _hide:true
    },
    receiveCountry: {
      key: 'receiveCountry',
      belong: "address",
      _hide:true
    },
    receiveProvince: {
      key: 'receiveProvince',
      belong: "address",
      _hide:true
    },
    receiveCity: {
      key: 'receiveCity',
      belong: "address",
      _hide:true
    },
    receiverAddress1: {
      key: 'receiveAddress',
      belong: "address",
      _hide:true
    },
    notify: {
        key: "notify",
        belong: "address"
    },
    id: {
        _hide: true,
        key: "id",
    },
    companyAddress:{
      key: '',
      _important:true,
    },
    receiverAddress:{
      key: '',
      _important:true,
    },

    //.............concats
    contactName: {
      key: 'name',
      belong: "concats"
    },
    department: {
      key: 'deptName',
      belong: "concats"
    },
    gender: {
      key: 'gender',
      belong: "concats"
    },
    position: {
      key: 'position',
      belong: "concats"
    },
   mobileNo: {
      key: 'cellphone',
     belong: "concats"
    },
    tel: {
      key: 'telphone',
      belong: "concats"
    },
   faxNumber: {
      key: 'fax',
     belong: "concats"
    },
    email: {
      key: 'email',
      belong: "concats"
    },
    skype: {
      key: 'skype',
      belong: "concats"
    },
    qq: {
      key: 'qq',
      belong: "concats"
    },
    //       order
    orderNo: {
      key: 'qcOrderNo',
      belong: "order"
    },
    orderPrice: {
      key: '',
      belong: "order"
    },
   // remark
  time: {
    key: 'updateDt',
    belong: "remark",
    type:"textDate"
  },
  remark: {
    key: 'remark',
    belong: "remark"
  },
  operater: {
    key: 'entryName',
    belong: "remark"
  },
  version: {
    key: 'version',
    belong: "remark",
    _hide: true,
  },
  id: {
    key: 'id',
    belong: "remark",
    _hide: true,
  },
    // documentRequired:{
    //     key:"document"
    // },
    // factoryInspectionReport:{
    //     key:"factoryInspectionReport"
    // },
    // invoice:{
    //     key:'invoice'
    // },
    // examiningReport:{
    //     key:'examiningReport'
    // },
    // packingList:{
    //     key:"packingList"
    // },
    // examiningReport:{
    //     key:"examiningReport"
    // }
}

export default {
    //ADRESS
  country: {
    key: 'country',
    belong: "address"
  },
  province: {
    key: 'province',
    belong: "address"
  },
  city: {
    key: 'city',
    belong: "address"
  },
  companyAddress: {
    key: 'address',
    belong: "address"
  },
  receiveCountry: {
    key: 'receiveCountry',
    belong: "address"
  },
  receiveProvince: {
    key: 'receiveProvince',
    belong: "address"
  },
  receiveCity: {
    key: 'receiveCity',
    belong: "address"
  },
  receiverAddress: {
    key: 'receiveAddress',
    belong: "address"
  },
  notify: {
      key: "notify",
      belong: "address"
  },
  id: {
      _hide: true,
      key: "id",
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

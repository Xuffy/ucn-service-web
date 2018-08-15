export default {
  factoryName: {
    key: 'name',
  },
  factoryAddress:{
    _important:true
  },
  country: {
    key:'country',
    _hide:true
  },
  province: {
    key:'province',
    _hide:true
  },
  city: {
    key:'city',
    _hide:true
  },
  address: {
    key:'address',
    _hide:true
  },
  exportPort: {
    key: 'exportPort',
  },
  ContacctPerson1:{
    key: 'contactPerson1',
    _rules:{
      required:true,
    }
  },
  contactPhoneNo1: {
    key: 'concatPhone1',
    _rules:{
      required:true,
      type:'Number',
    }
  },
  contacctPerson2:{
    key: 'contacctPerson2',
  },
  contactPhoneNo2: {
    key: 'contactPhone2',
    _rules:{
      type:'Number',
    }
  },
  id:{
    key: 'id',
    _hide:true,
  },
  defaultAddress: {
    key: 'def'
  }
}

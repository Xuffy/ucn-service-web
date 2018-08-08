export default {
    qcOrderNo:{
        type:'input',
        disabled:true
    },
    qcTypeDictCode:{
        type:'select',
        isQcType:true
    },
    qcDate:{
        type:'date',
    },
    factoryAddress:{
        type:'input',
        disabled:true
    },
    factoryContactPhone:{
        type:'input',
        disabled:true
    },
    qcStatusDictCode:{
        type:'select',
        isQcStatus:true,
        disabled:true
    },
    qcMethodDictCode:{
        type:'select',
        isQcMethod:true,
        _rules:{
            required:true
        }
    },
    surveyor:{
        type:'input',
        isSurveyor:true
    },
    serviceFee:{
        type:'number'
    },
    // serviceName:{
    //     type:'select',
    //     disabled:true,
    //     isServiceName:true
    // },
    exchangeCurrencyDictCode:{
        type:'select',
        disabled:true,
        isCurrency:true
    },
    remark:{
        type:'textarea',
        disabled:true,
        fullLine:true
    },
    attachment:{
        key:'attachments',
        type:'attachment',
        fullLine:true
    },
}
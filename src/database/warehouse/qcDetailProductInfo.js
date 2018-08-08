export default{
    id: {
        _hide: true
    },
    skuId:{
        _hide:true
    },
    orderNo:{
        _hide:true
    },
    skuQcResultDictCode: {
        key: 'skuQcResultDictCode',
        type: 'String',
        showType:'select',
        isQcResult:true,
        isFWS: true
    },
    innerCartonLength:{
        key: 'innerCartonLength',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS: true
    },
    innerCartonWidth:{
        key: 'innerCartonWidth',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    innerCartonHeight:{
        key: 'innerCartonHeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    innerCartonNetWeight:{
        key: 'innerCartonNetWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    innerCartonGrossWeight:{
        key: 'innerCartonGrossWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    innerCartonVolume:{
        key: 'innerCartonVolume',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 3,
        isFWS:true
    },
    outerCartonLength:{
        key: 'outerCartonLength',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2
    },
    outerCartonWidth:{
        key: 'outerCartonWidth',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    outerCartonHeight:{
        key: 'outerCartonHeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    outerCartonNetWeight:{
        key: 'outerCartonNetWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    outerCartonGrossWeight:{
        key: 'outerCartonGrossWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        accuracy: 2,
        isFWS:true
    },
    qualifiedSkuCartonTotalQty:{
        key: 'qualifiedSkuCartonTotalQty',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        _calculate:true,
        accuracy: 2,
        isFWS:true
    },
    checkOuterCartonQty:{
        key: 'checkOuterCartonQty',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        _calculate:true,
        accuracy: 2,
        isFWS:true
    },
    actOuterCartonSkuQty:{
        key: 'actOuterCartonSkuQty',
        type: 'Number',
        showType:'number',
        accuracy: 2,
        isFWS: true
    },
    actOuterCartonInnerBoxQty:{
        key: 'actOuterCartonInnerBoxQty',
        type: 'Number',
        showType:'number',
        accuracy: 2,
        isFWS: true
    },
    actInnerCartonSkuQty:{
        key: 'actInnerCartonSkuQty',
        type: 'Number',
        showType:'number',
        accuracy: 2,
        isFWS: true
    },
    unqualifiedSkuCartonTotalQty:{
        key: 'unqualifiedSkuCartonTotalQty',
        type: 'Number',
        showType:'number',
        _calculate:true,
        accuracy: 2,
        isFWS:true
    },
    unqualifiedType:{
        key: 'unqualifiedType',
        type: 'String',
        showType:'input',
        isFWS:true
    },
    skuBarCodeResultDictCode:{
        key: 'skuBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    skuLabelResultDictCode:{
        key: 'skuLabelResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    innerPackingBarCodeResultDictCode:{
        key: 'innerPackingBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    outerCartonBarCodeResultDictCode:{
        key: 'outerCartonBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    shippingMarkResultDictCode:{
        key: 'shippingMarkResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    qcPics:{             //服务商上传
        key: 'qcPics',
        type: 'String',
        showType:'pic',
        _rules:{
            // required:true
        },
        _image:true,
        imgNum: 0,
        pleaseText: '',
        isFWS: true
    },
    remark:{
        key: 'remark',
        type: 'String',
        showType:'input',
        isFWS:true
    },
    skuInventoryStatusDictCode:{
        key: 'skuInventoryStatusDictCode',
        type: 'String'
    },
    skuCode: {
        key: 'skuCode',
        type: 'String'
    },
    customerSkuCode: {
        key: 'customerSkuCode',
        type: 'String'
    },
    // factorySkuCode: {
    //     key: 'factorySkuCode',
    //     type: 'String'
    // },
    skuNameCn: {
        key: 'skuNameCn',
        type: 'String'
    },
    skuBrand: {
        key: 'skuBrand',
        type: 'String'
    },
    skuDesign: {
        key: 'skuDesign',
        type: 'String'
    },
    packingMethodCn: {
        key: 'packingMethodCn',
        type: 'String'
    },
    innerCartonPackingMethodCn: {
        key: 'innerCartonPackingMethodCn',
        type: 'String'
    },
    deliveryDate: {
        key: 'deliveryDate',
        type: 'String'
    },
    skuUnitDictCode: {
        key: 'skuUnitDictCode',
        type: 'String'
    },
    lengthUnitDictCode: {
        key: 'lengthUnitDictCode',
        type: 'String'
    },
    volumeUnitDictCode: {
        key: 'volumeUnitDictCode',
        type: 'String'
    },
    weightUnitDictCode: {
        key: 'weightUnitDictCode',
        type: 'String'
    },
    inboundNo: {
        key: 'inboundNo',
        type: 'String'
    },
    orderSkuQty: {
        key: 'orderSkuQty',
        type: 'Number',
        _calculate:true
    },
    expectQcQty: {
        key: 'expectQcQty',
        type: 'Number',
        _calculate:true
    },
    samplingRate: {
        key: 'samplingRate',
        type: 'String'
    },
    // unqualifiedProcessingMode: {
    //     key: 'unqualifiedProcessingMode',
    //     type: 'String'
    // },
    outerCartonTotalQty: {
        key: 'outerCartonTotalQty',
        type: 'Number'
    },
    skuLength: {
        key: 'skuLength',
        type: 'Number',
        isFWS:true
    },
    skuWidth: {
        key: 'skuWidth',
        type: 'Number'
    },
    skuHeight: {
        key: 'skuHeight',
        type: 'Number'
    },
    skuNetWeight:{
        key: 'skuNetWeight',
        type: 'Number'
    },
    outerCartonSkuQty:{
        key: 'outerCartonSkuQty',
        type: 'Number'
    },
    
    outerCartonInnerBoxQty:{
        key: 'outerCartonInnerBoxQty',
        type: 'Number'
    },
    
    innerCartonSkuQty:{
        key: 'innerCartonSkuQty',
        type: 'Number'
    },
    
    
    outerCartonVolume:{
        key: 'outerCartonVolume',       //计算？？？？
        type: 'Number',
    },
    
    actSkuCartonTotalQty:{              //计算？？？？
        key: 'actSkuCartonTotalQty',
        type: 'Number',
        _calculate:true
    },
    
    
    actSkuQty:{              //计算？？？？
        key: 'actSkuQty',
        type: 'Number',
        _calculate:true
    },
    qualifiedSkuQty:{              //计算？？？？
        key: 'qualifiedSkuQty',
        type: 'Number',
        _calculate:true
    },
    unqualifiedSkuQty:{              //计算？？？？
        key: 'unqualifiedSkuQty',
        type: 'Number',
        _calculate:true
    },
    qualifiedSkuNetWeight:{              //计算？？？？
        key: 'qualifiedSkuNetWeight',
        type: 'Number',
        _calculate:true
    },
    unqualifiedSkuNetWeight:{              //计算？？？？
        key: 'unqualifiedSkuNetWeight',
        type: 'Number',
        _calculate:true
    },
    qualifiedSkuVolume:{              //计算？？？？
        key: 'qualifiedSkuVolume',
        type: 'Number',
        _calculate:true
    },
    unqualifiedSkuVolume:{              //计算？？？？
        key: 'unqualifiedSkuVolume',
        type: 'Number',
        _calculate:true
    },
    qualifiedSkuGrossWeight:{              //计算？？？？
        key: 'qualifiedSkuGrossWeight',
        type: 'Number',
        _calculate:true
    },
    unqualifiedSkuGrossWeight:{              //计算？？？？
        key: 'unqualifiedSkuGrossWeight',
        type: 'Number',
        _calculate:true
    },
    
    skuBarCode:{
        key: 'skuBarCode',
        type: 'String'
    },
    
    skuLabel:{
        key: 'skuLabel',
        type: 'String'
    },
    
    innerPackingBarCode:{
        key: 'innerPackingBarCode',
        type: 'String'
    },
    
    outerCartonBarCode:{
        key: 'outerCartonBarCode',
        type: 'String',
        isFWS:true
    },
    
    shippingMark:{
        key: 'shippingMark',
        type: 'String'
    },
    
    
}

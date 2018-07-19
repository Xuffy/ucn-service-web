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
        isQcResult:true
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
    factorySkuCode: {
        key: 'factorySkuCode',
        type: 'String'
    },
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
    unqualifiedProcessingMode: {
        key: 'unqualifiedProcessingMode',
        type: 'String'
    },
    outerCartonTotalQty: {
        key: 'outerCartonTotalQty',
        type: 'Number'
    },
    skuLength: {
        key: 'skuLength',
        type: 'Number'
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
    actOuterCartonSkuQty:{
        key: 'actOuterCartonSkuQty',
        type: 'Number',
        showType:'number'
    },
    outerCartonInnerBoxQty:{
        key: 'outerCartonInnerBoxQty',
        type: 'Number'
    },
    actOuterCartonInnerBoxQty:{
        key: 'actOuterCartonInnerBoxQty',
        type: 'Number',
        showType:'number'
    },
    innerCartonSkuQty:{
        key: 'innerCartonSkuQty',
        type: 'Number'
    },
    actInnerCartonSkuQty:{
        key: 'actInnerCartonSkuQty',
        type: 'Number',
        showType:'number'
    },
    innerCartonLength:{
        key: 'innerCartonLength',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    innerCartonWidth:{
        key: 'innerCartonWidth',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    innerCartonHeight:{
        key: 'innerCartonHeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    innerCartonNetWeight:{
        key: 'innerCartonNetWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    innerCartonGrossWeight:{
        key: 'innerCartonGrossWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    innerCartonVolume:{
        key: 'innerCartonVolume',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outerCartonLength:{
        key: 'outerCartonLength',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outerCartonWidth:{
        key: 'outerCartonWidth',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outerCartonHeight:{
        key: 'outerCartonHeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outerCartonNetWeight:{
        key: 'outerCartonNetWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outerCartonVolume:{
        key: 'outerCartonVolume',       //计算？？？？
        type: 'Number',
    },
    outerCartonGrossWeight:{
        key: 'outerCartonGrossWeight',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        }
    },
    actSkuCartonTotalQty:{              //计算？？？？
        key: 'actSkuCartonTotalQty',
        type: 'Number',
        _calculate:true
    },
    qualifiedSkuCartonTotalQty:{
        key: 'qualifiedSkuCartonTotalQty',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        _calculate:true
    },
    unqualifiedSkuCartonTotalQty:{
        key: 'unqualifiedSkuCartonTotalQty',
        type: 'Number',
        showType:'number',
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
    unqualifiedType:{
        key: 'unqualifiedType',
        type: 'String',
        showType:'input'
    },
    skuBarCode:{
        key: 'skuBarCode',
        type: 'String'
    },
    skuBarCodeResultDictCode:{
        key: 'skuBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    skuLabel:{
        key: 'skuLabel',
        type: 'String'
    },
    skuLabelResultDictCode:{
        key: 'skuLabelResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    innerPackingBarCode:{
        key: 'innerPackingBarCode',
        type: 'String'
    },
    innerPackingBarCodeResultDictCode:{
        key: 'innerPackingBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    outerCartonBarCode:{
        key: 'outerCartonBarCode',
        type: 'String'
    },
    outerCartonBarCodeResultDictCode:{
        key: 'outerCartonBarCodeResultDictCode',
        type: 'String',
        showType:'select',
        isBarCodeResult:true
    },
    shippingMark:{
        key: 'shippingMark',
        type: 'String'
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
        _image:true
    },
    checkOuterCartonQty:{
        key: 'checkOuterCartonQty',
        type: 'Number',
        showType:'number',
        _rules:{
            required:true,
            type:'Number'
        },
        _calculate:true
    },
    remark:{
        key: 'remark',
        type: 'String',
        showType:'input'
    },
}

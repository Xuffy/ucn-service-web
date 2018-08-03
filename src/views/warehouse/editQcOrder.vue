<template>
    <div class="qc-detail" v-loading="loadingData">
        <div class="title">
            <span>{{$i.warehouse.qcOrderDetail}}</span>
        </div>

        <div class="second-title">
            {{$i.warehouse.basicInfo}}
        </div>
        <div>
            <el-form label-width="190px">
                <el-row class="speZone">
                    <el-col v-for="v in $db.warehouse.qcOrderDetailBasicInfo" :key="v.key" class="speCol" :xs="24"
                            :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item :label="$i.warehouse[v.key]" :required="v._rules?v._rules.required:false">
                            <div v-if="v.type==='input'">
                                <el-input
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='select'">
                                <el-select
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        clearable
                                        :disabled="v.disabled"
                                        :placeholder="$i.warehouse.pleaseChoose">
                                    <div v-if="v.isQcType">
                                        <el-option
                                                v-for="item in qcTypeOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcStatus">
                                        <el-option
                                                v-for="item in qcStatusOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcMethod">
                                        <el-option
                                                v-for="item in qcMethodOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isSurveyor">
                                        <el-option
                                                v-for="item in surveyorOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isServiceName">
                                        <el-option
                                                v-for="item in serviceList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isCurrency">
                                        <el-option
                                                v-for="item in currencyOptions"
                                                :key="item.id"
                                                :label="item.code"
                                                :value="item.code">
                                        </el-option>
                                    </div>

                                </el-select>
                            </div>
                            <div v-else-if="v.type==='date'">
                                <el-date-picker
                                        size="mini"
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        align="right"
                                        type="date"
                                        :placeholder="$i.warehouse.pleaseChoose"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                            <div v-else-if="v.type==='number'">
                                <v-input-number
                                        class="speInput speNumber"
                                        :controls="false"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled"></v-input-number>
                            </div>
                            <div v-else-if="v.type==='attachment'">
                                <v-upload readonly :list="qcDetail[v.key]" :limit="20"
                                          ref="attachmentUpload"></v-upload>
                            </div>
                            <div v-else-if="v.type==='textarea'">
                                <el-input
                                        class="speInput"
                                        type="textarea"
                                        :disabled="true"
                                        :autosize="{ minRows: 2}"
                                        :placeholder="$i.warehouse.pleaseInput"
                                        v-model="qcDetail[v.key]">
                                </el-input>
                            </div>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="product-info">
            <div class="second-title">
                {{$i.warehouse.productInfo}}
            </div>
            <div class="gear">
                <v-filter-column
                    ref="filterColumn"
                    code="uwarehouse_qc_order_detail"
                    :table-ref="() => $refs.tableBox"
                    @change="changeColumn">
                </v-filter-column>
            </div>
            <el-table
                    class="product-table"
                    v-loading="loadingProductInfoTable"
                    :data="productInfoData"
                    border
                    ref="tableBox"
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        fixed="left"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        v-for="v in columnConfig"
                        v-if="!v._hidden && !v._hide"
                        :prop="v.key"
                        align="center"
                        :key="v.key"
                        :label-class-name="'location-' + v.key"
                        :label="$i.warehouse[v.key]"
                        :class-name="tableRequired[v.key]? 'ucn-table-required' : ''"
                        width="180">
                    <template slot-scope="scope" v-if="scope.row[v.key]">
                        <div v-if="v.key === 'deliveryDate'">
                            {{$dateFormat(scope.row[v.key].value,"yyyy-mm-dd")}}
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <div v-if="v.isQcResult">
                                <el-select clearable v-model="scope.row[v.key].value"
                                           :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in qcResultOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isBarCodeResult">
                                <el-select clearable v-model="scope.row[v.key].value"
                                           :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in barCodeResult"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                            </div>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <div v-if="v.key==='outerCartonLength' || v.key==='outerCartonWidth' || v.key==='outerCartonHeight' || v.key==='qualifiedSkuCartonTotalQty' || v.key==='unqualifiedSkuCartonTotalQty' || v.key==='actOuterCartonSkuQty' || v.key==='outerCartonNetWeight' || v.key==='outerCartonGrossWeight'">
                                <div v-if="v.key === 'actOuterCartonSkuQty' || v.key === 'qualifiedSkuCartonTotalQty' || v.key === 'unqualifiedSkuCartonTotalQty'">
                                    <v-input-number
                                        :controls="false"
                                        @blur="handleInputNumberBlur(scope.row)"
                                        v-model="scope.row[v.key].value"
                                        :mark="v.label"
                                        :accuracy="v.accuracy ? v.accuracy : null"></v-input-number>
                                    <!-- <el-input style="width:130px"
                                        :min="0"
                                        @change="val => changeInput(val, scope.row[v.key], scope.row)"
                                        type="number"
                                        v-model="scope.row[v.key].value"
                                        placeholder=""></el-input> -->
                                </div>
                                <div v-else>
                                    <v-input-number
                                        :controls="false"
                                        :mark="v.label"
                                        :accuracy="v.accuracy ? v.accuracy : null"
                                        @blur="handleInputNumberBlur(scope.row)"
                                        v-model="scope.row[v.key].value"></v-input-number>
                                </div>
                            </div>
                            <div v-else>
                                <v-input-number
                                        :controls="false"
                                        :mark="v.label"
                                        :accuracy="v.accuracy ? v.accuracy : null"
                                        v-model="scope.row[v.key].value"></v-input-number>
                            </div>
                        </div>
                        <div v-else-if="v.showType==='input'">
                            <el-input
                                    :placeholder="$i.warehouse.pleaseInput"
                                    v-model="scope.row[v.key].value"
                                    :precision="0"
                                    clearable>
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='pic'">
                            <!-- <v-upload :limit="20" :onlyImage="true" :ref="'picUpload'+scope.$index"></v-upload> -->
                            <el-popover
                                    placement="bottom"
                                    width="300"
                                    trigger="click">
                                <v-upload :limit="20"
                                          :onlyImage="true"
                                          :ref="'picUpload'+scope.$index"
                                          @change="uploadChange('picUpload'+scope.$index, scope.row[v.key])"
                                          ></v-upload>
                                <el-button slot="reference" type="text">
                                    {{(scope.row[v.key].pleaseText === '' ?  $i.warehouse.qcUpload : scope.row[v.key].pleaseText) + '(' + scope.row[v.key].imgNum + '/20' + ')'}}
                                </el-button>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{scope.row[v.key].value}}
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--fixed="right"-->
                <!--align="center"-->
                <!--:label="$i.warehouse.action"-->
                <!--width="100">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">{{$i.warehouse.detail}}</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </div>

        <div class="summary">
            <div class="second-title">
                {{$i.warehouse.summary}}
            </div>
            <el-form label-width="280px">
                <el-row class="speZone">
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.skuQuantity">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="summaryData.skuQuantity"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="footBtn">
            <el-button :disabled="loadingData" :loading="disableClickSubmit" @click="submit" type="primary">
                {{$i.warehouse.submit}}
            </el-button>
            <el-button :disabled="loadingData" @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>
    </div>
</template>
<script>

    import { VTable, VUpload, VMessageBoard, VInputNumber, VFilterColumn } from "@/components/index";
    import { mapActions } from "vuex";

    export default {
        name: "qc-detail",
        components: {
            VTable,
            VUpload,
            VMessageBoard,
            VInputNumber,
            VFilterColumn
        },
        data() {
            return {
                uploadLngth: 0,
                options: [],
                qcDetail: {},
                loadingData: false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                disableClickSubmit: false,
                /**
                 * 字典数据
                 * */
                qcTypeOption: [],
                qcMethodOption: [],
                surveyorOption: [],
                qcResultOption: [],
                barCodeResult: [],
                qcStatusOption: [],
                currencyOptions: [],

                skuUnitOption: [],       //计量单位
                lengthOption: [],
                volumeOption: [],
                weightOption: [],

                columnConfig: '',
                /**
                 * summary Data
                 * */
                summaryData: {
                    skuQuantity: 0
                },

                /**
                 * product info data
                 * */
                loadingProductInfoTable: false,
                productInfoConfig: {
                    pn: 1,
                    ps: 200,
                    qcOrderId: this.$route.query.id

                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                },
                productInfoData: [],
                selectList: [],

                /**
                 * qcOrder Config
                 * */
                qcOrderConfig: {
                    qcDate: "",
                    qcMethodDictCode: "",
                    qcOrderId: null,
                    qcOrderNo: "",
                    qcResultDetailParams: [],
                    qcTypeDictCode: "",
                    serviceFee: 0,
                    surveyor: ""
                },
                tableRequired: {
                'skuQcResultDictCode': this.$i.warehouse.skuQcResultDictCode,
                // 'expectQcQty': this.$i.warehouse.expectQcQty,
                'innerCartonLength': this.$i.warehouse.innerCartonLength,
                'innerCartonWidth': this.$i.warehouse.innerCartonWidth,
                'innerCartonHeight': this.$i.warehouse.innerCartonHeight,
                'innerCartonNetWeight': this.$i.warehouse.innerCartonNetWeight,
                'innerCartonGrossWeight': this.$i.warehouse.innerCartonGrossWeight,
                'innerCartonVolume': this.$i.warehouse.innerCartonVolume,
                'outerCartonLength': this.$i.warehouse.outerCartonLength,
                'outerCartonWidth': this.$i.warehouse.outerCartonWidth,
                'outerCartonHeight': this.$i.warehouse.outerCartonHeight,
                'outerCartonNetWeight': this.$i.warehouse.outerCartonNetWeight,
                'outerCartonGrossWeight': this.$i.warehouse.outerCartonGrossWeight,
                'qualifiedSkuCartonTotalQty': this.$i.warehouse.qualifiedSkuCartonTotalQty,
                // 'qualifiedSkuQty': this.$i.warehouse.qualifiedSkuQty,
                // 'qualifiedSkuNetWeight': this.$i.warehouse.qualifiedSkuNetWeight,
                // 'qualifiedSkuVolume':this.$i.warehouse.qualifiedSkuVolume,
                // 'qualifiedSkuGrossWeight':this.$i.warehouse.qualifiedSkuGrossWeight,
                // 'qcPics':this.$i.warehouse.qcPic,
                'checkOuterCartonQty':this.$i.warehouse.checkOuterCartonQty}
            };
        },
        methods: {
            ...mapActions(["setMenuLink"]),
            changeColumn(val) {
                this.productInfoData = this.$refs.filterColumn.getFilterData(this.productInfoData, val);
                this.columnConfig = this.productInfoData[0];
            },
            getQcOrderDetail() {
                this.loadingData = true;
                this.$ajax.get(`${this.$apis.get_serviceOrderDetail}?id=${this.$route.query.id}`)
                    .then(res => {
                        this.qcDetail = res;
                        this.loadingData = false;
                    }).catch(err => {
                        this.loadingData = false;
                    }
                );
            },
            getProductInfo() {
                this.loadingProductInfoTable = true;
                this.$ajax.post(this.$apis.get_serviceQcOrderProduct, this.productInfoConfig).then(res => {
                    this.productInfoData = res.datas;
                    // console.log(this.productInfoData, "this.productInfoData");
                    // console.log(this.lengthOption,'lengthOption')

                    this.productInfoData.forEach(v => {
                        v.skuQcResultDictCode = "";
                        v.skuUnitDictCode=(_.findWhere(this.skuUnitOption,{code:v.skuUnitDictCode}) || {}).name;
                        v.volumeUnitDictCode=(_.findWhere(this.volumeOption,{code:v.volumeUnitDictCode}) || {}).name;
                        v.weightUnitDictCode=(_.findWhere(this.weightOption,{code:v.weightUnitDictCode}) || {}).name;
                        v.lengthUnitDictCode=(_.findWhere(this.lengthOption,{code:v.lengthUnitDictCode}) || {}).name;

                    });
                    let diffData = [];
                    _.map(this.productInfoData, v => {
                        diffData.push(v.skuId + v.orderNo);
                    });
                    this.summaryData.skuQuantity = _.uniq(diffData).length;
                    this.loadingProductInfoTable = false;
                    let arr = this.$copyArr(this.productInfoData)
                    arr = this.$getDB(this.$db.warehouse.qcDetailProductInfo, arr);
                    this.$refs.filterColumn.update(false, arr).then(data => {
                        // console.log(data)
                        this.productInfoData = this.$refs.filterColumn.getFilterData(arr, data);
                        this.columnConfig = this.productInfoData[0];
                    });
                }).catch(err => {
                    this.loadingProductInfoTable = false;
                });
            },

            /**
             * product info表格事件
             * */
            btnClick(e) {
                // console.log(e);
            },
            changeChecked(e) {
                this.selectList = e;
            },
            handleClick(e) {
                this.$windowOpen({
                    url: "/product/sourcingDetail",
                    params: {
                        id: e.skuId
                    }
                });
            },
            submit() {
                if (!this.qcDetail.qcMethodDictCode) {
                    return this.$message({
                        message: this.$i.warehouse.pleaseChooseQcMethod,
                        type: "warning"
                    });
                }
                this.qcOrderConfig.qcDate = this.qcDetail.qcDate;
                this.qcOrderConfig.qcMethodDictCode = this.qcDetail.qcMethodDictCode;
                this.qcOrderConfig.qcOrderId = this.$route.query.id;
                this.qcOrderConfig.qcOrderNo = this.qcDetail.qcOrderNo;
                this.qcOrderConfig.qcTypeDictCode = this.qcDetail.qcTypeDictCode;
                this.qcOrderConfig.surveyor = this.qcDetail.surveyor;
                this.qcOrderConfig.serviceFee = this.qcDetail.serviceFee;
                let allow = true;
                this.productInfoData.forEach((v, k) => {
                    if (v.actOuterCartonSkuQty || v.actOuterCartonInnerBoxQty || v.actInnerCartonSkuQty || v.innerCartonLength || v.innerCartonWidth || v.innerCartonHeight || v.innerCartonNetWeight || v.innerCartonGrossWeight || v.innerCartonVolume || v.outerCartonLength || v.outerCartonWidth || v.outerCartonHeight || v.outerCartonNetWeight || v.outerCartonGrossWeight || v.qualifiedSkuCartonTotalQty || v.unqualifiedSkuCartonTotalQty || v.unqualifiedType || v.skuBarCodeResultDictCode || v.skuLabelResultDictCode || v.innerPackingBarCodeResultDictCode || v.outerCartonBarCodeResultDictCode || v.shippingMarkResultDictCode || v.remark || this.$refs["picUpload" + k][0].getFiles().length > 0) {
                        if (!v.skuQcResultDictCode.value) {
                            allow = false;
                        }
                    }
                });
                if (!allow) {
                    return this.$message({
                        message: this.$i.warehouse.mustHaveQcResult,
                        type: "warning"
                    });
                }

                this.qcOrderConfig.qcResultDetailParams = [];
                this.productInfoData.forEach(v => {
                    let skuQcResultDictCode;
                    if (v.skuQcResultDictCode) {
                        skuQcResultDictCode = v.skuQcResultDictCode.value;
                    } else {
                        skuQcResultDictCode = "WAIT_FOR_QC";
                    }
                    this.qcOrderConfig.qcResultDetailParams.push({
                        actInnerCartonSkuQty: v.actInnerCartonSkuQty.value ? v.actInnerCartonSkuQty.value : 0,
                        actOuterCartonInnerBoxQty: v.actOuterCartonInnerBoxQty.value ? v.actOuterCartonInnerBoxQty.value : 0,
                        actOuterCartonSkuQty: v.actOuterCartonSkuQty.value ? v.actOuterCartonSkuQty.value : 0,
                        checkOuterCartonQty: v.checkOuterCartonQty.value,
                        innerCartonGrossWeight: v.innerCartonGrossWeight.value,
                        innerCartonHeight: v.innerCartonHeight.value,
                        innerCartonLength: v.innerCartonLength.value,
                        innerCartonNetWeight: v.innerCartonNetWeight.value,
                        innerCartonVolume: v.innerCartonVolume.value,
                        innerCartonWidth: v.innerCartonWidth.value,
                        innerPackingBarCodeResultDictCode: v.innerPackingBarCodeResultDictCode.value,
                        outerCartonBarCodeResultDictCode: v.outerCartonBarCodeResultDictCode.value,
                        outerCartonGrossWeight: v.outerCartonGrossWeight.value,
                        outerCartonHeight: v.outerCartonHeight.value,
                        outerCartonLength: v.outerCartonLength.value,
                        outerCartonNetWeight: v.outerCartonNetWeight.value,
                        outerCartonWidth: v.outerCartonWidth.value,
                        qcOrderDetailId: v.id.value,
                        qcPics: v.qcPics.value,
                        qualifiedSkuCartonTotalQty: v.qualifiedSkuCartonTotalQty.value,
                        remark: v.remark.value,
                        shippingMarkResultDictCode: v.shippingMarkResultDictCode.value,
                        skuBarCodeResultDictCode: v.skuBarCodeResultDictCode.value,
                        skuLabelResultDictCode: v.skuLabelResultDictCode.value,
                        skuQcResultDictCode: skuQcResultDictCode,
                        unqualifiedSkuCartonTotalQty: v.unqualifiedSkuCartonTotalQty.value ? v.unqualifiedSkuCartonTotalQty.value : 0,
                        unqualifiedType: v.unqualifiedType.value
                    });
                });
                let flag = true
                _.map(this.qcOrderConfig.qcResultDetailParams, (v, k) => {
                    v.qcPics = this.$refs["picUpload" + k][0].getFiles();
                });
                for (let i = 0; i < this.qcOrderConfig.qcResultDetailParams.length; i++) {
                    if (this.$validateForm(this.qcOrderConfig.qcResultDetailParams[i], this.$db.warehouse.qcDetailProductInfo)) {
                        return;
                    }
                }
                this.disableClickSubmit = false;
                this.$ajax.post(this.$apis.save_serviceQcOrder, this.qcOrderConfig).then(res => {
                    this.disableClickSubmit = false;
                    this.$message({
                        message: this.$i.warehouse.submitSuccess,
                        type: "success"
                    });
                    this.$router.push("/warehouse/overview");
                }).catch(err => {
                    this.disableClickSubmit = false;
                });
            },
            cancel() {
                window.close();
            },
            mul(a, b) { // 乘
                var c = 0,
                    d = a.toString(),
                    e = b.toString();
                try {
                    c += d.split(".")[1].length;
                } catch (f) {}
                try {
                    c += e.split(".")[1].length;
                } catch (f) {}
                return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
            },
            jia(a, b) {
                var c, d, e;
                try {
                    c = a.toString().split(".")[1].length;
                } catch (f) {
                    c = 0;
                }
                try {
                    d = b.toString().split(".")[1].length;
                } catch (f) {
                    d = 0;
                }
                return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
            },
            /**
             * product info事件
             * */
            handleInputNumberBlur(e) {
                //计算外箱体积
                let outerCartonLength = (e.outerCartonLength.value ? e.outerCartonLength.value : 0);
                let outerCartonWidth = (e.outerCartonWidth.value ? e.outerCartonWidth.value : 0);
                let outerCartonHeight = (e.outerCartonHeight.value ? e.outerCartonHeight.value : 0);
                e.outerCartonVolume.value = this.mul(this.mul(outerCartonLength,outerCartonWidth),outerCartonHeight);

                //计算实际产品总箱数
                let qualifiedSkuCartonTotalQty = (e.qualifiedSkuCartonTotalQty.value ? e.qualifiedSkuCartonTotalQty.value : 0);
                let unqualifiedSkuCartonTotalQty = (e.unqualifiedSkuCartonTotalQty.value ? e.unqualifiedSkuCartonTotalQty.value : 0);
                // e.actSkuCartonTotalQty.value = qualifiedSkuCartonTotalQty + unqualifiedSkuCartonTotalQty;
                e.actSkuCartonTotalQty.value = this.jia(qualifiedSkuCartonTotalQty,unqualifiedSkuCartonTotalQty);
                

                //计算合格产品数量
                let actOuterCartonSkuQty = (e.actOuterCartonSkuQty.value ? e.actOuterCartonSkuQty.value : 0);
                e.qualifiedSkuQty.value = this.mul(qualifiedSkuCartonTotalQty,actOuterCartonSkuQty)
                // (e.qualifiedSkuCartonTotalQty.value ? e.qualifiedSkuCartonTotalQty.value : 0) * (e.actOuterCartonSkuQty.value ? e.actOuterCartonSkuQty.value : 0);

                //计算不合格产品数量
                e.unqualifiedSkuQty.value = this.mul(unqualifiedSkuCartonTotalQty,actOuterCartonSkuQty)
                // (e.unqualifiedSkuCartonTotalQty.value ? e.unqualifiedSkuCartonTotalQty.value : 0) * (e.actOuterCartonSkuQty.value ? e.actOuterCartonSkuQty.value : 0);

                //计算实际产品数量
                e.actSkuQty.value = this.jia((e.unqualifiedSkuQty.value ? e.unqualifiedSkuQty.value : 0), (e.qualifiedSkuQty.value ? e.qualifiedSkuQty.value : 0));

                //计算合格产品总净重
                let outerCartonNetWeight = (e.outerCartonNetWeight.value ? e.outerCartonNetWeight.value : 0);
                e.qualifiedSkuNetWeight.value = this.mul(qualifiedSkuCartonTotalQty,outerCartonNetWeight);
                // (e.outerCartonNetWeight.value ? e.outerCartonNetWeight.value : 0) * (e.qualifiedSkuCartonTotalQty.value ? e.qualifiedSkuCartonTotalQty.value : 0);

                //计算不合格总产品净重
                e.unqualifiedSkuNetWeight.value = this.mul(outerCartonNetWeight,unqualifiedSkuCartonTotalQty);
                // (e.outerCartonNetWeight.value ? e.outerCartonNetWeight.value : 0) * (e.unqualifiedSkuCartonTotalQty.value ? e.unqualifiedSkuCartonTotalQty.value : 0);

                //计算合格产品总体积
                let outerCartonVolume = (e.outerCartonVolume.value ? e.outerCartonVolume.value : 0)
                e.qualifiedSkuVolume.value = this.mul(outerCartonVolume,qualifiedSkuCartonTotalQty);
                // (e.outerCartonVolume.value ? e.outerCartonVolume.value : 0) * (e.qualifiedSkuCartonTotalQty.value ? e.qualifiedSkuCartonTotalQty.value : 0);

                //计算不合格产总品体积
                e.unqualifiedSkuVolume.value = this.mul(outerCartonVolume,unqualifiedSkuCartonTotalQty);
                // (e.outerCartonVolume.value ? e.outerCartonVolume.value : 0) * (e.unqualifiedSkuCartonTotalQty.value ? e.unqualifiedSkuCartonTotalQty.value : 0);

                //计算合格产品总毛重
                let outerCartonGrossWeight = (e.outerCartonGrossWeight.value ? e.outerCartonGrossWeight.value : 0);
                e.qualifiedSkuGrossWeight.value = this.mul(outerCartonGrossWeight,qualifiedSkuCartonTotalQty);
                // (e.outerCartonGrossWeight.value ? e.outerCartonGrossWeight.value : 0) * (e.qualifiedSkuCartonTotalQty.value ? e.qualifiedSkuCartonTotalQty.value : 0);

                //计算不合格总产品毛重
                e.unqualifiedSkuGrossWeight.value = this.mul(outerCartonGrossWeight,unqualifiedSkuCartonTotalQty);
                // (e.outerCartonGrossWeight.value ? e.outerCartonGrossWeight.value : 0) * (e.unqualifiedSkuCartonTotalQty.value ? e.unqualifiedSkuCartonTotalQty.value : 0);
            },
            changeInput (val, e, row) {
                e.value = this.$toFixed(Math.abs(val), 2, e.label)
                this.handleInputNumberBlur(row)
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.total;
                        return;
                    } else if (
                        column.property === 'expectQcQty'
                        || column.property === 'orderSkuQty'
                        || column.property === 'outerCartonTotalQty'
                        || column.property === 'actSkuCartonTotalQty'
                        || column.property === 'qualifiedSkuCartonTotalQty'
                        || column.property === 'unqualifiedSkuCartonTotalQty'
                        || column.property === 'actSkuQty'
                        || column.property === 'qualifiedSkuQty'
                        || column.property === 'unqualifiedSkuQty'
                        || column.property === 'qualifiedSkuNetWeight'
                        || column.property === 'unqualifiedSkuNetWeight'
                        || column.property === 'qualifiedSkuVolume'
                        || column.property === 'unqualifiedSkuVolume'
                        || column.property === 'qualifiedSkuGrossWeight'
                        || column.property === 'unqualifiedSkuGrossWeight'
                        || column.property === 'checkOuterCartonQty'
                        || column.property === 'actOuterCartonSkuQty'
                    ) {
                        console.log('dd')
                         const values = data.map(item => {
                             if (item[column.property] !== null) {
                                 return Number(item[column.property].value)
                             }
                         })
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    let num = ((prev * 100) + (curr * 100)) / 100;
                                    if (column.property === 'qualifiedSkuCartonTotalQty') {
                                        this.qcDetail.qualifiedSkuCartonTotalQty = num;
                                    } else if (column.property === 'unqualifiedSkuCartonTotalQty') {
                                        this.qcDetail.unqualifiedSkuCartonTotalQty = num;
                                    } else if (column.property === 'qualifiedSkuQty') {
                                        this.qcDetail.qualifiedSkuQty = num;
                                    } else if (column.property === 'unqualifiedSkuQty') {
                                        this.qcDetail.unqualifiedSkuQty = num;
                                    } else if (column.property === 'qualifiedSkuVolume') {
                                        this.qcDetail.qualifiedSkuVolume = num;
                                    } else if (column.property === 'unqualifiedSkuVolume') {
                                        this.qcDetail.unqualifiedSkuVolume = num;
                                    } else if (column.property === 'qualifiedSkuNetWeight') {
                                        this.qcDetail.qualifiedSkuNetWeight = num;
                                    } else if (column.property === 'unqualifiedSkuNetWeight') {
                                        this.qcDetail.unqualifiedSkuNetWeight = num;
                                    } else if (column.property === 'qualifiedSkuGrossWeight') {
                                        this.qcDetail.qualifiedSkuGrossWeight = num;
                                    } else if (column.property === 'unqualifiedSkuGrossWeight') {
                                        this.qcDetail.unqualifiedSkuGrossWeight = num;
                                    }
                                    return ((prev * 100) + (curr * 100)) / 100;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        } else {
                            sums[index] = "-";
                        }
                    }
                });

                return sums;
            },

            /**
             * 获取字典
             * */
            getUnit() {
                const partUnit=this.$ajax.post(this.$apis.get_partUnit, ["QC_TYPE", "QC_MD", "SKU_QC_RS", "PB_CODE", "QC_STATUS", "SKU_UNIT", "LH_UNIT", "VE_UNIT", "WT_UNIT"], { _cache: true });
                const currency=this.$ajax.get(this.$apis.get_currencyUnit, {}, { cache: true });

                this.$ajax.all([partUnit,currency]).then(res=>{
                    res[0].forEach(v => {
                        if (v.code === "QC_TYPE") {
                            this.qcTypeOption = v.codes;
                        } else if (v.code === "QC_MD") {
                            this.qcMethodOption = v.codes;
                        } else if (v.code === "SKU_QC_RS") {
                            v.codes = _.filter(v.codes, e => {
                                return e.code !== "WAIT_FOR_QC" && e.code !== "CONFIRMED";
                            });
                            this.qcResultOption = v.codes;
                        } else if (v.code === "PB_CODE") {
                            this.barCodeResult = v.codes;
                        } else if (v.code === "QC_STATUS") {
                            this.qcStatusOption = v.codes;
                        } else if (v.code === "SKU_UNIT") {
                            this.skuUnitOption = v.codes;
                        } else if (v.code === "LH_UNIT") {
                            this.lengthOption = v.codes;
                        } else if (v.code === "VE_UNIT") {
                            this.volumeOption = v.codes;
                        } else if (v.code === "WT_UNIT") {
                            this.weightOption = v.codes;
                        }
                    });
                    this.currencyOptions = res[1];
                    this.getProductInfo();
                })


                //获取验货员
                // this.$ajax.get(this.$apis.get_serviceQcSurveyor).then(res=>{
                //     // console.log(res)
                // }).catch(err=>{
                //
                // });
            },

            /**
             * 选择服务商的方法
             * */
            getService(name) {
                this.serviceList = [];
                if (!name) {
                    name = "";
                }
                this.$ajax.get(`${this.$apis.get_supplyProviders}?name=${name}`).then(res => {
                    res.forEach(v => {
                        this.serviceList.push(v);
                    });
                    this.$ajax.get(`${this.$apis.get_serviceProviders}?name=${name}`).then(res => {
                        res.forEach(v => {
                            this.serviceList.push(v);
                        });

                    }).catch(err => {

                    });
                }).catch(err => {

                });
            },
            uploadChange (ref, e) { // 图片导入成功后显示
                let length = this.$refs[ref][0].getFiles().length
                e.imgNum = length
                e.pleaseText = length > 0 ? this.$i.warehouse.ContinueQcUpload : this.$i.warehouse.qcUpload
            }
        },
        created() {
            this.getQcOrderDetail();
            this.getUnit();
            this.getService();
        },
        mounted() {
            this.setMenuLink({
                path: "/logs/index",
                query: { code: "QC" },
                type: 10,
                auth: "QC:LOG",
                label: this.$i.common.log
            });
            this.columnConfig = this.$db.warehouse.qcDetailProductInfo;
        }
    };
</script>
<style scoped>
    .title {
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color: #666666;
    }

    .second-title {
        font-size: 16px;
        color: #999999;
        padding: 10px 0;
    }

    .payment-btn {
        margin: 5px 0 10px 0;
    }

    .product-info {
        margin-top: 10px;
    }

    .speInput {
        width: 80%;
    }

    .speNumber >>> input {
        text-align: left;
    }

    .product-table >>> .el-checkbox {
        margin: 0;
    }

    .footBtn {
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 1000;
    }
    .gear{
        float: right;
        margin-right: 5px;
        margin-bottom: 5px;
    }
</style>
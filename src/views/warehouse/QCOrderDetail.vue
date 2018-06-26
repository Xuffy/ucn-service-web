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
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.qcOrderNo">
                            <el-input
                                    v-model="qcDetail.qcOrderNo"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.qcTypeDictCode">
                            <el-select style="width: 100%" placeholder="service choose" :disabled="true" class="speInput" size="mini" v-model="qcDetail.qcTypeDictCode">
                                <el-option
                                        v-for="item in qcTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcDate">
                            <el-date-picker
                                    style="width: 100%"
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="qcDetail.qcDate"
                                    align="right"
                                    type="date"
                                    placeholder="service input">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.factoryAddress">
                            <el-input
                                    v-model="qcDetail.factoryAddress"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.factoryContactPhone">
                            <el-input
                                    v-model="qcDetail.factoryContactPhone"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcStatusDictCode">
                            <el-input
                                    v-model="qcDetail.qcStatusDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcMethodDictCode">
                            <el-select style="width: 100%;" placeholder="service choose" :disabled="true" class="speInput" size="mini" v-model="qcDetail.qcMethodDictCode">
                                <el-option
                                        v-for="item in qcMethodOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.surveyor">
                            <el-input
                                    :placeholder="$i.warehouse.serviceChoose"
                                    v-model="qcDetail.surveyor"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceFee">
                            <el-input
                                    :placeholder="$i.warehouse.serviceFill"
                                    v-model="qcDetail.serviceFee"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceName">
                            <el-input
                                    v-model="qcDetail.serviceName"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.exchangeCurrencyDictCode">
                            <el-input
                                    v-model="qcDetail.exchangeCurrencyDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <!--<el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">-->
                    <!--<el-form-item prop="11" label="Time Zone">-->
                    <!--<el-input-->
                    <!--v-model="qcDetail.timeZone"-->
                    <!--:disabled="true">-->
                    <!--</el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.remark">
                            <el-input
                                    type="textarea"
                                    :autosize="{minRows: 2}"
                                    v-model="qcDetail.remark"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.attachment">
                            <v-upload readonly :list="qcDetail.attachments" :limit="20" ref="upload"></v-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="second-title">
            {{$i.warehouse.payment}}
        </div>
        <div class="payment-table">
            <el-button class="payment-btn" @click="dunningPay" :disabled="loadingPaymentTable" :loading="disableDunning" type="primary">{{$i.warehouse.pressMoney}}</el-button>
            <el-table
                    :data="paymentData"
                    border
                    :row-class-name="tableRowClassName"
                    v-loading="loadingPaymentTable"
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        align="center"
                        width="60">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="no"
                        :label="$i.warehouse.paymentNumber"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        :label="$i.warehouse.paymentName"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="planPayDt"
                        :label="$i.warehouse.estPayDate">
                    <template slot-scope="scope">
                        {{$dateFormat(scope.row.planPayDt,'yyyy-mm-dd')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="planPayAmount"
                        :label="$i.warehouse.estAmount">
                </el-table-column>
                <el-table-column
                        prop="actualPayDt"
                        :label="$i.warehouse.actPayDate">
                    <template slot-scope="scope">
                        {{$dateFormat(scope.row.actualPayDt,'yyyy-mm-dd')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actualPayAmount"
                        :label="$i.warehouse.actAmount">
                </el-table-column>
                <el-table-column
                        prop="currencyCode"
                        :label="$i.warehouse.currency">
                </el-table-column>
                <el-table-column
                        prop="status"
                        :label="$i.warehouse.available">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status===-1">{{$i.warehouse.abandon}}</span>
                        <span v-if="scope.row.status===10">{{$i.warehouse.waitCustomerConfirm}}</span>
                        <span v-if="scope.row.status===20">{{$i.warehouse.waitSupplierConfirm}}</span>
                        <span v-if="scope.row.status===30">{{$i.warehouse.waitServiceConfirm}}</span>
                        <span v-if="scope.row.status===40">{{$i.warehouse.hasConfirm}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="Action"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status!==40 && scope.row.status!==-1" @click="confirmPay(scope.row)" type="text" size="small">{{$i.warehouse.confirm}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="product-info">
            <v-table
                    :loading="loadingProductInfoTable"
                    :data="productInfoData"
                    @action="btnClick"
                    @change-checked="changeChecked">
                <template slot="header">
                    <div class="second-title">
                        {{$i.warehouse.productInfo}}
                    </div>
                </template>
            </v-table>
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
            <el-button @click="edit" v-if="qcDetail.qcStatusDictCode==='WAITING_QC'" type="primary">{{$i.warehouse.edit}}</el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>
        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>
    </div>
</template>
<script>
    import {VTable,VMessageBoard,VUpload } from '@/components/index';
    import {mapActions} from 'vuex'

    export default {
        name:'qc-detail',
        components:{
            VTable,
            VMessageBoard,
            VUpload
        },
        data(){
            return{
                qcDetail:{},
                loadingData:false,
                loadingPaymentTable:false,
                disableDunning:false,
                /**
                 * paymentTable data
                 * */
                paymentData: [],

                /**
                 * summary Data
                 * */
                summaryData:{
                    skuQuantity:0
                },

                /**
                 * product info data
                 * */
                loadingProductInfoTable:false,
                productInfoConfig:{
                    pn: 1,
                    ps: 200,
                    qcOrderId: this.$route.query.id,

                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                },
                totalRow:[],
                productInfoData:[],
                selectList:[],
                qcTypeOption:[],
                qcMethodOption:[]
            }
        },
        methods:{
            ...mapActions(['setLog']),
            getQcOrderDetail(){
                this.loadingData=true;
                this.$ajax.get(`${this.$apis.get_serviceOrderDetail}?id=${this.$route.query.id}`)
                    .then(res=>{
                        this.qcDetail=res;
                        this.getPaymentInfo();
                    }).finally(err=>{
                        this.loadingData=false;
                    }
                );
            },
            getProductInfo(){
                this.loadingProductInfoTable=true;
                this.$ajax.post(this.$apis.get_serviceQcOrderProduct,this.productInfoConfig).then(res=>{
                    this.productInfoData = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas);

                    _.map(res.datas,v=>{
                        _.map(v,(val,key)=>{
                            if(key==='orderSkuQty' || key==='expectQcQty' || key==='outerCartonTotalQty' || key==='actSkuCartonTotalQty' || key==='qualifiedSkuCartonTotalQty' || key==='unqualifiedSkuCartonTotalQty' || key==='actSkuQty' || key==='qualifiedSkuQty' || key==='unqualifiedSkuQty' || key==='qualifiedSkuNetWeight' || key==='unqualifiedSkuNetWeight' || key==='qualifiedSkuVolume' || key==='unqualifiedSkuVolume' || key==='qualifiedSkuGrossWeight' || key==='unqualifiedSkuGrossWeight' || key==='checkOuterCartonQty'){
                            }else{
                                v[key]=null;
                            }
                        })
                    });

                    this.totalRow = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas,item=>{
                        console.log(item,'item')
                    });

                    let diffData=[];
                    _.map(this.productInfoData,v=>{
                        diffData.push(v.skuId.value+v.orderNo.value);
                    });
                    this.summaryData.skuQuantity=_.uniq(diffData).length;
                    this.loadingProductInfoTable=false;
                }).catch(err=>{
                    this.loadingProductInfoTable=false;
                });
            },
            getPaymentInfo(){
                this.loadingPaymentTable=true;
                this.$ajax.post(this.$apis.PAYMENT_LIST,{
                    orderNo:this.qcDetail.qcOrderNo,
                    orderType:20
                }).then(res=>{
                    this.paymentData=res.datas;
                }).finally(()=>{
                    this.loadingPaymentTable=false;
                })
            },

            /**
             * product info表格事件
             * */
            btnClick(e){
                // this.$windowOpen({
                //     url:'/product/sourcingDetail',
                //     params:{
                //         id:e.skuId.value
                //     }
                // });
                console.log(e.skuId.value)
            },
            changeChecked(e){
                this.selectList=e;
            },

            edit(){
                this.$router.push({
                    path:'/warehouse/editQc',
                    query:{
                        id:this.$route.query.id
                    }
                });
            },

            /**
             * payment事件
             * */
            tableRowClassName({row}) {
                if(row.status===-1){
                    return 'warning-row';
                }
                return '';
            },
            dunningPay(){
                let params=[];
                _.map(this.paymentData,v=>{
                    if(v.status===40 && v.planPayAmount>v.actualPayAmount){
                        params.push({
                            id:v.id
                        })
                    }
                });

                if(params.length===0){
                    return this.$message({
                        message: this.$i.warehouse.nothingDunning,
                        type: 'warning'
                    });
                }

                this.disableDunning=true;
                this.$ajax.post(this.$apis.PAYMENT_DUNNING,params).then(res=>{
                    this.$message({
                        message: this.$i.warehouse.dunningSuccess,
                        type: 'success'
                    });
                }).finally(()=>{
                    this.disableDunning=false;
                })
            },
            confirmPay(data){
                this.$confirm(this.$i.warehouse.sureConfirm, this.$i.warehouse.prompt, {
                    confirmButtonText: this.$i.warehouse.sure,
                    cancelButtonText: this.$i.warehouse.cancel,
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.PAYMENT_ACCEPT,{
                        id:data.id,
                        version:data.version
                    }).then(res=>{
                        this.$message({
                            message: this.$i.warehouse.confirmSuccess,
                            type: 'success'
                        });
                        this.getPaymentInfo();
                    }).finally(()=>{

                    });
                }).catch(() => {

                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.totalMoney;
                        return;
                    }else if(index===4 || index===6){
                        const values = data.map(item => {
                            if(item.status===40){
                                return Number(item[column.property])
                            }
                        });

                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        }else{
                            sums[index]=0;
                        }
                    }
                });

                return sums;
            },


            cancel(){
                window.close();
            },
        },
        created(){
            this.loadingData=true;
            this.$ajax.post(this.$apis.get_partUnit,['QC_TYPE','QC_MD'],{cache:true})
                .then(res=>{
                    res.forEach(v=>{
                        if(v.code==='QC_TYPE'){
                            this.qcTypeOption=v.codes;
                        }else if(v.code==='QC_MD'){
                            this.qcMethodOption=v.codes;
                        }
                    });
                    this.getQcOrderDetail();
                    this.getProductInfo();
                })
                .catch(err=>{
                    this.loadingData=false;
                });




        },
        mounted(){
            this.setLog({query: {code: 'WAREHOUSE'}});
        },
    }
</script>
<style scoped>
    .el-table >>> .warning-row {
        background: #f5f7fa;
    }
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .second-title{
        font-size: 16px;
        color: #999999;
        padding: 10px 0;
    }
    .payment-btn{
        margin: 5px 0 10px 0;
    }
    .product-info{
        margin-top: 10px;
    }

    .footBtn{
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index:1000;
    }
</style>

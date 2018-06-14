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
                            <el-input
                                    v-model="qcDetail.qcTypeDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcDate">
                            <el-input
                                    v-model="qcDetail.qcDate"
                                    :disabled="true">
                            </el-input>
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
                            <el-input
                                    v-model="qcDetail.qcMethodDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.surveyor">
                            <el-input
                                    v-model="qcDetail.surveyor"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceFee">
                            <el-input
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
                        <!--<el-form-item prop="11" :label="$i.warehouse.timeZone">-->
                            <!--<el-input-->
                                    <!--v-model="qcDetail.timeZone"-->
                                    <!--:disabled="true">-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.remark">
                            <el-input
                                    v-model="qcDetail.remark"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.attachment">
                            <el-input
                                    v-model="qcDetail.attachment"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="second-title">
            {{$i.warehouse.payment}}
        </div>
        <div class="payment-table">
            <el-button class="payment-btn" @click="dunningPay" :disabled="loadingPaymentTable" type="primary">{{$i.warehouse.pressMoney}}</el-button>
            <el-table
                    :data="paymentData"
                    border
                    v-loading="loadingPaymentTable"
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
                        <span v-if="scope.row.status===40">已确认</span>
                        <span v-else>待确认</span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="Action"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status!==40" @click="confirmPay(scope.row)" type="text" size="small">{{$i.warehouse.confirm}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="product-info">
            <v-table
                    :loading="loadingProductInfoTable"
                    :data="productInfoData"
                    :buttons="[{'label': $i.warehouse.detail, type: 1}]"
                    @action="btnClick"
                    @change-checked="changeChecked"
                    :totalRow="true">
                <template slot="header">
                    <div class="second-title">
                        {{$i.warehouse.productInfo}}
                    </div>
                </template>
            </v-table>
        </div>

        <div class="footBtn">
            <el-button @click="edit" v-if="qcDetail.qcStatusDictCode==='WAITING_QC'" type="primary">{{$i.warehouse.edit}}</el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>
        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>
    </div>
</template>
<script>
    import {VTable,VMessageBoard } from '@/components/index';

    export default {
        name:'qc-detail',
        components:{
            VTable,
            VMessageBoard
        },
        data(){
            return{
                qcDetail:{},
                loadingData:false,
                loadingPaymentTable:false,
                /**
                 * paymentTable data
                 * */
                paymentData: [],

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
                productInfoData:[],
                selectList:[],
            }
        },
        methods:{
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
            dunningPay(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(this.paymentData)
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


            cancel(){
                window.close();
            },
        },
        created(){
            this.getQcOrderDetail();
            this.getProductInfo();
        }
    }
</script>
<style scoped>
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
<template>
    <div class="souringDetail">
        <div class="head">
            <div class="title">
                <img :src='basicDate.logo'/> 
                <span>{{basicDate.name}}</span>
            </div>
            <div class="detail">             
                 <el-form  label-width="190px">          
                    <el-row>             
                        <el-row class="right">
                            <el-col class="list" :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
                                   v-for='(item,index) in $db.supplier.detail'
                                   :key='index'
                                   >                         
                                    <el-form-item label-width="260px" :prop="item.key" :label="item.label+' :'">
                                       {{basicDate[item.key]}}
                                    </el-form-item>
                            </el-col>                          
                        </el-row>

                </el-row>
                  </el-form>
                <div class="btns" v-if="noEdit">
                    <el-button v-authorize="'SUPPLIER:BOOKMARK_DETAIL:CREATE_INQUIRY'" @click='createInquiry'>{{$i.common.createInquiry}}</el-button>
                    <el-button v-authorize="'SUPPLIER:BOOKMARK_DETAIL:CREATE_ORDER'" @click='createOrder'>{{$i.common.createOrder}}</el-button>
                    <el-button v-authorize="'SUPPLIER:BOOKMARK_DETAIL:ADD_COMPARE'" @click='addCompare'>{{$i.common.addToCompare}}</el-button>
                    <el-button v-authorize="'SUPPLIER:BOOKMARK_DETAIL:PRODUCT'" @click='supplierProducts'>{{$i.common.supplierProducts}}</el-button>
                    <el-button v-authorize="'SUPPLIER:BOOKMARK_DETAIL:DELETE'" @click='remove' type='danger'>{{$i.common.delete}}</el-button>
                </div>
<!--
                <div class="btns" v-else>
                    <el-button @click="finishEdit" type="primary">{{$i.common.finish}}</el-button>
                    <el-button @click="cancelEdit" type="info">{{$i.common.cancel}}</el-button>
                </div>
-->
            </div>
        </div>
        <div class="body">
            <el-tabs v-model="tabName" type="card" >          
                <el-tab-pane :label="$i.address" name="address">
                    <v-table  :data="address"  style='marginTop:10px'/>
                </el-tab-pane>
                <el-tab-pane :label="$i.accountInfo"  name="accountInfo">
                    <v-table  :data="accounts"  style='marginTop:10px'/>
                </el-tab-pane>
                <el-tab-pane :label="$i.contactInfo" name="contactInfo">
                    <v-table  :data="concats"   style='marginTop:10px'/>
                </el-tab-pane>
                <el-tab-pane :label="$i.tradeHistory"  name="tradeHistory">
<!--                  <v-table  :data="tabData"   style='marginTop:10px'/>-->
                </el-tab-pane>
<!--
                <el-tab-pane :label="$i.inquireHistory"  name="inquireHistory">
                  <v-table  :data="tabData"   style='marginTop:10px'/> 
                </el-tab-pane>
-->
                <el-tab-pane :label="$i.remark" name="remark">
                    <v-remark  
                     style='marginTop:10px'
                     :tableData='remarkData'
                     />
                </el-tab-pane>
<!--
                <el-tab-pane :label="$i.attchment" name="attchment">


                   <v-attachment></v-attachment>
                </el-tab-pane>
-->

            </el-tabs>
        </div>

     <VCompareList 
             v-if="showCompareList"
            :data="compareData"
            @clearData="clearData"
            @goCompare="goCompare"
            @closeTag="handleClose"      
     ></VCompareList>

    </div>
</template>

<script>
    import VCompareList from '../../product/compareList'
    import VRemark from '../../product/addlineTable'
    import VAttachment from '../attachment'
    import {
        VTable
    } from '@/components/index';

    export default {
        name: "souringDetail",
        components: {
            VTable,
            VCompareList,
            VRemark,
            VAttachment
        },
        data() {
            return {
                noEdit: true,
                id: this.$route.query.id,
                tabName: 'address', //默认打开的tab
                basicDate: [],
                accounts: [],
                concats: [],
                address: [],
                remarkData: [],
                compareConfig: {
                    showCompareList: false, //是否显示比较列表
                },
                compareData: [],
                showCompareList: false
            }
        },
        methods: {
            createInquiry() {
                this.windowOpen('/negotiation/createInquiry', {
                    supplierId: this.id //供应商信息将被带入
                });
            },
            createOrder() {
                this.$windowOpen({
                    url: '/order/creat',
                    params: {
                        type: 'supplier',
                        supplierName: this.basicDate.name,
                        supplierNo: this.basicDate.code
                    }
                });
            },
            addToCompare() {
                this.compareConfig.showCompareList = true;
            },
            supplierProducts() {
                this.$windowOpen({
                    url: '/product/sourcing',
                    params: {
                        supplierName: this.basicDate.name
                    }
                });
            },
            //添加比较
            addCompare() {
                this.showCompareList = true;
                let compareList = this.$localStore.get('compareSupplierList');
                let hasAdd = false;
                if (!compareList) {
                    compareList = [];
                }
                compareList.forEach(v => {
                    if (v.id === this.basicDate.id) {
                        //代表该商品已经添加了
                        hasAdd = true;
                    }
                });
                if (hasAdd) {
                    this.$message({
                        message: '该商品已经添加到列表了',
                        type: 'warning'
                    });
                } else {

                    if (this.basicDate.id && this.basicDate != '') {
                        compareList.push({
                            name: this.basicDate.name,
                            id: this.basicDate.id
                        });
                        this.compareData = compareList;
                        this.$localStore.set('compareSupplierList', compareList)
                    } else {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }

                }
            },
            getCompareList() {
                let data = this.$localStore.get('compareSupplierList');
                if (!data) {
                    this.compareData = [];
                } else {
                    this.compareData = data;
                }
            },
            goCompare() {
                let data = this.$localStore.get('compareSupplierList');
                let id = '';
                data.forEach((v, k) => {
                    if (k === data.length - 1) {
                        id += v.id;
                    } else {
                        id += (v.id + ',');
                    }
                });
                this.$windowOpen({
                    url: 'supplier/compareDetail/{type}',
                    params: {
                        type: 'new',
                        id: id,
                    }
                });
            },
            handleClose(e) {
                let key;
                this.compareData.forEach((v, k) => {
                    if (v.id === e.id) {
                        key = k;
                    }
                });
                this.compareData.splice(key, 1);
                this.$localStore.set('compareSupplierList', this.compareData);
            },
            clearData() {
                this.$localStore.remove('compareSupplierList');
                this.compareData = [];
            },
            remove() {
                this.$ajax.post(this.$apis.post_supplier_deletebookmark, {
                    id: this.id
                }).then((res) => {
                    console.log(res)
                    this.$message({
                        message: 'success',
                        type: 'success',
                        onClose: (() => {
                            this.$router.push('/supplier/bookmark')
                        })
                    });
                }).catch((res) => {
                    console.log(res)
                })
            },
            //..................获取数据
            get_data() {
                this.$ajax.get(this.$apis.get_supplier_id, {
                        id: this.id
                    })
                    .then(res => {
                        this.basicDate = res;
                        this.accounts = this.$getDB(this.$db.supplier.detailTable, res.accounts);
                        this.address = this.$getDB(this.$db.supplier.detailTable, res.address);
                        this.concats = this.$getDB(this.$db.supplier.detailTable, res.concats);
                        console.log(res)
                    })
                    .catch((res) => {

                    });
            },
        },
        created() {
            this.get_data()
        },
    }

</script>

<style scoped>
    .title img {
        max-width: 100px;
        max-height: 100px;
        margin-left: 30px;
    }

    .title {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .title span {
        margin-left: 10px;
    }

    .detail {
        padding-top: 20px;
    }

    .souringDetail {
        background-color: #f4f4f4;
    }

    .souringDetail .head {
        background-color: #FFFFFF;
        padding: 0 20px;

    }

    .souringDetail .head .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 18px;
        color: #666666;
    }

    .souringDetail .head .title .title-btn {
        float: right;
    }

    .souringDetail .head .detail {
        margin-top: 8px;
    }

    .souringDetail .head .detail .carousel-img {
        height: 170px;
    }

    .souringDetail .head .detail .carousel-img img {
        width: 100%;
        height: 100%;
    }

    .souringDetail .head .detail .right {
        /*padding-top: 10px;*/
    }

    .souringDetail .head .detail .list {
        padding-left: 30px;
        font-size: 14px;
        line-height: 2.5;
        /*        border-bottom: 1px dotted #e0e0e0;*/
    }

    .souringDetail .head .detail .btns {
        text-align: center;
        padding: 15px 0;
    }

    .souringDetail .head .detail .btns>Button {
        margin-right: 10px;
    }

    .souringDetail .body {
        margin-top: 10px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
    }

    .souringDetail .body .list {
        line-height: 30px;
        font-size: 13px;
    }

    .speForm .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }

    .speForm .el-row .list .el-input {
        width: 80%;
    }

    /*
    .attchment {
        display: flex;
        justify-content: flex-start;
        height: 400px;
    }

    .attchment_item {
        width: 180px;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #BEBEBE;
        border-radius: 3px;
        margin-left: 20px;
    }

    .attchment_item_content {
        width: 180px;
        display: flex;
        justify-content: center;
        align-items: baseline;
    }

    .attchment_item p {
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .attchment_item i {
        font-size: 40px;
    }
*/

</style>

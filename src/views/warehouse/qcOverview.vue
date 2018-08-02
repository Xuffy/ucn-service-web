<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.qcOverview }}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.status}}</span>
                <el-radio-group class="radios" @change="changeStatus" v-model="qcOrderConfig.qcStatusDictCode" size="mini">
                    <el-radio-button label="">{{$i.warehouse.all}}</el-radio-button>
                    <el-radio-button v-for="v in qcStatusOption" :key="v.id" :label="v.code">{{v.name}}</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <div class="section">
                <v-table
                        code="uwarehouse_qc_order_overview"
                        :height="500"
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: $i.warehouse.detail, type: 1, auth:'QC:ORDER_DETAIL'}]"
                        @change-checked="changeChecked"
                        @change-sort="val=>{getQcData(val)}"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button
                                    v-authorize="'QC:ORDER_OVERVIEW:DOWNLOAD'"
                                    @click="download">{{$i.warehouse.download}}({{selectList.length?selectList.length:$i.warehouse.all}})</el-button>
                        </div>
                    </template>
                </v-table>
                <page
                        @size-change="changeSize"
                        @change="changePage"
                        :page-sizes="[50,100,200,500]"
                        :page-data="pageData"></page>
            </div>
        </div>

    </div>
</template>

<script>
    import {VPagination,VTable} from '@/components/index'
    import selectSearch from '@/components/common/fnCompon/selectSearch'
    import {mapActions} from 'vuex'

    export default {
        name: "qcOverview",
        components:{
            selectSearch,
            VTable,
            page:VPagination
        },
        data(){
            return{
                /**
                 * 页面基本配置
                 * */
                loadingTable:false,
                qcStatusOption:[],
                qcMethodsOption:[],         //qc方法集合
                qcOrderStatus:'0',
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                pageData:{},
                qcOrderConfig:{
                    pn: 1,
                    ps: 50,
                    qcOrderNo: '',
                    qcStatusDictCode: '',
                    sorts:[{orderBy:"updateDt",orderType:"desc"}]
                },
                searchId:1,
                searchOptions:[
                    {
                        label:'验货单号',
                        id:1
                    },
                ]
            }
        },
        methods:{
            ...mapActions(['setMenuLink']),
            changeStatus(e){
                this.getQcData();
            },

            //获取表格数据
            getQcData(e){
                this.loadingTable=true;
                this.selectList=[];
                Object.assign(this.qcOrderConfig,e);
                this.$ajax.post(this.$apis.get_serviceQcOrder,this.qcOrderConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.qcOverview, res.datas,e=>{
                        e.qcMethodDictCode.value=this.$change(this.qcMethodsOption,'qcMethodDictCode',e).name;
                    });
                    this.loadingTable=false;
                    this.pageData=res;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
            searchInbound(e){
                if(!e.id){
                    return this.$message({
                        message: this.$i.warehouse.pleaseChooseAType,
                        type: 'warning'
                    });
                }else{
                    this.qcOrderConfig.qcOrderNo=e.value;
                    this.getQcData();
                }
            },
            download(){
                let qcOrderNos=_.pluck(_.pluck(this.selectList,'qcOrderNo'),'value');
                let params=this.$depthClone(this.qcOrderConfig);
                params.qcOrderNos=qcOrderNos;
                this.$fetch.export_task('QC_ORDER',params);
            },
            btnClick(e){
                let url='';
                if(e.qcStatusDictCode.value==='WAITING_QC'){
                    url='/warehouse/editQc';
                }else if(e.qcStatusDictCode.value==='COMPLETED_QC'){
                    url='/warehouse/qcDetail';
                }
                this.$windowOpen({
                    url:url,
                    params:{
                        id:e.id.value
                    }
                })
            },

            changeChecked(e){
                this.selectList=e;
            },

            /**
             * 字典获取
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['QC_STATUS','QC_MD'],{_cache:true}).then(res=>{
                    res.forEach(v=>{
                        if(v.code==='QC_STATUS'){
                            this.qcStatusOption=v.codes;
                        }else if(v.code==='QC_MD'){
                            this.qcMethodsOption=v.codes;
                        }
                    });
                    this.getQcData();
                }).catch(err=>{

                });
                // this.$ajax.get(this.$apis.get_allUnit).then(res=>{
                //     console.log(res)
                // })
            },


            /**
             * 分页操作
             * */
            changePage(e){
                this.qcOrderConfig.pn=e;
                this.getQcData();
            },
            changeSize(e){
                this.qcOrderConfig.ps=e;
                this.getQcData();
            }
        },
        created(){
            this.getUnit();
        },
        mounted(){
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'QC'},
                type: 10,
                auth:'QC:LOG',
                label: this.$i.common.log
            });
        },
        watch:{
            selectList(n){
                if(n.length>0){
                    this.downloadBtnInfo=n.length;
                }else{
                    this.downloadBtnInfo='All';
                }
            }
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
        margin-bottom: 5px;
    }

    .radioGroup{
        margin-left: 10px;
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

    .head .search{
        float: right;
    }
    .section{
        margin-top: 10px;
    }
</style>

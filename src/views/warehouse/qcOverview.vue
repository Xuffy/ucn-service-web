<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.qcOverview}}</span>
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
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: '详情', type: 1}]"
                        @change-checked="changeChecked"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button>{{$i.warehouse.download}}({{selectList.length?selectList.length:'All'}})</el-button>
                        </div>
                    </template>
                </v-table>
            </div>
        </div>

    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'
    import selectSearch from '@/components/common/fnCompon/selectSearch'

    export default {
        name: "qcOverview",
        components:{
            selectSearch,
            VTable
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
                qcOrderConfig:{
                    pn: 1,
                    ps: 50,
                    qcOrderNo: '',
                    qcStatusDictCode: '',

                    // sorts: [
                    //     {
                    //         orderBy: "string",
                    //         orderType: "string",
                    //     }
                    // ],
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
            changeStatus(e){
                this.getQcData();
            },

            //获取表格数据
            getQcData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_serviceQcOrder,this.qcOrderConfig).then(res=>{
                    console.log(this.qcMethodsOption)
                    this.tableDataList = this.$getDB(this.$db.warehouse.qcOverview, res.datas,e=>{
                        e.qcMethodDictCode.value=this.$change(this.qcMethodsOption,'qcMethodDictCode',e).name;
                    });
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
            searchInbound(e){
                if(!e.keyType){
                    return this.$message({
                        message: '请选择搜索类别',
                        type: 'warning'
                    });
                }else{
                    this.qcOrderConfig.qcOrderNo=e.key;
                    this.getQcData();
                }
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
        },
        created(){
            this.getUnit();
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
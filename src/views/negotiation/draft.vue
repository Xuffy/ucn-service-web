<template>
    <div class="compare-overview">
        <h3 class="hd">{{ title }}</h3>
        <div class="status">
            <div class="btn-wrap">
                <el-button type="primary" @click="submit" :disabled="checkedArg.length <= 0">{{ `${$i.common.submit}(${checkedArg.length})` }}</el-button>
                <el-button type="danger" @click="deleteList" :disabled="checkedArg.length <= 0">{{ `${$i.common.delete}(${checkedArg.length})`}}</el-button>
            </div>
            <select-search :options="options" @inputChange="searchEnter" />
        </div>
        <div class="fn">
            <div class="btn-wrap">
                
            </div>
            <div class="viewBy">
                <span>{{ $i.common.viewBy }}&nbsp;</span>
                <el-radio-group v-model="viewByStatus"  size="mini">
                    <el-radio-button label="0">{{$i.common.inquiry}}</el-radio-button>
                    <el-radio-button label="1" >{{$i.common.SKU}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <v-table 
            :data="tabData" 
            :loading="tabLoad"
            :buttons="[{label: 'Detail', type: 'detail'}]" 
            @action="action"
            @change-checked="changeChecked"
            :height="450"
            :page-total="pageTotal"
        />
        <v-pagination
            :page-data.sync="bodyData"
            @change="handleSizeChange"
            @size-change="pageSizeChange"
        />
    </div>
</template>
<script>
    import { VTable, selectSearch, VPagination } from '@/components/index';
    import { mapActions } from 'vuex';
    export default {
        name:'',
        data() {
            return {
                viewByStatus: '0',
                title: '',
                pageTotal:0,
                checkedArg: [],
                tabData: [],
                options:[{
                    id:'1',
                    label:'Compare Name'
                }, {
                    id: '2',
                    label: 'Compare Item'
                }],
                bodyData: {
                    key: '',
                    keyType: '',
                    // operatorFilters: { //筛选条件
                    //     columnName: '',
                    //     operator: '',
                    //     property: '',
                    //     resultMapId: '',
                    //     value: {}
                    // },
                    ps: 10,
                    pn: 1,
                    tc: 0,
                    draft: 1,
                    recycleCustomer: 0
                    //recycleSupplier
                    // sorts: [
                    //     {
                    //         nativeSql: true,
                    //         orderBy: "string",
                    //         orderType: "string",
                    //         resultMapId: "string"
                    //     }
                    // ]
                },
                tabLoad: false
            }
        },
        components: {
            'select-search':selectSearch,
            'v-table': VTable,
            'v-pagination': VPagination
        },
        methods: {
            ...mapActions([
                'setDic',
                'setRecycleBin'
            ]),
            handleSizeChange(val) {
                this.bodyData.pn = val;
            },
            pageSizeChange(val) {
                this.bodyData.ps = val;
            },
            getInquiryList() { //获取inquirylist
                let url, column;
                this.tabLoad = true;
                if(this.viewByStatus + '' === '0') {
                    url = this.$apis.POST_INQIIRY_LIST;
                    column = this.$db.inquiry.viewByInqury;
                } else {
                    url = this.$apis.POST_INQIIRY_LIST_SKU;
                    column = this.$db.inquiry.viewBySKU;
                };
                this.$ajax.post(url, this.bodyData)
                .then(res => {
                    res.tc ? this.bodyData.tc = res.tc : this.bodyData.tc = this.bodyData.tc;
                    this.$ajax.post(this.$apis.POST_CODE_PART, ['INQUIRY_STATUS', 'CY_UNIT', 'ITM'], '_cache')
                    .then(data => {
                        this.setDic(data);
                        this.tabData = this.$getDB(column, res.datas, (item) => {
                            this.$filterDic(item);
                        });
                        this.checkedArg = [];
                        this.tabLoad = false;
                        this.searchLoad = false;
                    });
                })
            },
            searchEnter(item) { // 搜索框
                this.bodyData.key = item.key;
                this.bodyData.keyType = item.keyType;
            },
            action(item, type) { //操作表单 action
                this.$router.push({
                    name: 'negotiationCreateInquiry',
                    query: {
                        id: item.id.value
                    }
                });
            },
            changeChecked(item) { //选中的list
                let arr = [];
                if(this.viewByStatus === '0') {
                    item.forEach(item => {
                        arr.push(item.id.value);
                    });
                } else {
                    tem.forEach(item => {
                        arr.push(item.inquiryId.value);
                    });
                }
                this.checkedArg = arr;
            },
            getList() {
                switch(this.$route.params.type) {
                    case 'inquiry':
                        this.getInquiryList();
                        break;
                }
            },
            actionInquiry(type) {
                this.$ajax.post(this.$apis.POST_INQUIRY_ACTION, {
                    ids:this.checkedArg,
                    action: type
                })
                .then(res => {
                    this.getInquiryList();
                    this.checkedArg = [];
                });
            },
            submit() { //提交草稿
                switch(this.$route.params.type) {
                    case 'inquiry':
                        this.actionInquiry('submit');
                        break;
                }
            },
            ajaxInqueryAction(type) {
                const argId = this.getChildrenId();
                this.$ajax.post(this.$apis.POST_INQUIRY_ACTION, {
                    action: type,
                    ids:argId
                })
                .then(res => {
                    this.getInquiryList();
                    this.checkedArg = [];
                });
            },
            deleteList() { //删除
                this.$confirm(this.$i.common.confirmDeletion, this.$i.common.prompt, {
                    confirmButtonText: this.$i.common.confirm,
                    cancelButtonText: this.$i.common.cancel,
                    type: 'warning'
                }).then(() => {
                    switch(this.$route.params.type) {
                        case 'inquiry':
                            this.actionInquiry('delete');
                            break;
                    }
                })
            }
        },
        watch: {
            bodyData: {
                handler(val) {
                    this.getList();
                },
                deep: true
            },
            viewByStatus(){
                this.getList();
            }
        },
        created() {
            this.getList();
            switch(this.$route.params.type) {
                case 'inquiry':
                    this.title = this.$i.common.inquiryDraft
                    break;
            };
            this.setRecycleBin({
                name: 'negotiationRecycleBin',
                params: {
                    type: 'inquiry'
                },
                show: true
            });
        }
    }
</script>
<style lang="less" scoped>
    .compare-overview{
        .hd {
            padding-left:15px;
            height: 50px;
            line-height:50px;
            color:#666;
        }
         .status {
            display:flex;
            height: 60px;
            box-sizing: border-box;
            padding-left:25px;
            padding-right:25px;
            align-items: center;
            justify-content:space-between;
            .btn-wrap {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                }
            }
        }
        .fn {
            display:flex;
            justify-content:space-between;
            padding:10px 15px;
            box-sizing: border-box;
            .viewBy {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                    color:#666;
                }
                button {
                    cursor: pointer;
                    padding:2px 5px;
                }
                .set {
                    cursor: pointer;
                    padding-left:18px;
                    color:#999;
                    i {
                        font-size:25px;
                    }
                }
            }
        }
    }
</style>
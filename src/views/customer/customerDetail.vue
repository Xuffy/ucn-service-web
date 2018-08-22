<template>
    <div class="souringDetail">
        <div class="head">
            <div class="title">
                <span>{{basicDate.name}}</span>
            </div>
            <div class="detail">
                 <el-form  label-width="190px">
                   <el-row>
                     <el-col :span="4" class="img-box">
                          <v-image :src="basicDate.logo" style="height:184px;"/>
                     </el-col>
                     <el-col :span="20">
                       <el-form>
                         <el-row>
                           <el-col
                           v-for='(item,index) in $db.supplier.detail'
                           :key='index'
                           :xs="24" :sm="item.fullLine?24:24" :md="item.fullLine?24:12" :lg="item.fullLine?24:12" :xl="item.fullLine?24:8"
                           >
                           <el-form-item label-width="260px" :prop="item.key" :label="item.label+' :'">
                           {{basicDate[item.key]}}
                           </el-form-item>
                           </el-col>
                         </el-row>
                       </el-form>
                     </el-col>
                   </el-row>
                  </el-form>
                <div class="btns">
                  <el-button @click="deleteCustomer" type="danger" v-show="$route.query.type==='read'"
                             v-authorize="'SUPPLIER:DETAIL:ARCHIVE'">
                    {{$i.common.archive}}
                  </el-button>
                  <el-button @click="downloadCustomer"  v-authorize="'SUPPLIER:DETAIL:DOWNLOAD'">
                    {{$i.button.download}}
                  </el-button>
                </div>
            </div>
        </div>
        <div class="body">
            <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
                <el-tab-pane :label="$i.supplier.address" name="address">
                    <v-table  :data="address" :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.accountInfo"  name="accounts">
                  <v-table  :data="accounts"  :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.contactInfo"  name="concats">
                    <v-table  :data="concats" :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.orderHistory" name="order">
                    <v-table  :data="orderList"   :selection="false" style='marginTop:10px'/>
                </el-tab-pane>
                <el-tab-pane :label="$i.supplier.attachment" name="attchment">
                     <v-upload ref="uploadAttachment" :limit="20"  :list="basicDate.attachments" readonly/>
                    <div class="attachment" v-show="!basicDate.attachments" style="margin-top:40px;">
                      <div>
                         No Attachment
                      </div>
                    </div>
                </el-tab-pane>
              <el-tab-pane :label="$i.supplier.remark" name="remark">
                <div class="section-btn">
                  <el-button  @click="createRemark" type="primary">{{$i.button.add}}</el-button>
                </div>
                  <v-table
                    :data="remarkData"
                    style='marginTop:10px'
                    :buttons="[{label: $i.common.detail, type: 2},{label: $i.common.delete, type: 3}]"
                    @action="remarkAction"
                    :selection="false"/>
              </el-tab-pane>

            </el-tabs>


          <el-dialog :title="$i.supplier.addRemark" :visible.sync="addRemarkFormVisible" center width="600px">
            <el-form :model="addRemarkData">
              <el-form-item :label="$i.supplier.remark" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="addRemarkData.remark">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :loading="disableCreateRemark" type="primary" @click="createRemarkSubmit">{{$i.button.submit}}</el-button>
              <el-button @click="addRemarkFormVisible = false">{{$i.button.cancel}}</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import VCompareList from '../product/compareList'
    import VAttachment from './attachment'
    import {
        VTable, VImage,VUpload
    } from '@/components/index';

    export default {
        name: "customerDetail",
        components: {
            VTable,
            VCompareList,
            VAttachment,
            VImage,
            VUpload
        },
        data() {
            return {
                noEdit: true,
                id: this.$route.query.id,
                tabName: 'address', //默认打开的tab
                basicDate: [],
                country:{},
                accounts: [],
                concats: [],
                orderList:[],
                address: [],
                document:[],
                inquiry:[],
                tradeHistory:[],
                remarkData: [],
                incoterm:[],
                payment:[],
                type:[],
                country:[],
                currency:[],
                sex:[],
                compareConfig: {
                    showCompareList: false, //是否显示比较列表
                },
                params:{
                  customerCompanyId:'',
                  pn:'1',
                  ps:'50'
                },
                addRemarkData:{
                  customerId: null,
                  id: null,
                  remark: "",
                  servicerCustomerId: null,
                  version: null
                },
                code: '',
                loading: false,
                isModifyAddress: false,
                addRemarkFormVisible:false,
                lookRemarkFormVisible:false,
                disableCreateRemark:false,
                formLabelWidth:'80px',
            }
        },
        methods: {
              ...mapActions([
              'setMenuLink'
            ]),
            //获取国家
            getCountryAll(){
                this.$ajax.get(this.$apis.GET_COUNTRY_ALL).then(res=>{
                this.country = res
                }).catch(err=>{
                console.log(err)
                });
            },
             //获取币种
            getCurrency(){
              this.$ajax.get(this.$apis.get_currency_all).then(res=>{
                this.currency = res
              }).catch(err=>{
                console.log(err)
              });
            },
             handleClick(tab, event) {
              switch(Number(tab.index)){
                case 3:
                  this.getQcHistory();
                  break;
              }
            },
            getListRemark(){
                const id = Number(this.$route.query.id);
                const remark ={
                  pn: 1,
                  ps: 50,
                }
              this.$ajax.post(`${this.$apis.post_getCustomerListRemark}/${id}`,remark)
              .then(res => {
                this.remarkData = this.$getDB(this.$db.supplier.remark, res.datas, item => {
                  _.mapObject(item, val => {
                    val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                    return val
                  })
                });
              })
              .catch((res) => {
                console.slog(res)
              });
            },
            modifyRemark(e){
               var result = {}
               result.remark = e.remark.value;
               result.version = e.version.value;
               result.id = e.id.value;
               this.isModifyAddress=true;      //标识正在修改地
               this.addRemarkData=Object.assign({}, result);
               this.addRemarkFormVisible=true;
            },
            createRemark(){
              this.addRemarkFormVisible=true;
              // this.addRemarkData.id=null;     //新增的时候要置为null
              // this.addRemarkData.skuId=this.productForm.id;
              // this.addRemarkData.remark='';
            },
          createRemarkSubmit(){
            this.disableCreateRemark = true;
            this.addRemarkData.servicerCustomerId = Number(this.$route.query.id);
            this.addRemarkData.customerId = Number(this.$route.query.customerId);
            if (this.isModifyAddress){
              this.$ajax.post(`${this.$apis.post_customerUpdataRmark}/${this.addRemarkData.id}`,this.addRemarkData)
                .then(res => {
                  this.$message({
                    message: this.$i.common.modifySuccess,
                    type: 'success'
                  });
                  this.getListRemark();
                  this.disableCreateRemark = false;
                  this.addRemarkFormVisible = false;
                })
                .catch((res) => {
                  this.disableCreateRemark = false;
                  this.addRemarkFormVisible = false;
                });
            }else{
              this.$ajax.post(this.$apis.post_addCustomerListRemark,this.addRemarkData)
                  .then(res => {
                    this.$message({
                      message: this.$i.common.addSuccess,
                      type: 'success'
                    });
                    this.getListRemark();
                    this.disableCreateRemark = false;
                    this.addRemarkFormVisible = false;
                  })
                  .catch((res) => {
                    this.disableCreateRemark = false;
                    this.addRemarkFormVisible = false;
                  });
              }
            },
            deleteRemark(e){
              this.$confirm(this.$i.common.sureToDeleteRemark, this.$i.common.prompt, {
                confirmButtonText: this.$i.common.confirm,
                cancelButtonText: this.$i.common.cancel,
                type: 'warning'
              }).then(() => {
                this.$ajax.post(this.$apis.post_deleteCustomerRemark,{id:e.id.value}).then(res=>{
                  this.$message({
                    type: 'success',
                    message: this.$i.common.deleteTheSuccess
                  });
                  this.getListRemark();
                }).catch(err=>{
                });
              })
            },
            remarkAction(item,type){
              switch(type) {
                case 2:
                  this.modifyRemark(item);
                  break;
                case 3:
                  this.deleteRemark(item);
                  break;
              }
            },
            addToBookmark() {
                this.$ajax.post(this.$apis.post_addCustomerListRemark, [this.id])
                    .then(res => {
                        this.$message({
                            message: 'success',
                            type: 'success',
                            onClose: (() => {
                                this.$router.push({
                                    path: '/supplier/bookmark',
                                    query: {
                                        id: this.id
                                    }
                                })
                            })
                        });
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            //获取字典
            getCodePart(){
              this.$ajax.post(this.$apis.POST_CODE_PART,["ITM","PMT","CUSTOMER_TYPE","EL_IS","SEX"]).then(res=>{
                this.payment = _.findWhere(res, {'code': 'PMT'}).codes;
                this.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
                this.type = _.findWhere(res, {'code': 'CUSTOMER_TYPE'}).codes;
                this.sex = _.findWhere(res, {'code': 'SEX'}).codes;
              }).catch(err=>{
                console.log(err)
              });
            },
            //..................获取数据
            get_data() {
                this.loading = true
                this.$ajax.post(this.$apis.post_customerDetail, {
                        id: this.id
                    })
                    .then(res => {
                this.code = res.code
                this.basicDate = res;
                let country,type,payment,currency,incoterm;
                // country = _.findWhere(this.country, {code: this.basicDate.country}) || {};
                type = _.findWhere(this.type, {code: (this.basicDate.type)+''}) || {};
                payment = _.findWhere(this.payment, {code: (this.basicDate.payment)+''}) || {};
                currency = _.findWhere(this.currency, {code: this.basicDate.currency}) || {};
                incoterm = _.findWhere(this.incoterm, {code: this.basicDate.incoterm}+'') || {};
                this.basicDate.type = type.name || '';
                // this.basicDate.country = country.name || '';
                this.basicDate.payment = payment.name || '';
                this.basicDate.currency = currency.name || '';
                this.basicDate.incoterm = incoterm.name || '';

                this.accounts = this.$getDB(this.$db.supplier.accounts, res.accounts);

                this.address = this.$getDB(this.$db.supplier.detailTable, res.address, e=>{
                  let country,receiveCountry;
                  country = _.findWhere(this.country, {code: e.country.value}) || {};
                  receiveCountry = _.findWhere(this.country, {code: e.receiveCountry.value}) || {};
                  e.country._value = country.name || '';
                  e.receiveCountry._value = receiveCountry.name || '';
                  const province = e.province.value || '';
                  const city = e.city.value || '';
                  const address = e.address.value || ''
                  const receiveProvince = e.receiveProvince.value || '';
                  const receiveCity = e.receiveCity.value || '';
                  const receiveAddress = e.receiveAddress.value || '';
                  e.companyAddress.value = e.country._value +' '+province+' '+city+' '+address;
                  e.receiverAddress.value = e.receiveCountry._value +' '+receiveProvince+' '+receiveCity+' '+receiveAddress
                  return e;
                });
                let concats = res.concats
                //获取部门列表匹配
                      console.log(this.basicDate.customerCompanyId)
                if (this.basicDate.tenantId && this.basicDate.customerCompanyId){
                  this.$ajax.get(`${this.$apis.GET_DEPARTMENT}?tenantId=${this.basicDate.tenantId}&companyId=${this.basicDate.customerCompanyId}`).then(res=>{
                    this.concats = this.$getDB(this.$db.supplier.contact, concats, e => {
                      let gender,deptId;
                      gender = _.findWhere(this.sex, {code: (e.gender.value)+''}) || {};
                      e.gender._value = gender.name || '';
                      deptId = _.findWhere(res, {deptId: (e.deptId.value)}) || {};
                      e.deptId._value = deptId.deptName || '';
                      return e;
                    });

                  })
                }
                // this.concats = this.$getDB(this.$db.supplier.contact, res.concats,e => {
                //     let gender;
                //     gender = _.findWhere(this.sex, {code: (e.gender.value)+''}) || {};
                //     e.gender._value = gender.name || '';
                //     return e;
                // });
                this.documents = this.$getDB(this.$db.supplier.detailTable, res.documents);
                this.loading = false
                    })
                    .catch((res) => {
                        this.loading = false
                    });
            },
          //history
          getQcHistory(){
            this.loading = true
            this.params.customerCompanyId = this.basicDate.customerCompanyId
            this.$ajax.post(this.$apis.post_servicer_customer_history,this.params)
              .then(res => {
                this.orderList = this.$getDB(this.$db.supplier.qcHistory, res.datas);
                this.loading = false
              })
              .catch((res) => {
                this.loading = false
              });
          },
          //删除
          deleteCustomer(){
            this.$confirm(this.$i.common.sureDelete, this.$i.common.prompt, {
              confirmButtonText: this.$i.common.sure,
              cancelButtonText: this.$i.common.cancel,
              type: 'warning'
            }).then(() => {
              this.disableClickDeleteBtn = true;
              const params = []
              params.push(this.basicDate.id)
              this.$ajax.post(this.$apis.post_deleteCustomer, params).then(res => {
                this.disableClickDeleteBtn = false;
                this.$message({
                  type: 'success',
                  message: this.$i.common.deleteTheSuccess,
                  onClose: (() => {
                    this.$router.push({
                      path: '/customer/overview',
                    })
                  })
                });
              }).finally(() => {
                this.disableClickDeleteBtn = false;
              });
            })
          },
          //下载
          downloadCustomer(){
            let ids = [];
            ids.push(this.basicDate.id)
            this.$fetch.export_task('UDATA_SERVICER_EXPORT_CUSTOMER_IDS',{ids:ids});

          },

        },
        created() {
            this.get_data();
            this.getListRemark();
            this.getCountryAll();
            this.getCodePart();
            this.getCurrency();
        },
        mounted(){
          this.setMenuLink({
            path: 'customerArchive',
            type: 10,
            label: this.$i.common.archive,
            auth:''
          });
        },
      watch:{
        addRemarkFormVisible(n){
          if(!n){
            _.map(this.addRemarkData,(v,k)=>{
              this.$set(this.addRemarkData,k,'');
            });
            this.isModifyAddress=false;
          }
        },
      }
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
    .attachment{
      max-height: 300px;
      max-width: 100%;
      overflow-y: scroll;
      overflow-x: auto;
      border: 1px solid #ebeef5;
    }
    .attachment div{
      text-align: center;
      color: #999999;
      height: 200px;
      line-height: 200px;
    }
    .img-box{
      height: 184px;background-color: #f9f9f9;
    }

</style>

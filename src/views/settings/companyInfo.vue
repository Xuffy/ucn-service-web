<template>
  <div class="company-info">
    <div class="title" :style="{'height': !showNameBox ? '32px':'0'}">
      <span><span style="color:red;font-weight: bold"></span>{{$i.setting.companyInfo}}</span>
    </div>
    <div class="alert" v-show="showNameBox">
      <el-alert
        :title="$i.setting.requiredPage"
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
    </div>
    <div class="summary">
      <el-form ref="summary" :model="companyInfo" :rules="companyInfoRules" label-width="265px">
        <el-row class="speZone">
          <el-col :class="{speCol:v.key!=='description'}" v-if="v.belong==='summary'" v-for="v in $db.setting.companyInfo" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
            <el-form-item class="speWidth"   :label="v.label +'：'"  :required="v._rules?v._rules.required:false">
              <div v-if="v.type==='input'">
                <el-input
                  :disabled="v.key==='code' ? true :summaryDisabled"
                  size="mini"
                  :placeholder="$i.common.inputkeyWordToSearch"
                  v-model="companyInfo[v.key]">
                </el-input>
              </div>
              <div v-if="v.type==='customValidation'">
                <el-input
                  :disabled="v.key==='code'?true:summaryDisabled"
                  size="mini"
                  :placeholder="$i.common.inputkeyWordToSearch"
                  @blur="customValidation"
                  v-model="companyInfo[v.key]">
                </el-input>
              </div>
              <div v-if="v.type==='select'">
                <el-select :disabled="summaryDisabled" class="speWidth" v-model="companyInfo[v.key]" :placeholder="$i.common.inputSearch">
                  <el-option
                    size="mini"
                    v-for="item in options[v.key]"
                    :key="item.code"
                    :label="item.name"
                    :value="item.typeCode === 'EL_IS' ? !!parseInt(item.code) :Number(item.code) || item.code">
                  </el-option>
                </el-select>
              </div>
              <div v-if="v.type==='selectCurrency'">
                <el-select :disabled="summaryDisabled" class="speWidth" v-model="companyInfo[v.key]" :placeholder="$i.common.inputSearch">
                  <el-option
                    size="mini"
                    v-for="item in options[v.key]"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <div v-if="v.type==='textarea'">
                <el-input
                  :disabled="summaryDisabled"
                  class="speWidth"
                  type="textarea"
                  autosize
                  :placeholder="$i.common.inputkeyWordToSearch"
                  v-model="companyInfo[v.key]">
                </el-input>
              </div>
              <div v-if="v.type === 'function' ">
                <v-upload
                  ref="uploadFile"
                  only-image
                  oss-private
                  :list="companyInfo.logo"
                  :readonly="summaryDisabled"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="summary-btn">
        <div v-if="summaryDisabled">
          <el-button @click="modifySummary">{{$i.common.modify}}</el-button>
        </div>
        <div v-else>
          <el-button :loading="allowModifySummary" @click="saveModifySummary" type="primary">{{$i.button.confirm}}</el-button>
          <el-button @click="cancelModifySummary">{{$i.button.cancel}}</el-button>
        </div>
      </div>
    </div>
    <div class="section">
      <el-tabs type="border-card">
        <el-tab-pane :label="$i.setting.address">
          <div class="section-btn">
            <el-button @click="addAddress" type="primary">{{$i.button.add}}</el-button>
          </div>

          <div>
            <v-table
              :data="addressDatas"
              :height="500"
              :buttons="[{label: $i.button.modify, type: 1},{label: $i.button.delete, type: 2}]"
              @action="btnAddressClick"
              disabled-sort
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$i.setting.accountInfo">
          <div class="section-btn">
            <el-button @click="addAccount" type="primary">{{$i.button.add}}</el-button>
          </div>
          <div class="main">
            <div>
              <v-table
                :data="accountsData"
                :height="500"
                :buttons="[{label: $i.button.modify, type: 1},{label: $i.button.delete, type: 2}]"
                @action="btnClick"
                disabled-sort
              />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$i.setting.contactInfo">
          <div class="section-btn">
            <el-button @click="addContact" type="primary">{{$i.button.add}}</el-button>
          </div>
          <div class="main">
            <div>
              <v-table
                :data="contactDatas"
                :height="500"
                :buttons="[{label: $i.button.modify, type: 1},{label: $i.button.delete, type: 2}]"
                @action="btnContactClick"
                disabled-sort
              />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$i.setting.attachment">
          <div class="section-btn">
            <el-button @click="upload" type="primary">{{$i.button.save}}</el-button>
          </div>
          <v-upload ref="uploadAttachment" :limit="20"  :list="attachments"  oss-private/>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog width="70%" :title="$i.setting.address" :visible.sync="addressDialogVisible">
      <el-form label-width="200px" :model="addressData">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.factoryName +'：'" required>
              <el-input size="mini" v-model="addressData.name"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.factoryAddress +'：'" required>
              <el-input size="mini" v-model="addressData.address"  :placeholder="$i.common.inputkeyWordToSearch" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.exportPort +'：'">
              <el-input size="mini" v-model="addressData.exportPort"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.ContacctPerson1 +'：'" required>
              <el-input size="mini" v-model="addressData.contactPerson1"  :placeholder="$i.common.inputkeyWordToSearch" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.contactPhoneNo1 +'：'" required>
              <el-input size="mini" v-model="addressData.concatPhone1"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.contacctPerson2 +'：'" >
              <el-input size="mini" v-model="addressData.contactPerson2"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.contactPhoneNo2 +'：'">
              <el-input size="mini" v-model="addressData.contactPhone2"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item>
              <el-checkbox-group v-model="addressData.def">
                <el-checkbox :label="$i.setting.setDefaultAddress" @change="setAddress" ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible=false">{{$i.button.cancel}}</el-button>
        <el-button :loading="allowAddAddress" type="primary" @click="sureAddAddress">{{$i.button.confirm}}</el-button>
      </div>
    </el-dialog>

    <el-dialog width="70%" :title="$i.setting.accountInfo" :visible.sync="accountDialogVisible">
      <el-form label-width="200px" :model="accountData">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.beneficiaryName +'：'" required>
              <el-input size="mini" v-model="accountData.beneficiaryName"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.beneficiaryAccount +'：'" required>
              <el-input size="mini" v-model="accountData.beneficiaryAccount"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.beneficiaryAddress +'：'">
              <el-input size="mini" v-model="accountData.beneficiaryAddress"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.beneficiaryBankName +'：'">
              <el-input size="mini" v-model="accountData.beneficiaryBankName"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.beneficiaryBankSWIFT +'：'">
              <el-input size="mini" v-model="accountData.beneficiaryBankSwift"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.accountType +'：'">
              <el-input size="mini" v-model="accountData.accountType"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.currency +'：'">
              <el-select  v-model="accountData.currency" :placeholder="$i.common.inputSearch"  style="width: 100%;">
                <el-option
                  v-for="item in options.currency"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code"
                  style="width: 100%">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountDialogVisible=false">{{$i.button.cancel}}</el-button>
        <el-button :loading="allowAddAccount" type="primary" @click="sureAddAccount">{{$i.button.confirm}}</el-button>
      </div>
    </el-dialog>

    <el-dialog width="70%" :title="$i.setting.contactInfo" :visible.sync="contactDialogVisible">
      <el-form label-width="200px" :model="contactData">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.name +'：'" required>
              <el-input size="mini" v-model="contactData.name"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item :label="$i.setting.department +'：'">
                <el-select  v-model="contactData.deptId" :placeholder="$i.common.inputSearch" style="width:100%" >
                  <el-option
                    v-for="item in department"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId"
                    style="width:100%">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.gender +'：'">
              <el-select v-model="contactData.gender" :placeholder="$i.common.inputSearch" style="width: 100%">
                <el-option
                  v-for="item in sex"
                  :key="item.code"
                  :label="item.name"
                  :value="Number(item.code)"
                  style="width: 100%">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.mobileNumber +'：'" required>
              <el-input size="mini" v-model="contactData.cellphone"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.telNumber +'：'">
              <el-input size="mini" v-model="contactData.telphone"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.faxNumber +'：'">
              <el-input size="mini" v-model="contactData.fax"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.emailAddress +'：'">
              <el-input size="mini" v-model="contactData.email"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.skype +'：'">
              <el-input size="mini" v-model="contactData.skype"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  :label="$i.setting.qq +'：'">
              <el-input size="mini" v-model="contactData.qq"  :placeholder="$i.common.inputkeyWordToSearch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contactDialogVisible=false">{{$i.button.cancel}}</el-button>
        <el-button :loading="allowAddAccount" type="primary" @click="sureAddContact">{{$i.button.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { VTable,VUpload} from '@/components/index';
  import { mapActions } from 'vuex';
  export default {
    name: "companyInfo",
    components:{
      VTable,
      VUpload
    },
    data(){
      return{
        summaryDisabled:true,
        addressDialogVisible:false,
        accountDialogVisible:false,
        contactDialogVisible:false,
        //页面page绑定
        companyInfo:{
          abbreviation: '',
          city: '',
          code: '',
          country: '',
          currency: '',
          id: '',
          incoterm: '',
          name: '',
          payment: '',
          serviceCity: '',
          type: '',
          companyId:'',
          version: '',
        },
        accountsData:[],
        contactDatas:[],
        addressDatas:[],
        attachments:[],
        cloneData:{},                   //用于克隆存储的对象
        //验证规则
        companyInfoRules:{

        },
        //弹出框data
        addressData:{
          address: "",
          concatPhone1: "",
          contactPerson1: "",
          contactPerson2: "",
          contactPhone2: "",
          exportPort:"",
          id: "",
          name: "",
          status: "",
          servicerId: "",
          version: "",
          def: false
        },
        contactData:{
          cellphone: "",
          servicerId: "",
          deptId: "",
          deptName: "",
          email: "",
          fax: "",
          gender: "",
          id: "",
          name: "",
          position: "",
          qq: "",
          skype: "",
          status: "",
          telphone: "",
          version: ""
        },
        accountData:{
          accountType: "",
          beneficiaryAccount: "",
          beneficiaryAddress: "",
          beneficiaryBankName: "",
          beneficiaryBankSwift: "",
          beneficiaryName: "",
          currency: "",
          id: "",
          servicerId: "",
          version: ""
        },
        logoParmas:{
          id: '',
          type: 'PICTURE',
          url: ''
        },
        //btn loading状态
        allowAddAddress:false,
        allowAddAccount:false,
        allowAddContact:false,
        allowModifySummary:false,           //顶部保存按钮
        //是否正在修改地址标识，因为新增和修改都是用的同一个按钮，所以为了区分增加一个标识
        isModifyAddress:false,
        isModifyAccount:false,
        isModifyContact:false,
        showNameBox:false,
        options:{},
        sex:[],
        department:[],
        currencyList:[]
      }
    },
    methods:{
      ...mapActions(['setMenuLink']),
       //获取币种
      getCurrency(){
        this.$ajax.get(this.$apis.get_currency_all).then(res=>{
          this.options.currency = res
        }).catch(err=>{
          console.log(err)
        });
      },
      //获取字典
      getCodePart(){
        this.$ajax.post(this.$apis.POST_CODE_PART,["ITM","PMT","SP_TYPE","EL_IS","SEX"],{cache:true}).then(res=>{
          this.options.payment = _.findWhere(res, {'code': 'PMT'}).codes;
          this.options.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
          this.options.type = _.findWhere(res, {'code': 'SP_TYPE'}).codes;
          this.options.exportLicense = _.findWhere(res, {'code': 'EL_IS'}).codes;
          this.sex = _.findWhere(res, {'code': 'SEX'}).codes;
        }).catch(err=>{
          console.log(err)
        });
      },
      //获取国家
      getCountryAll(){
        this.$ajax.get(this.$apis.GET_COUNTRY_ALL).then(res=>{
          this.options.country = res
        }).catch(err=>{
          console.log(err)
        });
      },
      //获取部门列表
      getDepartment(){
        this.$ajax.get(this.$apis.GET_DEPARTMENT).then(res=>{
          this.department = res
        }).catch(err=>{
          console.log(err)
        });
      },
      //获取整个页面数据
      getWholeData(){
        this.$ajax.get(this.$apis.post_servicer_getServicer).then(res=>{
          this.attachments =res.attachments
          // this.addressData contactData
          this.accountsData = this.$getDB(this.$db.setting.servicerAccount, res.accounts);
          this.contactDatas = this.$getDB(this.$db.setting.servicerContact, res.concats, e => {
            let gender,deptId;
            gender = _.findWhere(this.sex, {code: (e.gender.value)+''}) || {};
            deptId = _.findWhere(this.department, {deptId: e.deptId.value}) || {};
            e.gender._value = gender.name || '';
            e.deptId._value = deptId.deptName || '';
            return e;
          });

          this.addressDatas = this.$getDB(this.$db.setting.servicerAddress, res.address, e=>{
            e.def.value ? e.def._value = '是' : e.def._value = '';
            return e
          });
          res.exportLicense ? res.exportLicense = 'YES' : res.exportLicense = 'NO'
          this.companyInfo=res;
          //判断shortName是否存在
          if (this.companyInfo.abbreviation){
            this.$localStore.remove('router_intercept')
          }else{
            this.showNameBox = true;
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      postUpdateIsSetting(){
        this.$ajax.post(this.$apis.post_purchase_customer_updateIsSetting,{id:this.companyInfo.id}).then(res=>{
       console.log(res)
        }).catch(err=>{
          console.log(err)
        });
      },
      //修改顶部简介信息
      modifySummary(){
        this.summaryDisabled=false;
        this.cloneData=Object.assign({},this.companyInfo);
      },
      saveModifySummary(){
         if (this.$validateForm(this.companyInfo, this.$db.setting.companyInfo)) {
            return false;
          }
        let params={
          abbreviation: this.companyInfo.abbreviation,
          city: this.companyInfo.city,
          code: this.companyInfo.code,
          country: this.companyInfo.country,
          currency: this.companyInfo.currency,
          id: this.companyInfo.id,
          incoterm: this.companyInfo.incoterm,
          name: this.companyInfo.name,
          payment: this.companyInfo.payment,
          serviceCity: this.companyInfo.serviceCity,
          type: this.companyInfo.type,
          companyId: this.companyInfo.companyId,
          version: this.companyInfo.version
        };
        this.allowModifySummary=true;
        this.$ajax.post(`${this.$apis.post_servicer}/${this.companyInfo.id}`,params).then(res=>{
          if (!this.companyInfo.setting){
            this.postUpdateIsSetting();
          }
          this.$message({
            message: this.$i.common.modifySuccess,
            type: 'success'
          });
          this.getWholeData()
          this.allowModifySummary=false;
          this.summaryDisabled=true;
        }).catch(err=>{
          this.getWholeData()
          this.allowModifySummary=false;
          this.summaryDisabled=true;
        });

        this.logoParmas.id = this.companyInfo.id;
        this.logoParmas.url = this.$refs.uploadFile[0].getFiles()[0];
        this.$ajax.post(this.$apis.post_servicer_purchase_upload,this.logoParmas).then(res=>{
          if (!this.companyInfo.setting){
            this.postUpdateIsSetting();
          }
          this.getWholeData();
        })
      },
      cancelModifySummary(){
        this.companyInfo=Object.assign({},this.cloneData);
        this.summaryDisabled=true;
      },


      /**
       * address操作
       * */
      addAddress(){
        this.addressDialogVisible=true;
      },
      btnAddressClick(item, type){
        switch(type) {
          case 1:
            this.modifyAddress(item);
            break;
          case 2:
            this.deleteAddress(item);
            break;
        }
      },
      sureAddAddress(){
        if (this.$validateForm(this.addressData, this.$db.setting.servicerAddress)) {
          return false;
        }
        this.allowAddAddress=true;
        this.addressData.servicerId=this.companyInfo.id;
        if(this.isModifyAddress){
          //表示是在修改地址
          this.$ajax.post(`${this.$apis.post_servicer_address_id}/${this.addressData.id}`,this.addressData).then(res=>{
            this.allowAddAddress=false;
            this.$message({
              message: this.$i.common.modifySuccess,
              type: 'success'
            });
            this.getWholeData();
            this.addressDialogVisible=false;
          }).catch(err=>{
            this.allowAddAddress=false;
            this.addressDialogVisible=false;
          });
        }else{
          //表示是在新增地址
          this.$ajax.post(this.$apis.post_servicer_address,this.addressData).then(res=>{
            this.allowAddAddress=false;
              if (!this.companyInfo.setting){
                this.postUpdateIsSetting();
              }
            this.$message({
              message: this.$i.common.addSuccess,
              type: 'success'
            });
            this.getWholeData();
            this.addressDialogVisible=false;
          }).catch(err=>{
            this.allowAddAddress=false;
            this.addressDialogVisible=false;
          });
        }
      },
      modifyAddress(e){
        var result = {}
        for(const i in e){
          result[e[i].key]= e[i].value
        }
        this.isModifyAddress=true;      //标识正在修改地址
        this.addressData=Object.assign({}, result);
        this.addressDialogVisible=true;
      },
      deleteAddress(e){
        this.$confirm(this.$i.common.sureToDeleteAddress, this.$i.common.prompt, {
          confirmButtonText: this.$i.common.confirm,
          cancelButtonText: this.$i.common.cancel,
          type: 'warning'
        }).then(() => {
          this.$ajax.post(this.$apis.post_servicer_deleteAddress,{id:e.id.value}).then(res=>{
            this.$message({
              type: 'success',
              message: this.$i.common.deleteTheSuccess
            });
            this.getWholeData();
          }).catch(err=>{
            console.log(err)
          });
        }).catch(() => {

        });
      },
      //更改默认地址
      setAddress(){
        let def;
        this.addressDatas.forEach(v=>{
          def = _.findWhere(v,{key:'def'}).value;
        })
        if (def){
          this.$confirm(this.$i.setting.isReplace, this.$i.common.prompt, {
            confirmButtonText: this.$i.common.confirm,
            cancelButtonText: this.$i.common.cancel,
            type: 'warning'
          }).then(() => {
            console.log(this.addressData.def)
            if (this.addressData.def){
              this.addressData.def = true;
              this.$message({
                type: 'success',
                message: this.$i.setting.replaceSuccess
              });
            }else{
              this.addressData.def = false;
              this.$message({
                type: 'success',
                message: this.$i.setting.cancelReplace
              });
            }
          }).catch(() => {
            console.log(this.addressData.def)
            if (this.addressData.def){
              this.addressData.def = false;
              this.$message({
                type: 'success',
                message: this.$i.setting.cancelReplace
              });
            }else{
              this.addressData.def = true;
              this.$message({
                type: 'success',
                message: this.$i.setting.replaceSuccess
              });
            }
          });
        }
      },

      /**
       * Account操作
       * */
      btnClick(item, type){
        switch(type) {
          case 1:
            this.modifyAccount(item);
            break;
          case 2:
            this.deleteAccount(item);
            break;
        }
      },
      addAccount(){
        this.accountDialogVisible=true;
      },
      sureAddAccount(){
        if (this.$validateForm(this.accountData, this.$db.setting.servicerAccount)) {
          return false;
        }
        this.allowAddContact=true;
        this.accountData.servicerId=this.companyInfo.id;

        if(this.isModifyContact){
          //表示是在修改account
          this.$ajax.post(`${this.$apis.post_servicer_account_id}/${this.accountData.id}`,this.accountData).then(res=>{
            this.allowAddContact=false;
            this.$message({
              message: this.$i.common.modifySuccess,
              type: 'success'
            });
            this.getWholeData();
            this.accountDialogVisible=false;
          }).catch(err=>{
            this.allowAddContact=false;
            this.accountDialogVisible=false;
          });
        }
        else{
          //表示是在新增account
          this.$ajax.post(this.$apis.post_servicer_account,this.accountData).then(res=>{
            this.allowAddContact=false;
            if (!this.companyInfo.setting){
              this.postUpdateIsSetting();
            }
            this.$message({
              message: this.$i.common.addSuccess,
              type: 'success'
            });
            this.getWholeData();
            this.accountDialogVisible=false;
          }).catch(err=>{
            this.allowAddContact=false;
            this.accountDialogVisible=false;
          });
        }
      },
      modifyAccount(e){
        var result = {}
        for(const i in e){
          result[e[i].key]= e[i].value
        }
        this.isModifyContact=true;      //标识正在修改contact
        this.accountData=Object.assign({}, result);
        this.accountDialogVisible=true;
      },
      deleteAccount(e){
        this.$confirm(this.$i.common.sureDeleteAccount, this.$i.common.prompt, {
          confirmButtonText: this.$i.common.confirm,
          cancelButtonText: this.$i.common.cancel,
          type: 'warning'
        }).then(() => {
          this.$ajax.post(this.$apis.post_servicer_deleteAccount,{id:e.id.value}).then(res=>{
            this.$message({
              type: 'success',
              message: this.$i.common.deleteTheSuccess
            });
            this.getWholeData();
          }).catch(err=>{
            console.log(err)
          });
        }).catch(() => {

        });
      },
      /**
       * contact操作
       * */
      addContact(){
        this.contactDialogVisible=true;
      },
      btnContactClick(item, type){
        switch(type) {
          case 1:
            this.modifyContact(item);
            break;
          case 2:
            this.deleteContact(item);
            break;
        }
      },
      sureAddContact(){
         if (this.$validateForm(this.contactData, this.$db.setting.servicerContact)) {
          return false;
        }
        this.allowAddContact=true;
        this.contactData.servicerId=this.companyInfo.id;
        if(this.isModifyContact){
          //表示是在修改account
          this.$ajax.post(`${this.$apis.post_servicer_concat_id}/${this.contactData.id}`,this.contactData).then(res=>{
            this.allowAddContact=false;
            this.$message({
              message: this.$i.common.modifySuccess,
              type: 'success'
            });
            this.getWholeData();
            this.contactDialogVisible=false;
          }).catch(err=>{
            this.allowAddContact=false;
            this.contactDialogVisible=false;
          });
        }
        else{
          //表示是在新增account
          this.$ajax.post(this.$apis.post_servicer_concat,this.contactData).then(res=>{
            this.allowAddContact=false;
            if (!this.companyInfo.setting){
              this.postUpdateIsSetting();
            }
            this.$message({
              message: this.$i.common.addSuccess,
              type: 'success'
            });
            this.getWholeData();
            this.contactDialogVisible=false;
          }).catch(err=>{
            this.allowAddContact=false;
            this.contactDialogVisible=false;
          });
        }
      },
      modifyContact(e){
        var result = {}
        for(const i in e){
          result[e[i].key]= e[i].value
        }
        this.isModifyContact=true;      //标识正在修改contact
        this.contactData=Object.assign({}, result);
        this.contactDialogVisible=true;
      },
      deleteContact(e){
        this.$confirm(this.$i.common.sureToDeleteContact, this.$i.common.prompt, {
          confirmButtonText: this.$i.common.confirm,
          cancelButtonText: this.$i.common.cancel,
          type: 'warning'
        }).then(() => {
          this.$ajax.post(this.$apis.post_servicer_deleteConcat,{id:e.id.value}).then(res=>{
            this.$message({
              type: 'success',
              message: this.$i.common.deleteTheSuccess
            });
            this.getWholeData();
          }).catch(err=>{
            console.log(err)
          });
        }).catch(() => {

        });
      },
      /**
       * Attachment操作
       * */
      upload(){
        //ATTACHMENT,文件 PICTURE 图片
        const uploadParams = {
          id: this.companyInfo.id,
          type: "ATTACHMENT",
          url: this.$refs.uploadAttachment.getFiles()[0]
        };
        const batchUploadParams = {
          id: this.companyInfo.id,
          type: "ATTACHMENT",
          urls: this.$refs.uploadAttachment.getFiles()
        };
        if (this.$refs.uploadAttachment.getFiles().length !== 0){
          if (this.$refs.uploadAttachment.getFiles().length === 1){
            this.$ajax.post(this.$apis.post_oss_company_upload,uploadParams).then(res=>{
              if (!this.companyInfo.setting){
                this.postUpdateIsSetting();
              }
              this.$message({
                message:  this.$i.common.uploadedSuccess,
                type: 'success'
              });
              this.getWholeData();
            })

          }else{
            this.$ajax.post(this.$apis.post_oss_company_batchUpload,batchUploadParams).then(res=>{
              if (!this.companyInfo.setting){
                this.postUpdateIsSetting();
              }
              this.$message({
                message:  this.$i.common.uploadedSuccess,
                type: 'success'
              });
              this.getWholeData();
            })
          }
        }else{
          this.$message({
            message: this.$i.common.uploadFile,
            type: 'warning'
          });
          return false;
        }
      },
      customValidation(){
        console.log(this.companyInfo.abbreviation)
        if(this.companyInfo.abbreviation === ""){ //输入不能为空
          this.$message({
            message: `${this.$i.util.validateRequired} ${this.$i.setting.customerShortName}`,
            type: 'warning'
          });
        }else if(this.companyInfo.abbreviation.length>6){
          this.$message({
            message: this.$i.setting.shortNameLength,
            type: 'warning'
          });
        }else if (!/^[0-9a-zA-Z]+$/.test(this.companyInfo.abbreviation)){
          this.$message({
            message: this.$i.setting.numberLetter,
            type: 'warning'
          });
        }else if (!/^[0-9a-hj-np-yA-HJ-NP-Y]+$/g.test(this.companyInfo.abbreviation)){
          this.$message({
            message: this.$i.setting.abbreviationAllowed,
            type: 'warning'
          });
        }else{
          this.$ajax.post(this.$apis.post_servicer_sname_exist,{
            id: this.companyInfo.id,
            shortName: this.companyInfo.abbreviation
          }).then(res=>{
            if (res){
              this.showNameBox = false;
              this.$message({
                message: this.$i.setting.abbreviationOnly,
                type: 'warning'
              });
            }
          })
        }
      },
    },
    created(){
      this.getCodePart();
      this.getCurrency();
      this.getCountryAll();
      this.getDepartment();
      this.getWholeData();
    },
    mounted(){
      this.setMenuLink({
        path: '/logs',
        query: {code: 'SERVICER_SETTING',bizCode: 'BIZ_SERVICER_SETTING'},
        type: 100,
        label: this.$i.common.log,
      });
    },
    watch:{
      addressDialogVisible(n){
        if(!n){
          _.map(this.addressData,(v,k)=>{
            this.$set(this.addressData,k,'');
          });
          this.isModifyAddress=false;
        }
      },
      accountDialogVisible(n){
        if(!n){
          _.map(this.accountData,(v,k)=>{
            this.$set(this.accountData,k,'');
          });
          this.isModifyAccount=false;
        }
      },
      contactDialogVisible(n){
        if(!n){
          _.map(this.contactData,(v,k)=>{
            this.$set(this.contactData,k,'');
          });
          this.isModifyContact=false;
        }
      },
    }
  }
</script>

<style scoped>
  .title{
    font-weight: bold;
    font-size: 18px;
    line-height: 32px;
    color:#666666;
  }
  .speCol{
    height: 51px;
  }
  .speWidth{
    width: 100%;
  }
  .summary-btn{
    text-align: center;
    padding-top:10px;
  }
  .section-btn{
    margin-bottom: 10px;
  }

  .section{
    margin-top: 20px;
  }
  .logo{
    width: 48px;
    height: 48px;
    float: left;
    margin-left: 15px;
    border: 1px solid #cccccc;
    border-radius: 10%;
  }
  /*表格样式调整*/
  /*.companyInfo >>> .el-table__header-wrapper>table{*/
  /*width: 100% !important;*/
  /*}*/
  /*.companyInfo >>> .el-table__header-wrapper>table thead tr th{*/
  /*width: 12.5% !important;*/
  /*}*/

  /*弹出框样式*/
  .dialog-footer{
    text-align: center;
  }
  .alert{
    width: 40%;
    margin: 0 auto;
    padding: 15px;
  }

</style>

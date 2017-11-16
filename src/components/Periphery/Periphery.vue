<template>
    <div class="Periphery">
      <router-link class="back" to="/peripherylist">返回列表</router-link>
      <p class="title">周边配套简报</p>
      <el-form ref="form" :model="form" label-width="240px">
        <el-form-item label="简报提交人" required>
          <el-input v-model="form.submitMan" style="width:220px"></el-input>
          <span class="warn-msg">请填写您的真实姓名</span>
        </el-form-item> 

        <el-form-item label="楼盘名称" required>
          <el-select
            v-model="form.buidingId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="searchLoading">
            <el-option
              v-for="(item,index) in buidingList"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          <span class="warn-msg">请填写楼盘名称</span>
        </el-form-item>
        
        <hr/>

        <el-form-item label="周边配套评分" required>
          <el-input v-model="form.overallScore" type="number"  max='100' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="推荐点" required>
          <el-input v-model="form.recommendItem" :maxlength='maxlength3' :minlength='minlength2' style="width:220px" placeholder="例：“周边环境优越”"></el-input>
          <span class="warn-msg">请填写楼盘评分项突出部分（10字以内）</span>
        </el-form-item>

        <el-form-item label="交通便利评分" required>
          <el-input v-model="form.vehicleScore" type="number" max='15' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-15之间的数字 )</span>
        </el-form-item>

        <el-form-item label="周边环境评分" required>
          <el-input v-model="form.environmentScore" type="number" max='10' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-10之间的数字 )</span>
        </el-form-item>

        <el-form-item label="教育配套评分" required>
          <el-input v-model="form.educationScore" type="number" max='8' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-8之间的数字 )</span>
        </el-form-item>

        <el-form-item label="医疗配套评分" required>
          <el-input v-model="form.medicalTreatmentScore" type="number" max='5' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-5之间的数字 )</span>
        </el-form-item>

        <el-form-item label="商业配套评分" required>
          <el-input v-model="form.commerceScore" type="number" max='8' min='0' style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-8之间的数字 )</span>
        </el-form-item>

        <el-form-item label="不利因素评分" required>
          <el-input v-model="form.unfavorableFactorsScore" max='0' min='-51' type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入-51-0之间的数字 )</span>
        </el-form-item>
        
        <el-form-item label="周边配套总体评价" required>
          <quill-editor ref="myTextEditor"
          v-model="form.overallAppraise"
          :options="editorOption"
          style="width:100%;">
          </quill-editor>
        </el-form-item>
      
        <!-- wwww -->
        <hr/>

        <el-form-item label="【周边交通】简评" required>
          <el-input v-model="form.vehicleAppraise" type="textarea" :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对周边交通的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边交通】详细评价" required>
          <el-input v-model="form.vehicleAppraiseDesc" type="textarea"  :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对周边交通的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边交通配图">
          <ImgUploader
          :btnId="btnList[0]"
          :backgroundPicUrl="preImgSrcList[0].preImgSrc"
          @previewImg="previewImg(0)"
          @deleteImg="deleteImg(0)"
          @imgUploader="imgUploader(0)"
          />
        </el-form-item>
        <hr/>
        
        <el-form-item label="【周边环境】简评" required>
          <el-input v-model="form.environmentAppraise" type="textarea"   :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对周边环境的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边环境】详细评价" required>
          <el-input v-model="form.environmentAppraiseDesc" type="textarea"  :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对周边环境的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边环境配图">
          <ImgUploader
          :btnId="btnList[1]"
          :backgroundPicUrl="preImgSrcList[1].preImgSrc"
          @previewImg="previewImg(1)"
          @deleteImg="deleteImg(1)"
          @imgUploader="imgUploader(1)"
          />
        </el-form-item>
        <hr/>

        <el-form-item label="【教育配套】简评" required>
          <el-input v-model="form.educationAppraise" type="textarea"   :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对教育配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【教育配套】详细评价" required>
          <el-input v-model="form.educationAppraiseDesc" type="textarea" :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对教育配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="教育配套配图">
          <ImgUploader
          :btnId="btnList[2]"
          :backgroundPicUrl="preImgSrcList[2].preImgSrc"
          @previewImg="previewImg(2)"
          @deleteImg="deleteImg(2)"
          @imgUploader="imgUploader(2)"
          />
        </el-form-item>
        <hr/>

        <el-form-item label="【医疗配套】简评" required>
          <el-input v-model="form.medicalTreatmentAppraise" type="textarea"  :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对医疗配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【医疗配套】详细评价" required>
          <el-input v-model="form.medicalTreatmentAppraiseDesc" type="textarea" :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对医疗配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="医疗配套配图">
          <ImgUploader
          :btnId="btnList[3]"
          :backgroundPicUrl="preImgSrcList[3].preImgSrc"
          @previewImg="previewImg(3)"
          @deleteImg="deleteImg(3)"
          @imgUploader="imgUploader(3)"
          />
        </el-form-item>
        <hr/>

        <el-form-item label="【商业配套】简评" required>
          <el-input v-model="form.commerceAppraise" type="textarea"  :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对商业配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【商业配套】详细评价" required>
          <el-input v-model="form.commerceAppraiseDesc" type="textarea"  :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对商业配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="商业配套配图">
          <ImgUploader
          :btnId="btnList[4]"
          :backgroundPicUrl="preImgSrcList[4].preImgSrc"
          @previewImg="previewImg(4)"
          @deleteImg="deleteImg(4)"
          @imgUploader="imgUploader(4)"
          />
        </el-form-item>
        <hr/>

        <el-form-item label="【不利因素】简评" required>
          <el-input v-model="form.unfavorableFactorsAppraise" type="textarea" :maxlength='maxlength2' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对不利因素的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【不利因素】详细评价" required>
          <el-input v-model="form.unfavorableFactorsAppraiseDesc" type="textarea"  :maxlength='maxlength1' :minlength='minlength1' :autosize="autosize" placeholder="请输入针对不利因素的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="不利因素配图">
          <ImgUploader
          :btnId="btnList[5]"
          :backgroundPicUrl="preImgSrcList[5].preImgSrc"
          @previewImg="previewImg(5)"
          @deleteImg="deleteImg(5)"
          @imgUploader="imgUploader(5)"
          />
        </el-form-item>
        <hr/>

        <el-form-item v-if = "$route.query.isOnline != 2">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImgSrc" alt="">
      </el-dialog>
    </div>
</template>

<script>
  import uploader from '../../common/uploader.js'
  import ImgUploader from '../Common/ImgUploader/ImgUploader'
  import Vue from 'vue'
  import VueQuillEditor from 'vue-quill-editor'
  Vue.use(VueQuillEditor);
  export default {
    name:'Periphery',
    components:{
      ImgUploader
    },
    created(){
      this.remoteMethod('')
    },
    data() {
      return {
        maxlength1:300,
        maxlength2:30,
        maxlength3:10,
        minlength1:10,
        minlength2:2,
        autosize:true,
        num_buidingId:'',
        buidingList:[],
        searchLoading:false,
        editorOption:{ 
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘周边配套的总评3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption2:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【外立面】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption3:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【大堂】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption4:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘户型一简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        tableData1:[
          {data:'数值'}
        ],
        constructionList:[
          {key:1,value:'95%-100%'},
          {key:2,value:'90%-95%'},
          {key:3,value:'85%-90%'},
          {key:4,value:'80%-85%'},
          {key:5,value:'75%-80%'},
          {key:6,value:'70%-75%'},
          {key:7,value:'65%-70%'},
          {key:8,value:'60%-65%'},
          {key:9,value:'55%-60%'},
          {key:10,value:'50%-55%'},
        ],
        facadeMaterialList:[
          {key:1,value:'石材为主涂料为辅'},
          {key:2,value:'纯石料'},
          {key:3,value:'涂料为主石料为辅'},
          {key:4,value:'纯涂料'},
        ],
        //上传数据
        btnList: ['upbtn0', 'upbtn1', 'upbtn2', 'upbtn3', 'upbtn4','upbtn5'],
        preImgSrcList: [{preImgSrc: ''},{preImgSrc: ''},{preImgSrc: ''},{preImgSrc: ''},{preImgSrc: ''},{preImgSrc: ''}],
        uploaderList: [{uploader: null},{uploader: null},{uploader: null},{uploader: null},{uploader: null},{uploader: null}],
        dialogVisible:false,
        dialogImgSrc:'',
        //formdata
        form: {
          buidingId:'',
          submitMan: '',
          overallScore:'',
          recommendItem:'',
          vehicleScore:'',
          environmentScore:'',
          educationScore:'',
          medicalTreatmentScore:'',
          commerceScore:'',
          unfavorableFactorsScore:'',

          overallAppraise:'',
          vehicleAppraise:'',
          vehicleAppraiseDesc:'',
          vehicleAppraiseUrl:'',

          environmentAppraise:'',
          environmentAppraiseDesc:'',
          environmentAppraiseUrl:'',

          educationAppraise:'',
          educationAppraiseDesc:'',
          educationAppraiseUrl:'',
          
          medicalTreatmentAppraise:'',
          medicalTreatmentAppraiseDesc:'',
          medicalTreatmentAppraiseUrl:'',

          commerceAppraise:'',
          commerceAppraiseDesc:'',
          commerceAppraiseUrl:'',

          unfavorableFactorsAppraise:'',
          unfavorableFactorsAppraiseDesc:'',
          unfavorableFactorsAppraiseUrl:'',
          
        }
      };
    },
    mounted(){
      if(this.$route.query.type && this.$route.query.type == 'edit'){
        this.getdata();
      }
      this.initUploader(0);
      this.initUploader(1);
      this.initUploader(2);
      this.initUploader(3);
      this.initUploader(4);
      this.initUploader(5);
    },
    methods: {
      addImg(){
        this.form.imageList.push({desc:'',imgUrl:''})
      },
      //提交
      onSubmit(){
        let _this = this,
        url = '',
        body = this.form;
       
        if(this.$route.query.type && this.$route.query.type == 'edit'){
          url = '/buidingPeripheralSupporting/updateInfo'
        }else{
          url = '/buidingPeripheralSupporting/insertInfo'
        }
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$http(url,{body},{},{},'post').then(function(res){
            if(res.data.code=='0'){
              _this.$router.push('/peripherylist')
              _this.$message({
                message: res.data.message,
                type: 'success'
              });

            }else if(res.data.code==300){
              _this.$router.push('/login')
            }else{
              _this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          }).catch(function(err){
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
      },
      back(){
        this.$router.push('/briefinglist')
      },
      getdata(){
        let _this = this,
        body = {id: this.$route.query.id};
       
        this.$http('/buidingPeripheralSupporting/queryById',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.form = res.data.response;

            _this.preImgSrcList[0].preImgSrc = _this.form.vehicleAppraiseUrl;
            _this.preImgSrcList[1].preImgSrc = _this.form.environmentAppraiseUrl;
            _this.preImgSrcList[2].preImgSrc = _this.form.educationAppraiseUrl;
            _this.preImgSrcList[3].preImgSrc = _this.form.medicalTreatmentAppraiseUrl;
            _this.preImgSrcList[4].preImgSrc = _this.form.commerceAppraiseUrl;
            _this.preImgSrcList[5].preImgSrc = _this.form.unfavorableFactorsAppraiseUrl;

          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            _this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //模糊搜索
      remoteMethod(val){
          let _this = this,
          body = {buildingName: val};
         
          this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
            if (res.data.code == 0) {

                _this.buidingList = res.data.response;

            } else if (res.data.code == 300) {
                _this.$router.push('/login')
            } else {
                _this.$message({
                    message: res.data.message,
                    type: 'warning'
                });
            }
          }).catch(function (err) {
            console.log(err)
          })
      },
      //初始化上传插件对象
      initUploader(index){
        let _this = this,
          btnName = 'upbtn' + index;
        uploader(function (src) {
          _this.preImgSrcList[index].preImgSrc = src;
        }, function (key) {
          let imgName = '';
          if(index == 0){
            imgName = 'vehicleAppraiseUrl'
          }else if(index == 1){
            imgName = 'environmentAppraiseUrl'
          }else if(index == 2){
            imgName = 'educationAppraiseUrl'
          }else if(index == 3){
            imgName = 'medicalTreatmentAppraiseUrl'
          }else if(index == 4){
            imgName = 'commerceAppraiseUrl'
          }else if(index == 5){
            imgName = 'unfavorableFactorsAppraiseUrl'
          }
          _this.form[imgName] = key;
        }, function () {
          _this.preImgSrcList[index].preImgSrc = '';
        }, function (uploader) {
          _this.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //预览上传图
      previewImg(index){
        this.dialogImgSrc = this.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //删除图片
      deleteImg(index){
        this.preImgSrcList[index].preImgSrc = '';
        let imgName = '';
        if(index == 0){
          imgName = 'vehicleAppraiseUrl'
        }else if(index == 1){
          imgName = 'environmentAppraiseUrl'
        }else if(index == 2){
          imgName = 'educationAppraiseUrl'
        }else if(index == 3){
          imgName = 'medicalTreatmentAppraiseUrl'
        }else if(index == 4){
          imgName = 'commerceAppraiseUrl'
        }else if(index == 5){
          imgName = 'unfavorableFactorsAppraiseUrl'
        }
        this.form[imgName] = ''
      },
      //开始上传
      imgUploader(index){
        if (this.uploaderList[index].uploader == null) {
          return;
        }
        this.uploaderList[index].uploader.start()
      },
    }
  }
</script>

<style scoped>
  .Periphery .title{
    font-size: 24px;
    font-weight: bold;
    color: #0D263F;
    text-align: center;
  }
  .Periphery{
    width: 700px;
    margin: 0 auto;
  }
  .warn-msg{font-size: 12px;color: #777;padding-left: 10px}
  .back{position: fixed;top: 40px;left: 40px}
</style>
<style>
  .el-table td, .el-table th.is-leaf{text-align: center;font-size: 12px;}
  .el-table .el-input__inner{border: none}
</style>
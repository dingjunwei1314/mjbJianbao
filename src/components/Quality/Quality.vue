<template>
    <div class="Quality">
      <p class="title">工程质量简报</p>
      <el-form :model="form" label-width="260px">
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
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <span class="warn-msg">请填写楼盘名称</span>
        </el-form-item>
        <el-form-item label="简报期数" required>
          <el-select v-model="form.bulletinPeriods">
            <el-option :label="item.value" v-for="(item,index) in periodsList" :value="item.key" :key="index"></el-option>
          </el-select>
          <span class="warn-msg">请选择您要填写的楼盘</span>
        </el-form-item>
        
        <hr/>

        <el-form-item label="综合施工进度（%）" required>
          <el-input max='99' min='1' v-model="form.buildSchedule" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="当前质量评分数值" required>
          <el-input max='99' min='1' v-model="form.qualityValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="地基基础工程评分" required>
          <el-input max='99' min='1' v-model="form.baseValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="主体结构工程评分" required>
          <el-input max='99' min='1' v-model="form.bodyValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="屋面工程评分" required>
          <el-input max='99' min='1' v-model="form.surfaceValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="安装工程评分" required>
          <el-input max='99' min='1' v-model="form.installValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="装饰装修工程评分" required>
          <el-input max='99' min='1' v-model="form.ornamentValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <!-- wwww -->
        <hr/>

        <el-form-item label="楼盘总体评价" required>
          <quill-editor ref="myTextEditor"
          v-model="form.buidingComment"
          :options="editorOption"
          style="width:100%;">
          </quill-editor>
        </el-form-item>

        <el-form-item label="【基础工程】评价" required>
          <el-input v-model="form.baseBuildDesc" type="textarea" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【主体结构工程】评价" required>
          <el-input v-model="form.bodyBuildDesc" type="textarea" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【屋面工程】评价" required>
          <el-input v-model="form.surfaceBuildDesc" type="textarea" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【安装工程】评价" required>
          <el-input v-model="form.installBuildDesc" type="textarea" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【装饰装修工程】评价" required>
          <el-input v-model="form.ornamentBuildDesc" type="textarea" placeholder="请填写3-300个字"></el-input>
        </el-form-item>
        
        <hr/>
        
        <el-form-item label="【地基基础】土方开挖进度" required>
          <el-radio-group v-model="form._baseExcavationPercentage" @change="radioChange(form._baseExcavationPercentage,'_baseExcavationPercentage')">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._baseExcavationPercentage == 1" label="【地基基础】土方开挖百分比" required>
          <el-input max='99' min='1' v-model="form.baseExcavationPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】桩基施工进度" required>
          <el-radio-group v-model="form._basePilePercentage" @change="radioChange(form._basePilePercentage,'_basePilePercentage')">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item v-show="form._basePilePercentage == 1" label="【地基基础】桩基施工百分比" required>
          <el-input max='99' min='1' v-model="form.basePilePercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】防水施工进度" required>
          <el-radio-group  @change="radioChange(form._baseWaterproofPercentage,'_baseWaterproofPercentage')" v-model="form._baseWaterproofPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._baseWaterproofPercentage == 1" label="【地基基础】防水施工百分比" required>
          <el-input max='99' min='1' v-model="form.baseWaterproofPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】筏板施工进度" required>
          <el-radio-group  @change="radioChange(form._baseRaftPercentage,'_baseRaftPercentage')" v-model="form._baseRaftPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._baseRaftPercentage == 1" label="【地基基础】筏板施工百分比" required>
          <el-input max='99' min='1' v-model="form.baseRaftPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
         
        <el-form-item label="【主体工程】现浇结构工程进度" required>
          <el-radio-group  @change="radioChange(form._bodyCastStructPercentage,'_bodyCastStructPercentage')" v-model="form._bodyCastStructPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item> 

        <el-form-item v-show="form._bodyCastStructPercentage == 1" label="【主体工程】现浇结构工程百分比" required>
          <el-input max='99' min='1' v-model="form.bodyCastStructPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【主体工程】砌体工程进度" required>
          <el-radio-group  @change="radioChange(form._bodyBrickingPercentage,'_bodyBrickingPercentage')" v-model="form._bodyBrickingPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._bodyBrickingPercentage == 1" label="【主体工程】砌体工程百分比" required>
          <el-input max='99' min='1' v-model="form.bodyBrickingPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【主体工程】二次结构工程进度" required>
          <el-radio-group  @change="radioChange(form._bodyTwoStructPercentage,'_bodyTwoStructPercentage')" v-model="form._bodyTwoStructPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._bodyTwoStructPercentage == 1" label="【主体工程】二次结构工程百分比" required>
          <el-input max='99' min='1' v-model="form.bodyTwoStructPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
         
        <!-- wwww --> 

        <el-form-item label="【装饰装修】内外墙面装饰工程进度" required>
          <el-radio-group  @change="radioChange(form._ornamentWallPercentage,'_ornamentWallPercentage')" v-model="form._ornamentWallPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._ornamentWallPercentage == 1" label="【装饰装修】内外墙面装饰工程百分比" required>
          <el-input max='99' min='1' v-model="form.ornamentWallPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】地面工程进度" required>
          <el-radio-group  @change="radioChange(form._ornamentSurfacePercentage,'_ornamentSurfacePercentage')" v-model="form._ornamentSurfacePercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._ornamentSurfacePercentage == 1" label="【装饰装修】地面工程百分比" required>
          <el-input max='99' min='1' v-model="form.ornamentSurfacePercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】门窗工程进度" required>
          <el-radio-group  @change="radioChange(form._ornamentDoorsPercentage,'_ornamentDoorsPercentage')" v-model="form._ornamentDoorsPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._ornamentDoorsPercentage == 1" label="【装饰装修】门窗工程百分比" required>
          <el-input max='99' min='1' v-model="form.ornamentDoorsPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】吊顶工程进度" required>
          <el-radio-group  @change="radioChange(form._ornamentCeilingPercentage,'_ornamentCeilingPercentage')" v-model="form._ornamentCeilingPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._ornamentCeilingPercentage == 1" label="【装饰装修】吊顶工程百分比" required>
          <el-input max='99' min='1' v-model="form.ornamentCeilingPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <!-- wwww -->

        <el-form-item label="【屋面工程】屋面防水施工进度" required>
          <el-radio-group  @change="radioChange(form._surfaceWaterproofPercentage,'_surfaceWaterproofPercentage')" v-model="form._surfaceWaterproofPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._surfaceWaterproofPercentage == 1" label="【屋面工程】屋面防水施工百分比" required>
          <el-input max='99' min='1' v-model="form.surfaceWaterproofPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【屋面工程】屋面保温层施工进度" required>
          <el-radio-group  @change="radioChange(form._surfaceKeepWarmPercentage,'_surfaceKeepWarmPercentage')" v-model="form._surfaceKeepWarmPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._surfaceKeepWarmPercentage == 1" label="【屋面工程】屋面保温层施工百分比" required>
          <el-input max='99' min='1' v-model="form.surfaceKeepWarmPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        

        <!-- wwww -->
        
        <el-form-item label="【安装工程】水电安装进度" required>
          <el-radio-group  @change="radioChange(form._installWaterElectricityPercentage,'_installWaterElectricityPercentage')" v-model="form._installWaterElectricityPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._installWaterElectricityPercentage == 1" label="【安装工程】水电安装百分比" required>
          <el-input max='99' min='1' v-model="form.installWaterElectricityPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【安装工程】暖通设备安装进度" required>
          <el-radio-group  @change="radioChange(form._installHVACPercentage,'_installHVACPercentage')" v-model="form._installHVACPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._installHVACPercentage == 1" label="【安装工程】暖通设备安装百分比" required>
          <el-input max='99' min='1' v-model="form.installHVACPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【安装工程】卫生器具安装进度" required>
          <el-radio-group  @change="radioChange(form._installSanitaryApparatusPercentage,'_installSanitaryApparatusPercentage')" v-model="form._installSanitaryApparatusPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio label="1">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="form._installSanitaryApparatusPercentage == 1" label="【安装工程】卫生器具安装百分比" required>
          <el-input max='99' min='1' v-model="form.installSanitaryApparatusPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        <hr/>
        
        <template v-for="(item,index) in form.buildQualityPicsList">            
          <h5 style="width:200px;text-align:right">现场实景照片{{index+1}}</h5>
          <el-form-item label="照片描述" required>
            <el-input v-model="item.content" style="width:220px"></el-input>
            <span class="warn-msg">请填写50字以内的描述</span>
          </el-form-item> 
          <el-form-item label="添加图片" required>
            <ImgUploader 
            :btnId="btnList[index]"
            :backgroundPicUrl="preImgSrcList[index].preImgSrc" 
            @previewImg="previewImg(index)"
            @deleteImg="deleteImg(index)"
            @imgUploader="imgUploader(index)"
            />
          </el-form-item> 
        </template>
        <el-button type="text" @click="AddNewImg" v-if="form.buildQualityPicsList.length < 10 " style="margin-left:200px">继续添加一组照片最多十组</el-button>
        <hr/> 
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="dialogVisible"  size="tiny">
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
    name:'Quality',
    components:{
      ImgUploader
    },
    data() {
      return {
        editorOption:{ 
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘的总体评价3-300字',
          readOnly: false,
          theme: 'snow'
        },
        periodsList:[
          {key:1,value:'第一期'},
          {key:2,value:'第二期'},
          {key:3,value:'第三期'},
          {key:4,value:'第四期'},
          {key:5,value:'第五期'},
          {key:6,value:'第六期'},
          {key:7,value:'第七期'},
          {key:8,value:'第八期'},
          {key:9,value:'第九期'},
          {key:10,value:'第十期'},
        ],
        buidingList:[

        ],
        searchLoading:false,
        btnList:['upbtn0','upbtn1','upbtn2','upbtn3','upbtn4','upbtn5','upbtn6','upbtn7','upbtn8','upbtn9'],
        preImgSrcList:[{preImgSrc:''}],
        uploaderList:[{uploader:null}],
        dialogImgSrc:'',
        dialogVisible:false,
        form: {
          submitMan:'',
          buidingId:'',
          bulletinPeriods:'',
          buildSchedule:'',
          qualityValue:'',
          baseValue:'',
          bodyValue:'',
          surfaceValue:'',
          installValue:'',
          ornamentValue:'',
          buidingComment:'',
          baseBuildDesc:'',
          bodyBuildDesc:'',
          surfaceBuildDesc:'',
          installBuildDesc:'',
          ornamentBuildDesc:'',
          baseExcavationPercentage:'',
          basePilePercentage:'',
          baseWaterproofPercentage:'',
          baseRaftPercentage:'',
          bodyCastStructPercentage:'',
          bodyBrickingPercentage:'',
          bodyTwoStructPercentage:'',
          ornamentWallPercentage:'',
          ornamentSurfacePercentage:'',
          ornamentDoorsPercentage:'',
          ornamentCeilingPercentage:'',
          surfaceWaterproofPercentage:'',
          surfaceKeepWarmPercentage:'',
          installWaterElectricityPercentage:'',
          installHVACPercentage:'',
          installSanitaryApparatusPercentage:'',

          _baseExcavationPercentage:'',
          _basePilePercentage:'',
          _baseWaterproofPercentage:'',
          _baseRaftPercentage:'',
          _bodyCastStructPercentage:'',
          _bodyBrickingPercentage:'',
          _bodyTwoStructPercentage:'',
          _ornamentWallPercentage:'',
          _ornamentSurfacePercentage:'',
          _ornamentDoorsPercentage:'',
          _ornamentCeilingPercentage:'',
          _surfaceWaterproofPercentage:'',
          _surfaceKeepWarmPercentage:'',
          _installWaterElectricityPercentage:'',
          _installHVACPercentage:'',
          _installSanitaryApparatusPercentage:'',

          buildQualityPicsList:[
            {
              picUrl:'',
              content:''
            }
          ]
        }
      };
    },
    created(){
      console.log(this.$route.query.id)
    },
    mounted(){
      let _this=this;
      this.initUploader(0);
      if(this.$route.query.id){
        this.getdata()
      }
    },
    methods: {
      //获取数据
      getdata(){
        let _this = this,
            body = {};
        this.$http('/BuildQuality/list',{body},{},{},'post').then(function(res){
            if(res.data.code==0){
                if(res.data.response.status==1){
                  _this.form=res.data.response.data;
                }else{
                  _this.$message({
                    message: res.data.response.message,
                    type: 'warning'
                  });
                }
            }else if(data.code==300){
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
            body = {buildingName:val};
        this.searchLoading = true;
        this.$http('/backstageBuilding/getBuildingNameList',{body},{},{},'post').then(function(res){
          _this.searchLoading = false;
          if(res.data.code==0){
          
            _this.buidingList=res.data.response
            console.log(_this.buidingList)
              
          }else if(data.code==300){
            _this.$router.push('/login')
          }else{
            _this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        }).catch(function(err){
          _this.searchLoading = false;
          console.log(err)
        })
      },
      //初始化上传插件对象
      initUploader(index){
        let _this = this,
            btnName = 'upbtn'+index;
        uploader(function(src){
          _this.preImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.buildQualityPicsList[index].picUrl=key;
        },function(){
          _this.preImgSrcList[index].preImgSrc='';
        },function(uploader){
          _this.uploaderList[index].uploader=uploader
        },btnName)
      },

      //预览上传图
      previewImg(index){
        this.dialogImgSrc = this.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //删除图片
      deleteImg(index){
        this.preImgSrcList[index].preImgSrc = ''
        this.form.buildQualityPicsList[index].picUrl = ''
      },
      //开始上传
      imgUploader(index){
        if(this.uploaderList[index].uploader == null){
          return;
        }
        this.uploaderList[index].uploader.start()
      },
      //继续添加一组照片
      AddNewImg(){
        let _index = this.form.buildQualityPicsList.length
        this.form.buildQualityPicsList.push({content:'',picUrl:''})
        this.preImgSrcList.push({preImgSrc:''})
        this.uploaderList.push({uploader:null})
        this.initUploader(_index)
      },
      //单选框改变
      radioChange(val,name){
        let _name = name.slice(1)
        if(val == 0 || val == 100){
          this.form[_name] = val;  
        }else{
          this.form[_name] = ''
        }
      },
      //提交
      onSubmit(){
        let _this = this;
        this.$confirm('确认提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let _form = _.cloneDeep(_this.form);
          for(var i in _form){
            if(i.slice(0,1) == '_'){
              delete(_form[i])
            }
          }
          let body = _form;
          this.$http('/BuildQuality/insertInfo',{body},{},{},'post').then(function(res){
              
              if(res.data.code==0){
                  if(res.data.response.status==1){
                    _this.$message({
                      message: res.data.response.message,
                      type: 'warning'
                    });
                    _this.$router.push('/qualitylist')
                  }else{
                    _this.$message({
                      message: res.data.response.message,
                      type: 'warning'
                    });
                  }
              }else if(data.code==300){
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
          _this.$message({
              type: 'info',
              message: '已取消'
          });
        });
      },
      //返回
      back(){
        this.$router.push('/briefinglist')
      }
    }
  }
</script>

<style scoped>
  .Quality .title{
    font-size: 24px;
    font-weight: bold;
    color: #0D263F;
    text-align: center;
  }
  .Quality{
    width: 700px;
    margin: 0 auto;
  }
  .warn-msg{font-size: 12px;color: #777;padding-left: 10px}
</style>

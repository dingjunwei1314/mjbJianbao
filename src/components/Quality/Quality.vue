<template>
    <div class="Quality">
      <router-link class="back" to="/qualitylist">返回列表</router-link>
      <p class="title">工程质量简报</p>
      <el-form :model="form" ref="form" label-width="260px">

        <el-form-item label="简报提交人" required trigger="blur">
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

        <el-form-item label="简报期数" required>
          <el-select v-model="form.bulletinPeriods">
            <el-option :label="item.value" v-for="(item,index) in periodsList" :value="item.key" :key="index"></el-option>
          </el-select>
          <span class="warn-msg">请选择您要填写的楼盘</span>
        </el-form-item>
        
        <hr/>

        <el-form-item label="综合施工进度（%）" required>
          <el-input max='100' min='0' v-model="form.buildSchedule" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="当前质量评分数值" required>
          <el-input max='952' min='0' v-model="form.qualityValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-952之间的数字 )</span>
        </el-form-item>

        <el-form-item label="地基基础工程评分" required>
          <el-input max='158' min='0' v-model="form.baseValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-158之间的数字 )</span>
        </el-form-item>

        <el-form-item label="主体结构工程评分" required>
          <el-input max='464' min='0' v-model="form.bodyValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-464之间的数字 )</span>
        </el-form-item>

        <el-form-item label="屋面工程评分" required>
          <el-input max='66' min='0' v-model="form.surfaceValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-66之间的数字 )</span>
        </el-form-item>

        <el-form-item label="安装工程评分" required>
          <el-input max='30' min='0' v-model="form.installValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-30之间的数字 )</span>
        </el-form-item>

        <el-form-item label="装饰装修工程评分" required>
          <el-input max='234' min='0' v-model="form.ornamentValue" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-234之间的数字 )</span>
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
          <el-input v-model="form.baseBuildDesc" type="textarea" :autosize="autosize" :maxlength="maxlength" :minlength="minlength" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【主体结构工程】评价" required>
          <el-input v-model="form.bodyBuildDesc" type="textarea" :autosize="autosize" :maxlength="maxlength" :minlength="minlength" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【屋面工程】评价" required>
          <el-input v-model="form.surfaceBuildDesc" type="textarea" :autosize="autosize" :maxlength="maxlength" :minlength="minlength" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【安装工程】评价" required>
          <el-input v-model="form.installBuildDesc" type="textarea" :autosize="autosize" :maxlength="maxlength" :minlength="minlength" placeholder="请填写3-300个字"></el-input>
        </el-form-item>

        <el-form-item label="【装饰装修工程】评价" required>
          <el-input v-model="form.ornamentBuildDesc" type="textarea" :autosize="autosize" :maxlength="maxlength" :minlength="minlength" placeholder="请填写3-300个字"></el-input>
        </el-form-item>
        
        <hr/>
        
        <el-form-item label="【地基基础】土方开挖进度" required>
          <el-radio-group v-model="baseExcavationPercentage" @change="radioChange(baseExcavationPercentage,'_baseExcavationPercentage')">
            <el-radio label='0'>未动工</el-radio>
            <el-radio :label=" baseExcavationPercentage !== '100' && baseExcavationPercentage !== '0' && baseExcavationPercentage !== '-1' ? baseExcavationPercentage : '1' ">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show=" baseExcavationPercentage !== '100' && baseExcavationPercentage !== '0' && baseExcavationPercentage !== '-1' " label="【地基基础】土方开挖百分比" required>
          <el-input max='99' min='1' v-model="baseExcavationPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】桩基施工进度" required>
          <el-radio-group v-model="basePilePercentage" @change="radioChange(basePilePercentage,'_basePilePercentage')">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="basePilePercentage!=='0' && basePilePercentage !== '100' && basePilePercentage !== '-1' ? basePilePercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item v-show="basePilePercentage !== '0' && basePilePercentage !== '100' && basePilePercentage !== '-1' " label="【地基基础】桩基施工百分比" required>
          <el-input max='99' min='1' v-model="basePilePercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】防水施工进度" required>
          <el-radio-group  @change="radioChange(baseWaterproofPercentage,'_baseWaterproofPercentage')" v-model="baseWaterproofPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="baseWaterproofPercentage!=='0' && baseWaterproofPercentage !== '100' && baseWaterproofPercentage !== '-1'? baseWaterproofPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="baseWaterproofPercentage !== '0' && baseWaterproofPercentage !== '100' && baseWaterproofPercentage !== '-1' " label="【地基基础】防水施工百分比" required>
          <el-input max='99' min='1' v-model="baseWaterproofPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【地基基础】筏板施工进度" required>
          <el-radio-group  @change="radioChange(baseRaftPercentage,'_baseRaftPercentage')" v-model="baseRaftPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="baseRaftPercentage!=='0' && baseRaftPercentage !== '100' && baseRaftPercentage !== '-1' ? baseRaftPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="baseRaftPercentage !=='0' && baseRaftPercentage !== '100' && baseRaftPercentage !== '-1'" label="【地基基础】筏板施工百分比" required>
          <el-input max='99' min='1' v-model="baseRaftPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
         
        <el-form-item label="【主体工程】现浇结构工程进度" required>
          <el-radio-group  @change="radioChange(bodyCastStructPercentage,'_bodyCastStructPercentage')" v-model="bodyCastStructPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="bodyCastStructPercentage!=='0' && bodyCastStructPercentage !== '100' && bodyCastStructPercentage !== '-1' ? bodyCastStructPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item> 

        <el-form-item v-show="bodyCastStructPercentage !=='0' && bodyCastStructPercentage !== '100' && bodyCastStructPercentage !== '-1'" label="【主体工程】现浇结构工程百分比" required>
          <el-input max='99' min='1' v-model="bodyCastStructPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【主体工程】砌体工程进度" required>
          <el-radio-group  @change="radioChange(bodyBrickingPercentage,'_bodyBrickingPercentage')" v-model="bodyBrickingPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="bodyBrickingPercentage!=='0' && bodyBrickingPercentage !== '100' && bodyBrickingPercentage !== '-1' ? bodyBrickingPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="bodyBrickingPercentage !=='0' && bodyBrickingPercentage !== '100' && bodyBrickingPercentage !== '-1'" label="【主体工程】砌体工程百分比" required>
          <el-input max='99' min='1' v-model="bodyBrickingPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【主体工程】二次结构工程进度" required>
          <el-radio-group  @change="radioChange(bodyTwoStructPercentage,'_bodyTwoStructPercentage')" v-model="bodyTwoStructPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="bodyTwoStructPercentage!=='0' && bodyTwoStructPercentage !== '100' && bodyTwoStructPercentage !== '-1' ? bodyTwoStructPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="bodyTwoStructPercentage !=='0' && bodyTwoStructPercentage !== '100' && bodyTwoStructPercentage !== '-1'" label="【主体工程】二次结构工程百分比" required>
          <el-input max='99' min='1' v-model="bodyTwoStructPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
         
        <!-- wwww --> 

        <el-form-item label="【装饰装修】内外墙面装饰工程进度" required>
          <el-radio-group  @change="radioChange(ornamentWallPercentage,'_ornamentWallPercentage')" v-model="ornamentWallPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="ornamentWallPercentage!=='0' && ornamentWallPercentage !== '100' && ornamentWallPercentage !== '-1' ? ornamentWallPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="ornamentWallPercentage !=='0' && ornamentWallPercentage !== '100' && ornamentWallPercentage !== '-1'" label="【装饰装修】内外墙面装饰工程百分比" required>
          <el-input max='99' min='1' v-model="ornamentWallPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】地面工程进度" required>
          <el-radio-group  @change="radioChange(ornamentSurfacePercentage,'_ornamentSurfacePercentage')" v-model="ornamentSurfacePercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="ornamentSurfacePercentage!=='0' && ornamentSurfacePercentage !== '100' && ornamentSurfacePercentage !== '-1' ? ornamentSurfacePercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="ornamentSurfacePercentage !=='0' && ornamentSurfacePercentage !== '100' && ornamentSurfacePercentage !== '-1'" label="【装饰装修】地面工程百分比" required>
          <el-input max='99' min='1' v-model="ornamentSurfacePercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】门窗工程进度" required>
          <el-radio-group  @change="radioChange(ornamentDoorsPercentage,'_ornamentDoorsPercentage')" v-model="ornamentDoorsPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="ornamentDoorsPercentage!=='0' && ornamentDoorsPercentage !== '100' && ornamentDoorsPercentage !== '-1' ? ornamentDoorsPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="ornamentDoorsPercentage !=='0' && ornamentDoorsPercentage !== '100' && ornamentDoorsPercentage !== '-1'" label="【装饰装修】门窗工程百分比" required>
          <el-input max='99' min='1' v-model="ornamentDoorsPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【装饰装修】吊顶工程进度" required>
          <el-radio-group  @change="radioChange(ornamentCeilingPercentage,'_ornamentCeilingPercentage')" v-model="ornamentCeilingPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="ornamentCeilingPercentage!=='0' && ornamentCeilingPercentage !== '100' && ornamentCeilingPercentage !== '-1' ? ornamentCeilingPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="ornamentCeilingPercentage !=='0' && ornamentCeilingPercentage !== '100' && ornamentCeilingPercentage !== '-1'" label="【装饰装修】吊顶工程百分比" required>
          <el-input max='99' min='1' v-model="ornamentCeilingPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <!-- wwww -->

        <el-form-item label="【屋面工程】屋面防水施工进度" required>
          <el-radio-group  @change="radioChange(surfaceWaterproofPercentage,'_surfaceWaterproofPercentage')" v-model="surfaceWaterproofPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="surfaceWaterproofPercentage!=='0' && surfaceWaterproofPercentage !== '100' && surfaceWaterproofPercentage !== '-1' ? surfaceWaterproofPercentage : '1' ">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="surfaceWaterproofPercentage !=='0' && surfaceWaterproofPercentage !== '100' && surfaceWaterproofPercentage !== '-1'" label="【屋面工程】屋面防水施工百分比" required>
          <el-input max='99' min='1' v-model="surfaceWaterproofPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【屋面工程】屋面保温层施工进度" required>
          <el-radio-group  @change="radioChange(surfaceKeepWarmPercentage,'_surfaceKeepWarmPercentage')" v-model="surfaceKeepWarmPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="surfaceKeepWarmPercentage!=='0' && surfaceKeepWarmPercentage !== '100' && surfaceKeepWarmPercentage !== '-1' ? surfaceKeepWarmPercentage : '1' ">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="surfaceKeepWarmPercentage !=='0' && surfaceKeepWarmPercentage !== '100' && surfaceKeepWarmPercentage !== '-1'" label="【屋面工程】屋面保温层施工百分比" required>
          <el-input max='99' min='1' v-model="surfaceKeepWarmPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        

        <!-- wwww -->
        
        <el-form-item label="【安装工程】水电安装进度" required>
          <el-radio-group  @change="radioChange(installWaterElectricityPercentage,'_installWaterElectricityPercentage')" v-model="installWaterElectricityPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="installWaterElectricityPercentage!=='0' && installWaterElectricityPercentage !== '100' && installWaterElectricityPercentage !== '-1' ? installWaterElectricityPercentage : '1' ">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="installWaterElectricityPercentage !=='0' && installWaterElectricityPercentage !== '100' && installWaterElectricityPercentage !== '-1'" label="【安装工程】水电安装百分比" required>
          <el-input max='99' min='1' v-model="installWaterElectricityPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【安装工程】暖通设备安装进度" required>
          <el-radio-group  @change="radioChange(installHVACPercentage,'_installHVACPercentage')" v-model="installHVACPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="installHVACPercentage!=='0' && installHVACPercentage !==  '100' && installHVACPercentage !== '-1' ? installHVACPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="installHVACPercentage !=='0' && installHVACPercentage !==  '100' && installHVACPercentage !== '-1'" label="【安装工程】暖通设备安装百分比" required>
          <el-input max='99' min='1' v-model="installHVACPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="【安装工程】卫生器具安装进度" required>
          <el-radio-group  @change="radioChange(installSanitaryApparatusPercentage,'_installSanitaryApparatusPercentage')" v-model="installSanitaryApparatusPercentage">
            <el-radio label="0">未动工</el-radio>
            <el-radio :label="installSanitaryApparatusPercentage!=='0' && installSanitaryApparatusPercentage !== '100' && installSanitaryApparatusPercentage !== '-1' ?  installSanitaryApparatusPercentage : '1'">施工中</el-radio>
            <el-radio label="100">已完成</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="installSanitaryApparatusPercentage !=='0' && installSanitaryApparatusPercentage !== '100' && installSanitaryApparatusPercentage !== '-1'" label="【安装工程】卫生器具安装百分比" required>
          <el-input max='99' min='1' v-model="installSanitaryApparatusPercentage" style="width:220px" type="number"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        <hr/>
        
        <template v-for="(item,index) in form.buildQualityPicsList">
          <h5 style="width:200px;text-align:right">现场实景照片{{index+1}}</h5>
          <el-form-item label="照片描述" required>
            <el-input v-model="item.content" :maxlength="maxlength2" style="width:220px"></el-input>
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
        <el-form-item v-if = "$route.query.isOnline != 2">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
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
          autosize:true,
          maxlength:300,
          maxlength2:50,
          minlength:3,
          baseExcavationPercentage:'-1',
          basePilePercentage:'-1',
          baseWaterproofPercentage:'-1',
          baseRaftPercentage:'-1',
          bodyCastStructPercentage:'-1',
          bodyBrickingPercentage:'-1',
          bodyTwoStructPercentage:'-1',
          ornamentWallPercentage:'-1',
          ornamentSurfacePercentage:'-1',
          ornamentDoorsPercentage:'-1',
          ornamentCeilingPercentage:'-1',
          surfaceWaterproofPercentage:'-1',
          surfaceKeepWarmPercentage:'-1',
          installWaterElectricityPercentage:'-1',
          installHVACPercentage:'-1',
          installSanitaryApparatusPercentage:'-1',

          num_buidingId:0,
          submit_url:'',
          buidingList:[],
          searchLoading:false,
          btnList:['upbtn0','upbtn1','upbtn2','upbtn3','upbtn4','upbtn5','upbtn6','upbtn7','upbtn8','upbtn9'],
          preImgSrcList:[],
          uploaderList:[],
          dialogImgSrc:'',
          dialogVisible:false,

          editorOption:{
            toolbar: '#toolbar',
            placeholder: '请输入针对本楼盘的总体评价3-300字',
            readOnly: false,
            theme: 'snow'
          },
          periodsList:[
            {key:'1',value:'第一期'},
            {key:'2',value:'第二期'},
            {key:'3',value:'第三期'},
            {key:'4',value:'第四期'},
            {key:'5',value:'第五期'},
            {key:'6',value:'第六期'},
            {key:'7',value:'第七期'},
            {key:'8',value:'第八期'},
            {key:'9',value:'第九期'},
            {key:'10',value:'第十期'},
          ],
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
            buildQualityPicsList:[]
          }

      };
    },

    created(){
      this.remoteMethod('')
    },

    mounted(){
        let _this=this;
        if(this.$route.query.type && this.$route.query.type == 'edit'){
          this.getdata()
        }
        if(this.$route.query.type && this.$route.query.type == 'add'){
          this.preImgSrcList.push({
            preImgSrc:''
          })
          this.uploaderList.push({
            uploader:null
          })
          this.form.buildQualityPicsList.push({
            picUrl:'',
            content:''
          })
          this.initUploader(0);
        }

    },

    methods: {
      //获取数据
      getdata(){
        let _this = this,
        body = {
            id:this.$route.query.id
        };
        this.$http('/buildQuality/queryById',{body},{},{},'post').then(function(res){

            if(res.data.code==0){

              _this.form = res.data.response;

              _this.baseExcavationPercentage = _this.is_type_styte(res.data.response.baseExcavationPercentage);
              _this.basePilePercentage = _this.is_type_styte(res.data.response.basePilePercentage);
              _this.baseWaterproofPercentage = _this.is_type_styte(res.data.response.baseWaterproofPercentage);
              _this.baseRaftPercentage = _this.is_type_styte(res.data.response.baseRaftPercentage);
              _this.bodyCastStructPercentage = _this.is_type_styte(res.data.response.bodyCastStructPercentage);
              _this.bodyBrickingPercentage = _this.is_type_styte(res.data.response.bodyBrickingPercentage);
              _this.bodyTwoStructPercentage = _this.is_type_styte(res.data.response.bodyTwoStructPercentage);
              _this.ornamentWallPercentage = _this.is_type_styte(res.data.response.ornamentWallPercentage);
              _this.ornamentSurfacePercentage = _this.is_type_styte(res.data.response.ornamentSurfacePercentage);
              _this.ornamentDoorsPercentage = _this.is_type_styte(res.data.response.ornamentDoorsPercentage);
              _this.ornamentCeilingPercentage = _this.is_type_styte(res.data.response.ornamentCeilingPercentage);
              _this.surfaceWaterproofPercentage = _this.is_type_styte(res.data.response.surfaceWaterproofPercentage);
              _this.surfaceKeepWarmPercentage = _this.is_type_styte(res.data.response.surfaceKeepWarmPercentage);
              _this.installWaterElectricityPercentage = _this.is_type_styte(res.data.response.installWaterElectricityPercentage);
              _this.installHVACPercentage = _this.is_type_styte(res.data.response.installHVACPercentage);
              _this.installSanitaryApparatusPercentage = _this.is_type_styte(res.data.response.installSanitaryApparatusPercentage);
              
              if(_this.form.buildQualityPicsList.length <= 0){
                _this.form.buildQualityPicsList.push({
                  picUrl:'',
                  content:''
                })
              }
              _this.form.buildQualityPicsList.forEach((item,index) => {
                _this.preImgSrcList.push({
                  preImgSrc:item.picUrl
                })
                _this.uploaderList.push({
                  uploader:null
                })
                _this.initUploader(index)
              })

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
      },

      //模糊搜索
      remoteMethod(val){
        let _this = this,
            body = {buildingName:val};
        this.searchLoading = true;
        this.$http('/backstageBuilding/getBuildingNameList',{body},{},{},'post').then(function(res){
          _this.searchLoading = false;
          if(res.data.code==0){
            _this.buidingList=res.data.response;
          }else if(res.data.code==300){
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
          _this.uploaderList[index].uploader=uploader;
        },btnName)
      },

      //预览上传图
      previewImg(index){
        this.dialogImgSrc = this.preImgSrcList[index].preImgSrc;
        this.dialogVisible = true;
      },

      //删除图片
      deleteImg(index){
        this.preImgSrcList[index].preImgSrc = '';
        this.form.buildQualityPicsList[index].picUrl = '';
      },

      //开始上传
      imgUploader(index){
        if( this.uploaderList[index].uploader == null ){
          return;
        }
        this.uploaderList[index].uploader.start();
      },

      //继续添加一组照片
      AddNewImg(){
        let _index = this.form.buildQualityPicsList.length;
        this.form.buildQualityPicsList.push({
          content:'',
          picUrl:''
        });
        this.preImgSrcList.push({
          preImgSrc:''
        });
        this.uploaderList.push({
          uploader:null
        });
        this.initUploader(_index);
      },
      //单选框改变
      radioChange(val,name){
        let _name = name.slice(1)
        this.form[_name] = val;
      },

      //提交
      submitForm(){
        if(this.$route.query.id){
            this.submit_url = '/buildQuality/updateInfo';
        }else{
            this.submit_url = '/buildQuality/insertInfo';
        }
        let _this = this;
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let _form = _.cloneDeep(_this.form);
          let body = {} = _form ;
          if(typeof body.buidingId === 'string'){
            body.buidingId =  _this.num_buidingId;
          }else{
            body.buidingId =  _this.form.buidingId;
          }

          this.$http(this.submit_url,{body},{},{},'post').then(function(res){
            if(res.data.code==0){
              _this.$router.push('/qualitylist')
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
          _this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      //返回
      back(){
        this.$router.push('/briefinglist')
      },

      is_type_styte(data){
          if(data === 0 ){
              return '0'
          }else if(data === 100 ){
              return '100'
          }else {
              return data
          }
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
  .back{position: fixed;top: 40px;left: 40px}
</style>

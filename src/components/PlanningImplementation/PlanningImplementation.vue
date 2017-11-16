<template>
    <div class="PlanningImplementation">
      <router-link class="back" to="/planningimplementationlist">返回列表</router-link>
      <p class="title">规划落实简报</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="简报概述" name="first">
          <el-form ref="form" :model="form" label-width="260px">
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

            <el-form-item label="简报期数" required>
              <el-select v-model="form.version">
                <el-option :label="item.value" v-for="(item,index) in periodsList" :value="item.key" :key="index"></el-option>
              </el-select>
              <span class="warn-msg">请选择您要填写的楼盘</span>
            </el-form-item>

            <el-form-item label="落实统计进度" required>
              <el-input v-model="form.practicableCountSchedule" max="100" min="0" type="number" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item>
            <el-form-item label="总体评价" required>
              <quill-editor ref="myTextEditor"
              v-model="form.generalEvaluation"
              :options="editorOption"
              style="width:100%;">
              </quill-editor>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="楼栋规划落实" name="second">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="楼栋规划落实简评" required>
              <el-input v-model="form.buidingPlanDesc" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="楼栋规划落实所处阶段" required>
              <el-radio-group v-model="form.buidingPlanStage" @change="buidingPlanStageChange">
                <el-radio :label="label1">一阶段</el-radio>
                <el-radio :label="label2">二阶段</el-radio>
                <el-radio :label="label3">三阶段</el-radio>
                <el-radio :label="label4">四阶段</el-radio>
                <el-radio :label="label5">五阶段</el-radio>
                <el-radio :label="label6">六阶段</el-radio>
                <el-radio :label="label7">七阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.buidingPlanStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.buidingPlanScore1" type="number" max="7" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>
            <el-form-item v-show="form.buidingPlanStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.buidingPlanScore2" type="number" max="10" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为10分</span>
            </el-form-item> 
            <el-form-item v-show="form.buidingPlanStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.buidingPlanScore3" type="number" max="3" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为3分</span>
            </el-form-item> 
            <el-form-item v-show="form.buidingPlanStage>=4" label="第四阶段评分" required>
              <el-input v-model="form.buidingPlanScore4" type="number" max="9" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为9分</span>
            </el-form-item> 
            <el-form-item v-show="form.buidingPlanStage>=5" label="第五阶段评分" required>
              <el-input v-model="form.buidingPlanScore5" type="number" max="11" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为11分</span>
            </el-form-item> 
            <el-form-item v-show="form.buidingPlanStage>=6" label="第六阶段评分" required>
              <el-input v-model="form.buidingPlanScore6" type="number" max="23" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为23分</span>
            </el-form-item> 
            <el-form-item v-show="form.buidingPlanStage>=7" label="第七阶段评分" required>
              <el-input v-model="form.buidingPlanScore7" type="number" max="7" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.buidingBuidSchedule" type="number" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 

            <el-form-item label="消防" required>
              <el-radio-group v-model="form.buidingFireControl1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingFireControl2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="栏杆" required>
              <el-radio-group v-model="form.buidingRailing1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingRailing2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="楼梯" required>
              <el-radio-group v-model="form.buidingStairs1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingStairs2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="外墙面" required>
              <el-radio-group v-model="form.buidingExteriorWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingExteriorWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="内墙面" required>
              <el-radio-group v-model="form.buidingInnerWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingInnerWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.buidingHeight1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingHeight2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="剪力墙" required>
              <el-radio-group v-model="form.buidingShearWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingShearWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="房间开间" required>
              <el-radio-group v-model="form.buidingBay1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingBay2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="门窗" required>
              <el-radio-group v-model="form.buidingDoorsWindows1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingDoorsWindows2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="预留洞" required>
              <el-radio-group v-model="form.buidingReservedHole1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingReservedHole2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.buidingHydropowerWarmSchedule" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          
            <el-form-item label="照明" required>
              <el-radio-group v-model="form.buidingLighting1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingLighting2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.buidingSocket1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingSocket2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="弱电" required>
              <el-radio-group v-model="form.buidingWeakness1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingWeakness2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.buidingDrainage1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingDrainage2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.buidingHvac1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.buidingHvac2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.buidingPicsList">            
              <h5 style="width:200px;text-align:right">楼栋规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.picDesc" :maxlength="maxlength1" style="width:220px"></el-input>
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
            <el-button type="text" @click="buildingAddNewImg" v-if="form.buidingPicsList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="户型规划落实" name="third">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="户型规划落实简评" required>
              <el-input v-model="form.housetypePlanDesc" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="户型规划落实所处阶段" required>
              <el-radio-group v-model="form.housetypePlanStage"  @change="housetypePlanStageChange">
                <el-radio :label="label1">一阶段</el-radio>
                <el-radio :label="label2">二阶段</el-radio>
                <el-radio :label="label3">三阶段</el-radio>
                <el-radio :label="label4">四阶段</el-radio>
                <el-radio :label="label5">五阶段</el-radio>
                <el-radio :label="label6">六阶段</el-radio>
                <el-radio :label="label7">七阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.housetypePlanStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.housetypePlanScore1" type="number" max="7" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>
            <el-form-item v-show="form.housetypePlanStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.housetypePlanScore2" type="number" max="10" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为10分</span>
            </el-form-item> 
            <el-form-item v-show="form.housetypePlanStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.housetypePlanScore3" type="number" max="3" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为3分</span>
            </el-form-item> 
            <el-form-item v-show="form.housetypePlanStage>=4" label="第四阶段评分" required>
              <el-input v-model="form.housetypePlanScore4" type="number" max="9" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为9分</span>
            </el-form-item> 
            <el-form-item v-show="form.housetypePlanStage>=5" label="第五阶段评分" required>
              <el-input v-model="form.housetypePlanScore5" type="number" max="11" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为11分</span>
            </el-form-item> 
            <el-form-item v-show="form.housetypePlanStage>=6" label="第六阶段评分" required>
              <el-input v-model="form.housetypePlanScore6" type="number" max="15" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为15分</span>
            </el-form-item> 
            <el-form-item v-show="form.housetypePlanStage>=7" label="第七阶段评分" required>
              <el-input v-model="form.housetypePlanScore7" type="number" max="6" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为6分</span>
            </el-form-item>  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.housetypeBuidSchedule" type="number" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item>  

            <el-form-item label="外墙面" required>
              <el-radio-group v-model="form.housetypeExteriorWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeExteriorWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="内墙面" required>
              <el-radio-group v-model="form.housetypeInnerWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeInnerWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.housetypeHeight1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeHeight2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="剪力墙" required>
              <el-radio-group v-model="form.housetypeShearWall1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeShearWall2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="房间开间" required>
              <el-radio-group v-model="form.housetypeBay1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeBay2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="门窗" required>
              <el-radio-group v-model="form.housetypeDoorsWindows1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeDoorsWindows2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="预留洞" required>
              <el-radio-group v-model="form.housetypeReservedHole1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeReservedHole2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.housetypeHydropowerWarmSchedule" type="number" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          

            <el-form-item label="照明" required>
              <el-radio-group v-model="form.housetypeLighting1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeLighting2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.housetypeSocket1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeSocket2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="弱电" required>
              <el-radio-group v-model="form.housetypeWeakness1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeWeakness2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.housetypeDrainage1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeDrainage2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.housetypeHvac1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.housetypeHvac2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.houseTypePicsList">            
              <h5 style="width:200px;text-align:right">户型规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.picDesc" :maxlength="maxlength1" style="width:220px"></el-input>
                <span class="warn-msg">请填写50字以内的描述</span>
              </el-form-item> 
              <el-form-item label="添加图片" required>
                <ImgUploader 
                :btnId="FPbtnList[index]"
                :backgroundPicUrl="FPpreImgSrcList[index].preImgSrc" 
                @previewImg="FPpreviewImg(index)"
                @deleteImg="FPdeleteImg(index)"
                @imgUploader="FPimgUploader(index)"
                />
              </el-form-item> 
            </template>
            <el-button type="text" @click="FPAddNewImg" v-if="form.houseTypePicsList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>

          </el-form>
        </el-tab-pane>

        <el-tab-pane label="园区规划落实" name="fourth">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="园区规划落实简评" required>
              <el-input v-model="form.parkPlanDesc" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="园区规划落实所处阶段" required>
              <el-radio-group v-model="form.parkPlanStage"  @change="parkPlanStageChange">
                <el-radio :label="label1">一阶段</el-radio>
                <el-radio :label="label2">二阶段</el-radio>
                <el-radio :label="label3">三阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.parkPlanStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.parkPlanScore1" type="number" max="24" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为24分</span>
            </el-form-item>
            <el-form-item v-show="form.parkPlanStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.parkPlanScore2" type="number" max="29" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为29分</span>
            </el-form-item> 
            <el-form-item v-show="form.parkPlanStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.parkPlanScore3" type="number" max="13" min="0" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为13分</span>
            </el-form-item> 
  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.parkBuidSchedule" type="number" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 

            <el-form-item label="出入口" required>
              <el-radio-group v-model="form.parkEntranceAndExit1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkEntranceAndExit2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="商业" required>
              <el-radio-group v-model="form.parkBusiness1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkBusiness2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="学校" required>
              <el-radio-group v-model="form.parkSchool1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkSchool2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="居民楼" required>
              <el-radio-group v-model="form.parkResidentialBuilding1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkResidentialBuilding2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="道路" required>
              <el-radio-group v-model="form.parkRoad1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkRoad2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="不利因素" required>
              <el-radio-group v-model="form.parkUnfavorableFactors1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkUnfavorableFactors2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

           
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.parkHydropowerWarmSchedule" type="number" max="100" min="0" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.parkSocket1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkSocket2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="电器设备" required>
              <el-radio-group v-model="form.parkElectricalEquipment1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkElectricalEquipment2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.parkDrainage1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkDrainage2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="消防设备" required>
              <el-radio-group v-model="form.parkFireFightingEquipment1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkFireFightingEquipment2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.parkHvac1">
                <el-radio :label="label1">符合国家标准</el-radio>
                <el-radio :label="label0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.parkHvac2">
                <el-radio :label="label1">合格</el-radio>
                <el-radio :label="label2">不合格</el-radio>
                <el-radio :label="label3">整改中</el-radio>
                <el-radio :label="label4">已整改</el-radio>
                <el-radio :label="label5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.parkPicsList">            
              <h5 style="width:200px;text-align:right">园区规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.picDesc" :maxlength="maxlength1" style="width:220px"></el-input>
                <span class="warn-msg">请填写50字以内的描述</span>
              </el-form-item> 
              <el-form-item label="添加图片" required>
                <ImgUploader 
                :btnId="PKbtnList[index]"
                :backgroundPicUrl="PKpreImgSrcList[index].preImgSrc" 
                @previewImg="PKpreviewImg(index)"
                @deleteImg="PKdeleteImg(index)"
                @imgUploader="PKimgUploader(index)"
                />
              </el-form-item> 
            </template>
            <el-button type="text" @click="PKAddNewImg" v-if="form.parkPicsList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>

          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-row style="text-align:center;margin:50px auto" v-if = "$route.query.isOnline != 2">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="back">取消</el-button>
      </el-row>
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
    name:'PlanningImplementation',
    components:{
      ImgUploader
    },
    data() {
      return {
        maxlength1:50,
        btnList:['upbtn0','upbtn1','upbtn2','upbtn3'],
        FPbtnList:['FPupbtn0','FPupbtn1','FPupbtn2','FPupbtn3'],
        PKbtnList:['PKupbtn0','PKupbtn1','PKupbtn2','PKupbtn3'],
        
        label0:0,
        label1:1,
        label2:2,
        label3:3,
        label4:4,
        label5:5,
        label6:6,
        label7:7,

        preImgSrcList:[],
        FPpreImgSrcList:[],
        PKpreImgSrcList:[],

        uploaderList:[],
        FPuploaderList:[],
        PKuploaderList:[],

        dialogImgSrc:'',
        dialogVisible:false,

        activeName:'first',
        buidingList:[],
        searchLoading:false,
        editorOption:{ 
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘规划落实的总体评价3-300字',
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
        form: {
          id:'',
          buidingId:'',
          submitMan: '',
          version:'',
          practicableCountSchedule:'',
          generalEvaluation:'',

          buidingPlanDesc:'',
          buidingPlanStage:'',
          buidingPlanScore1:'',
          buidingPlanScore2:'',
          buidingPlanScore3:'',
          buidingPlanScore4:'',
          buidingPlanScore5:'',
          buidingPlanScore6:'',
          buidingPlanScore7:'',
          buidingBuidSchedule:'',
          buidingFireControl1:'',
          buidingFireControl2:'',
          buidingRailing1:'',
          buidingRailing2:'',
          buidingStairs1:'',
          buidingStairs2:'',
          buidingExteriorWall1:'',
          buidingExteriorWall2:'',
          buidingInnerWall1:'',
          buidingInnerWall2:'',
          buidingHeight1:'',
          buidingHeight2:'',
          buidingShearWall1:'',
          buidingShearWall2:'',
          buidingBay1:'',
          buidingBay2:'',
          buidingDoorsWindows1:'',
          buidingDoorsWindows2:'',
          buidingReservedHole1:'',
          buidingReservedHole2:'',
          buidingHydropowerWarmSchedule:'',
          buidingLighting1:'',
          buidingLighting2:'',
          buidingSocket1:'',
          buidingSocket2:'',
          buidingWeakness1:'',
          buidingWeakness2:'',
          buidingDrainage1:'',
          buidingDrainage2:'',
          buidingHvac1:'',
          buidingHvac2:'',

          housetypePlanDesc:'',
          housetypePlanStage:'',
          housetypePlanScore1:'',
          housetypePlanScore2:'',
          housetypePlanScore3:'',
          housetypePlanScore4:'',
          housetypePlanScore5:'',
          housetypePlanScore6:'',
          housetypePlanScore7:'',
          housetypeBuidSchedule:'',
          housetypeExteriorWall1:'',
          housetypeExteriorWall2:'',
          housetypeInnerWall1:'',
          housetypeInnerWall2:'',
          housetypeHeight1:'',
          housetypeHeight2:'',
          housetypeShearWall1:'',
          housetypeShearWall2:'',
          housetypeBay1:'',
          housetypeBay2:'',
          housetypeDoorsWindows1:'',
          housetypeDoorsWindows2:'',
          housetypeReservedHole1:'',
          housetypeReservedHole2:'',

          housetypeHydropowerWarmSchedule:'',
          housetypeLighting1:'',
          housetypeLighting2:'',
          housetypeSocket1:'',
          housetypeSocket2:'',
          housetypeWeakness1:'',
          housetypeWeakness2:'',
          housetypeDrainage1:'',
          housetypeDrainage2:'',
          housetypeHvac1:'',
          housetypeHvac2:'',

          parkPlanDesc:'',
          parkPlanStage:'',
          parkPlanScore1:'',
          parkPlanScore2:'',
          parkPlanScore3:'',

          parkBuidSchedule:'',
          parkEntranceAndExit1:'',
          parkEntranceAndExit2:'',
          parkBusiness1:'',
          parkBusiness2:'',
          parkSchool1:'',
          parkSchool2:'',
          parkResidentialBuilding1:'',
          parkResidentialBuilding2:'',
          parkRoad1:'',
          parkRoad2:'',
          parkUnfavorableFactors1:'',
          parkUnfavorableFactors2:'',

          parkHydropowerWarmSchedule:'',
          parkSocket1:'',
          parkSocket2:'',
          parkElectricalEquipment1:'',
          parkElectricalEquipment2:'',
          parkDrainage1:'',
          parkDrainage2:'',
          parkFireFightingEquipment1:'',
          parkFireFightingEquipment2:'',
          parkHvac1:'',
          parkHvac2:'',

          buidingPicsList:[
           
          ],
          houseTypePicsList:[
           
          ],
          parkPicsList:[
           
          ]
        }
      }
    },
    created(){
      this.remoteMethod('') 
      if(this.$route.query.type && this.$route.query.type == 'edit'){
        this.getdata();
      }
    },
    mounted(){
      let _this=this;
      if(this.$route.query.type && this.$route.query.type == 'add'){

        this.preImgSrcList.push({preImgSrc:''})
        this.FPpreImgSrcList.push({preImgSrc:''})
        this.PKpreImgSrcList.push({preImgSrc:''})

        this.uploaderList.push({uploader:null})
        this.FPuploaderList.push({uploader:null})
        this.PKuploaderList.push({uploader:null})

        this.form.buidingPicsList.push({
          picUrl:'',
          picDesc:'',
          id:''
        })

        this.form.houseTypePicsList.push({
          picUrl:'',
          picDesc:'',
          id:''
        })

        this.form.parkPicsList.push({
          picUrl:'',
          picDesc:'',
          id:''
        })

        this.initUploader(0)
        this.FPinitUploader(0)
        this.PKinitUploader(0)
      }
    },
    methods: {
      //获取数据
      getdata(){
        let _this = this,
        body = {id: this.$route.query.id};
        this.$http('/buidingPlanPracticable/queryById',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.form = res.data.response;
            
            if(_this.form.buidingPicsList.length == 0){
              _this.form.buidingPicsList.push({
                picUrl:'',
                picDesc:'',
                id:''
              })
            }

            if(_this.form.houseTypePicsList.length == 0){
              _this.form.houseTypePicsList.push({
                picUrl:'',
                picDesc:'',
                id:''
              })
            }

            if(_this.form.parkPicsList.length == 0){
              _this.form.parkPicsList.push({
                picUrl:'',
                picDesc:'',
                id:''
              })
            }

            _this.form.buidingPicsList.forEach((item,index) =>{
              _this.preImgSrcList.push({preImgSrc:item.picUrl})
              _this.uploaderList.push({uploader:null})
              _this.initUploader(index)
            })

            _this.form.houseTypePicsList.forEach((item,index) =>{
              _this.FPpreImgSrcList.push({preImgSrc:item.picUrl})
              _this.FPuploaderList.push({uploader:null})
              _this.FPinitUploader(index)
            })

            _this.form.parkPicsList.forEach((item,index) =>{
              _this.PKpreImgSrcList.push({preImgSrc:item.picUrl})
              _this.PKuploaderList.push({uploader:null})
              _this.PKinitUploader(index)
            })
            
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
                    message: res.message,
                    type: 'warning'
                });
            }
          }).catch(function (err) {
            console.log(err)
          })
      },
      //改变单选
      buidingPlanStageChange(val){
        if(val == ''){
          return
        }
        for(let i = val+1;i <= 7;i++){
          this.form['buidingPlanScore'+i] = ''
        }
      },
      housetypePlanStageChange(val){
        if(val == ''){
          return
        }
        for(let i = val+1;i <= 7;i++){
          this.form['housetypePlanScore'+i] = ''
        }
      },
      parkPlanStageChange(val){
        if(val == ''){
          return
        }
        for(let i = val+1;i <= 3;i++){
          this.form['parkPlanScore'+i] = ''
        }
      },
      //楼栋初始化上传插件对象
      initUploader(index){
        let _this = this,
        btnName = 'upbtn'+index;
        
        uploader(function(src){
          _this.preImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.buidingPicsList[index].picUrl=key;
        },function(){
          _this.preImgSrcList[index].preImgSrc='';
        },function(uploader){
          _this.uploaderList[index].uploader=uploader
        },btnName)
      },

      //楼栋预览上传图
      previewImg(index){
        this.dialogImgSrc = this.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //楼栋删除图片
      deleteImg(index){
        this.preImgSrcList[index].preImgSrc = ''
        this.form.buidingPicsList[index].picUrl = ''
      },
      //楼栋开始上传
      imgUploader(index){
        if(this.uploaderList[index].uploader == null){
          return;
        }
        this.uploaderList[index].uploader.start()
      },
      //楼栋继续添加一组照片
      buildingAddNewImg(){
        let _index = this.form.buidingPicsList.length;

        this.form.buidingPicsList.push({
          picDesc:'',picUrl:'',id:''
        });
        this.preImgSrcList.push({
          preImgSrc:''
        });
        this.uploaderList.push({
          uploader:null
        });
        
        this.initUploader(_index);
      },


      //户型初始化上传插件对象
      FPinitUploader(index){
        let _this = this,
        btnName = 'FPupbtn'+index;

        uploader(function(src){
          _this.FPpreImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.houseTypePicsList[index].picUrl=key;
        },function(){
          _this.FPpreImgSrcList[index].preImgSrc='';
        },function(uploader){
          _this.FPuploaderList[index].uploader=uploader
        },btnName)
      },

      //户型预览上传图
      FPpreviewImg(index){
        this.dialogImgSrc = this.FPpreImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //户型删除图片
      FPdeleteImg(index){
        this.FPpreImgSrcList[index].preImgSrc = ''
        this.form.houseTypePicsList[index].picUrl = ''
      },
      //户型开始上传
      FPimgUploader(index){
        if(this.FPuploaderList[index].uploader == null){
          return;
        }
        this.FPuploaderList[index].uploader.start()
      },
      //户型继续添加一组照片
      FPAddNewImg(){
        let _index = this.form.houseTypePicsList.length
        this.form.houseTypePicsList.push({
          picDesc:'',picUrl:''
        })
        this.FPpreImgSrcList.push({
          preImgSrc:''
        })
        this.FPuploaderList.push({
          uploader:null
        })
        this.FPinitUploader(_index)
      },



      //园区初始化上传插件对象
      PKinitUploader(index){
        let _this = this,
        btnName = 'PKupbtn'+index;
        uploader(function(src){
          _this.PKpreImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.parkPicsList[index].picUrl=key;
        },function(){
          _this.PKpreImgSrcList[index].preImgSrc='';
        },function(uploader){
          _this.PKuploaderList[index].uploader=uploader
        },btnName)
      },

      //园区预览上传图
      PKpreviewImg(index){
        this.dialogImgSrc = this.PKpreImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //园区删除图片
      PKdeleteImg(index){
        this.PKpreImgSrcList[index].preImgSrc = ''
        this.form.parkPicsList[index].picUrl = ''
      },
      //园区开始上传
      PKimgUploader(index){ 
        if(this.PKuploaderList[index].uploader == null){
          return;
        }
        this.PKuploaderList[index].uploader.start()
      },
      //园区继续添加一组照片
      PKAddNewImg(){
        let _index = this.form.parkPicsList.length
        this.form.parkPicsList.push({
          picDesc:'',picUrl:''
        })
        this.PKpreImgSrcList.push({
          preImgSrc:''
        })
        this.PKuploaderList.push({
          uploader:null
        })
        this.PKinitUploader(_index)
      },
      //提交
      onSubmit(){
        let _this = this,
        url = '',
        body = this.form;
       
        if(this.form.id == ''){
          url = '/buidingPlanPracticable/insertInfo';
        }else{
          url = '/buidingPlanPracticable/updateInfo';
        }

        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(url,{body},{},{},'post').then(function(res){
            if(res.data.code == 0){
              _this.$message({
                message: res.data.message,
                type: 'success'
              });

              if(res.data.response.id){
                _this.form.id = res.data.response.id;
              }

              if(res.data.response.buidingPicsList.length > 0){
                _this.form.buidingPicsList = res.data.response.buidingPicsList
              }

              if(res.data.response.houseTypePicsList.length > 0){
                _this.form.houseTypePicsList = res.data.response.houseTypePicsList
              }

              if(res.data.response.parkPicsList.length > 0){
                _this.form.parkPicsList = res.data.response.parkPicsList
              }
              
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
      back(){
        this.$router.push('/planningimplementationlist')
      },
      handleClick(){
      }
    }
  }
</script>

<style scoped>
  .PlanningImplementation .title{
    font-size: 24px;
    font-weight: bold;
    color: #0D263F;
    text-align: center;
  }
  .PlanningImplementation{
    width: 800px;
    margin: 0 auto;
  }
  .warn-msg{font-size: 12px;color: #777;padding-left: 10px}
  .back{position: fixed;top: 40px;left: 40px}
</style>
<style>
  .PlanningImplementation .el-tabs__nav-scroll{display:flex;justify-content:center;}
</style>
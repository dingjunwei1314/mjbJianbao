<template>
    <div class="PlanningImplementation">
      <p class="title">规划落实简报</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="简报概述" name="first">
          <el-form ref="form" :model="form" label-width="260px">
            <el-form-item label="简报提交人" required>
              <el-input v-model="form.name" style="width:220px"></el-input>
              <span class="warn-msg">请填写您的真实姓名</span>
            </el-form-item> 
            <el-form-item label="所在城市" required>
              <el-input v-model="form.city" style="width:220px"></el-input>
              <span class="warn-msg">请填写所在城市</span>
            </el-form-item>
            <el-form-item label="楼盘名称" required>
              <el-input v-model="form.buildingName" style="width:220px"></el-input>
              <span class="warn-msg">请填写楼盘名称</span>
            </el-form-item>
            <el-form-item label="落实统计进度" required>
              <el-input v-model="form.comSchedule" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item>
            <el-form-item label="总体评价" required>
              <quill-editor ref="myTextEditor"
              v-model="form.comEvaluate"
              :options="editorOption"
              style="width:100%;">
              </quill-editor>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="楼栋规划落实" name="second">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="楼栋规划落实简评" required>
              <el-input v-model="form.buildingPlanEvaluate" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="楼栋规划落实所处阶段" required>
              <el-radio-group v-model="form.buildingStage">
                <el-radio label="1">一阶段</el-radio>
                <el-radio label="2">二阶段</el-radio>
                <el-radio label="3">三阶段</el-radio>
                <el-radio label="4">四阶段</el-radio>
                <el-radio label="5">五阶段</el-radio>
                <el-radio label="6">六阶段</el-radio>
                <el-radio label="7">七阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.StageOne" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.StageTwo" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.StageThree" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=4" label="第四阶段评分" required>
              <el-input v-model="form.StageFour" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=5" label="第五阶段评分" required>
              <el-input v-model="form.StageFive" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=6" label="第六阶段评分" required>
              <el-input v-model="form.StageSix" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=7" label="第七阶段评分" required>
              <el-input v-model="form.StageSeven" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.constructRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 

            <el-form-item label="消防" required>
              <el-radio-group v-model="form.fireControlScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.fireControlRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="栏杆" required>
              <el-radio-group v-model="form.railingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.railingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="楼梯" required>
              <el-radio-group v-model="form.floorScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.floorRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="外墙面" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="内墙面" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.storeyScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.storeyRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.shearWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.shearWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="房间开间" required>
              <el-radio-group v-model="form.roomWidthScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.roomWidthRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="门窗" required>
              <el-radio-group v-model="form.dwScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.dwRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="预留洞" required>
              <el-radio-group v-model="form.providedHoleScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.providedHoleRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.hydropowerRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          

            <el-form-item label="照明" required>
              <el-radio-group v-model="form.lightingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.lightingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.socketScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.socketRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="弱电" required>
              <el-radio-group v-model="form.weakCurrentScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.weakCurrentRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.waterScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.waterRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.havcScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.havcRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.buildingImgList">            
              <h5 style="width:200px;text-align:right">楼栋规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.imgDesc" style="width:220px"></el-input>
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
            <el-button type="text" @click="buildingAddNewImg" v-if="form.buildingImgList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="户型规划落实" name="third">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="户型规划落实简评" required>
              <el-input v-model="form.buildingPlanEvaluate" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="户型规划落实所处阶段" required>
              <el-radio-group v-model="form.buildingStage">
                <el-radio label="1">一阶段</el-radio>
                <el-radio label="2">二阶段</el-radio>
                <el-radio label="3">三阶段</el-radio>
                <el-radio label="4">四阶段</el-radio>
                <el-radio label="5">五阶段</el-radio>
                <el-radio label="6">六阶段</el-radio>
                <el-radio label="7">七阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.StageOne" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.StageTwo" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.StageThree" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=4" label="第四阶段评分" required>
              <el-input v-model="form.StageFour" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=5" label="第五阶段评分" required>
              <el-input v-model="form.StageFive" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=6" label="第六阶段评分" required>
              <el-input v-model="form.StageSix" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=7" label="第七阶段评分" required>
              <el-input v-model="form.StageSeven" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.constructRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 

            <el-form-item label="消防" required>
              <el-radio-group v-model="form.fireControlScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.fireControlRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="栏杆" required>
              <el-radio-group v-model="form.railingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.railingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="楼梯" required>
              <el-radio-group v-model="form.floorScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.floorRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="外墙面" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="内墙面" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.storeyScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.storeyRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="层高" required>
              <el-radio-group v-model="form.shearWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.shearWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="房间开间" required>
              <el-radio-group v-model="form.roomWidthScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.roomWidthRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="门窗" required>
              <el-radio-group v-model="form.dwScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.dwRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="预留洞" required>
              <el-radio-group v-model="form.providedHoleScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.providedHoleRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.hydropowerRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          

            <el-form-item label="照明" required>
              <el-radio-group v-model="form.lightingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.lightingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.socketScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.socketRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="弱电" required>
              <el-radio-group v-model="form.weakCurrentScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.weakCurrentRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.waterScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.waterRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.havcScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.havcRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.familyPlanningImgList">            
              <h5 style="width:200px;text-align:right">户型规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.imgDesc" style="width:220px"></el-input>
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
            <el-button type="text" @click="FPAddNewImg" v-if="form.familyPlanningImgList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>

          </el-form>
        </el-tab-pane>

        <el-tab-pane label="园区规划落实" name="fourth">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="户型规划落实简评" required>
              <el-input v-model="form.buildingPlanEvaluate" type="textarea"></el-input>
            </el-form-item>    
            <el-form-item label="户型规划落实所处阶段" required>
              <el-radio-group v-model="form.buildingStage">
                <el-radio label="1">一阶段</el-radio>
                <el-radio label="2">二阶段</el-radio>
                <el-radio label="3">三阶段</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=1" label="第一阶段评分" required>
              <el-input v-model="form.StageOne" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item>
            <el-form-item v-show="form.buildingStage>=2" label="第二阶段评分" required>
              <el-input v-model="form.StageTwo" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
            <el-form-item v-show="form.buildingStage>=3" label="第三阶段评分" required>
              <el-input v-model="form.StageThree" style="width:220px"></el-input>
              <span class="warn-msg">当前阶段总分为7分</span>
            </el-form-item> 
  
            <h5 style="width:200px;text-align:right">建筑规划落实</h5>
            <el-form-item label="建筑落实进度(%)" required>
              <el-input v-model="form.constructRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 

            <el-form-item label="出入口" required>
              <el-radio-group v-model="form.fireControlScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.fireControlRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="商业" required>
              <el-radio-group v-model="form.railingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.railingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="学校" required>
              <el-radio-group v-model="form.floorScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.floorRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="居民楼" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="道路" required>
              <el-radio-group v-model="form.outerWallScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.outerWallRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="不利因素" required>
              <el-radio-group v-model="form.storeyScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.storeyRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

           
            <h5 style="width:200px;text-align:right">水电暖通规划落实</h5>

            <el-form-item label="水电暖通落实进度(%)" required>
              <el-input v-model="form.hydropowerRate" style="width:220px"></el-input>
              <span class="warn-msg">请填写0-100以内的数值</span>
            </el-form-item> 
          

            <el-form-item label="照明" required>
              <el-radio-group v-model="form.lightingScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.lightingRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="插座" required>
              <el-radio-group v-model="form.socketScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.socketRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="弱电" required>
              <el-radio-group v-model="form.weakCurrentScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.weakCurrentRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="给排水" required>
              <el-radio-group v-model="form.waterScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.waterRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="暖通" required>
              <el-radio-group v-model="form.havcScore">
                <el-radio label="1">符合国家标准</el-radio>
                <el-radio label="0">不符合国家标准</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.havcRate">
                <el-radio label="1">合格</el-radio>
                <el-radio label="2">不合格</el-radio>
                <el-radio label="3">整改中</el-radio>
                <el-radio label="4">已整改</el-radio>
                <el-radio label="5">未检验</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-for="(item,index) in form.parkImgList">            
              <h5 style="width:200px;text-align:right">园区规划照片{{index+1}}</h5>
              <el-form-item label="照片描述" required>
                <el-input v-model="item.imgDesc" style="width:220px"></el-input>
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
            <el-button type="text" @click="PKAddNewImg" v-if="form.parkImgList.length < 4 " style="margin-left:200px">继续添加一组照片最多四组</el-button>

          </el-form>
        </el-tab-pane>
      </el-tabs>

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
        btnList:['upbtn0','upbtn1','upbtn2','upbtn3'],
        FPbtnList:['FPupbtn0','FPupbtn1','FPupbtn2','FPupbtn3'],
        PKbtnList:['PKupbtn0','PKupbtn1','PKupbtn2','PKupbtn3'],

        preImgSrcList:[{preImgSrc:''}],
        FPpreImgSrcList:[{preImgSrc:''}],
        PKpreImgSrcList:[{preImgSrc:''}],
        uploaderList:[{uploader:null}],
        FPuploaderList:[{uploader:null}],
        PKuploaderList:[{uploader:null}],

        dialogImgSrc:'',
        dialogVisible:false,

        activeName:'second',
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
          name: '',
          city:'',
          buildingName: '',
          comSchedule:'',
          buildingPlanEvaluate:'',
          buildingStage:'',
          StageOne:'',
          StageTwo:'',
          StageThree:'',
          StageFour:'',
          StageFive:'',
          StageSix:'',
          StageSeven:'',
          constructRate:'',
          fireControlScore:'',
          fireControlRate:'',
          railingScore:'',
          railingRate:'',
          floorScore:'',
          floorRate:'',
          outerWallScore:'',
          outerWallRate:'',
          storeyScore:'',
          storeyRate:'',
          shearWallScore:'',
          shearWallRate:'',
          roomWidthScore:'',
          roomWidthRate:'',
          dwScore:'',
          dwRate:'',
          providedHoleScore:'',
          providedHoleRate:'',
          hydropowerRate:'',
          lightingScore:'',
          lightingRate:'',
          socketScore:'',
          socketRate:'',
          weakCurrentScore:'',
          weakCurrentRate:'',
          waterScore:'',
          waterRate:'',
          havcScore:'',
          havcRate:'',

          buildingImgList:[
            {
              imgDesc:'',
              imgUrl:''
            }
          ],
          familyPlanningImgList:[
            {
              imgDesc:'',
              imgUrl:''
            }
          ],
          parkImgList:[
            {
              imgDesc:'',
              imgUrl:''
            }
          ]
        }
      };
    },
    created(){
     
    },
    mounted(){
      let _this=this;
      this.initUploader(0);
      this.FPinitUploader(0);
      this.PKinitUploader(0);
    },
    methods: {
      //楼栋初始化上传插件对象
      initUploader(index){
        let _this = this,
            btnName = 'upbtn'+index;
        uploader(function(src){
          _this.preImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.buildingImgList[index].imgUrl=key;
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
        this.form.buildingImgList[index].imgUrl = ''
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
        let _index = this.form.buildingImgList.length
        this.form.buildingImgList.push({imgDesc:'',imgUrl:''})
        this.preImgSrcList.push({preImgSrc:''})
        this.uploaderList.push({uploader:null})
        this.initUploader(_index)
      },




      //户型初始化上传插件对象
      FPinitUploader(index){
        let _this = this,
            btnName = 'FPupbtn'+index;
        uploader(function(src){
          _this.FPpreImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.familyPlanningImgList[index].imgUrl=key;
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
        this.form.familyPlanningImgList[index].imgUrl = ''
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
        let _index = this.form.familyPlanningImgList.length
        this.form.familyPlanningImgList.push({imgDesc:'',imgUrl:''})
        this.FPpreImgSrcList.push({preImgSrc:''})
        this.FPuploaderList.push({uploader:null})
        this.FPinitUploader(_index)
      },



      //园区初始化上传插件对象
      PKinitUploader(index){
        let _this = this,
            btnName = 'PKupbtn'+index;
        uploader(function(src){
          _this.PKpreImgSrcList[index].preImgSrc=src;
        },function(key){
          _this.form.parkImgList[index].imgUrl=key;
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
        this.form.parkImgList[index].imgUrl = ''
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
        let _index = this.form.parkImgList.length
        this.form.parkImgList.push({imgDesc:'',imgUrl:''})
        this.PKpreImgSrcList.push({preImgSrc:''})
        this.PKuploaderList.push({uploader:null})
        this.PKinitUploader(_index)
      },


      onSubmit(){
        
      },
      back(){
        this.$router.push('/briefinglist')
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
</style>
<style>
  .PlanningImplementation .el-tabs__nav-scroll{display:flex;justify-content:center;}
</style>
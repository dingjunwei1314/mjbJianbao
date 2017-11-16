<template>
    <div class="PlanningImplementationList">
      <router-link to="/BriefingList">返回主页</router-link>
      <h4>规划落实简报</h4>
      <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
      <el-table
      :data="allData.lists"
      border
      v-loading="is_loading_tab"
      @row-click="rowClick"
      style="width: 100%;cursor:pointer">
        <el-table-column
          prop="submitMan"
          label="录入人">
        </el-table-column>
        <el-table-column
          prop="buidingName"
          label="楼盘名称">
        </el-table-column>
        <el-table-column
          label="期数">
          <template slot-scope="scope">
            <span v-if="scope.row.version==1">第一期</span>
            <span v-else-if="scope.row.version==2">第二期</span>
            <span v-else-if="scope.row.version==3">第三期</span>  
            <span v-else-if="scope.row.version==4">第四期</span>
            <span v-else-if="scope.row.version==5">第五期</span>
            <span v-else-if="scope.row.version==6">第六期</span>
            <span v-else-if="scope.row.version==7">第七期</span>
            <span v-else-if="scope.row.version==8">第八期</span>
            <span v-else-if="scope.row.version==9">第九期</span>
            <span v-else-if="scope.row.version==10">第十期</span>  
            <span v-else>{{scope.row.version}}</span>  
          </template>
        </el-table-column>
        <el-table-column
          prop="buidingPlanStage"
          label="楼栋落实所处阶段">
        </el-table-column>
        <el-table-column
          prop="buidingBuidSchedule"
          label="楼栋建筑落实进度">
        </el-table-column>
        <el-table-column
          prop="buidingHydropowerWarmSchedule"
          label="楼栋水电暖落实进度">
        </el-table-column>
        <el-table-column
          prop="housetypePlanStage"
          label="户型落实所处阶段">  
        </el-table-column>
        <el-table-column
          prop="housetypeBuidSchedule"
          label="户型建筑落实进度">
        </el-table-column>
        <el-table-column
          prop="housetypeHydropowerWarmSchedule"
          label="户型水电暖落实进度">
        </el-table-column>
        <el-table-column
          prop="parkPlanStage"
          label="园区规划落实所出阶段">
        </el-table-column>
        <el-table-column
          prop="parkBuidSchedule"
          label="园区规划建筑落实进度">
        </el-table-column>
        <el-table-column
          prop="parkPlanStage"
          label="园区规划水电暖落实进度">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isOnline==2">在线</span>  
            <span v-if="scope.row.isOnline==1">离线</span>  
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="submitTime"
          label="最后一次编辑时间">
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="allData.pageCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="allData.pageCount">
      </el-pagination>
    </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
export default {
    name:'PlanningImplementationList',
    data() {
      return {
        is_loading_tab:false,
        currentPage:1,
        form:{
          pageNum:0,
          pageSize:10
        },
        allData:{
          pageCount:0,
          lists:[
           
          ]
        }
      };
    },
    created(){
      this.getdata()
    },
    methods: {
      getdata(){
        let _this = this,
        body = this.form;
        _this.is_loading_tab=true;
        this.$http('/buidingPlanPracticable/list',{body},{},{},'post').then(function(res){
          if(res.data.code==0){
            _this.allData=res.data.response;
          }else{
            _this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          _this.is_loading_tab=false;
          console.log(err)
        })
      },
      currentChange(val){
        this.form.pageNum = val-1
        this.getdata()
      },
      rowClick(row){
        let params = {}
        if(row.isOnline == '2'){
          params = {path:'/planningimplementation',query:{id:row.id,type:'edit',isOnline:2}}
        }else{
          params = {path:'/planningimplementation',query:{id:row.id,type:'edit'}}
        }
        this.$router.push(params)
      },
      addNew(){
        this.$router.push({path:'/planningimplementation',query:{type:'add'}})
      }
    }
  }
</script>

<style scoped>
  .PlanningImplementationList{padding: 20px;}
</style>

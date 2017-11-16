<template>
    <div class="QualityList">
      <router-link to="/BriefingList">返回主页</router-link>
      <h4>工程质量简报</h4>
      <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
      <el-table
      :data="allData.response.buildQualityList"
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
          prop="bulletinPeriods"
          label="期数">
          <template slot-scope="scope">
            <span v-if="scope.row.bulletinPeriods==1">第一期</span>
            <span v-else-if="scope.row.bulletinPeriods==2">第二期</span>
            <span v-else-if="scope.row.bulletinPeriods==3">第三期</span>  
            <span v-else-if="scope.row.bulletinPeriods==4">第四期</span>
            <span v-else-if="scope.row.bulletinPeriods==5">第五期</span>
            <span v-else-if="scope.row.bulletinPeriods==6">第六期</span>
            <span v-else-if="scope.row.bulletinPeriods==7">第七期</span>
            <span v-else-if="scope.row.bulletinPeriods==8">第八期</span>
            <span v-else-if="scope.row.bulletinPeriods==9">第九期</span>
            <span v-else-if="scope.row.bulletinPeriods==10">第十期</span>  
            <span v-else>{{scope.row.bulletinPeriods}}</span>  
          </template>
        </el-table-column>
        <el-table-column
          prop="buildSchedule"
          label="综合施工进度">
        </el-table-column>
        <el-table-column
          prop="qualityValue"
          label="当前质量评分数值（总值）">
        </el-table-column>
        <el-table-column
          prop="baseValue"
          label="地基基础评分">
        </el-table-column>
        <el-table-column
          prop="bodyValue"
          label="主体结构功能评分">
        </el-table-column>
        <el-table-column
          prop="surfaceValue"
          label="屋面工程评分">
        </el-table-column>
        <el-table-column
          prop="installValue"
          label="安装工程评分">
        </el-table-column>
        <el-table-column
          prop="ornamentValue"
          label="装饰装修工程评分">
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
          prop="editTime"
          label="最后一次编辑时间">
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="allData.response.pageCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="allData.response.pageCount">
      </el-pagination>
    </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
export default {
    name:'QualityList',
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
          qualityList:[

          ],
            response:{
                buildQualityList:[]
            }
        }
      };
    },
    created(){
      this.getdata();
    },
    methods: {
      getdata(){
        let _this = this,
        body = this.form;
        _this.is_loading_tab=true;
        this.$http('/buildQuality/list',{body},{},{},'post').then(function(res){
            if(res.data.code==0){
              _this.allData=res.data;
            }else if(res.data.code==300){
              _this.$router.push('/login')
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
        this.form.pageNum = val-1;
        this.getdata()
      },
      rowClick(row){
        let params = {}
        if(row.isOnline == '2'){
          params = {path:'/quality',query:{id:row.id,type:'edit',isOnline:2}}
        }else{
          params = {path:'/quality',query:{id:row.id,type:'edit'}}
        }
        this.$router.push(params)
      },
      addNew(){
        this.$router.push({path:'/quality',query:{type:'add'}})
      }
    }
  }
</script>

<style scoped>
  .QualityList{padding: 20px;}
</style>

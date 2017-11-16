<template>
  <div class="DesignList">
    <router-link to="/BriefingList">返回主页</router-link>
    <h4>周边配套简报</h4>
    <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
    <el-table
      :data="allData.response.list"
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
        prop="overallScore"
        label="周边配套评分（总体）">
      </el-table-column>
      <el-table-column
        prop="recommendItem"
        label="推荐点">
      </el-table-column>
      <el-table-column
        prop="vehicleScore"
        label="交通便利评分">
      </el-table-column>
      <el-table-column
        prop="environmentScore"
        label="周边环境评分">
      </el-table-column>
      <el-table-column
        prop="educationScore"
        label="教育配套评分">
      </el-table-column>
      <el-table-column
        prop="medicalTreatmentScore"
        label="医疗配套评分">
      </el-table-column>
      <el-table-column
        prop="commerceScore"
        label="商业配套评分">
      </el-table-column>
      <el-table-column
        prop="unfavorableFactorsScore"
        label="不利因素评分">
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
        prop="lastEditTime"
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
    name:'PeripheryList',
    data() {
      return {
        is_loading_tab:false,
        currentPage:1,
        form:{
          pageNum:0,
          pageSize:10
        },
        allData:{
            response:{
                pageCount:0,
                list:[

                ]
            }
        }
      };
    },
    mounted(){
      this.getdata()
    },
    methods: {
      getdata(){
        let _this = this,
        body = this.form;
        _this.is_loading_tab=true;
        this.$http('/buidingPeripheralSupporting/list',{body},{},{},'post').then(function(res){
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
        this.form.pageNum = val-1
        this.getdata()
      },
      rowClick(row){
        let params = {}
        if(row.isOnline == '2'){
          params = {path:'/periphery',query:{id:row.id,type:'edit',isOnline:2}}
        }else{
          params = {path:'/periphery',query:{id:row.id,type:'edit'}}
        }
        this.$router.push(params)
      },
      addNew(){
        this.$router.push({path:'/periphery',query:{type:'add'}})
      }
    }
  }
</script>

<style scoped>
  .PeripheryList{padding: 20px;}
</style>

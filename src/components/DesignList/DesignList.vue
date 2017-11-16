<template>
    <div class="DesignList">
      <router-link to="/BriefingList">返回主页</router-link>
      <h4>规划设计简报</h4>
      <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
      <el-table
      :data="allData.lists"
      border
      v-loading="is_loading_tab"
      @row-click="rowClick"
      style="width: 100%;cursor:pointer">
        <el-table-column
          width="100"
          prop="submitMan"
          label="录入人">
        </el-table-column>
        <el-table-column
          prop="buidingName"
          label="楼盘名称">
        </el-table-column>
        <el-table-column
          prop="planningDesign"
          label="规划设计评分（总体）">
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="推荐点">
        </el-table-column>
        <el-table-column
          prop="houseTypeDesignGrade"
          label="户型规划评分">
        </el-table-column>
        <el-table-column
          prop="houseTypeDesignGrade"
          label="楼栋规划评分">
        </el-table-column>
        <el-table-column
          prop="parkDesignGrade"
          label="园区规划评分">
        </el-table-column>
        <el-table-column
          width="100"
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
    name:'DesignList',
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
           
          ]
        }
      };
    },
    mounted(){

      this.getdata();
    },
    methods: {

      getdata(){
        let _this = this,
            body = this.form;
            _this.is_loading_tab=true;
        this.$http('/buidingPlanDesign/list',{body},{},{},'post').then(function(res){
            
            if(res.data.code==0){
                _this.allData=res.data.response;
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
        let params = {};
        if(row.isOnline == '2'){
          params = {path:'/design',query:{id:row.id,type:'edit',isOnline:2}}
        }else{
          params = {path:'/design',query:{id:row.id,type:'edit'}}
        }
        this.$router.push(params)
      },
      addNew(){
        this.$router.push({path:'/design',query:{type:'add'}})
      }
    }
  }
</script>

<style scoped>
  .DesignList{padding: 20px;}
</style>

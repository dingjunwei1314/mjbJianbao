<template>
    <div class="PeripheryList">
      <h4>周报配套简报</h4>
      <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
      <el-table
      :data="allData.qualityList"
      border
      v-loading="is_loading_tab"
      @row-click="rowClick"
      style="width: 100%;cursor:pointer">
        <el-table-column
          prop="name"
          label="录入人">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="楼盘名称">
        </el-table-column>
        <el-table-column
          prop="peripheryScore"
          label="周报配套评分（总体）">
        </el-table-column>
        <el-table-column
          prop="recommendation"
          label="推荐点">
        </el-table-column>
        <el-table-column
          prop="trafficScore"
          label="交通便利评分">
        </el-table-column>
        <el-table-column
          prop="environmentScore"
          label="周报环境评分">
        </el-table-column>
        <el-table-column
          prop="educationScore"
          label="教育配套评分">  
        </el-table-column>
        <el-table-column
          prop="medicalScore"
          label="医疗配套评分">
        </el-table-column>
        <el-table-column
          prop="businessScore"
          label="商业配套评分">
        </el-table-column>
        <el-table-column
          prop="disadvantageScore"
          label="不利因素评分">
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="lastEditTime"
          label="最后一次编辑时间">
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="allData.rowCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="allData.rowCount">
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
          pageCount:0,
          qualityList:[
           
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
        this.$http('/BuildQuality/list',{body},{},{},'post').then(function(res){
            
            if(res.data.code==0){
                if(res.data.response.status==1){
                  _this.allData=res.data.response.data;
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
            _this.is_loading_tab=false;
        }).catch(function(err){
            _this.is_loading_tab=false;
            console.log(err)
        })
      },
      currentChange(val){
        console.log(val)
        this.form.pageNum = val-1
        this.getdata()
      },
      rowClick(row){
        console.log(row)
        this.$router.push({path:'/periphery',query:{id:row.id}})
      },
      addNew(){
        this.$router.push('/periphery')
      }
    }
  }
</script>

<style scoped>
  .PeripheryList{padding: 20px;}
</style>

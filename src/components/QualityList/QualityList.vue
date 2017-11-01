<template>
    <div class="QualityList">
      <h4>工程质量简报</h4>
      <el-button type="primary" style="float:right;margin-bottom:20px" @click="addNew">添加新报告</el-button>
      <el-table
      :data="allData.buildQualityList"
      border
      v-loading="is_loading_tab"
      @row-click="rowClick(row)"
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
          prop="creatTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="lastEditTime"
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
        this.$router.push({path:'/quality',query:{id:row.id}})
      },
      addNew(){
        this.$router.push('/quality')
      }
    }
  }
</script>

<style scoped>
  .QualityList{padding: 20px;}
</style>

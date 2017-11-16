<template>
    <div class="BriefingList">
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span>工程质量简报</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="enter('/qualitylist')">进入</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span>规划设计简报</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="enter('/designlist')">进入</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span>周边配套简报</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="enter('/peripherylist')">进入</el-button>
                </div>
              </div> 
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span>规划落实简报</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="enter('/planningimplementationlist')">进入</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'BriefingList',
    data() {
      return {
       
      };
    },
    created(){
     
    },
    methods: {
      enter(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
  .BriefingList{padding-top: 200px;max-width: 1200px;margin: 0 auto}
</style>

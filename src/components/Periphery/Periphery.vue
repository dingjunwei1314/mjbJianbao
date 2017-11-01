<template>
    <div class="Periphery">

      <p class="title">周边配套简报</p>
      <el-form ref="form" :model="form" label-width="240px">
        <el-form-item label="简报提交人" required>
          <el-input v-model="form.name" style="width:220px"></el-input>
          <span class="warn-msg">请填写您的真实姓名</span>
        </el-form-item> 
        <el-form-item label="所在城市" required>
          <el-input v-model="form.city" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="楼盘名称" required>
          <el-input v-model="form.buildingName" style="width:220px"></el-input>
          <span class="warn-msg">请填写楼盘名称</span>
        </el-form-item>
        
        <hr/>

        <el-form-item label="周边配套评分" required>
          <el-input v-model="form.peripheryScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-200之间的数字 )</span>
        </el-form-item>

        <el-form-item label="推荐点" required>
          <el-input v-model="form.recommendation " type="number" style="width:220px" placeholder="例：“周边环境优越”"></el-input>
          <span class="warn-msg">请填写楼盘评分项突出部分（2-8字）</span>
        </el-form-item>

        <el-form-item label="交通便利评分" required>
          <el-input v-model="form.trafficScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="周边环境评分" required>
          <el-input v-model="form.environmentScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="教育配套评分" required>
          <el-input v-model="form.educationScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="医疗配套评分" required>
          <el-input v-model="form.medicalScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="商业配套评分" required>
          <el-input v-model="form.businessScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="不利因素评分" required>
          <el-input v-model="form.disadvantageScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        
        <el-form-item label="周边配套总体评价" required>
          <quill-editor ref="myTextEditor"
          v-model="form.comEvaluate"
          :options="editorOption"
          style="width:100%;">
          </quill-editor>
        </el-form-item>

        <!-- wwww -->
        <hr/>

        <el-form-item label="【周边交通】简评" required>
          <el-input v-model="form.trafficEvaluate" type="textarea" placeholder="请输入针对周边交通的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边交通】详细评价" required>
          <el-input v-model="form.trafficEvaluateDetail" type="textarea" placeholder="请输入针对周边交通的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边交通配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>
        
        <el-form-item label="【周边环境】简评" required>
          <el-input v-model="form.environmentEvaluate" type="textarea" placeholder="请输入针对周边环境的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边环境】详细评价" required>
          <el-input v-model="form.environmentEvaluateDetail" type="textarea" placeholder="请输入针对周边环境的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边环境配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>

        <el-form-item label="【教育配套】简评" required>
          <el-input v-model="form.educationEvaluate" type="textarea" placeholder="请输入针对教育配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【教育配套详细评价" required>
          <el-input v-model="form.educationEvaluateDetail" type="textarea" placeholder="请输入针对教育配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="教育配套配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>

        <el-form-item label="【医疗配套】简评" required>
          <el-input v-model="form.medicalEvaluate" type="textarea" placeholder="请输入针对医疗配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【医疗配套】详细评价" required>
          <el-input v-model="form.medicalEvaluateDetail" type="textarea" placeholder="请输入针对医疗配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="医疗配套配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>

        <el-form-item label="【商业配套】简评" required>
          <el-input v-model="form.businessEvaluate" type="textarea" placeholder="请输入针对商业配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【商业配套】详细评价" required>
          <el-input v-model="form.businessEvaluateDetail" type="textarea" placeholder="请输入针对商业配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="商业配套配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>

        <el-form-item label="【不利因素】简评" required>
          <el-input v-model="form.disadvantageEvaluate" type="textarea" placeholder="请输入针对不利因素的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【不利因素】详细评价" required>
          <el-input v-model="form.disadvantageEvaluateDetail" type="textarea" placeholder="请输入针对不利因素的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="不利因素配图">
          <el-button type="text">添加照片</el-button>
        </el-form-item>
        <hr/>

     

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
export default {
    name:'Periphery',
    components:{
      
    },
    data() {
      return {
        editorOption:{ 
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘周边配套的总评3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption2:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【外立面】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption3:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【大堂】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },

        editorOption4:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘户型一简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        tableData1:[
          {data:'数值'}
        ],
        constructionList:[
          {key:1,value:'95%-100%'},
          {key:2,value:'90%-95%'},
          {key:3,value:'85%-90%'},
          {key:4,value:'80%-85%'},
          {key:5,value:'75%-80%'},
          {key:6,value:'70%-75%'},
          {key:7,value:'65%-70%'},
          {key:8,value:'60%-65%'},
          {key:9,value:'55%-60%'},
          {key:10,value:'50%-55%'},
        ],
        facadeMaterialList:[
          {key:1,value:'石材为主涂料为辅'},
          {key:2,value:'纯石料'},
          {key:3,value:'涂料为主石料为辅'},
          {key:4,value:'纯涂料'},
        ],
        form: {
          name: '',
          city:'',
          buildingName: '',
          peripheryScore:'',
          recommendation:'',
          trafficScore:'',
          environmentScore:'',
          educationScore:'',
          medicalScore:'',
          businessScore:'',
          disadvantageScore:'',
          comEvaluate:'',

          trafficEvaluate:'',
          trafficEvaluateDetail:'',
          trafficImg:'',
          environmentEvaluate:'',
          environmentEvaluateDetail:'',
          environmentImg:'',
          educationEvaluate:'',
          educationEvaluateDetail:'',
          educationImg:'',
          medicalEvaluate:'',
          medicalEvaluateDetail:'',
          medicalImg:'',
          businessEvaluate:'',
          businessEvaluateDetail:'',
          businessImg:'',
          disadvantageEvaluate:'',
          disadvantageEvaluateDetail:'',
          disadvantageImg:'',
        }
      };
    },
    created(){
     
    },
    methods: {
      addImg(){
        this.form.imageList.push({desc:'',imgUrl:''})
      },
      onSubmit(){
        
      },
      back(){
        this.$router.push('/briefinglist')
      }
    }
  }
</script>

<style scoped>
  .Periphery .title{
    font-size: 24px;
    font-weight: bold;
    color: #0D263F;
    text-align: center;
  }
  .Periphery{
    width: 700px;
    margin: 0 auto;
  }
  .warn-msg{font-size: 12px;color: #777;padding-left: 10px}
  
</style>
<style>
  .el-table td, .el-table th.is-leaf{text-align: center;font-size: 12px;}
  .el-table .el-input__inner{border: none}
</style>
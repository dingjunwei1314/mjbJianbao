<template>
    <div class="a">
      <h1 @click="sss">{{tab}}</h1>
      <slot :text="tab">
        
      </slot>
    </div>
</template>

<script>
export default {
    name:'a',
    data() {
      return {
        tab:0
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
      },
      sss(){
          this.tab+=1;
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
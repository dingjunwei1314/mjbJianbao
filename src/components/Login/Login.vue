<template>
    <div class="login">
        <div class="leftCon">
          <span class="leftImageCircle"></span>
          <p class="titMain">鹰眼鉴房</p>
        </div>
        <div class="rightCon">
            <p class="title"><span style="color:#20a0ff">鹰眼鉴房</span>简报提交</p>
            <p class="spa">登陆</p>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="margin-right:90px">
              <el-form-item   prop="userName">
                <el-input v-model="ruleForm2.userName" placeholder="account"></el-input>
              </el-form-item>
              <el-form-item  prop="userPwd">
                <el-input type="password" v-model="ruleForm2.userPwd" placeholder="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data() {
      var checkAccout = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
         
            if (value.length < 6 || value.length>18) {
              callback(new Error('账号必须是6到16位字母或者数字'));
            } else {
              callback();
            }
          
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        setTimeout(() => {
            if (value.length < 6 || value.length>18) {
              callback(new Error('密码必须是6到16位字母或者数字'));
            } else {
              callback();
            }
        }, 1000); 
      };
      return {
        ruleForm2: {
          userPwd: '',
          userName : '',
        },
        rules2: {
          userPwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName : [
            { validator: checkAccout, trigger: 'blur' }
          ],  
        }
      };
    },
    created(){
     
    },
    methods: {
      submitForm(formName) {
        let _this=this,
            body=this.ruleForm2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(_this.ruleForm2.userName == 'admin123' && _this.ruleForm2.userPwd == '123456'){
              window.localStorage.jianbaotoken='login';
              _this.$router.push('/BriefingList')
            }else{
              this.$message({
                type: 'warning',
                message: '账号或密码错误'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
.login{height: 100%;background: white  no-repeat center;min-height: 500px;min-width: 600px;position: absolute;left: 0;right: 0;bottom: 0;top: 0;}
.login .leftCon{position: absolute;left: 0;right: 380px;top: 0;bottom: 0;background: url('../../assets/img/admin-login-bg.jpg');background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;}
.login .leftCon .titMain{
  position: absolute;
  left: 10%;
  bottom: 18%;
  font-size: 40px;
  font-weight: bolder;
  color: #fff;
}
.login .leftCon  .leftImageCircle{
  position: absolute;
  left: 10%;
  bottom: 27%;
  width: 33px;
  height: 33px;
  box-sizing: border-box;
  border:7px solid #20a0ff;
  border-radius:50%;
}
.login .rightCon{position: absolute;
  width: 380px;
  top: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
.login .rightCon .title{
  font-size: 24px;
  margin-top: 90px;
  margin-bottom: 70px;
  font-weight: bold;
  color: #0D263F
}
.login .rightCon .spa{
  font-size: 24px;
  color: #0D263F;
  font-weight: bold;
  margin-bottom: 60px
}
</style>

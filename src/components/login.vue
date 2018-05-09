<template>
    <div class="login"  v-loading="loading">
      <div style="position: relative;top:calc((80% - 373px) / 2)">
        <div style="text-align: center">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <div style="width: 390px;margin: 0 auto;">
          <el-input placeholder="请输入账号" v-model="inputUser" style="margin: 55px 0 30px 0;" @keyup.native.enter="login">
            <template slot="prepend"><img src="../assets/img/user.png" alt="" class="loginImg"></template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="inputPwd" type="password" @keyup.native.enter="login" style="margin: 0 0 30px 0;">
            <template slot="prepend"><img src="../assets/img/pwd.png" alt="" class="loginImg"></template>
          </el-input>
          <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
        </div>
      </div>
    </div>
</template>
<style>
  .login{
    width:100%;
    background: -moz-radial-gradient(ellipse at 50% 40%,#5A6E91,#42526D,#2F3B4F);
    background: -webkit-radial-gradient(ellipse at 50% 40%,#5A6E91,#42526D,#2F3B4F);
    background: -o-radial-gradient(ellipse at 50% 40%,#5A6E91,#42526D,#2F3B4F);
    background: radial-gradient(ellipse at 50% 40%,#5A6E91,#42526D,#2F3B4F);
  }
  .loginImg{
    width:18px;
    height: 19px;
  }
  .login .el-input-group__prepend{
    background: #2C394F;
    border:1px solid #2C394F;
  }
</style>
<script>
    export default{
        data(){
            return {
              inputUser: '',
              inputPwd: '',
              loading:false
            }
        },
      methods:{
        tip(type,content){
              this.$notify({
                title: '提示',
                message: content,
                type: type
              });
            },
        login(){
          if(!this.inputUser){
            this.tip('warning','用户名没有填写');
            return
          }else if(!this.inputPwd){
            this.tip('warning','密码没有填写');
            return
          }
          var that = this;
          this.loading = true;
          this.interFace('Login',{
            admin:this.inputUser,
            pass:this.inputPwd,
          }).then(function(res){
            that.loading = false;
            that.$router.push({name:'newsCenter'})
          })
        }
      }
    }
</script>

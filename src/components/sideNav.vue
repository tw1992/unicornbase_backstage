<template>
    <div>
      <el-container style="height: 100vh; border: 1px solid #eee" v-if="!$route.meta.requiresAuth">
        <el-aside width="200px" style="background-color:#3A475E;cursor: pointer;text-align: center;color: #999999;">
            <router-link :to="{ path: 'newsCenter' }" active-class="navAsideHover" tag="div" class="navAside"><img src="../assets/img/news.png" alt="" style="margin-right: 20px;">新闻中心</router-link>
            <router-link :to="{ path: 'dateDirectory' }" active-class="navAsideHover" tag="div" class="navAside"><img src="../assets/img/date.png" alt="" style="margin-right: 20px;">数据字典</router-link>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px;line-height: 60px;border-bottom: 1px solid #979797;cursor: pointer;">
            <el-dropdown>
              <span>Admin</span>
              <i class="el-icon-caret-bottom" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div  @click="outLogin">
                    退出
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main style="background:#F2F2F2;">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
      <el-container style="height: 100vh; border: 1px solid #eee" v-if="$route.meta.requiresAuth">
        <router-view/>
      </el-container>
    </div>
</template>
<style>
  .navAside{
    padding:10px 0;
  }
  .navAsideHover{
    background: #7D8FA8;
    color: #ffffff;
  }
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
      methods:{
        outLogin(){
          this.interFace('Out','','get').then((res)=>{
            this.$router.push({name:'login'})
          })
        }
      },
      created(){
        console.log(this.$route.meta)
      }
    }
</script>

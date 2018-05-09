/**
 * Created by gm on 2017/12/21.
 */
export default{
  install(Vue){
    var global = {
        'Login':'Untoken/Login',//admin  xmgw  后台登录接口
        'Index':'Untoken/Index/Index',//获取文章内容
        'New_add':'Untoken/Index/New_add',//添加文章接口
        'Index_list':'Untoken/Index/Index_list',//获取分类接口
        'New_update':'Untoken/Index/New_update',//修改文章借口
        'New_delete':'Untoken/Index/New_delete/id',//删除文章接口
        'New_status':'Untoken/Index/New_status',//文章禁用启用
        'Source':'Untoken/Index/Source',//来源分页
        'Forumid':'Untoken/Index/Forumid',//版块分页
        'Source_add':'Untoken/Index/Source_add',//来源新增
        'Forumid_add':'Untoken/Index/Forumid_add',//版块新增
        'Source_delete':'Untoken/Index/Source_delete',//来源删除
        'Forumid_delete':'Untoken/Index/Forumid_delete',//版块删除
        'Source_update':'Untoken/Index/Source_update',//来源修改
        'Forumid_update':'Untoken/Index/Forumid_update',//版块修改
        'Out':'Untoken/Index/Out',//退出登录
        'Photo':'Untoken/Index/Photo',//图片上传
    };
    if(window.location.host.indexOf("uicbase.io")>-1 || window.location.host.indexOf("116.62.171.233")>-1){//线上环境  接口前缀
      var urlOri = window.location.protocol +'//'+ window.location.host+'/';
    }else{//测试环境  接口前缀 http://116.62.171.233:8011
      var urlOri = '/api/';
    }
    var tipArr = ['Source_add','Forumid_add','Source_update','Forumid_update'];
    function tip(type,message,title,that){
      that.$notify({
        title: title,
        message: message,
        type: type
      });
    }
    Vue.prototype.allSrc = function(){
      if(window.location.host.indexOf("uicbase.io")>-1){//线上环境  接口前缀
        var urlOri = window.location.protocol +'//'+ window.location.host+'/';
      }else{//测试环境  接口前缀
        var urlOri = 'http://192.168.2.29';
      }
      return urlOri;
    }
    Vue.prototype.interFace = function(urlParam,params,type){
      var url = urlOri + global[urlParam];
      if(type){
        var requ = this.$http.get(url + params)
      }else{
        var requ = this.$http.post(url,this.qs.stringify(params))
      }
      var promise = new Promise((resolve, reject)=>{
        var that = this;
        requ.then(function(res){
          if(res.data.status == 1){
            if(tipArr.indexOf(urlParam) == -1){
              resolve(res.data.body);
            }else{
              tip('success',res.data.msg,'提示',that);
              resolve(res.data);
            }
          }else{
            if(res.data.msg == "未登录"){
              that.$router.push({name:'login'})
                return
            }
            tip('error',res.data.msg,'错误',that);
          }
        }).catch(function(err){
          reject(err)
        })
      })
      return promise;
    };
    Vue.filter('timeYMDHMS', function (value) {
      if (!value) return '';
      function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = date.getDate() + ' ';
        var h = (date.getHours()<10?'0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes()<10?'0'+date.getMinutes() : date.getMinutes())+ ':';
        var s = date.getSeconds()<10?'0'+date.getSeconds() : date.getSeconds();
        return Y+M+D+h+m+s;
      }
      return timestampToTime(value*1000);
    });
    Vue.filter('replacesrc',function(value,len){
      if(!len)return;
      if(value.length>len){
        return value.slice(0,len)+ '...'
      }else{
        return value;
      }
    });
    Vue.filter('status',function(value){
      return value == 1?'启用中':'已禁用'
    })
  }
}


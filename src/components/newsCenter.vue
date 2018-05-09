<template>
    <div class="newsCenter">
        <div class="newsTop">
          <div>
            标题
            <el-input v-model="input1" placeholder="请输入内容" @input="changeSearch" clearable style="width: 250px;"></el-input>
          </div>
          <div>
            <span>语言版本</span>
            <el-select v-model="seleLang" placeholder="请选择" @change="search">
              <el-option
                label="全部语言"
                value="0">
              </el-option>
              <el-option
                v-for="item in language"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div>
            板块
            <el-select v-model="seleModel" placeholder="请选择" @change="search">
              <el-option
                label="所有板块"
                value="0">
              </el-option>
              <el-option
                v-for="item in model"
                :key="item.id"
                :label="item.cn_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="search">检索</el-button>
        </div>
        <div class="newsContent"  v-loading="loading2">
          <div>
            <el-button type="primary" @click="publish('add')">发文章</el-button>
          </div>
          <div>
            <table class="newsTable">
              <tr class="trHead">
                <th>序号</th>
                <th>标题</th>
                <th>板块</th>
                <th>来源</th>
                <th>阅读量</th>
                <th>发布时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tbody>
                <tr v-for="item,index in tableDate">
                  <td>{{item.id}}</td>
                  <td>{{item.title | replacesrc(8)}}</td>
                  <td>{{item.forumid_name}}</td>
                  <td>{{item.source_name}}</td>
                  <td>{{item.read}}</td>
                  <td>{{item.time | timeYMDHMS}}</td>
                  <td :class="{'dis':item.status == 0,'open':item.status == 1}">{{item.status | status}}</td>
                  <td>
                    <span class="edit" @click="publish('edit',item)">
                      修改
                    </span>|
                    <span class="dis" style="cursor: pointer" @click="editStatus(item)">
                      {{item.status == '0'?'启用':'禁用'}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="text-align: right;padding: 30px 0;">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="page.value"
                :current-page="page.list"
                @current-change="changePage"
                :total="page.total*page.value">
              </el-pagination>
            </div>
          </div>
        </div>
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialogVisible"
        width="80%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div style="overflow: hidden;">
          <div class="dialogLeft">
            <div>
              <span class="labelRequire">缩略图</span>
              <input type="file" style="display: none;" ref="upload" @change="uploadChange">
              <span class="avatar-uploader" @click="$refs.upload.click()">
                <img v-if="dialog.imageUrl" :src="dialog.imageUrl" alt="" style="width: 100%;height: 100%;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </span>
            </div>
            <div style="display: inline-block">
              <span class="labelRequire">标&nbsp;&nbsp;&nbsp;题</span>
              <el-input v-model="dialog.titleInput" placeholder="1～100个字之间，超出将无法输入"  :maxlength="100"></el-input>
            </div>
            <div>
              <span class="labelRequire">摘&nbsp;&nbsp;&nbsp;要</span>
              <div style="display: inline-block;vertical-align: top;">
                <el-input
                  type="textarea"
                  :autosize="{ minRows:3,maxRows:20 }"
                  placeholder="1～500个字之间，超出将无法输入，不填是系统自动抓取正文前100个字"
                  v-model="dialog.abstract"
                  :maxlength="500"
                  style="vertical-align: top">
                </el-input>
                <div style="text-align: right;">
                  <span style="color:red;">{{500 - dialog.abstract.length}}</span>/500</div>
              </div>
            </div>
            <div>
              <span class="labelRequire">来&nbsp;&nbsp;&nbsp;源</span>
              <el-select v-model="dialog.seleSource" placeholder="请选择">
                <el-option
                  v-for="item in dialog.source"
                  :key="item.id"
                  :label="item.cn_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="labelRequire">正&nbsp;&nbsp;&nbsp;文</span>
              <el-radio v-model="dialog.radiocon" label="0">编辑器</el-radio>
              <el-radio v-model="dialog.radiocon" label="1">外链</el-radio>
              <div>
                <div  v-show="dialog.radiocon == 0" style="margin-top: 20px;">
                  <div  id="editor-trigger" style="height:auto;min-height:300px;width: 100%;"></div>
                </div>
                </div>

              <div v-if="dialog.radiocon == 1" style="margin-top: 20px;">
                <el-input v-model="dialog.outLink" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </div>
          <div class="dialogRig">
            <div>
              <span class="labelRequire">语&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言</span>
              <el-radio v-model="dialog.radiolang" :label="item.id" v-for="item in dialog.lang" :key="item.id">{{item.name}}</el-radio>
            </div>
            <div>
              <span class="labelRequire">所属板块</span>
              <el-select v-model="dialog.seleModel" placeholder="请选择">
                <el-option
                  v-for="item in dialog.model"
                  :key="item.id"
                  :label="item.cn_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="labelRequire">发布时间</span>
              <el-radio v-model="dialog.radiotime" label="1">自定义时间</el-radio>
              <el-radio v-model="dialog.radiotime" label="0">当前时间</el-radio>
            </div>
            <div v-show="dialog.radiotime == 1">
              <el-date-picker
                v-model="dialog.timevalue1"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="save">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import wangEditor from 'wangeditor'
    export default{
        data(){
            return {
              timeout:  null,
              loading2:true,
              editor:'',
              editorContent:'',
              dialogVisible:false,
              dialog:{
                addEdit:'',
                title:'新增文章',
                imageUrl:'',
                titleInput:'',
                abstract:'',
                source:[],
                seleSource:'',
                radiocon:'1',
                outLink:'',
                lang:[],
                radiolang:'1',
                model:[],
                seleModel:'1',
                radiotime:'1',
                timevalue1:0,
                time:'',
              },
              input1: '',
              language:[],
              seleLang:'0',
              model:[],
              seleModel:'0',
              tableDate:[],
              page:{
                list:1,
                value:10,
                total:0
              }
            }
        },
      methods:{
        changeSearch(){
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.search();
          }, 500);
        },
        search(){
          this.Index(0,this.input1,this.seleLang,this.seleModel);
        },
        publish(type,item){
          this.dialog.title = type === 'add'?'新增文章':'修改文章';
          this.dialog.addEdit = item;
          this.dialogVisible = true;
          if(this.editor.destroy){
            this.editor.destroy();
          }
          this.initDialog(item);
          this.$nextTick(()=>{
            this.editor = new wangEditor('editor-trigger');
            this.editor.config.menus = [
              'bold',
              'underline',
              'italic',
              'strikethrough',
              'eraser',
              'forecolor',
              'bgcolor',
              'quote',
              'fontfamily',
              'fontsize',
              'head',
              'unorderlist',
              'orderlist',
              'alignleft',
              'aligncenter',
              'alignright',
              'link',
              'unlink',
              'img',
              'undo',
              'redo',
              'fullscreen'
            ];
            this.editor.config.uploadImgUrl = '/api/Untoken/Index/Photo';
            this.editor.config.withCredentials = false;
            this.editor.create();
            this.editor.$txt.html('<p><br></p>'); // 清空
            if(item){
              if(item.type == 0){
                this.editor.$txt.html(item.content);// 初始化编辑器的内容
              }else{
                this.dialog.outLink = item.url
              }
            }

          })
        },
        handleClose(){
          this.dialogVisible = false;
        },
        uploadChange(file){
          var that = this;
          var file = this.$refs.upload.files[0];
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            console.log(data)
            that.dialog.imageUrl = data;
          };
          reader.readAsDataURL(file);
          return false;
        },
        save(){
          if(this.subReg()){
            if(this.dialog.addEdit){
              this.New_update();
            }else{
              this.New_add();
            }
          }
        },
        editStatus(item){
          this.interFace('New_status',{
            new_id:item.id,
            status:item.status,
          }).then((res)=>{
            item.status = item.status == 1?'0':'1';
          })
        },
        Index(list,name,language,forumid){
          this.loading2 = true;
          this.interFace('Index',{
            list:list,
            value:this.page.value,
            name:name,
            language:language,
            forumid:forumid,
          }).then((res)=>{
            this.loading2 = false;
            this.page.total = res.value;
            this.tableDate = res.list;
          })
        },
        changePage(data){
          this.page.list = data;
          this.Index(this.page.list - 1);
        },
        Index_list(){
          this.interFace('Index_list','','get').then((res)=>{
            this.language = res.language;
            this.dialog.lang = res.language;
            this.dialog.radiolang = res.language[0].id;
            this.dialog.source = res.source;
            this.dialog.seleSource = res.source[0].id;
            this.model = res.forumid;
            this.dialog.model = res.forumid;
            this.dialog.seleModel = res.forumid[0].id;//
          })
        },
        initDialog(item){
          this.dialog.radiotime = '1';
          if(item){
            this.dialog.abstract = item.content;
            this.dialog.titleInput = item.title;
            this.dialog.seleSource = item.source_id;
            this.dialog.radiolang = item.language_id;
            this.dialog.seleModel = item.forumid_id;
            this.dialog.radiocon = String(item.type);
            this.dialog.imageUrl = 'http://192.168.2.29:82/'+item.photo;
            this.dialog.timevalue1 = item.time*1000;
            this.dialog.outLink = item.url;
          }else{
            this.dialog.abstract = '';
            this.dialog.titleInput = '';
            this.dialog.seleSource = this.dialog.source[0].id;
            this.dialog.radiolang = this.dialog.lang[0].id;
            this.dialog.seleModel = this.dialog.model[0].id
            this.dialog.radiocon = '0';
            this.dialog.imageUrl = '';
            this.dialog.timevalue1 = 0;
            this.dialog.outLink = '';
          }
        },
        New_update(){
          var photo = '';
          if(this.dialog.imageUrl.indexOf('base64') == -1){//说明是修改
            photo = '';
          }else{//是上传的
            photo =this.dialog.imageUrl;
          }
          this.interFace('New_update',{
            id:this.dialog.addEdit.id,
            source_id:this.dialog.seleSource,
            forumid_id:this.dialog.seleModel,
            language_id:this.dialog.radiolang,
            title:this.dialog.titleInput,
            photo:photo,
            content:this.dialog.abstract,
            type:this.dialog.radiocon,
            body:this.editor.$txt.html(),
            url:this.dialog.outLink,
            time_type:this.dialog.radiotime,
            time:this.dialog.radiotime == '1'?this.dialog.timevalue1:this.dialog.time,
          }).then((res)=>{
            this.tip('success',res.msg);
            this.handleClose();
            this.page.list = 1;
            this.Index(this.page.list - 1,this.input1,this.seleLang,this.seleModel);
          })
        },
        New_add(){
          this.interFace('New_add',{
            source_id:this.dialog.seleSource,
            forumid_id:this.dialog.seleModel,
            language_id:this.dialog.radiolang,
            title:this.dialog.titleInput,
            photo:this.dialog.imageUrl,
            content:this.dialog.abstract,
            type:this.dialog.radiocon,
            body:this.editor.$txt.html(),
            url:this.dialog.outLink,
            time_type:this.dialog.radiotime,
            time:this.dialog.radiotime == '1'?this.dialog.timevalue1:this.dialog.time,
          }).then((res)=>{
            this.tip('success',res.msg);
            this.handleClose();
            this.page.list = 1;
            this.Index(this.page.list - 1);
          })
        },
        tip(type,content){
          this.$notify({
            title: '提示',
            message: content,
            type: type
          });
        },
        subReg(){
          if(!this.dialog.imageUrl){
            this.tip('error','请选择图片');
            return false;
          }
          if(!this.dialog.titleInput){
            this.tip('error','请填写标题');
            return false;
          }
          if(this.dialog.radiocon == 0){//编辑器
            var html = this.editor.$txt.html();
            if(html == '<p><br></p>'){
              this.tip('error','请填写编辑器内容');
              return false;
            }else{
              this.dialog.abstract = this.editor.$txt.text();
            }
          }else{//外链
            if(!this.dialog.outLink){
              this.tip('error','请填写编辑器内容');
              return false;
            }

          }
          if(this.dialog.radiotime == 1){//自定义
            if(!this.dialog.timevalue1){
              this.tip('error','请选择时间');
              return false;
            }
          }
          return true;
        }
      },
      created(){
        this.Index(this.page.list - 1);
        this.Index_list();
      }
    }
</script>
<style>
  .trHead{
    background: #EFEDED;
    color: #666666;
  }
  .trHead > th{
    font-weight: 400;
  }
  .newsTable{
    width: 100%;
    border-collapse:collapse;
    margin-top: 20px;
  }
  .newsTable th,.newsTable td{
    height: 45px;
  }
  .newsContent{
    margin-top: 30px;
    background: white;
    padding:30px;
  }
  .newsContent tbody{
    text-align: center;
    color: #333333;
  }
  .newsContent tbody tr{
    border-bottom:1px solid #F7F7F7;
  }
  .newsTop{
    display: flex;
    background: white;
    padding:10px;
    justify-content: space-between;
  }
  .newsTop>div{
    display: inline-block;
  }
  .open{
    color:#009933;
    cursor: pointer;
  }
  .labelRequire:after{
    content:'*';
    color: red;
    vertical-align: middle;
    margin-left: 10px;
  }
  .dialogLeft{
    width:60%;
    float: left;
  }
  .dialogLeft .el-input,.dialogLeft .el-textarea{
    width: 300px;
  }
  .dialogRig{
    width:35%;
    float: right;
  }
  .dialogLeft>div,.dialogRig>div{
    margin-bottom: 20px;
  }
  .avatar-uploader{
    display: inline-block;
    vertical-align: top;
    width: 100px;
    height: 100px;
    border: 1px dashed #E0E0E0;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 28px;
    transition: border-color 0.5s ease;
  }
  .avatar-uploader:hover{
    border-color: #409EFF;
  }
</style>

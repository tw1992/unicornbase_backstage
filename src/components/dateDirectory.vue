<template>
  <div>
    <div class="directory"  v-loading="parentLoad">
      <div style="padding: 10px 0;">
        <el-button type="primary" @click="add('add','parent')">新增字典</el-button>
      </div>
      <div style="min-height: 308px;">
        <table class="tableDirectory">
          <tr>
            <th>序号</th>
            <th>中文名称</th>
            <th>英文名称</th>
            <th>操作</th>
          </tr>
          <tbody>
          <tr v-for="item,index in parentData">
            <td>{{item.id}}</td>
            <td>{{item.cn_name}}</td>
            <td>{{item.en_name}}</td>
            <td>
              <span class="edit" @click="add('edit','parent',item)">
                编辑
              </span>|
              <span class="dis" style="cursor: pointer" @click="deleteItem(item,'Source_delete')">
                删除
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: right;margin-top: 30px;">
        <el-pagination
          background
          :page-size="parentPage.pageSize"
          layout="prev, pager, next"
          :current-page="parentPage.current"
          @current-change="parentPageChange"
          :total="parentPage.total*parentPage.pageSize">
        </el-pagination>
      </div>
      <el-dialog
        :title="titleParent"
        :visible.sync="dialogVisible"
        @close="parentClose"
        width="800px">
        <div style="overflow: hidden">
          <div class="clearItem">
            <div style="width: 50%;float: left">
              <span>中文名称</span><el-input v-model="parent.cn_name" placeholder="请输入内容"></el-input>
            </div>
            <div style="width: 50%;float: right">
              <span>英文名称</span><el-input v-model="parent.en_name" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="parentClose">取 消</el-button>
          <el-button type="primary" @click="Source_add">保 存</el-button>
        </span>
      </el-dialog>
    </div>



    <div class="directory" v-loading="childLoad">
      <div style="padding: 10px 0;">
        <el-button type="primary" @click="add('add','child')">新增子项</el-button>
      </div>
      <div style="min-height: 308px;">
        <table class="tableDirectory">
          <tr>
            <th>序号</th>
            <th>中文名称</th>
            <th>英文名称</th>
            <th>排序</th>
            <th>是否开启</th>
            <th>操作</th>
          </tr>
          <tbody>
          <tr v-for="item,index in childData">
            <td>{{item.id}}</td>
            <td>{{item.cn_name}}</td>
            <td>{{item.en_name}}</td>
            <td>{{item.soft}}</td>
            <td>{{item.status | status}}</td>
            <td>
              <span class="edit" @click="add('edit','child',item)">
                编辑
              </span>|
              <span class="dis" style="cursor: pointer" @click="deleteItem(item,'Forumid_delete')">
                删除
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: right;margin-top: 30px;">
        <el-pagination
          background
          :page-size="childPage.pageSize"
          layout="prev, pager, next"
          :current-page="childPage.current"
          @current-change="childPageChange"
          :total="childPage.total*childPage.pageSize">
        </el-pagination>
      </div>
      <el-dialog
        :title="titleChild"
        :visible.sync="dialogVisible1"
        @close='childClose'
        width="800px">
        <div style="overflow: hidden">
          <div class="clearItem">
            <div style="width: 50%;float: left">
              <span>中文名称</span><el-input v-model="child.cn_name" placeholder="请输入内容"></el-input>
            </div>
            <div style="width: 50%;float: right">
              <span>英文名称</span><el-input v-model="child.en_name" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div style="margin: 30px 0;" class="clearItem">
            <div style="width: 50%;float: left;">
              <span>排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</span>
              <!--<el-input v-model="child.soft" placeholder="请输入内容"></el-input>-->
              <el-input-number v-model="child.soft" :step="1" :min="1"></el-input-number>
            </div>
            <div style="width: 50%;float: right;height: 40px;line-height: 40px;">
              <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
              <el-radio v-model="child.status" label="1">启用</el-radio>
              <el-radio v-model="child.status" label="0">禁止</el-radio>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="Forumid_add">保 存</el-button>
        </span>
      </el-dialog>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="tip"
      width="30%">
      <span>确定要删除吗？删除不可恢复</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="tip = false">取 消</el-button>
          <el-button type="primary" @click="deleteDate">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>
<script>
  export default{
    data(){
        return {
            titleParent:'',
            parentPage:{
              current:1,
              total:0,
              pageSize:5,
            },
            parentData:[],
            parent:{
              cn_name:'',
              en_name:'',
              id:''
            },
            parentDialogType:'',
            dialogVisible:false,
            parentLoad:false,
            childPage:{
              current:1,
              total:0,
              pageSize:5,
            },
            childData:[],
            child:{
              en_name:'',
              cn_name:'',
              soft:'',
              status:'1',
              id:''
            },
            childLoad:false,
            childDialogType:'',
            titleChild:'',
            tip:false,
            dialogVisible1:false,
            delete:{
              type:'',
              item:''
            }
        }
    },
    methods:{
      deleteItem(item,type){
        this.delete.type = type;
        this.delete.item = item;
        this.tip = true;
      },
      add(type,pOrc,item){
        if(pOrc == 'parent'){
          this.parentDialogType = type;
          if(type == 'add'){
            this.titleParent = '新增字典';
          }else{
            this.titleParent = '修改字典';
            this.parent.cn_name = item.cn_name;
            this.parent.en_name = item.en_name;
            this.parent.id = item.id;
          }
          this.dialogVisible = true;
        }else{
          this.childDialogType = type;
          if(type == 'add'){
            this.titleChild = '新增子项';
          }else{
            this.titleChild = '修改子项';
            this.child.cn_name = item.cn_name;
            this.child.en_name = item.en_name;
            this.child.soft = item.soft;
            this.child.status = String(item.status);
            this.child.id = item.id;
          }
          this.dialogVisible1 = true;
        }
      },
      deleteDate(){
        this.interFace(this.delete.type,'/'+this.delete.item.id,'get').then((res)=>{
          this.tip = false;
          if(this.delete.type == 'Source_delete'){
            this.parentPageChange(1);
          }else{
            this.childPageChange(1);
          }
        })
      },
      Source(){
        this.parentLoad = true;
        this.interFace('Source',{
          list:this.parentPage.current - 1,
          value:this.parentPage.pageSize,
        }).then((res)=>{
          this.parentPage.total = res.value;
          this.parentData = res.list;
          this.parentLoad = false;
        })
      },
      Source_add(){
        if(!this.parent.cn_name || !this.parent.en_name){
          this.notify('warning','有没有填写的选项');
          return
        }
        if(this.parentDialogType == 'add'){
          var req = this.interFace('Source_add',{cn_name:this.parent.cn_name,en_name:this.parent.en_name});
        }else{
          var req = this.interFace('Source_update',this.parent);
        }
        req.then((res)=>{
          if(res){
            this.parentClose();
            this.parentPageChange(1);
          }
        })
      },
      parentClose(){
        this.parent.cn_name = '';
        this.parent.en_name = '';
        this.parent.id = '';
        this.dialogVisible = false;
      },
      parentPageChange(data){
        this.parentPage.current = data;
        this.Source();
      },
      childPageChange(data){
        this.childPage.current = data;
        this.Forumid();
      },
      Forumid(){
        this.childLoad = true;
        this.interFace('Forumid',{
          list:this.childPage.current - 1,
          value:this.childPage.pageSize,
        }).then((res)=>{
          this.childPage.total = res.value;
          this.childData = res.forumid;
          this.childLoad = false;
        })
      },
      Forumid_add(){
        if(!this.child.en_name || !this.child.cn_name || !this.child.soft){
            this.notify('warning','有没有填写的选项');
            return;
        }
        if(this.childDialogType == 'add'){
          var req = this.interFace('Forumid_add',{
            en_name:this.child.en_name,
            cn_name:this.child.cn_name,
            soft:this.child.soft,
            status:this.child.status
          })
        }else{
          var req = this.interFace('Forumid_update',this.child)
        }
        req.then((res)=>{
          if(res){
            this.childClose();
            this.childPageChange(1);
          }
        })
      },
      childClose(){
        this.child.en_name = '';
        this.child.cn_name = '';
        this.child.soft = '';
        this.child.status = '1';
        this.child.id = '';
        this.dialogVisible1 = false;
      },
      notify(type,content){
        this.$notify({
          title: '提示',
          message: content,
          type: type
        });
      },
    },
    created(){
      this.Source();
      this.Forumid();
    }
  }
</script>
<style>
  .directory{
    background: white;
    padding:30px;
  }
  .tableDirectory{
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }
  .tableDirectory>tbody tr{
    height: 53px;
    border-bottom: 1px solid #F7F7F7;
    color: #333333;
  }
  .tableDirectory>tr:nth-of-type(1){
    height: 40px;
    background: #EFEDED;
    font-weight: 400;
    color: #666666;
  }
  .clearItem>div>.el-input{
    width:calc(100% - 150px);
  }
  .clearItem>div>.el-input-number{
    width:230px;
  }
  .clearItem{
    overflow: hidden;
  }
  .clearItem>div>span{
    padding-right: 20px;
  }
</style>

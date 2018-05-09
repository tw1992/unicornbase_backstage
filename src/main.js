// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './global'
import axios from 'axios';
import qs from 'qs';
Vue.prototype.qs = qs;
Vue.prototype.$http = axios;
import { Button, Select,Container,Header,Aside,Main,Icon,Dropdown,DropdownMenu,DropdownItem,Input,Option,Pagination,Dialog,Radio,DatePicker,TimePicker,Upload,Message,Notification,Loading,InputNumber } from 'element-ui';


// Vue.prototype.E = E;
Vue.use(global)
Vue.use(Button)
Vue.use(Select)
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(InputNumber);
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.config.productionTip = false
import './assets/css/button.css';
import './assets/css/container.css';
import './assets/css/header.css';
import './assets/css/aside.css';
import './assets/css/main.css';
import './assets/css/icon.css';
import './assets/css/dropdown-menu.css';
import './assets/css/dropdown-item.css';
import './assets/css/dropdown.css';
import './assets/css/input.css';
import './assets/css/option.css';
import './assets/css/select.css';
import './assets/css/pagination.css';
import './assets/css/dialog.css';
import './assets/css/radio.css';
import './assets/css/date-picker.css';
import './assets/css/time-picker.css';
import './assets/css/upload.css';
import './assets/css/notification.css';
import './assets/css/loading.css';
import './assets/css/input-number.css';
import './assets/css/common.css';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

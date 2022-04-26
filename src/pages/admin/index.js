//Login page

import Vue from 'vue'
import App from 'spa@comp_admin/app'
import router from './router'
import store from './store'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
import {baseUrl} from '../../lib/config.js'


import { FormModel,Input,Icon,Button,Col,Row,ConfigProvider, Layout, Menu, Breadcrumb, Dropdown, Table, Form, DatePicker, Select, Tag, Modal, Popconfirm, message} from 'ant-design-vue';

Vue.config.productionTip = false //阻止启动生产消息

Vue.use(FormModel).use(Input).use(Icon).use(Button).use(Col).use(Row).use(ConfigProvider).use(Layout)
.use(Menu).use(Breadcrumb).use(Dropdown).use(Table).use(Form).use(DatePicker).use(Select).use(Tag)
.use(Modal).use(Popconfirm).use(message);
Vue.prototype.zhCN = zhCN;
Vue.prototype.$confirm = Modal.confirm;
message.config({top:'40%'})
Vue.prototype.$Message = message
Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = baseUrl;


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    render: h => h(App)
});


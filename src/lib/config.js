/**
 *  app 参数
 */
import axios from 'axios'
import qs from 'qs'
import { JSON_MD5 } from './utils';
// 设置接口地址，开发环境代理接口解决跨域问题
// baseUrl 基础接口地址
// comurl 公共接口地址
// ticketUrl 票务系统 接口地址
let baseUrl = '',comurl = '';
switch(process.env.ENV_CONFIG){
    case 'dev':
        baseUrl = 'http://192.168.8.51/bangbei'
        comurl =  'http://dev.emmet.pub:10080/bb/' 
        break
    case 'test':
        baseUrl = 'http://dev.emmet.pub:10080/bangbei'
        comurl =  'http://dev.emmet.pub:10080/bb/'
        break
    case 'pre':
        baseUrl = 'https://pre.51bnh.com/bangbei'
        comurl =  'https://pre.51bnh.com/bb/'
        break
    case 'prod':
        baseUrl = 'https://bb.51bnh.com/bangbei'
        comurl =  'https://bb.51bnh.com/bb/';
        break
}
// 响应时间
axios.defaults.timeout = 30000;           
// 允许跨域             
axios.defaults.withCredentials = false
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
// 添加发送请求之前拦截器
axios.interceptors.request.use((config) => {
    let params = JSON.parse(JSON.stringify(config.data))
    //在发送请求之前收集data MD5格式后添加 sign 签名
    params['sign'] ? delete params['sign'] : '';
	params['timestamp'] ? '' : params['timestamp'] = new Date().getTime();
    let _sign = JSON_MD5(params)
    params['sign'] = _sign
	// 将post请求强制降低为一般请求 
    if(config.method  === 'post'){
        config.data = qs.stringify(params);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});
export {
	baseUrl,
    comurl,
}
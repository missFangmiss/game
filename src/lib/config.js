/**
 *  app 参数
 */
import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
import { Toast } from 'vant'

// 设置接口地址，开发环境代理接口解决跨域问题
// baseUrl 基础接口地址
let baseUrl = '';
switch(process.env.ENV_CONFIG){
    case 'dev':
        baseUrl = 'http://kg.zhongmakj.com/nzj/guess/'
        break
    case 'test':
        baseUrl = 'http://kg.zhongmakj.com/nzj/guess/'
        break
    case 'pre':
        baseUrl = 'http://kg.zhongmakj.com/nzj/guess/'
        break
    case 'prod':
        baseUrl = 'http://kg.zhongmakj.com/nzj/guess/'
        break
}

const service = axios.create({
    baseURL: baseUrl,
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})


// 配置请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
// 添加发送请求之前拦截器
service.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    if(token){
        // config.headers['Authorization'] = 'Bearer '+token
        config.data.token = token
    }
    let params = JSON.parse(JSON.stringify(config.data))

	// 将post请求强制降低为一般请求 
    if(config.method  === 'post'){
        config.data = qs.stringify(params);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
service.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data){
        return Promise.reject(res);
    }
    if(res.data.respCode!=='00'){
        if(res.config.url.indexOf('entry')>-1){
            Toast.fail(res.data.respDesc || 'Error');
        }else{
            message.error({
                content:res.data.respDesc || 'Error',
                duration:2,
            });
        }
        
        return Promise.reject(res.data);
    }else{
        return res.data;
    }
    
}, error => {
    message.error({
        content:error.message,
        duration:2,
    });
    return Promise.reject(error);
});
export default service
export {
	baseUrl,
    service
}
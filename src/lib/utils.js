import md5 from 'js-md5';
import Base64 from 'js-base64';
import AESCrypto from 'crypto-js';
import { Toast} from 'vant';

const signKey = '3F17D79DF590F338F34AC4AEF075CDAC';
const appId = '73364F905A8723C1A8F961623480D666';

/**
 * 参数MD5加密
 * @param {*} params 参数对象
 * 参数中包含timestamp时间戳则signKey赋值为timestamp时间戳否则为固定字符串
 */
const JSON_MD5 = (params) => {
	let keyArr = []
	for (var key in params) {
		if(params[key] !== null && params[key] !== '' && key !== 'signKey'){
			keyArr.push(key+'='+ (typeof (params[key]) === "object" ? JSON.stringify(params[key]) : params[key]))
		}
	}
	let strSort = keyArr.sort()
	let sortBefore = ''
	
	let sKey = params.timestamp ? params.timestamp : params.signKey ? params.signKey : signKey
	for(let i = 0; i < strSort.length; i++) {
		let params = typeof (strSort[i]) === "object" ? JSON.parse(strSort[i]) : strSort[i]
		if (i == strSort.length - 1) {
			sortBefore += (params + '&signKey=' + sKey);
		} else {
			sortBefore += (params + '&')
		}
	}
	// console.log(sortBefore)
	let result = md5(sortBefore)
	return result
}

// 处理验签,含url
const __MD5 = (params, SignKey=signKey)=> {
	var result = '';
	var keyArr = [];
	var str = '';
	for (var key in params) {
		if (key == 'sign') {
			delete params.sign
		}

		if (typeof (params[key]) === "object" && params[key] != null) {
			var strChild = '';
			for (var keys in params[key]) {
				strChild += '"' + keys + '":"' + params[key][keys] + '",';
			}
			strChild = strChild.substr(0, strChild.length - 1)
			str = key + "={" + strChild + "}";
		} else {
			if (params[key] == null || !(params[key]) || params[key] == ' ') {
				str = '';
			} else {
				str = key + "=" + params[key];
			}
		}
		str ? keyArr.push(str) : '';
		keyArr = keyArr.sort();
	}
	for (var i = 0; i < keyArr.length; i++) {
		if (i == keyArr.length - 1) {
			result += keyArr[i]  + '&signKey=' + SignKey;
		} else {
			result += keyArr[i] + '&'
		}
	}
	// console.log(result)
	result = md5(result);
	return result;
}

// 获取设备类型
const userAgent = () =>{
	let u = navigator.userAgent;
	let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	let isAndroid= u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

	if(isIos){
		return 'IOS'
	}else if(isAndroid){
		return 'ANDROID'
	}else{
		return 'DEFAULT'
	}
}

/**
 * 获取设备类型
 * bangbei \ MicroMessenger \ (AliApp\Alipay\AlipayClient)
 * 返回 bangbei、Alipay、WXApp、notSupport
 */
const appType = () =>{
	let u = navigator.userAgent

	// return u.indexOf(type) > -1
	// 帮贝终端
	let isBangbei = u.indexOf('bangbei') > -1
	// 微信终端	
	let isWX = u.indexOf('MicroMessenger') > -1		
	// 支付宝终端
	let isAliApp = u.indexOf('AliApp') > -1 || u.indexOf(' Alipay') > -1 || u.indexOf('AlipayClient') > -1 
	return isBangbei ? 'bangbei' : isAliApp ? 'Alipay' : isWX ? 'WXApp' : 'notSupport'
}

/**
 * base64 解密
 * str  解密所需的字符串
 */
const deCode = (str) =>{
	return Base64.Base64.decode(str);
}
/**
 * base64 加密
 * str  加密所需的字符串
 */
const enCode = (str) =>{
	console.log(str)
	return Base64.Base64.encode(str);
}

/**
 * 用户名脱敏 （简单版）
 * str  脱敏所需的字符串
 */
const disturb = (str) =>{
	if(typeof str == 'string'){
		if(str.length == 2){
			let ruten = str.substring(1);
			return str.replace(ruten,'*');
		}else if(str.length > 3){
			let ruten = str.substring(1,str.length-1);
			return str.replace(ruten,'**');
		}else if(str.length > 2){
			let ruten = str.substring(1,str.length-1);
			return str.replace(ruten,'*');
		}else{
			return str
		}
	}
}

// AES 加密
const AESencrypt = (str, keys) =>{
	console.log(str,keys)
	let key = AESCrypto.enc.Utf8.parse(keys)
	let options = {
	    iv: AESCrypto.enc.Utf8.parse("0000000000000000"),
	    mode: AESCrypto.mode.ECB,
	    padding: AESCrypto.pad.Pkcs7
	}

	let encryptedData = AESCrypto.AES.encrypt(str, key, options);
	return encryptedData.toString()
}

// 格式化金额数字
// 进千位补分号 '1,324.00' 返回字符串类型
// 进千位补分号 '1,324.00' 返回字符串类型
let numberFormat = function(num){
    var num = (num || 0).toString().split('.');
    var result = num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    if (num[1]) { 
    	result = result + '.' + num[1].substr(0,2);
    }else{
    	result = result + '.00';
    }
    return result; 
}
// 除去格式化千分位
function delNumFormat(num){
	return Number(String(num).replace(/,/g, ""))
}


// 正则验证
let reg = {
	float2: /^\d*(\.?\d{0,2})?$/,
	num: /^0[0-9]*$/
};
// input输入框  金额 限制
const inputVali = (e,l) =>{
	if(!l && reg.num.test(e)){
		e = e.substr(0,e.length-1);
		return e;
	}
	if(!reg.float2.test(e)){
		e = e.substr(0,e.length-1);
		return e;
	}
	
	if(l && e.length > l){
		e = e.substr(0,l);
		return e;
	}
	e = e.replace(/\s/g, '').replace(/^[^\d.]+$/g, '').replace(/[\u4E00-\u9FA5]+/g,'');
	return e;
}
//input输入框 金额限制
const checkAmt = (e) =>{
	let value;
	if(e !=''&& e.substr(0,1) == '.'){  
       e ="";  
       return e;
    } 
    value = e.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效  
    value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的       
   	value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");      
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数       
    if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        if(value.substr(0,1) == '0' && value.length == 2){  
            value= value.substr(1,value.length);      
        }  
    } 
    if(value){
    	var valueArr = value.split('.');
    	 if(valueArr[0].length > 8){
    	 	if(valueArr[1]){
    	 		value = valueArr[0].substr(0,8)  +'.'+  valueArr[1]
    	 	}else{
    	 		value = valueArr[0].substr(0,8)
    	 	}
    	 }
    }
    if(value != e){
        //如果和现在input框内的值不同，则重新赋值
        e = value;
        return e;
    }
    return e;
}
// 格式化时间
// time new Date()
// fmt 格式 ：'yyyyMMdd' 'yyyy/MM/dd hh:mm:ss' ...
let dateFormat = function(time, fmt){
    var o = {
        "M+": time.getMonth() + 1, //月份 
        "d+": time.getDate(), //日 
        "h+": time.getHours(), //小时 
        "m+": time.getMinutes(), //分 
        "s+": time.getSeconds(), //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
        "S": time.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 比当前日期 前后的日期
let GetDateStr = function(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth()+1;//获取当前月份的日期
	var d = dd.getDate();
	return y+"-"+m+"-"+d;
}
// 金钱 价格格式化
let priceFormat = function (num) {
	num = String(num);
	if(num.length < 6){
		return num;
	} 
    var strOutput = "";
    var strUnit = '千百十亿千百十万0000';
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++)
        strOutput += '零123456789'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    return strOutput.replace(/零0/g, '').replace(/[千百十]零/g, '0').replace(/亿零{0,3}0{0,3}万/, '亿').replace(/([千百十])/g, '');
}

//处理公共参数
const commonParams = (obj) =>{
	const params = {
		userNo: obj.USERNO,
		token: obj.TOKEN,
		phone: obj.PHONE,
		latitude: obj.LATITUDE,
		longitude: obj.LONGITUDE,
	}
	return params;
}

// 配置银行卡前四 后四
const cardNoFormat =  (n,l) =>{
	let tempNo = {};
	if(l){
		tempNo = {
			first4: n.substr(0,4),
			last4: n.substr(-4)
		}
	}else{
		tempNo = {
			all: n.substr(0,4) + ' **** **** ' + n.substr(-4),
		}
	}
	return tempNo;
}

// 格式化手机号码/银行卡，脱敏处理
// value 手机号码/银行卡
// 返回 $1****$2
const coverKeyword = function(value){
    const reg = /^1[3-9][0-9]{9}$/;
    if(value){
        if(reg.test(value)){
            return value.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
        }else{
            return value.substr(0,4) + ' **** ' + value.substr(-4);
        }
    }else{
        return ''
    }
}

// 重构还款日数组
const restRepayDate = (arr) =>{
	let tempArr = [] 
	for(let i = 0; i<arr.length;i++){
		let md;
		md = arr[i].date.substring(4).substr(0,2) + '月' + arr[i].date.substring(4).substr(2,2) + '日';
		tempArr.push(md)
	}
	return tempArr;
}

//链接参数截取
const setHrefArgs = (href) =>{
	let qs = '';
	//取得查询字符串并去掉开头的问号
	if(href){
		qs = (href.indexOf('?') > 0 ? href.substring(href.indexOf('?')+1) : "")
	}else{
		qs = (location.href.indexOf('?') > 0 ? location.href.substring(location.href.indexOf('?')+1) : "")
	}
	//保存数据的对象
	let	args = {},
		//取得每一项
		items = qs.length ? qs.split("&") : [],
		item = null,
		name = null,
		value = null,
		//在 for 循环中使用
		i = 0,
		len = items.length;
	//逐个将每一项添加到 args 对象中
	for(i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		localStorage.setItem(name,value)
		if(name.length) {
			args[name] = value;
		}
	}
	return args;
}

// 设置 loading 样式
const loading = () =>{
	const t =  Toast.loading({
	  duration: 0,       // 持续展示 toast
	  forbidClick: true, // 禁用背景点击
	  loadingType: 'spinner',
	  message: '正在加载'
	});
	return t;
}

export {
	__MD5,
	JSON_MD5,
	signKey,
	coverKeyword,
	appId,
	userAgent,
	appType,
	deCode,
	enCode,
	disturb,
	AESencrypt,
	numberFormat,
	dateFormat,
	priceFormat,
	delNumFormat,
	inputVali,
	checkAmt,
	loading,
	commonParams,
	cardNoFormat,
	restRepayDate,
	setHrefArgs
}
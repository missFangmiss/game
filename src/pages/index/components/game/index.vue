<template>
    <div class="game">
        <div class="gameTop">
            <div class="priceBox">
                <div class="price">
                    <div class="priceTag"><img src="../../../../static/images/logo_BTC.png" alt="BTC">BTC Price</div>
                    <div class="priceShow">{{price | notlastNum}} <p class="lastNum">{{price | lastNum}}</p></div>
                </div>
                <p class="desc" v-if="status!=3">Guess the last number of the BTC price after the game starts, Earn up to ₹{{total}} if win.</p>
                <div v-else>
                    <p class="startDesc" style="margin-top:20px">Waiting for bonus number results</p>
                    <p class="startDesc">Remaining Time</p>
                    <p class="countDown"><span>{{gameTimes}}</span>seconds</p>
                </div>
            </div>
            <div :class="['_container',{ing:newName!=''}]" v-if="status!=3">
                <div class="flip">
                    <p class="_waiting _front">
                       <span v-if="status==0 || status==1">Need at least {{atLeastNum}} more players to start</span> 
                       <span v-if="status==2">The game will start in  <span class="wait_bold">{{waitTime}}</span>  seconds</span> 
                    </p>
                    <p class="_waiting _back">New player : {{newName}} joins the game</p>
                </div>
            </div>
            
            <div class="numChooseBox">
                <div v-for="(item,index) in list" :key="index" class="numberBox" @click="onChooseNum(item.num,item.user_id)" v-show="(status==3&&item.user_id!='') || status!=3">
                    <div :class="['number',{choosen:item.user_id,isMeChoose:chosedNum==item.num||item.user_id==userId}]">{{item.num}}</div>
                    <div :class="['shadow',{isNumShadow:luckyNum==item.num}]"></div>
                    <p class="name">{{item.user_id}}</p>
                </div>
            </div>
            <div v-if="isChoosn">
                <van-cell title="Your chosen number" value="" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Player" :value="inNum" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Earn up to" :value="Number(inNum)<Number(minPerson)?'-':'₹'+actualTotal" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
            </div>
            <p class="tips" v-if="!isChoosn">Please click above to select a number</p>
        </div>
        <p class="room">GAME ID : {{gameId}}</p>
        <van-popup v-model="show" closeable position="bottom" @closed="onClose" >
            <div class="confirmBox">
                <van-cell title="Your chosen number" :value="chosedNum" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Invest" :value="'₹'+fee" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Profit" :value="rate | profitGet" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <div class="popBtn" @click="handleChoose">Confirm</div>
            </div>
        </van-popup>
        <van-dialog 
            v-model="isOut" title="OUT" 
            show-cancel-button 
            cancelButtonText="Cancel" 
            confirmButtonText="Join a game" 
            @cancel="handleCancel"
            @confirm="handleConfirm"
            confirmButtonColor="#4A5E94">
            <p class="_out">You didn't choose a number before the game started</p>
        </van-dialog>

    </div>
</template>
<script>
import { h5GameInfo,h5GamePrice, h5GameBuy,h5GameSearch } from 'common@api/set.js'
var info = null, waitTimeOut = null, gameTimeOut = null, animationTimeOut = null, priceTimeOut = null, infoTimeOut = null;
import { Popup, Cell, Dialog } from 'vant';
export default {
    name: 'game',
    components:{
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [Dialog.Component.name]: Dialog.Component,
    },
    mounted(){
        this.userId = sessionStorage.getItem('userId')
        this.gameId = this.$route.query.gameId;
        
        // h5GamePrice({route:'Game_getPrice'}).then(res=>{
        //     this.price = res.respData.price;
        //     if(this.status==3){
        //         this.luckyNum  = this.price.slice(-1);
        //     }
        // })

        this.initWebSocket();
        // this.onLogin();

    
        // this.getPrice();
        // this.getInfo();
    },
    beforeDestroy(){
        console.log('beforeDestroy')
        clearInterval(priceTimeOut)
        clearInterval(infoTimeOut)
        clearInterval(gameTimeOut)
        clearInterval(waitTimeOut)
        this.$socket.close();
    },
    data(){
        return{
            userId:'',      //userId
            price:'',       //实时金额
            minPerson:0,    //最低入场人数
            fee:100,        //入场费
            rate:5,         //抽成
            waitTime:10,    //等待新用户时间
            luckyNum:-1,     //最后一位
            chosedNum:-1,   //用户选择的数字
            show:false,     //选择数字弹窗
            isOut:false,    //用户被踢出
            status:0,       //游戏状态 0 初始化；1开始前；2准备开始；3进行中；4已结束
            total:950,      //最高总收益
            // actualTotal:100,//实际总收益
            gameTimes:30,   //游戏开奖时间
            isChoosn:false, //选中了数字并成功扣款
            inNum:0,        //已参加的人数
            gameId:'',      //
            newName:'',     //新加入的玩家名字
            name:'',        //最新的玩家名字
            list:[{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:0}]
        }
    },
    computed:{
        //还需多少人参加
        atLeastNum(){
            let num = this.minPerson - this.inNum;
            // if(num<=0&&this.minPerson!=0){
            //     this.status = 2;
            // }
            return num;
        },
        actualTotal(){
            return (this.inNum*this.fee - this.inNum*this.fee*this.rate*0.01).toFixed(2);
        },
        
    },
    watch:{
        status(newValue,oldValue){
            if(newValue==2&&oldValue!=2){
                // this.onCountDown('wwwwww')
            }
            if(newValue==3){
                clearInterval(waitTimeOut)
                clearInterval(infoTimeOut)
                this.onStart()
                gameTimeOut = setInterval(() => {
                    this.gameTimes = this.gameTimes-1;
                    if(this.gameTimes<=0){
                        clearInterval(priceTimeOut)
                        // this.status = 4;
                        if(!this.isChoosn){
                            this.$router.go(-1);
                        }else{
                            this.$router.replace({path:'/result',query:{id:this.gameId}})
                        }
                        clearInterval(gameTimeOut)
                        
                    }
                }, 1000);
            }
        },
        inNum(newValue,oldValue){
            if(newValue!=oldValue && oldValue!=0 && this.status!=0){
                clearInterval(waitTimeOut);
                this.waitTime = info.wait_time;
                this.newName =  this.name;
                animationTimeOut = setTimeout(() => {
                    this.newName = '';
                    // if(this.status==2){
                    //     this.onCountDown('bbbbb');
                    // }
                    clearTimeout(animationTimeOut)
                }, 2000);
                
            }
        }

    },
    filters:{
        //获得收益百分比
        profitGet:function(value){
            return (100-value) + '%'
        },
        lastNum(value){
            return value.slice(-1)
        },
        notlastNum(value){
            return value.slice(0,value.length-1)
        }
    },
    methods:{
        // 初始化weosocket
		initWebSocket() {
            this.$connect();
			this.$socket.onopen = this.websocketonopen;//连接成功方法
			this.$socket.onerror = this.websocketonerror;//报错方法
			this.$socket.onmessage = this.websocketonmessage;// 接收端返回或推送信息的方法
			this.$socket.onclose = this.websocketclose;//关闭
		},
		// 链接ws服务器，e.target.readyState = 0/1/2/3   0 CONNECTING ,1 OPEN, 2 CLOSING, 3 CLOSED
		websocketonopen(e) {
			console.log('WebSocket连接成功,app.vue', e);
            this.onLogin();
		},
        websocketonerror(e) {
            console.log(e);
            //错误
            console.log("WebSocket连接发生错误");
        },
		// 接收端发送过来的信息，整个项目接收信息的唯一入口
		websocketonmessage(e) {
			console.log('onmessage------')
			if (!e.data) {return;}
			let res = JSON.parse(e.data);
			console.log(res)
			if(res.code != 0){//返回失败信息
                this.$toast(res.msg);
				console.log(res.msg)
			}
            if(res.cmd=='signin'&&res.code==0){
                this.onGetPrice()
            }
			//
			//端返回成功信息
			if (res.cmd=='subscribe-ticker'&&res.code == 0 && res.data.length>=4) {
                console.log(res.data[3])
				this.price = String(res.data[3].toFixed(2))
			}
		},
        websocketclose(e) {
            console.log(e)
            //关闭链接时触发
            var code = e.code;//  状态码表 https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent
            var reason = e.reason;
            var wasClean = e.wasClean;
            console.log(code,reason,wasClean);
        },
        onLogin(){
            this.$socket.send(JSON.stringify({"cmd":"signin","args":["17f55cc90adea4b53932ec34a7d12e838e8b199977eea8e25e026b73efb23b51"]}));
        },
        onGetPrice(){
            this.$socket.send(JSON.stringify({"cmd":"subscribe-ticker","args":["bo.btc.usd.-"]}));
        },
        onCountDown(type){
            console.log(type)
            waitTimeOut = setInterval(() => {
                this.waitTime = this.waitTime-1;
                if(this.waitTime<=0){
                    clearInterval(waitTimeOut)
                    this.onStart()
                }
            }, 1000);
        },
        onStart(){
            clearInterval(infoTimeOut);
            if(!this.isChoosn){
                this.isOut = true;
                clearInterval(priceTimeOut);
                clearInterval(gameTimeOut);
            }
        },
        getPrice(){
            priceTimeOut = setInterval(() => {
                h5GamePrice({route:'Game_getPrice'}).then(res=>{
                    this.price = res.respData.price;
                    if(this.status==3){
                        this.luckyNum  = this.price.slice(-1);
                    }
                })
            }, 1000);//TODO
            
        },
        onCycle(){
            infoTimeOut = setInterval(() => {
                h5GameInfo({route:'Game_gameInfo',game_id:this.gameId}).then(res=>{
                    let resp = res.respData;
                    this.inNum = resp.num;
                    this.list = resp.num_obj;
                    this.name = resp.latest_join_user;
                    this.status = resp.status;
                    if(resp.status=='2'){
                        let lastJoinTime = new Date(resp.latest_join_time.replace(/-/g,"/")).getTime();
                        let nowTime = new Date().getTime();
                        let timeCharge = (((info.wait_time*1000 + lastJoinTime) - nowTime) / 1000).toFixed(0);
                        this.waitTime = timeCharge>0 ? timeCharge : 0;
                    }
                })
            }, 1000);//TODO
        },
        getInfo(){
            h5GameInfo({route:'Game_gameInfo',game_id:this.gameId}).then(res=>{
                let resp = res.respData;
                if(resp.status=='4'){
                    this.$router.replace({path:'/result',query:{id:this.gameId}})
                }
                info = resp;
                this.inNum = resp.num;
                this.minPerson = resp.min_num;
                this.fee = resp.entrance_fee;
                this.rate = resp.rate;
                this.waitTime = resp.wait_time;
                this.gameTimes = resp.game_time;
                this.name = "";
                this.total = (this.fee*10) - (this.fee*10)*this.rate*0.01;


                if(resp.status=='2'){
                    this.name = resp.latest_join_user;
                    let lastJoinTime = new Date(resp.latest_join_time.replace(/-/g,"/")).getTime();
                    let nowTime = new Date().getTime();
                    this.waitTime = (((info.wait_time*1000 + lastJoinTime) - nowTime) / 1000).toFixed(0);
                }
                console.log(resp.status)
                if(resp.status=='3'){
                    let endTime = new Date(resp.end_time.replace(/-/g,"/")).getTime();
                    let nowTime = new Date().getTime();
                    let lastTime = ((endTime - nowTime) / 1000).toFixed(0);
                    this.gameTimes = lastTime>0 ? lastTime : 0;
                }

                this.status = resp.status;// 0 初始化；1开始前；2准备开始；3进行中；4已结束

                this.list = resp.num_obj || [];
                let isChoosed = this.list.some(item=>{
                    if(item.user_id == this.userId){
                        this.chosedNum = item.num;
                        this.isChoosn = true;
                    }
                   return item.user_id == this.userId
                })
                if(resp.status!='3' && resp.status!='4'){
                    this.onCycle()
                }
                
            })
        },
        //选中数字 弹出弹窗
        onChooseNum(num,id){
            if(id&&id!='') { 
                if(id!=this.userId) { 
                    this.$toast('The number '+num+' has been selected by another player');
                }
                return;
            }
            if(this.isChoosn) return;

            this.chosedNum = num;
            this.show = true
        },
        //确认数字
        handleChoose(){
            h5GameBuy({ 
                route:'Game_joinGame',
                game_id:this.gameId,
                user_id:sessionStorage.getItem('userId'),
                num:this.chosedNum
            }).then(res=>{
                this.$toast('SUCCESS');
                this.show = false;
                this.isChoosn = true;
            })
        },
        //out时返回
        handleCancel() {
            this.$router.replace('/')
        },
        //重新开始一场
        handleConfirm(){
            clearInterval(infoTimeOut)
            clearInterval(gameTimeOut)
            clearInterval(waitTimeOut)
            h5GameSearch({route:'Game_selGame'}).then(res=>{
                let resp = res.respData;
                this.$router.replace({path:'/game',query:{gameId:resp.game_id}})
                this.gameId = resp.game_id;
                this.getInfo()
                this.getPrice()

            }).catch(e=>{
                this.$router.go(-1)
            })
        },
        //选择数组的弹窗关闭时
        onClose(){
            if(!this.isChoosn){
                this.chosedNum = -1;
            }
        }
    }
}
</script>
<style scoped>
    .game{
        padding: 15px;
        min-height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .gameTop{
        flex:1;
    }
    
    .priceBox{
        width: 345px;
        border-radius: 8px;
        background: #4A5E94;
        box-sizing: border-box;
        padding: 10px 15px 20px 15px;
        margin: auto;
    }
    .price{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .priceTag{
        color: #fff;
        font-size: 15px;
        display: flex;
        align-items: center;
    }
    .priceTag>img{
        width: 11px;
        height: 15px;
        margin-right: 8px;
    }
    .priceShow{
        color: #fff;
        font-size: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 2px;
        font-weight: 300;
    }
    .lastNum{
        width: 38px;
        height: 34px;
        border-radius: 8px;
        background: #F7924B;
        font-size: 26px;
        font-weight: 400;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;

    }
    .lastNum::after{
        content: '';
        background: url('../../../../static/images/icon_arrow.png') 100%/100%;
        width: 13px;
        height: 9px;
        position: absolute;
        left: 0;
        right: 0;
        top: 37px;
        margin: auto;
    }
    .desc{
        margin-top: 32px;
        color: #fff;
        font-size: 14px; 
        font-weight: 300;
    }
    .startDesc{
        margin-top: 15px;
        color: #fff;
        font-size: 14px; 
        font-weight: 300;
        text-align: center;
    }
    .countDown{
        color: #fff;
        font-size: 20px;
        margin-top: 8px; 
        font-weight: 500;
        text-align: center;
    }
    .countDown>span{
        font-size: 24px;
        padding-right: 6px;
    }


    ._container{
        width: 345px;
        height: 44px;
        margin: 10px auto 35px auto;
        transform-style:preserve-3d;
        perspective:1000;
    }
    .flip{
        position: relative;
        transition:0.6s;
        transform-style:preserve-3d;
        width: 345px;
        height: 44px;
        /* transform-origin:100% 172px; */
    }
    ._waiting{
        width: 345px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 14px;
        color: #fff;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        backface-visibility:hidden;
    }
    .wait_bold{
        font-size: 16px;
        font-weight: bold;
    }
    ._front{
        background: #F7924B;
        /* z-index:2; */
    }
    ._back{
        background: #4A5E94;
        transform:rotateX(-180deg);
    }
    .ing .flip{
        animation: flip 2s 1 ease-in-out;
        /* //linear*/
    }

   @keyframes flip{
        0%{
            transform: rotateX(0deg);
        }
        20%{
            transform: rotateX(180deg);
        }
        
        80%{
            transform: rotateX(180deg);
        }

        100%{
            transform: rotateX(360deg);
        }
    }



    .numChooseBox{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 5px;
        row-gap: 15px;
        margin-top: 35px;
        min-height: 280px;
        
    }
    .numberBox{
        width: 78px;
    }
    .number{
        width: 63px;
        height: 63px;
        background: #DDDDDD;
        border-radius: 50%;
        font-size: 35px;
        color: #fff;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        position: relative;
        z-index:1;
    }
    .choosen{
        background: #4A5E94;
    }
    .isMeChoose{
        background: #26CBA0;
    }
    .shadow{
        width: 45px;
        height: 12px;
        background: #F4F4F4;
        border-radius: 50%;
        margin: auto;
        margin-top: -6px;
    }
    .isNumShadow{
        background: #F7924B;
    }
    .name{
        color: #888888;
        font-size: 12px;
        width: 78px;
        height: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
    }
    .tips{
        color: #F7924B;
        font-size: 17px;
        font-weight: 500;
        margin: 15px;
        text-align: center;
    }
    .confirmBox{
        padding: 50px 15px 20px 15px;
    }
    .boxCell{
        background: #F7F7F7;
        border-radius: 8px;
        margin-top: 10px;
    }
    .cellTitle{
        color: #666666;
        font-size: 14px;
    }
    .cellValue{
        color: #000000;
        font-size: 17px;
        font-weight: 500;
    }
    .chosedNumber{
        width: 30px;
        height: 30px;
        background: #26CBA0;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        font-weight: 500;
        color: #fff;
        float: right;
    }
    .popBtn{
        width: 345px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #fff;
        background: #F7924B;
        margin-top: 20px;
        color: #fff;
        font-size: 17px;
        font-weight: 500;
    }
    ._out{
        padding: 10px 20px;
        text-align: center;
    }
    .room{
        color: #888888;
        font-size: 14px;
        margin: 20px auto 30px auto;
        text-align: center;
    }
</style>
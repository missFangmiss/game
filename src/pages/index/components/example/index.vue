<template>
    <div class="game">
        <div v-if="step==4" class="_top">
            <div class="logo">
                <img src="../../../../static/images/icon_win.png" alt="">
            </div>
            <p class="status">WIN</p>
            <p class="status">₹{{actualTotal}}</p>
            <div class="info">
                <div class="priceInfo">
                    <p class="title">Closing Price Number</p>
                    <p class="price">{{price | notlastNum}} <span>{{price | lastNum}}</span></p>
                    <p class="small">Closing Time</p>
                    <p class="small">{{date}}</p>
                </div>
                <div class="line"></div>
                <div class="chooseInfo">
                    <p class="title">Your chosen number</p>
                    <p class="price priceChoosn"><span>{{price | lastNum}}</span></p>
                    <p class="small">Player : {{inNum}}</p>
                    <p class="small">Earn up to : ₹{{actualTotal}}</p>
                </div>
            </div>
            <div class="btn" ><img src="../../../../static/images/icon_again.png" alt="" class="again">PLAY AGAIN</div>
            <div class="link" >HOME</div>
        </div>
        <div class="gameTop" v-else>
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
            <div class="_container" v-if="status!=3">
                <div class="flip">
                    <p class="_waiting _front">
                       <span v-if="status==0 || status==1">Need at least {{atLeastNum}} more players to start</span> 
                       <span v-if="status==2">The game will start in  <span class="wait_bold">{{waitTime}}</span>  seconds</span> 
                    </p>
                </div>
            </div>
            
            <div class="numChooseBox">
                <div v-for="(item,index) in list" :key="index" class="numberBox" >
                    <div :class="['number',{choosen:item.user_id,isMeChoose:chosedNum==item.num}]">{{item.num}}</div>
                    <div :class="['shadow',{isNumShadow:luckyNum==item.num}]"></div>
                    <p class="name">{{item.user_id}}</p>
                </div>
            </div>
            <div v-if="isChoosn">
                <van-cell title="Your chosen number" value="" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Player" :value="inNum" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Earn up to" :value="'₹'+actualTotal" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
            </div>
            <p class="tips" v-if="!isChoosn">Please click above to select a number</p>
        </div>
        <p class="room">GAME ID : EXAPMLE</p>
        <van-popup v-model="show" closeable position="bottom" @closed="onClose" :overlay="false">
            <div class="confirmBox">
                <van-cell title="Your chosen number" :value="chosedNum" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Invest" :value="'₹'+fee" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Profit" :value="rate | profitGet" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <div class="popBtn">Confirm</div>
            </div>
        </van-popup>
        <van-overlay :show="showTips" z-index="9999">
            <transition name="van-fade">
                <div :class="['wrap','wrap'+step]" v-show="visible">
                    <div class="_tips">
                        <div :class="['_arrow','_arrow'+step]"></div>
                        <p class="_title">{{tipArray[step].title}}</p>
                        <p>{{tipArray[step].words}}</p>
                    </div>
                    <div class="_btn" @click="onNext">{{tipArray[step].text || 'NEXT'}}</div>
                </div>
            </transition>
        </van-overlay>
    </div>
</template>
<script>
import { h5GameSearch } from 'common@api/set.js'
var info = null;
import { Popup, Cell, Overlay } from 'vant';
export default {
    name: 'example',
    components:{
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [Overlay.name]: Overlay,
    },
    mounted(){
        info = JSON.parse(sessionStorage.getItem('gameInfo')) || {};
        this.inNum = 0;
        this.minPerson = info.min_num;
        this.fee = info.entrance_fee;
        this.rate = info.rate;
        this.waitTime = info.wait_time;
        this.gameTimes = info.game_time;
        this.total = info.total;
        this.status = '0';
        this.price = '38960.29';
        setTimeout(() => {
            this.visible = true;
        }, 200);
        
    },
    beforeDestroy(){
        
    },
    data(){
        return{
            price:'',       //实时金额
            minPerson:0,    //最低入场人数
            fee:100,        //入场费
            rate:5,         //抽成
            waitTime:10,    //等待新用户时间
            luckyNum:-1,     //最后一位
            chosedNum:-1,   //用户选择的数字
            show:false,     //选择数字弹窗
            status:0,       //游戏状态 0 初始化；1开始前；2准备开始；3进行中；4已结束
            total:950,      //最高总收益
            // actualTotal:100,//实际总收益
            gameTimes:30,   //游戏开奖时间
            isChoosn:false, //选中了数字并成功扣款
            inNum:0,        //已参加的人数
            showTips:true,  //
            visible:false,
            date:'',
            tipArray:[
                {title:'Welcome to the "guess numbers" game.',words:'In this absolutely fair game, you only need to guess the mantissa of BTC price, you can get a bonus of up to 10 times the betting amount!'},
                {title:'STEP 1:',words:'Click and select a number, which is the mantissa of your expected BTC price in 1 minute.'},
                {title:'STEP 2:',words:'Determine the number and invest. After the number is selected by you, it will not be selected by other players.'},
                {title:'STEP 3:',words:'Wait for other players. Once the minimum starting number (usually 2-3 people) is gathered, the game starts until the final numerical result is obtained in 1 minute.'},
                {title:'',words:'After you guess the numbers correctly, you will win all the rewards. Good luck',text:'JOIN A GAME'}
            ],
            step:0, //第几步
            list:[{num:1,user_id:''},{num:2,user_id:''},{num:3,user_id:''},{num:4,user_id:''},{num:5,user_id:''},{num:6,user_id:''},{num:7,user_id:''},{num:8,user_id:''},{num:9,user_id:''},{num:0,user_id:''}]
        }
    },
    computed:{
        //还需多少人参加
        atLeastNum(){
            let num = this.minPerson - this.inNum;
            return num;
        },
        actualTotal(){
            return (this.inNum*this.fee - this.inNum*this.fee*this.rate*0.01).toFixed(2);
        },
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
        onNext(){
            if(this.step==4){
                h5GameSearch({route:'Game_selGame'}).then(res=>{
                    let resp = res.respData;
                    this.$router.replace({path:'/game',query:{gameId:resp.game_id}})
                }).catch(e=>{
                    console.log(e)
                })
                return;
            }else{
                this.visible = false;
                setTimeout(() => {
                    this.step = this.step+1;
                    if(this.step==2){
                        this.onChooseNum(1);
                    }
                    if(this.step==3){
                        this.handleChoose();
                        this.inNum = this.minPerson;
                        this.status = 2;
                    }
                    if(this.step==4){
                        this.date = (new Date()).toLocaleString() 
                    }
                    this.visible = true;
                }, 200);
            }
            
            
        },
        //选中数字 弹出弹窗
        onChooseNum(num,id){
            this.chosedNum = num;
            this.show = true
        },
        //确认数字
        handleChoose(){
            this.show = false;
            this.isChoosn = true;
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
<style>
.tipsOverlay{
    background: rgba(0,0,0,0.4);
}
</style>
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
    .gameTop .price{
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
    .wrap{
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        color: #7B5047;
        max-width: 300px;
        height: fit-content;
    }
    .wrap0{
        top: 315px;
    }
    .wrap1{
        bottom: 50px;
    }
    .wrap2{
        bottom: 280px;
    }
    .wrap3{
        top: 315px;
    }
    .wrap4{
        bottom: 110px;
    }

    ._arrow{
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        transform: translate(-50%, -100%);
        top: 0;
        border-top-width: 0;
        border-bottom-color: #e2c8bb;
        left: 50%;
    }
    ._arrow1{
        left: 35%;
    }
    ._arrow2{
        left:85%;
        border-top-width: 6px;
        border-bottom-width: 0;
        border-top-color: #e2c8bb;
        top: auto;
        bottom: -10px;
    }
    ._tips{
        background: #e2c8bb;
        border-radius: 16px;
        font-size: 13px;
        padding: 18px 10px;
        width: 300px;
        box-sizing: border-box;
        position: relative;
    }

    ._title{
        font-size: 14px;
        margin-bottom: 10px;
    }
    ._btn{
        width: 98px;
        height: 34px;
        font-size: 12px;
        border-radius: 49px;
        background: #e2c8bb;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto 0 auto;

    }




    ._top{
        flex:1;
        padding: 30px 0;
        justify-content: center;
    }
    .logo{
        width: 100px;
        height: 100px;
        margin: auto;
        display: block;
    }
    .logo>img{
        width: 100px;
        height: 100px;
    }
    .status{
        color: #F7924B;
        font-size: 30px;
        text-align: center;
    }
    .info{
        display: flex;
        align-items: flex-start;
        margin-top: 70px;

    }
    .priceInfo{
        text-align: right;
        flex: 1;
        color: #fff;
    }
    .chooseInfo{
        flex: 1;
        color: #fff;
    }
    .title{
        font-size: 14px;
        white-space: nowrap;
    }
    .small{
        font-size: 12px;
        margin-top: 5px;
    }
    .price{
        font-size: 24px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
    }
    .priceChoosn{
        justify-content: flex-start;
    }
    .price>span{
        width: 38px;
        height: 38px;
        border-radius: 8px;
        background: #F7924B;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin-left: 5px;
    }
    .priceChoosn>span{
        background: #26CBA0;
    }
    .line{
        width:1px;
        height: 100px;
        background: #E1E1E1;
        margin: 0 15px;
    }
    .btn{
        width: 345px;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F7924B;
        border-radius: 8px;
        margin: 50px auto 0 auto;
        color: #fff;
        font-size: 17px;
        border:none;
    }
    .again{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
     .link{
        font-size: 12px;
        color: #fff;
        text-align: center;
        margin: auto;
        text-underline-offset: 4px;
        text-decoration: underline;
        margin-top: 20px;

    }
</style>
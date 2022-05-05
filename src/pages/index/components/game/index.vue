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
                       <span v-if="status==2">The game will start in  {{waitTime}}  seconds</span> 
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
                <van-cell title="Invest" :value="'₹'+fee" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Earn up to" :value="'₹'+actualTotal" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
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
import { h5GameInfo,h5GamePrice, h5GameBuy, h5GameStart,h5GameSearch } from 'common@api/set.js'
let info = null, waitTimeOut = null, gameTimeOut = null, animationTimeOut = null, priceTimeOut = null, infoTimeOut = null;
import { Popup, Cell, Dialog } from 'vant';
export default {
    name: 'game',
    components:{
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [Dialog.Component.name]: Dialog.Component,
    },
    mounted(){
        info = JSON.parse(sessionStorage.getItem('gameInfo')|| {});
        this.userId = sessionStorage.getItem('userId')
        this.minPerson = info.min_num;
        this.fee = info.entrance_fee;
        this.rate = info.rate;
        this.waitTime = info.wait_time;
        this.gameTimes = info.game_time;
        this.total = info.total;
        this.gameId = this.$route.query.gameId;
        this.getPrice()
        this.getInfo();
    },
    beforeDestroy(){
        clearInterval(priceTimeOut)
        clearInterval(infoTimeOut)
        clearInterval(gameTimeOut)
        clearInterval(waitTimeOut)
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
            if(num<=0&&this.minPerson!=0){
                this.status = 2;
            }
            return num;
        },
        actualTotal(){
            return (this.inNum*this.fee - this.inNum*this.fee*this.rate*0.01).toFixed(2);
        }
    },
    watch:{
        status(newValue,oldValue){
            if(newValue==2){
                waitTimeOut = setInterval(() => {
                    this.waitTime = this.waitTime-1;
                    if(this.waitTime<=0){
                        clearInterval(waitTimeOut)
                        this.onStart()
                    }
                }, 1000);
            }
            if(newValue==3){
                clearInterval(waitTimeOut)
                gameTimeOut = setInterval(() => {
                    this.gameTimes = this.gameTimes-1;
                    if(this.gameTimes<=0){
                        // this.status = 4;
                        this.$router.replace({path:'/result',query:{id:this.gameId}})
                        clearInterval(gameTimeOut)
                    }
                }, 1000);
            }
        },
        inNum(newValue,oldValue){
            if(newValue!=oldValue){
                clearInterval(waitTimeOut);
                this.waitTime = info.wait_time;
                this.newName =  this.name;
                animationTimeOut = setTimeout(() => {
                    this.newName = '';
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
        onStart(){
            clearInterval(infoTimeOut);
            if(!this.isChoosn){
                this.isOut = true;
            }else{
                h5GameStart({route:'Game_beginGame',game_id:this.gameId}).then(res=>{
                    this.status = 3;
                })
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
            }, 1000);
            
        },
        onCycle(){
            infoTimeOut = setInterval(() => {
                h5GameInfo({route:'Game_gameInfo',game_id:this.gameId}).then(res=>{
                    let resp = res.respData.game_info;
                    this.inNum = resp.num;
                    this.list = resp.num_obj;
                    this.name = res.respData.new_player;
                })
            }, 1000);
        },
        getInfo(){
            h5GameInfo({route:'Game_gameInfo',game_id:this.gameId}).then(res=>{
                let resp = res.respData.game_info;
                this.inNum = resp.num;
                this.status = resp.status;
                this.list = resp.num_obj;
                let isChoosed = this.list.some(item=>{
                    if(item.user_id == this.userId){
                        this.chosedNum = item.num;
                        this.isChoosn = true;
                    }
                   return item.user_id == this.userId
                })
                


                this.onCycle()
            })
        },
        //选中数字 弹出弹窗
        onChooseNum(num,id){
            if(id&&id!='') return;
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
            this.$router.go(-1)
        },
        //重新开始一场
        handleConfirm(){
            h5GameSearch({route:'Game_selGame'}).then(res=>{
                let resp = res.respData;
                this.$router.replace({path:'/game',query:{gameId:resp.game_id}})
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
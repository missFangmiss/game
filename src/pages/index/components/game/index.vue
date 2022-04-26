<template>
    <div class="game">
        <div class="gameTop">
            <div class="priceBox">
                <div class="price">
                    <div class="priceTag"><img src="../../../../static/images/logo_BTC.png" alt="BTC">BTC Price</div>
                    <div class="priceShow">38960.2 <p class="lastNum">9</p></div>
                </div>
                <p class="desc" v-if="!isStart">Guess the last number of the BTC price after the game starts, Earn up to ₹950 if win.</p>
                <div v-else>
                    <p class="startDesc" style="margin-top:20px">Waiting for bonus number results</p>
                    <p class="startDesc">Remaining Time</p>
                    <p class="countDown"><span>21</span>seconds</p>
                </div>
            </div>
            <div class="_container" v-if="!isStart">
                <div class="flip">
                    <p class="_waiting _front">Need at least 2  more players to start</p>
                    <p class="_waiting _back">New player : Calcutta joins the game</p>
                </div>
            </div>
            
            <div class="numChooseBox">
                <div v-for="(item,index) in list" :key="index" class="numberBox" @click="onChooseNum(item.num)">
                    <div :class="['number',{choosen:item.name,isMeChoose:chosedNum==item.num}]">{{item.num}}</div>
                    <div :class="['shadow',{isNumShadow:luckyNum==item.num}]"></div>
                    <p class="name">{{item.name}}</p>
                </div>
            </div>
            <!-- <div>
                <van-cell title="Your chosen number" value="" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Invest" value="₹100" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Earn up to" value="₹190" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
            </div> -->
            <p class="tips">Please click above to select a number</p>
        </div>
        <p class="room">GAME ID : GN10294850</p>
        <van-popup v-model="show" closeable position="bottom" >
            <div class="confirmBox">
                <van-cell title="Your chosen number" value="" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">{{chosedNum}}</p>
                </van-cell>
                <van-cell title="Invest" value="₹100" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Profit" value="95%" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
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
import { Popup, Cell, Dialog } from 'vant';
export default {
    name: 'game',
    components:{
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [Dialog.Component.name]: Dialog.Component,
    },
    mounted(){
        
    },
    data(){
        return{
            luckyNum:5,
            chosedNum:-1,
            show:false,
            isOut:false,
            isStart:false,
            list:[{num:1},{num:2},{num:3},{num:4},{num:5,name:'abbbbbbbbbbbbb'},{num:6,name:'Christophssssss'},{num:7},{num:8},{num:9},{num:0}]
        }
    },
    methods:{
        onChooseNum(num){
            this.chosedNum = num;
            this.show = true
        },
        handleChoose(){
            this.show = false;
        },
        handleCancel() {
            this.$router.go(-1)
        },
        handleConfirm(){
            this.$router.replace('/game')
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
    ._container:hover .flip{
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
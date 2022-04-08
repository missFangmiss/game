<template>
    <div class="game">
        <div class="priceBox">
            <div class="price">
                <div class="priceTag"><img src="../../../../static/images/logo_BTC.png" alt="BTC">BTC Price</div>
                <div class="priceShow">38960.2 <p class="lastNum">9</p></div>
            </div>
            <!-- <p class="desc">Guess the last number of the BTC price after the game starts, Earn up to ₹950 if win.</p> -->
            <p class="startDesc" style="margin-top:20px">Waiting for bonus number results</p>
            <p class="startDesc">Remaining Time</p>
            <p class="countDown"><span>21</span>seconds</p>
        </div>
        <div class="countBox">Need at least 2  more players to start</div>
        <div class="numChooseBox">
            <div v-for="(item,index) in list" :key="index" class="numberBox" @click="onChooseNum">
                <div :class="['number',{choosen:item.name,isMeChoose:chosedNum==item.num}]">{{item.num}}</div>
                <div :class="['shadow',{isNumShadow:luckyNum==item.num}]"></div>
                <p class="name">{{item.name}}</p>
            </div>
        </div>
        <p class="tips">Please click above to select a number</p>
        <p class="room">GAME ID : GN10294850</p>
        <van-popup v-model="show" closeable position="bottom" >
            <div class="confirmBox">
                <van-cell title="Your chosen number" value="" :border="false" class="boxCell" title-class="cellTitle">
                    <p class="chosedNumber">2</p>
                </van-cell>
                <van-cell title="Invest" value="₹100" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <van-cell title="Profit" value="95%" :border="false" class="boxCell" title-class="cellTitle" value-class="cellValue"/>
                <div class="popBtn">Confirm</div>
            </div>
                
        </van-popup>

    </div>
</template>
<script>
import { Popup, Cell } from 'vant';
export default {
    name: 'game',
    components:{
        [Popup.name]: Popup,
        [Cell.name]: Cell,
    },
    data(){
        return{
            luckyNum:5,
            chosedNum:2,
            show:false,
            list:[{num:1},{num:2},{num:3},{num:4},{num:5,name:'abbbbbbbbbbbbb'},{num:6,name:'Christophssssss'},{num:7},{num:8},{num:9},{num:0}]
        }
    },
    methods:{
        onChooseNum(){
            this.show = true
        }
    }
}
</script>
<style scoped>
    .game{
        padding: 15px;
    }
    
    .priceBox{
        width: 345px;
        border-radius: 8px;
        background: #4A5E94;
        box-sizing: border-box;
        padding: 10px 15px 20px 15px;
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
    .countBox{
        width: 345px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F7924B;
        border-radius: 8px;
        margin: 10px auto 35px auto;
        font-size: 14px;
        color: #fff;
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
</style>
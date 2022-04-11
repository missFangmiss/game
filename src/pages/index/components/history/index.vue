<template>
    <div class="history">
        <div class="item  _ing">
            <div class="_top">
                <p class="_gameId">GAME ID : GN10294850</p>
                <p class="status _lose _draw"><img src="../../../../static/images/icon_time.png" alt="time" class="_time"> 28<span class="seconds">s</span></p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">2</p></div>
                    <div class="info"><p>Player</p><p>3</p></div>
                    <div class="info _last"><p>Amount</p> <p>₹100</p></div>
                    <!-- <div class="info"><p>Earning</p><p>₹285</p></div> -->
                </div>
                <div class="gameInfo"><p>Opening Price: 40975.29</p></div>
            </div>
        </div>
        <div class="divid">—— GAME IN PROGRESS ——</div>
        <div class="item  _ed" @click="goResult">
            <div class="_top">
                <p class="_gameId">GAME ID : GN10294850</p>
                <p class="status _lose _draw"><img src="../../../../static/images/icon_time.png" alt="time" class="_time"> 28<span class="seconds">s</span></p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">2</p></div>
                    <div class="info"><p>Player</p><p>3</p></div>
                    <div class="info"><p>Amount</p> <p>₹100</p></div>
                    <div class="info _last"><p>Earning</p><p>₹285</p></div>
                </div>
                <div class="gameInfo"><p>Opening Price: 40975.29</p><p class="_numshow">Closing Price: 40975.2 <span class="_lastNum">2</span></p></div>
            </div>
            <div class="_bottom">Closing Time: 2022-03-24 10:32:12</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'history',
    methods:{
        goResult(){
            this.$router.push('/result')
        }
    }
}
</script>
<style scoped>
    .history{
        padding: 15px 0;
        
    }
    .item{
        width: 345px;
        background: #F7F7F7;
        border-radius: 8px;
        box-sizing: border-box;
        margin: 15px auto 0 auto;
        padding-left: 15px;
        padding-bottom: 15px;
    }
    ._ing{
        background: #fff;
        border: 1PX solid #F7924B;
        box-shadow: 0 0 4px 0 rgba(150,150,150,0.5);
    }
    ._ed{
        background: #F7F7F7;
    }
    ._top{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1PX solid #e1e1e1;
    }
    ._gameId{
        color: #555555;
        font-size: 14px;
    }
    .status{
        font-size: 14px;
        font-weight: 500;
        color: #F7924B;
        padding-right: 15px;
        display: flex;
        align-items: center;
    }
    ._lose{
        color: #999999;
    }
    ._draw{
        color: #000;
    }
    ._center{
        margin-top: 10px;
        padding-right: 15px;
    }
    .choseInfo{
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }
    ._bottom{
        color: #555;
        font-size: 12px;
        border-top: 1PX solid #e1e1e1;
        padding-top: 5px;
        margin-top: 10px;
    }
    .info{
        text-align: right;
        margin-right: 28px;
    }
    ._left{
        text-align: left;
        margin-right: 45px;
    }
    ._last{
        margin-right: 0;
    }
    .info>p:first-of-type{
        color: #555;
        font-size: 12px;
    }
    .info>p:last-of-type{
        color: #666;
        font-size: 17px;
        font-weight: 500;
        margin-top: 5px;
    }
    ._ing .info>p:last-of-type{
        color: #000;
    }
    .gameInfo{
        display: flex;
        justify-content: space-between;
        color: #555;
        font-size: 12px;
        margin-top: 20px;
    }
    ._ing .numChosed{
        width: 30px;
        height: 30px;
        background: #26CBA0;
        color: #fff !important;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ._ed .numChosed{
        color: #000 !important;
    }
    ._numshow{
        display: flex;
        align-items: center;
    }
    ._lastNum{
        width: 13px;
        height: 13px;
        background: #F7924B;
        border-radius: 2px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 3px;
    }
    ._time{
        width: 15px;
        height: 15px;
        margin-right: 4px;
    }
    .divid{
        color: #999;
        font-size: 12px;
        text-align: center;
        margin: 10px auto;
    }
</style>
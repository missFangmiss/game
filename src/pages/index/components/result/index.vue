<template>
    <div class="result">
        <img src="../../../../static/images/icon_win.png" alt="" class="logo">
        <p class="status">YOU WIN</p>
        <p class="status">₹285</p>
        <div class="info">
            <div class="priceInfo">
                <p class="title">Closing Price Number</p>
                <p class="price">38960.2 <span>2</span></p>
                <p class="small">Closing Time</p>
                <p class="small">2022-03-24 10:32:13</p>
            </div>
            <div class="line"></div>
            <div class="chooseInfo">
                <p class="title">Your chosen number</p>
                <p class="price priceChoosn"><span>2</span></p>
                <p class="small">Player : 3</p>
                <p class="small">Earn up to : ₹285</p>
            </div>
        </div>
        <div class="btn"><img src="../../../../static/images/icon_again.png" alt="" class="again">PLAY AGAIN</div>
        <p class="room">GAME ID : GN10294850</p>
    </div>
</template>
<script>
export default {
    name: 'result'
}
</script>
<style scoped>
    .result{
        padding: 75px 15px 0 15px;
    }
    .logo{
        width: 100px;
        height: 100px;
        margin: auto;
        display: block;
    }
    .status{
        color: #F7924B;
        font-size: 30px;
        text-align: center;
    }
    .info{
        display: flex;
        align-items: center;
        margin-top: 70px;

    }
    .priceInfo{
        text-align: right;
        flex: 1;
        color: #555;
    }
    .chooseInfo{
        flex: 1;
        color: #555;
    }
    .title{
        font-size: 14px;
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
    }
    .again{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

</style>
<template>
    <div class="home">
        <img src="../../../../static/images/icon_home_logo.png" alt="GUESS" class="logo">
        <div class="content">
            <p>Guess the <span>last number</span> of the BTC price after 30 seconds</p>
            <p>Picking the right number will win all participants' fees</p>
            <p>Earn up to <span>₹950</span> if you win</p>
        </div>
        <div class="btn">
            <img src="../../../../static/images/icon_home_join.png" alt="JOIN" class="_icon">JOIN A GAME
        </div>
        <div class="btn under">
            <p>GAME HISTORY</p>
            <p class="_samll">&</p>
            <p class="_samll">GAME IN PROGRESS</p>
        </div>
        <div class="link">HOW TO PLAY</div>
    </div>
</template>
<script>
export default {
    name : 'home'
}
</script>
<style scoped>
    .home{
        padding: 60px 15px;
    }
    .logo{
        display: block;
        margin: auto;
        width: 100px;
        height: 83px;
    }
    .content{
        width: 255px;
        margin: 50px auto;
    }
    .content>p{
        font-size: 18px;
        font-weight: 500;
        margin-top: 20px;
        color: #4A5E94;
        text-align: center;
    }
    .content>p>span{
        color: #F7924B;
    }
    .btn{
        width: 345px;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #fff;
        font-size: 17px;
        background: #F7924B;
        margin: auto;
    }
    .under{
        background: #4A5E94;
        margin-top: 15px;
        flex-direction: column;
    }
    ._icon{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    ._samll{
        font-size: 12px;
    }
    .link{
        font-size: 12px;
        color: #4A5E94;
        text-align: center;
        position: fixed;
        bottom: 30px;
        margin: auto;
        left:0;
        right: 0;
        text-underline-offset: 4px;
        text-decoration: underline;
    }

</style>
<template>
    <div class="home">
        <div class="_top">
            <img src="../../../../static/images/icon_home_logo.png" alt="GUESS" class="logo">
            <div class="content">
                <p>Guess the <span>last number</span> of the BTC price after {{time}} seconds</p>
                <p>Picking the right number will win all participants' fees</p>
                <p>Earn up to <span>₹{{total}}</span> if you win</p>
            </div>
            <van-button class="btn" @click="joinGame" :loading="isLoading" loading-text="loading...">
                <img src="../../../../static/images/icon_home_join.png" alt="JOIN" class="_icon">JOIN A GAME
            </van-button>
            <div class="btn under" @click="goHistory">
                <p>GAME HISTORY</p>
                <p class="_samll">&</p>
                <p class="_samll">GAME IN PROGRESS</p>
            </div>
        </div>
        <div>
            <div class="_act">Account Balance</div>
            <div class="_act">₹{{account}}</div>
            <div class="link" @click="goExample">HOW TO PLAY</div>
        </div>
    </div>
</template>
<script>
import { h5GameSet, h5GameSearch } from 'common@api/set.js'
import { Button } from 'vant';

export default {
    name : 'home',
    components:{
        [Button.name]: Button,
    },
    data(){
        return{
            time: '',
            total: '',
            isLoading: false,
            account:3000
        }
    },
    mounted(){
        this.getInfo();
    },
    methods: {
        getInfo(){
            h5GameSet({route:'Game_gameConfig'}).then(res=>{
                let info = res.respData;
                this.time = info.game_time;
                let rate = Number(info.rate) || 0,
                    fee = Number(info.entrance_fee) || 0;
                this.total = (fee*10) - (fee*10)*rate*0.01;
                info.total = this.total;
                sessionStorage.setItem('gameInfo',JSON.stringify(info))
                
            }).catch(e=>{
                this.$toast('CONFIG ERROR!')
                return;
            })
        },
        //TODO如果用户是第一次玩 要去流程
        joinGame() {
            this.isLoading = true;
            h5GameSearch({route:'Game_selGame'}).then(res=>{
                let resp = res.respData;
                this.$router.push({path:'/game',query:{gameId:resp.game_id}})
                this.isLoading = false;
            }).catch(e=>{
                this.isLoading = false;
                console.log(e)
            })
        },
        goHistory() {
            this.$router.push('/history')
        },
        goExample(){
            this.$router.push('/example')
        }
    }
}
</script>
<style scoped>
    .home{
        padding: 60px 15px 20px 15px;
        min-height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    ._top{
        flex:1;
        padding-bottom: 20px;
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
        border:none;
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
    ._act{
        font-size: 12px;
        color: #fff;
        text-align: center;
    }
    .link{
        font-size: 12px;
        color: #4A5E94;
        text-align: center;
        /* position: fixed; */
        /* padding-bottom: 30px; */
        margin: 20px auto 0 auto;
        text-underline-offset: 4px;
        text-decoration: underline;
    }

</style>
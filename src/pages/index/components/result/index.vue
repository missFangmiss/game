<template>
    <div class="result">
        <div class="_top" >
            <van-loading type="spinner" color="#1989fa" size="48px" v-if="noResult" vertical />
            <div v-else>
                <div class="logo">
                    <img src="../../../../static/images/icon_win.png" alt="" v-if="gameInfo.win_status==1">
                    <img src="../../../../static/images/icon_draw.png" alt=""  v-if="gameInfo.win_status==3">
                    <img src="../../../../static/images/icon_lost.png" alt="" v-if="gameInfo.win_status==2">
                    <img src="../../../../static/images/icon_wait.jpg" alt="" v-if="gameInfo.win_status==5">
                </div>
                <p class="status">{{gameInfo.win_status==1?'WIN':(gameInfo.win_status==2?'NOT VERY LUCKY':(gameInfo.win_status==5?'Waiting For Results':'DRAW'))}}</p>
                <p class="status" v-if="gameInfo.win_status!=5">₹{{gameInfo.earning}}</p>
                <div class="info">
                    <div class="priceInfo">
                        <p class="title">Closing Price Number</p>
                        <p class="price">{{gameInfo.win_status==5 ? '— ' :gameInfo.close_price | notlastNum}} <span v-if="gameInfo.win_status!=5">{{gameInfo.close_price | lastNum}}</span></p>
                        <p class="small">Closing Time</p>
                        <p class="small">{{gameInfo.end_time}}</p>
                    </div>
                    <div class="line"></div>
                    <div class="chooseInfo">
                        <p class="title">Your chosen number</p>
                        <p class="price priceChoosn"><span>{{gameInfo.num}}</span></p>
                        <p class="small">Player : {{gameInfo.player_num}}</p>
                        <p class="small">Earn up to : ₹{{gameInfo.earning}}</p>
                    </div>
                </div>
                <van-button class="btn" @click="joinGame" :loading="isLoading" loading-text="loading..."><img src="../../../../static/images/icon_again.png" alt="" class="again">{{gameInfo.win_status==5 ? 'Refresh' : 'PLAY AGAIN'}}</van-button>
                <div class="link" @click="goHome">HOME</div>
            </div>
            
        </div>
        <p class="room">GAME ID : {{gameId}}</p>
    </div>
</template>
<script>
import { h5GameResult ,h5GameSearch} from 'common@api/set.js'
import { Button,Loading } from 'vant';
var resultTimeOut = null;
export default {
    name: 'result',
    components:{
        [Button.name]: Button,
        [Loading.name]: Loading,
    },
    data(){
        return{
            gameId:'',
            isLoading:false,
            noResult:true,
            gameInfo:{
                "earning": "",
                "close_price": "",
                "end_time": "",
                "num": '',
                "player_num": ''
            }
        }
    },
    beforeDestroy(){
        clearTimeout(resultTimeOut)
    },
    filters:{
        lastNum(value){
            return value.slice(-1)
        },
        notlastNum(value){
            return value.slice(0,value.length-1)
        }
    },
    methods:{
        joinGame() {
            if(this.gameInfo.win_status==5){
                location.reload()
            }else{
                this.isLoading = true;
                h5GameSearch({route:'Game_selGame'}).then(res=>{
                    let resp = res.respData;
                    this.$router.push({path:'/game',query:{gameId:resp.game_id}})
                    this.isLoading = false;
                }).catch(e=>{
                    this.isLoading = false;
                    console.log(e)
                })
            }
        },
        queryResult(){
            let that = this;
            resultTimeOut = setTimeout(() => {
                h5GameResult({route:'Game_gameRet',game_id:this.gameId,user_id:sessionStorage.getItem('userId')}).then(res=>{
                    if(res.respData.win_status=='5'){
                        that.gameInfo = res.respData;
                        that.noResult = false;
                        clearTimeout(resultTimeOut);
                    }else{
                        clearTimeout(resultTimeOut)
                        that.gameInfo = res.respData;
                        that.noResult = false;
                    }
                })
            }, 2000);
            
        },
        goHome(){
            this.$router.replace('/')
        }
    },
    mounted(){
        this.gameId = this.$route.query.id;
        h5GameResult({route:'Game_gameRet',game_id:this.gameId,user_id:sessionStorage.getItem('userId')}).then(res=>{
            if(res.respData.close_price==''){
                this.queryResult();
            }else{
                this.noResult = false;
                this.gameInfo = res.respData;
            }
        })
    }
}
</script>
<style scoped>
    .result{
        padding: 75px 15px 25px 15px;
        min-height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    ._top{
        flex:1;
        padding-bottom: 30px;
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
        height: 38px;
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
    .room{
        color: #888888;
        font-size: 14px;
        margin: auto;
        text-align: center;
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
<template>
    <div class="history">
        <div class="divid" v-if="listIng.length>0 || listYet.length>0">—— GAME IN PROGRESS ——</div>
        <div class="item  _ing" v-for="(item) in listYet" :key="item.game_id" @click="goGame(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <p class="status _lose _draw"><span class="seconds">waiting</span></p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">{{item.num}}</p></div>
                    <div class="info"><p>Player</p><p>{{item.player_num}}</p></div>
                    <div class="info _last"><p>Amount</p> <p>₹{{item.amount}}</p></div>
                </div>
            </div>
        </div>

        <div class="item  _ing" v-for="(item) in listIng" :key="item.game_id" @click="goGame(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <p class="status _lose _draw"><img src="../../../../static/images/icon_time.png" alt="time" class="_time"><van-count-down format="ss" :time="item.time" @finish="onFinish" /><span class="seconds">s</span></p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">{{item.num}}</p></div>
                    <div class="info"><p>Player</p><p>{{item.player_num}}</p></div>
                    <div class="info _last"><p>Amount</p> <p>₹{{item.amount}}</p></div>
                </div>
                <div class="gameInfo"><p>Opening Price: {{item.open_price}}</p></div>
            </div>
        </div>
        <div class="divid" v-if="listEd.length>0">—— GAME IN HISTORY ——</div>
        <div class="item  _ed" v-for="(item) in listEd" :key="item.game_id" @click="goResult(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <!-- 1赢，2输，3平 -->
                <p :class="['status', {_lose:item.win_status==2},{_draw:item.win_status==3}]">{{item.win_status==1?'WIN':(item.win_status==2?'NOT VERY LUCKY':'DRAW')}}</p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">{{item.num}}</p></div>
                    <div class="info"><p>Player</p><p>{{item.player_num}}</p></div>
                    <div class="info"><p>Amount</p> <p>₹{{item.amount}}</p></div>
                    <div class="info _last"><p>Earning</p><p>₹{{item.earning}}</p></div>
                </div>
                <div class="gameInfo"><p>Opening Price: {{item.open_price}}</p><p class="_numshow">Closing Price: {{item.close_price |notlastNum}} <span class="_lastNum">{{item.close_price | lastNum}}</span></p></div>
            </div>
            <div class="_bottom">Closing Time: {{item.end_time}}</div>
        </div>
        <van-empty image="search" description="NO DATA" v-if="isNull">
            <van-button round color="#4A5E94" @click="join" :loading="isLoading" loading-text="loading...">Join a Game</van-button>
        </van-empty>
    </div>
</template>
<script>
import { h5GameRecord,h5GameSearch } from 'common@api/set.js'
import { Empty,Button,CountDown } from 'vant';
export default {
    name: 'history',
    components:{
        [Empty.name]: Empty,
        [Button.name]: Button,
        [CountDown.name]: CountDown
    },
    data(){
        return{
            listIng:[],
            listEd:[],
            listYet:[],
            isNull:false,
            isLoading:false
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        onFinish(){
            this.getList()
        },
        getList(){
            h5GameRecord({route:'Game_gameLog',user_id:sessionStorage.getItem('userId')}).then(res=>{
                let list = res.respData;
                this.isNull = list.length<=0 ? true : false;
                let ingList = list.filter((item,index)=>{
                    return item.win_status == '4'
                })
                //倒计时
                let nowTime  = new Date().getTime();
                ingList.map(item=>{
                    let endTime = new Date(item.end_time.replace(/-/g,"/")).getTime();
                    item.time = ( endTime - nowTime)
                    return item;
                })

                this.listIng = ingList;
                console.log(this.listIng)


                this.listEd = list.filter((item,index)=>{
                    return item.win_status !='0' && item.win_status !='4'
                })

                this.listYet = list.filter((item,index)=>{
                    return item.win_status == '0'
                })

            })
        },
        goResult(id){
            this.$router.push({path:'/result',query:{id:id}})
        },
        goGame(id){
            this.$router.push({path:'/game',query:{gameId:id}})
        },
        join() {
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
    },
    filters:{
        lastNum(value){
            return value.slice(-1)
        },
        notlastNum(value){
            return value.slice(0,value.length-1)
        }
    }
}
</script>
<style scoped>
    .history{
        padding: 15px 0;
        /* min-height: 100vh; */
        /* box-sizing: border-box; */
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
        font-size: 11px;
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
        margin-right: 0;
        width: 135px;
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
        font-size: 11px;
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
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: center; */
        display: inline-block;
        text-align: center;
        padding-bottom: 2px;
        /* box-sizing: border-box; */
        margin-left: 2px;
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
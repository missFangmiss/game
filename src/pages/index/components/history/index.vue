<template>
    <div class="history">
        <div class="divid" v-if="listIng.length>0 || listYet.length>0">—— GAME IN PROGRESS ——</div>
        <div class="item  _ing" v-for="(item) in listYet" :key="item.game_id" @click="goGame(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <!-- 1赢，2输，3平，5:等待-->
                <p class="status">
                    <span v-if="item.win_status==0">Waiting</span>
                    <span >
                        <!-- v-if="item.win_status==4" -->
                        <img src="../../../../static/images/icon_time.png" alt="time" class="_time"><van-count-down format="ss" :time="item.time" @finish="onFinish" /><span class="seconds">s</span>
                    </span>
                </p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="chosedNum"><img src="" class="_numimage"><p>chosen number</p></div>
                    <div class="info">
                        <p>Player： <span>{{item.player_num}}</span></p>
                        <p>Amount： <span>₹{{item.amount}}</span></p>
                        <p>Opening Price： ₹{{item.earning}}</p>
                    </div>
                </div>
            </div>
        </div>

        

        <!-- <div class="item  _ing" v-for="(item) in listIng" :key="item.game_id" @click="goGame(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <p class="status _draw">
                    <img src="../../../../static/images/icon_time.png" alt="time" class="_time"><van-count-down format="ss" :time="item.time" @finish="onFinish" /><span class="seconds">s</span><
                /p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="info _left"><p>chosen number</p><p class="numChosed">{{item.num}}</p></div>
                    <div class="info"><p>Player</p><p>{{item.player_num}}</p></div>
                    <div class="info _last"><p>Amount</p> <p>₹{{item.amount}}</p></div>
                </div>
                <div class="gameInfo"><p>Opening Price: {{item.open_price}}</p></div>
            </div>
        </div> -->
        <div class="divid" v-if="listEd.length>0">—— GAME IN HISTORY ——</div>
        <div class="item  " v-for="(item) in listYet" :key="item.game_id" @click="goResult(item.game_id)">
            <div class="_top">
                <p class="_gameId">{{item.game_id}}</p>
                <!-- 1赢，2输，3平，5:等待-->
                <p :class="['status', {_lose:item.win_status==2},{_draw:item.win_status==3}]">{{item.win_status==1?'WIN':(item.win_status==2?'NOT VERY LUCKY':(item.win_status==5?'Waiting For Results':'DRAW'))}}</p>
            </div>
            <div class="_center">
                <div class="choseInfo">
                    <div class="chosedNum"><img src="" class="_numimage"><p>chosen number</p></div>
                    <div class="info">
                        <p>Player： <span>{{item.player_num}}</span></p>
                        <p>Amount： <span>₹{{item.amount}}</span></p>
                        <p>Earning： <span v-if="item.win_status==5">-</span> <span v-else> ₹{{item.earning}}</span></p>
                    </div>
                </div>
                <div class="gameInfo"><p>Opening Price： <span>{{item.open_price}}</span></p><p class="_numshow">Closing Price： <span>{{item.win_status==5 ?'- ' : item.close_price | notlastNum}}</span> <span class="_lastNum" v-if="item.win_status!=5">{{item.close_price | lastNum}}</span></p></div>
                <div class="_bottom">Closing Time: {{item.end_time}}</div>
            </div>
        </div>
        <van-empty image="search" description="NO DATA" v-if="isNull">
            <van-button round color="linear-gradient(180deg, #BD26DB 0%, #620EB6 100%)" @click="join" :loading="isLoading" loading-text="loading...">Join a Game</van-button>
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
                    return item.win_status !='0' && item.win_status !='4'
                    // return item.win_status == '4'//TODO
                })
                //倒计时
                let nowTime  = new Date().getTime();
                ingList.map(item=>{
                    let endTime = new Date(item.end_time.replace(/-/g,"/")).getTime();
                    item.time = 110//( endTime - nowTime)
                    return item;
                })

                this.listIng = ingList;
                console.log(this.listIng)


                this.listEd = list.filter((item,index)=>{
                    return item.win_status !='0' && item.win_status !='4'
                })

                this.listYet = list.filter((item,index)=>{
                    return item.win_status !='0' && item.win_status !='4'
                    // return item.win_status == '0' //TODO
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
        /* padding: 15px 0; */
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 15px;
        overflow: auto;
        /* min-height: 100vh; */
        /* box-sizing: border-box; */
    }
    .item{
        width: 345px;
        background: #11093A;
        box-sizing: border-box;
        margin: 10px auto 0 auto;
        
        color: #D1D2D7;
        border-radius: 8px;
    }
    ._ing{
        background: #170F52;
        border: 1PX solid #8925E6;
    }
    /* ._ed{
        background: #121728;
    } */
    ._top{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        color: #fff;
        font-size: 14px;
        border-bottom: 1PX dashed #585375;
    }
    ._ing ._top{
        border-bottom: 1PX dashed #8925E6;
    }
    
    .chosedNum{
        width: 111px;
        text-align: center;
        border-right: 1PX solid #414D43;
        /* padding: 14px 0; */
    }
    ._numimage{
        width: 45px;
        height: 50px;
        display: block;
        margin: 0 auto 6px auto;

    }
    .status{
        font-size: 14px;
        font-weight: 500;
        color: #F7924B;
        display: flex;
        align-items: center;
        white-space: nowrap;
        text-align: right;
    }
    ._lose{
        color: #858585;
    }
    ._draw{
        color: #70CB11;
    }
    ._center{
        padding: 15px 0;
    }
    .choseInfo{
        display: flex;
        align-items: center;
        /* padding: 14px 0; */
        /* justify-content: space-between; */
    }
    ._bottom{
        font-size: 12px;
        padding: 8px 0 0 10px;
    }
    .info{
        margin-left: 15px;
    }
    .info p{
        margin-top: 10px;
    }
    .info span{
        font-weight: bold;
        color: #fff;
    }
    
    
    
    
    .gameInfo{
        display: flex;
        background: #192037;
        justify-content: space-between;
        padding: 8px 10px;
        font-size: 11px;
    }
    .gameInfo span{
        font-weight: bold;
        color: #fff;
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
        color: #D4D1E1;
        font-size: 12px;
        text-align: center;
        margin: 20px auto 10px auto;
    }
</style>
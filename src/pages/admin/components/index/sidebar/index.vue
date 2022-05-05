<template>
    <div class="side-content">
        <div class="logo">
            OPTION GAME
        </div>
        <a-menu theme="dark" mode="inline" 
            :default-selected-keys="['home1']"
            :default-open-keys="['1']"
            :style="{ height: '100%', borderRight: 0 }"
        >
            <template v-for="item in list">
                <a-menu-item  :key="item.key" v-if="!item.children" @click="handleClick"> 
                    <a-icon :type="item.icon" />
                    <span> {{item.title}}</span>
                </a-menu-item>
                <a-sub-menu :key="item.key" v-else>
                    <span slot="title"><a-icon :type="item.icon" />{{item.title}}</span>
                    <template v-for="items in item.children" >
                        <a-menu-item  :key="items.key" @click="handleClick">                  
                            <span>{{items.title}}</span>
                        </a-menu-item>
                    </template>                     
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script>
export default {
    name: 'sideBar',
    data() {
       return {
           chosedMenu:['home1'],
           chosedMenuOpen:['home1'],
           mapData:{home1:['home1'],daily:['daily'],order:['order'],glist:['glist'],setting:['pay','set']},
        //    list : [],
           userRouteName:'home1',
           list : [
               {
                   key: 'home1',
                   title: '首页',
                   icon: 'home',
               },
               {
                   key: 'daily',
                   title: '按日统计',
                   icon: 'fund',
               },
               {
                   key: 'order',
                   title: '订单列表',
                   icon: 'schedule',
               },
               {
                   key: 'list',
                   title: '游戏列表',
                   icon: 'audit',
               },
               {
                   key: 'setting',
                   title: '系统配置',
                   icon: 'setting',
                   children: [
                        {
                            key: 'pay',
                            title: '支付配置',
                        },
                        {
                            key: 'set',
                            title: '游戏配置',
                        }                      
                   ]
               }
           ]

       } 
    },
    mounted(){
        let userRoute = this.$store.getters.userRoute;
        this.userRouteName = userRoute;
        // this.list = this.list.concat(userRoute); 
        let barSave = this.$store.state.Route.sideBar;
        if(barSave.expandBar){
            this.$set(this.chosedMenu,0,barSave.chosedBar);
            this.$set(this.chosedMenuOpen,0,barSave.expandBar);
        }else{
            let name = this.$route.name;
            let parentName = this.cycleObject(this.mapData,name);
            if(parentName){
                this.$set(this.chosedMenu,0,name);
                this.$set(this.chosedMenuOpen,0,parentName);
            }
        }
    },
    methods: {
        handleClick(e){
            this.$router.replace({ path: '/'+e.key });
        },
        cycleObject(jsonObj,value){
            for(let key in jsonObj) {
                if (jsonObj[key].indexOf(value)>-1) {
                    return key 
                }
            }
            return null
        }
    }
}
</script>
<style lang="less" rel="stylesheet/less">
    .logo{color: #fff;font-size: 20px;font-weight: bold;;padding:0 20px;height:64px;line-height:64px;background: #022140;}
</style>
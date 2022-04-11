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
                   key: 'glist',
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
    methods: {
        handleClick(e){
            this.$router.replace({ path: '/'+e.key });
        }
    }
}
</script>
<style lang="less" rel="stylesheet/less">
    .logo{color: #fff;font-size: 20px;font-weight: bold;;padding:0 20px;height:64px;line-height:64px;background: #022140;}
</style>
<template>
    <a-layout id="components-layout-demo-top-side-2" class="layout">
        <!-- 侧边导航栏 -->
        <a-layout-sider width="200" >
            <sideBar />
        </a-layout-sider>
        
        <a-layout>            
           <a-layout-header class="header">  
                <span style="flex:1;color: #333;">{{title}}</span>
                <a-dropdown >
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        {{loginName}} <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay" style="margin-right: 10px;">
                        <a-menu-item key="1" @click="modifyPwd">
                           修改密码
                        </a-menu-item>
                        <a-menu-item key="2" @click="loginOut">
                           退出
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <!-- <span style="font-size: 14px;cursor:pointer" >退出</span> -->
            </a-layout-header>
            <a-layout style="padding:20px">              
                <a-layout-content style="background:#fff;padding: 20px;">
                    <transition name="slide" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </a-layout-content>
            </a-layout>
        </a-layout>
        
    </a-layout>
</template>
<script>
    import sideBar from './sidebar'
    export default {
        name: 'layout',
        components:{
            sideBar
        },
        data() {
            return {
                
            }
        },
        computed:{
            title(){
                return this.$store.state.Route.pageTitle
            },
            loginName(){
                return this.$store.getters.userInfo.username
            }
        },
        methods:{
            modifyPwd(){
                this.$router.push({path:'/uppwd'})
            },
            loginOut(){
                this.$store.commit('Route/setSideBar',{expand:'',chosed:''})
                this.$store.commit('User/clearInfo')
                this.$router.replace('/login')
                sessionStorage.clear();
            }
        }
        
    };
</script>

<style lang="less" rel="stylesheet/less">
    .layout {
        min-height: 100%;
        .header{
            border-bottom: .5px solid #fff;
            padding: 0 20px;
            background: #fff;            
            font-size:15px;
            display: flex;
            font-weight: bold;
        }
        .ant-dropdown-link{color: #333;}
    }
</style>
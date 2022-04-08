import Base from './base'

export default [
    {
    	path: '/home',
        name: "home",
    	meta: {
            title: '首页',
            // requireAuth: true,       //添加该字段，表示进入这个路由时需要登录的
        },
        component: () => import(
            'spa@comp_admin/index/index.vue'
        ),
        children: [
            {
            	path: '/home1',
                name: "home1",
                meta: {
                    title: '首页',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/home/index.vue'
                )
            },{
            	path: '/user',
                name: "user",
                meta: {
                    title: '用户管理',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/user/index.vue'
                )
            },{
            	path: '/addUser',
                name: "addUser",
                meta: {
                    title: '新增用户',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/user/addUser/index.vue'
                )
            },{
            	path: '/role',
                name: "role",
                meta: {
                    title: '角色管理',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/role/index.vue'
                )
            },{
            	path: '/activity',
                name: "activity",
                meta: {
                    title: '活动配置',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/activity/index.vue'
                )
            },{
            	path: '/live',
                name: "live",
                meta: {
                    title: '图文直播',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/activity/live/index.vue'
                )
            },{
            	path: '/our',
                name: "our",
                meta: {
                    title: '关于我们',
                    // requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/our/index.vue'
                )
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        meta: {
            title: '登录'
        },
        component: () => import(
            'spa@comp_admin/login/index.vue'
        )
    }
].concat(Base)


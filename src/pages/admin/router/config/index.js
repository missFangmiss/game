import Base from './base'

export default [
    {
    	path: '/home',
        name: "home",
    	meta: {
            title: '首页',
            requireAuth: true,       //添加该字段，表示进入这个路由时需要登录的
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
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/home/index.vue'
                )
            },{
            	path: '/daily',
                name: "daily",
                meta: {
                    title: '按日统计',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/daily/index.vue'
                )
            }
            ,{
            	path: '/order',
                name: "order",
                meta: {
                    title: '订单列表',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/order/index.vue'
                )
            }
            ,{
            	path: '/glist',
                name: "glist",
                meta: {
                    title: '游戏列表',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/glist/index.vue'
                )
            },
            ,{
            	path: '/pay',
                name: "pay",
                meta: {
                    title: '支付配置',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/setting/paySet/index.vue'
                )
            },
            ,{
            	path: '/set',
                name: "set",
                meta: {
                    title: '游戏配置',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/setting/gameSet/index.vue'
                )
            }
            ,{
            	path: '/search',
                name: "search",
                meta: {
                    title: '结果查询',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/search/index.vue'
                )
            }
            ,{
            	path: '/uppwd',
                name: "uppwd",
                meta: {
                    title: '修改密码',
                    requireAuth: true,
                },
                component: () => import(
                    'spa@comp_admin/index/uppwd.vue'
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


const ErrorComp_404 = () => import(
    'spa@comp_admin/error/404.vue'
)

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/error',
        name: 'error',
        component: ErrorComp_404
    },
    {
        path: '*',
        redirect: '/error'
    }
];
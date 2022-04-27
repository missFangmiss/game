
<script>
import {orderList} from 'common@api/list.js'
    export default {
        data() {
            return {
                pageParams: {
                    pageNum: 1,
                    pageSize: 10
                },
                pagination: {
                    pageSize: 10,
                    current: 1,
                },
                params:{},
                tableLoading: false,              //表格数据加载动画
                dataSource: [],                    //表格数据
                searchItems: {}, // 搜索字段
                endOpen: false,
                themes:[]
            }
        },
        methods: {
            // 获取表格数据
            postTableList() {
                this.tableLoading = true;
                let that = this;
                that.tableLoading = false;
                orderList(this.params).then(res=>{
                    const pagination = { ...this.pagination };
                    pagination.total = parseInt(res.respData.count);
                    pagination.showTotal = (total)=> '总共有'+total+'条数据，每页'+pagination.pageSize+'条'
                    that.pagination = pagination;
                    that.themes = res.respData.config || []
                    that.tableLoading = false;
                    that.dataSource = res.respData.list;
                }).catch(err => {
                    this.tableLoading = false
                    this.dataSource = [];
                })
            },
            // 点击分页
            pageChange(val){
                this.pagination = {
                    current: val.current,
                    pageSize: val.pageSize
                }
                this.params.page = val.current;
                this.postTableList()         //分页获取表格数据

            },
            
            
            //时间选择器控制
            disabledStartDate(startValue) {
                const endValue = this.searchItems.endTime;
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate(endValue) {
                const startValue = this.searchItems.beginTime;
                if (!endValue || !startValue) {
                    return false;
                }
                return startValue.valueOf() >= endValue.valueOf();
            },
            //时间改变
            handleStartOpenChange(open) { 
                if (!open) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange(open) {
                this.endOpen = open;
            },
        }
    }
</script>
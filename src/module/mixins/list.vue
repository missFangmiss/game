<script>
    const data = [
        {
            id: '1',
            userName: '张三',
            name: 'John Brown',
            remark: '运营主管',
            createTime: '2020-07-28 16:12:23',
            createName: 'Admin',
            status: '1',
        },
        {
            id: '2',
            userName: '张三',
            name: 'John Brown',
            remark: '运营主管',
            createTime: '2020-07-28 16:12:23',
            createName: 'Admin',
            status: '0',
        },
        {
            id: '3',
            userName: '张三',
            name: 'John Brown',
            remark: '运营主管',
            createTime: '2020-07-28 16:12:23',
            createName: 'Admin',
            status: '1',
        },
    ];
    export default {
        data() {
            return {
                pageParams: {
                    pageNum: 1,
                    pageSize: 20
                },
                pagination: {
                    pageSize: 20,
                    current: 1,
                },
                params:{},
                tableLoading: false,              //表格数据加载动画
                dataSource: [],                    //表格数据
                searchItems: {}, // 搜索字段
                endOpen: false,
            }
        },
        methods: {
            // 获取表格数据
            postTableList() {
                this.tableLoading = true;
                let that = this;
                that.dataSource = data;         //获取表格数据
                that.tableLoading = false;
            //     if(isUrl){
            //         url = this.$baseUrl+this.comUrl+'?pageSize='+this.pagination.pageSize+"&pageNum="+this.pagination.current
            //     }else{//添加中台优惠券
            //         url = this.$baseUrl+this.comUrl;
            //         this.params = {
            //             pageNum : this.pagination.current,
            //             pageSize: this.pagination.pageSize,
            //             ...this.queryData
            //         }
            //     }
            //     if(this.method=='get'){
            //         this.$axios.get(url,this.params).then( res => {
            //             if(res.data.code == 200){
            //                 const pagination = { ...this.pagination };
            //                 pagination.total = parseInt(res.data.data.total);
            //                 pagination.showTotal = (total)=> '总共有'+total+'条数据，每页'+pagination.pageSize+'条'
            //                 that.pagination = pagination;
            //                 that.tableLoading = false;
            //                 that.dataSource = res.data.data.list;
            //             }else{
            //                 that.$Message.error(res.data.message)
            //             }
            //         }).catch( err => {
            //             this.tableLoading = false
            //             this.dataSource = [];
            //             // that.$Message.error()
            //         })
            //     }else{
            //         this.$axios.post(url,this.params).then( res => {
            //             if(res.data.code == 200){
            //                 const pagination = { ...this.pagination };
            //                 pagination.total = parseInt(res.data.data.total);
            //                 pagination.showTotal = (total)=> '总共有'+total+'条数据，每页'+pagination.pageSize+'条'
            //                 that.pagination = pagination;
            //                 that.tableLoading = false;
            //                 that.dataSource = res.data.data.list;
            //             }else{
            //                 that.$Message.error(res.data.message)
            //             }
            //         }).catch( err => {
            //             this.tableLoading = false
            //             this.dataSource = [];
            //             // that.$Message.error()
            //         })
            //     }
                
            },
            // 点击分页
            pageChange(val){
                this.pagination = {
                    current: val.current,
                    pageSize: val.pageSize
                }
                this.params.pageNum = val.current;
                // this.postTableList()         //分页获取表格数据

            },
            // 表格筛选
            handleSearch(){
                console.log(this.searchItems)
                console.log(this.searchItems.beginTime.valueOf())           //转换成时间戳
                console.log(this.searchItems.beginTime.format('YYYY-MM-DD HH:mm:ss'))       //转换成年月日 时分秒
            },
            // 取消筛选
            handleReset(){
                this.form.resetFields();
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
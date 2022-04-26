<template>
    <div>
        <!-- 搜索 -->
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" class="search-content">
            <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
                    <a-range-picker
                        :value="dateChoose"
                        :disabled-date="disabledDate"
                        format="YYYY-MM-DD"
                        @change = "onDateChange"
                    />
                </a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="10" :xl="6">
                    <a-button icon="search" type="primary" @click="handleSearch()">查询</a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table 
            :columns="columns" 
            :data-source="dataSource" 
            class="table" 
            rowKey="id"
            :pagination="pagination" 
            :loading="tableLoading"
            @change="handleTableChange"
        />
        
        
    </div>
</template>
<script>
    import moment from 'moment';
    import pageTableList from 'common@module/mixins/list'
    export default {
        name: 'daily',
        mixins: [pageTableList],
        data() {
            return {
                dateChoose:[],
                choosedState:'',
                params:{
                   route:'Admin_index',
                   page:1,
                   limit:10,
                   startTime:'',
                   endTime:'' 
                },
                roleList:[],
                columns: [
                    {title: '日期',key: 'username',dataIndex: 'username',width: '10%'},
                    {title: '注册人数',key: 'name',dataIndex: 'name',width: '10%'},
                    {title: '订单数',key: 'describe',dataIndex: 'describe',width: '12%'},
                    {title: '游戏局数',key: 'ctime',dataIndex: 'ctime',width: '16%'},
                    {title: '消费金额',key: 'cname',dataIndex: 'cname',width: '10%'},
                    {title: '消费人数',key: 'cname1',dataIndex: 'cname1',width: '10%'},
                    {title: '平台佣金',key: 'cname2',dataIndex: 'cname2',width: '10%'},
                ],
                //查询字段
                searchItems: {
                    endTime: moment().endOf('day'),
                    beginTime: moment().startOf('day'),
                    status: '1'
                },
                
            }
        },
        mounted() {
            // 获取表格数据
            this.postTableList();
        },
        methods:{
            moment,
            
            disabledDate(current){
                return current && current > moment().endOf('day')
            },
            handleSearch(){
                this.params.page = 1;
                this.postTableList()
            },
            
            //能获取到当前点击的页数
            handleTableChange(pagination, filters, sorter){
                this.pageChange(pagination)
            },
            onDateChange(date,dateString){
                this.dateChoose = date;
                this.params.startTime = dateString[0];
                this.params.endTime = dateString[1];
            },
            handleReset(){
                this.params = {
                    route:'Admin_index',
                    page:1,
                    limit:10,
                    startTime:'',
                    endTime:'' 
                }
                this.dateChoose = [];
                this.postTableList()
            },
            
        }
    }
</script>
<style  lang="less" rel="stylesheet/less" scoped>
    .search-content{
        background: #fafafa;
        padding: 20px;
        margin-bottom: 20px;
        button{margin-left: 10px;}
    }
    .table{margin-top: 20px;}
    
</style>
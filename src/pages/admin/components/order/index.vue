<template>
    <div>
        <!-- 搜索 -->
        <a-form class="search-content" :label-col="{ span: 6 }" labelAlign="left">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="用户ID：">
                        <a-input  placeholder="请输入" v-model="keywords"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="用户名：">
                        <a-input  placeholder="请输入" v-model="keywords"/>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item label="用户手机号：">
                        <a-input  placeholder="请输入" v-model="keywords"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="日期：">
                        <a-range-picker
                            :value="dateChoose"
                            :disabled-date="disabledDate"
                            format="YYYY-MM-DD"
                            @change = "onDateChange"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="游戏ID：">
                        <a-input  placeholder="请输入" v-model="keywords"/>
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-button icon="search" type="primary" @click="handleSearch()">查询</a-button>
                    <a-button  @click="handleSearch()">重置</a-button>
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
    import pageTableList from '../../../../module/mixins/list'
    export default {
        name: 'order',
        mixins: [pageTableList],
        data() {
            return {
                dateChoose:[],
                choosedState:'',
                keywords:'',
                params:{
                   route:'Admin_index',
                   page:1,
                   limit:10,
                   startTime:'',
                   endTime:'' 
                },
                roleList:[],
                columns: [
                    {title: '订单号',key: 'username',dataIndex: 'username',width: '10%'},
                    {title: '用户名',key: 'name',dataIndex: 'name',width: '10%'},
                    {title: '用户ID',key: 'describe',dataIndex: 'describe',width: '12%'},
                    {title: '手机号',key: 'ctime',dataIndex: 'ctime',width: '16%'},
                    {title: '消费金额',key: 'cname',dataIndex: 'cname',width: '10%'},
                    {title: '消费时间',key: 'cname',dataIndex: 'cname',width: '10%'},
                    {title: '游戏ID',key: 'cname',dataIndex: 'cname',width: '10%'},
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
        button{margin-top:2px;margin-left: 10px;}
    }
    .search-content .ant-form-item {
        display: flex;
    }
    
    .table{margin-top: 20px;}
    
</style>
<style>
    .search-content .ant-form-item-control-wrapper {
        flex: 1;
    }
</style>
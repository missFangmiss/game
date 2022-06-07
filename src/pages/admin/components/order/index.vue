<template>
    <div>
        <!-- 搜索 -->
        <a-form class="search-content" :label-col="{ span: 6 }" labelAlign="left">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="用户ID：">
                        <a-input  placeholder="请输入" v-model="params.user_id"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="用户名：">
                        <a-input  placeholder="请输入" v-model="params.user_name"/>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item label="用户手机号：">
                        <a-input  placeholder="请输入" v-model="params.mobile"/>
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
                        <a-input  placeholder="请输入" v-model="params.game_id"/>
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-button icon="search" type="primary" @click="handleSearch()">查询</a-button>
                    <a-button  @click="handleReset()">重置</a-button>
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
        name: 'order',
        mixins: [pageTableList],
        data() {
            return {
                dateChoose:[],
                choosedState:'',
                keywords:'',
                params:{
                   route:'Bill_index',
                   page:1,
                   limit:10,
                   start:'',
                   end:'',
                   game_id:'',
                   mobile:'',
                   user_name:'',
                   user_id:''
                },
                roleList:[],
                columns: [
                    {title: '订单号',key: 'bill_no',dataIndex: 'bill_no',width: '11%'},
                    {title: '用户名',key: 'user_name',dataIndex: 'user_name',width: '12%'},
                    {title: '用户ID',key: 'user_id',dataIndex: 'user_id',width: '12%'},
                    {title: '手机号',key: 'mobile',dataIndex: 'mobile',width: '10%',customRender: (text,record,index) => { return text || '-'}},
                    {title: '消费金额',key: 'amount',dataIndex: 'amount',width: '10%'},
                    {title: '消费时间',key: 'create_time',dataIndex: 'create_time',width: '12%'},
                    {title: '游戏ID',key: 'game_id',dataIndex: 'game_id',width: '10%'},
                ],
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
                this.params.start = dateString[0];
                this.params.end = dateString[1];
            },
            handleReset(){
                this.params = {
                    route:'Bill_index',
                    page:1,
                    limit:10,
                    start:'',
                    end:'',
                    game_id:'',
                    mobile:'',
                    user_name:'',
                    user_id:'' 
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
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
                <a-col :span="6">
                    <a-form-item label="状态：">
                        <a-select  defaultValue="" :value="params.status" @change="handleStatusChange">
                            <a-select-option v-for="(item,index) in statusList" :key="index" :value="item.value">
                                {{item.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    
                </a-col>
                <a-col :span="6">
                    <a-form-item label="尾数：">
                        <a-input  placeholder="请输入" v-model="params.winning_num"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="参与人数：">
                        <a-input  placeholder="请输入" v-model="params.num"/>
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
        >
            
        </a-table>
        
        
    </div>
</template>
<script>
const statusList = [
    {value:'0',text:''},
    {value:'1',text:'开始前'},
    {value:'2',text:'准备开始'},
    {value:'3',text:'进行中'},
    {value:'4',text:'已结束'},
];
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
                   route:'Game_Index',
                   page:1,
                   limit:10,
                   start:'',
                   end:'',
                   user_id:'',
                   user_name:'',
                   mobile:'',
                   status:'',
                   num:'',
                   winning_num:'',
                   game_id:''
                },
                roleList:[],
                statusList:[
                    {value:'1',text:'开始前'},
                    {value:'2',text:'准备开始'},
                    {value:'3',text:'进行中'},
                    {value:'4',text:'已结束'},
                    {value:'5',text:'等待结果'},
                ],
                columns: [
                    {title: '游戏ID',key: 'game_id',dataIndex: 'game_id',width: '9%'},
                    {title: '参与人数',key: 'num',dataIndex: 'num',width: '6%'},
                    {title: '付费总额',key: 'amount',dataIndex: 'amount',width: '10%'},
                    {title: '状态',key: 'status',dataIndex: 'status',customRender: (text,record,index) => { console.log(record);if(text!=4){return statusList[text].text}else{if(record.is_finish==0) return '等待结果'; else{ return '已结束'} } },width: '8%'},
                    {title: '开始时间',key: 'begin_time',dataIndex: 'begin_time',width: '10%'},
                    {title: '结束时间',key: 'end_time',dataIndex: 'end_time',width: '10%'},
                    {title: '结束时数字',key: 'close_price',dataIndex: 'close_price',width: '8%'},
                    {title: '尾数',key: 'winning_num',dataIndex: 'winning_num',width: '6%'},
                    {title: '赢家用户名',key: 'user_name',dataIndex: 'user_name',width: '10%'},
                    {title: '赢家用户ID',key: 'user_id',dataIndex: 'user_id',width: '10%'},
                    {title: '赢家手机号',key: 'mobile',dataIndex: 'mobile',width: '10%'},
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
            handleStatusChange(value){
                this.params.status = value;
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
                    route:'Game_Index',
                    page:1,
                    limit:10,
                    start:'',
                    end:'',
                    user_id:'',
                    user_name:'',
                    mobile:'',
                    status:'',
                    num:'',
                    winning_num:'',
                    game_id:'' 
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
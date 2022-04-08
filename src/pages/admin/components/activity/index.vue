<template>
    <div>
        <!-- 搜索 -->
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" class="search-content">
            <a-row>
                <a-col span="4">
                    <a-input
                        placeholder="请输入活动名称或关键字查询"
                        v-model="searchItems.keywords"
                    />
                </a-col>
                <a-col span="7" style="margin-left: 10px">
                       <a-date-picker 
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="searchItems.beginTime"
                            placeholder="开始时间"   
                            :disabled-date="disabledStartDate"
                            @openChange="handleStartOpenChange"                        
                       />
                       <span>~</span>
                       <a-date-picker 
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            :disabled-date="disabledEndDate"
                            v-model="searchItems.endTime"
                            placeholder="结束时间"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                       />
                </a-col>
                <a-col span="2" style="margin-left: -50px">
                    <a-select v-model="searchItems.status">
                        <a-select-option value="0">
                            全部类型
                        </a-select-option>
                        <a-select-option value="1">
                            智展
                        </a-select-option>
                        <a-select-option value="2">
                            智会
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col  span="4">
                    <a-button icon="search" type="primary" @click="handleSearch()">查询</a-button>
                    <a-button type="primary" @click="handleAddUser()">新建活动</a-button>
                </a-col>
            </a-row>
        </a-form>        
        <!-- 表格  -->
        <a-row>
            <a-col span="6">
                <a-button type="primary" :disabled="!hasSelected"  @click="delectAll">
                    批量删除
                </a-button> 
            </a-col>
                  
            <a-col span="2" offset="16" style="text-align: right;" class="statusType">
                <span :class="searchItems.activityStatus == 1 ?'active' : ''" @click="changeType(1)">上线中</span>
                <a-divider type="vertical" />
                <span :class="searchItems.activityStatus == 2 ?'active' : ''" @click="changeType(2)">已上线</span>
            </a-col>
           
            
        </a-row>
        <a-table 
            :columns="columns" 
            :data-source="dataSource" 
            class="table" 
            rowKey="id"
            :pagination="pagination" 
            :loading="tableLoading"
            @change="handleTableChange"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
            <span slot="statusTitle" slot-scope="status, item" v-if="item.status == 0" style="color: green">
                正常
            </span>
            <span slot="statusTitle" slot-scope="status, item" v-else-if="item.status == 1">
                注销
            </span>
            <div slot="action" slot-scope="text, item">
                <a-row><a href="javascript:;" style="color:#108ee9" @click="Update(item)">编辑</a></a-row>
                <a-row>
                    <a-popconfirm
                        cancelText="取消"
                        okText="确认"
                        v-if="item.status == 1"
                        @confirm="() => UpdateStatus(item.id)"
                    >
                        <template slot="title">
                            <p style="font-weight: bold;">请确认是否下线该活动？</p>
                        </template>
                        <a href="javascript:;" style="color:#108ee9">下线</a>
                    </a-popconfirm>
                    <a-popconfirm
                        cancelText="取消"
                        okText="确认"
                        v-else-if="item.status == 0"
                        @confirm="() => UpdateStatus(item.id)"
                    >
                        <template slot="title">
                            <p style="font-weight: bold;">请确认是否上线该活动？</p>
                        </template>
                        <a href="javascript:;" style="color:#108ee9">上线</a>
                    </a-popconfirm>
                </a-row>
                <a-row>
                    <a-popconfirm
                        title="请确认是否删除？"
                        cancelText="取消"
                        okText="确定"
                        @confirm="() => onDelete(item.id)"
                    >
                        <a href="javascript:;" style="color:#108ee9">删除</a>
                    </a-popconfirm>
                </a-row>
                <a-row><a href="javascript:;" style="color:#108ee9" @click="onHandleLive">图文直播</a></a-row>
                <a-row><a href="javascript:;" style="color:#108ee9">报名列表</a></a-row>
                <a-row><a href="javascript:;" style="color:#108ee9">云相册</a></a-row>
                <a-row><a href="javascript:;" style="color:#108ee9">留言列表</a></a-row>  
            </div> 
        </a-table>
    </div>
</template>
<script>
    import moment from 'moment';
    import pageTableList from '../../../../module/mixins/list'
    export default {
        name: 'user',
        mixins: [pageTableList],
        data() {
            return {
                columns: [
                    {title: '序号' ,key:"id",dataIndex: 'id',width: '6%'},
                    {title: '用户名',key: 'userName',dataIndex: 'userName',width: '12%'},
                    {title: '姓名',key: 'name',dataIndex: 'name',width: '12%'},
                    {title: '备注',key: 'remark',dataIndex: 'remark',width: '12%'},
                    {title: '创建时间',key: 'createTime',dataIndex: 'createTime',width: '12%'},
                    {title: '创建人',key: 'createName',dataIndex: 'createName',width: '12%'},
                    {title:'状态',key:'status',dateIndex:"status",scopedSlots: { customRender: 'statusTitle' },width: '8%'},
                    { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }},
                ],
                selectedRowKeys: [],
                //查询字段
                searchItems: {
                    endTime: moment().endOf('day'),
                    beginTime: moment().startOf('day'),
                    status: '0',
                    keywords: '',
                    activityStatus: '1',            //活动状态
                },
            }
        },
        mounted() {
            // 获取表格数据
            this.postTableList();
        },
        computed: {
            hasSelected() {
                return this.selectedRowKeys.length > 0;
            },
        },
        methods:{
            
            // 编辑 
            Update(data){

            },
            // 更换角色
            UpdateRole(data){

            },
            UpdateStatus(data){

            },
            onDelete(data) {

            },
            // 批量删除
            delectAll(){
                this.$confirm({
                    title: '确定批量删除这几条数据吗？',
                    content: '',
                    centered:'centered',
                    onOk() {
                        console.log('OK');
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                    class: 'test',
                });
            },
            // 表格选择
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys;
            },
            //能获取到当前点击的页数
            handleTableChange(pagination, filters, sorter){
                this.pageChange(pagination)
            },
            // 新增
            handleAddUser(){
                this.$router.push({name: 'addUser'});
            },
            changeType(type){
                this.searchItems.activityStatus = type
            },
            // 图文直播
            onHandleLive(){
                this.$router.push({name: 'live'});
            }
            
        }
    }
</script>
<style  lang="less" rel="stylesheet/less">
    .search-content{
        background: #fafafa;
        padding: 20px;
        margin-bottom: 20px;
        button{margin-left: 10px;}
    }
    table{margin-top: 20px;}
    .statusType{
        height: 32px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        span{cursor: pointer;}
        .active{color: #108ee9;}
    }
    
    
</style>
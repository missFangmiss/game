<template>
    <div>
        <!-- 搜索 -->
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" class="search-content">
            <a-row>
                <a-col span="7">
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
                        <a-select-option value="1">
                            全部状态
                        </a-select-option>
                        <a-select-option value="2">
                            正常
                        </a-select-option>
                        <a-select-option value="3">
                            注销
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col  span="4">
                    <a-button icon="search" type="primary" @click="handleSearch()">查询</a-button>
                    <a-button type="primary" @click="handleAddUser()">新增用户</a-button>
                </a-col>
            </a-row>
        </a-form>        
        <!-- 表格  -->
        <a-button type="primary" :disabled="!hasSelected"  @click="delectAll">
            批量删除
        </a-button>
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
            <span slot="action" slot-scope="text, item">
                <a href="javascript:;" style="color:#108ee9" @click="Update(item)">编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;" style="color:#108ee9" @click="UpdateRole(item)">更换角色</a>
                <a-divider type="vertical" />
                <a-popconfirm
                    cancelText="取消"
                    okText="确认"
                     v-if="item.status == 1"
                    @confirm="() => UpdateStatus(item.id)"
                >
                    <template slot="title">
                        <p style="font-weight: bold;">请确认是否注销该用户？</p>
                        <p style="font-size: 12px">(注销后该用户将无法登录使用)</p>
                    </template>
                    <a href="javascript:;" style="color:#108ee9">注销</a>
                </a-popconfirm>
                <a-popconfirm
                    cancelText="取消"
                    okText="确认"
                    v-else-if="item.status == 0"
                    @confirm="() => UpdateStatus(item.id)"
                >
                    <template slot="title">
                        <p style="font-weight: bold;">确认启用该用户？</p>
                        <p style="font-size: 12px">(启用后该用户将正常登录使用)</p>
                    </template>
                    <a href="javascript:;" style="color:#108ee9">启用</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="请确认是否删除？"
                    cancelText="取消"
                    okText="确定"
                    @confirm="() => onDelete(item.id)"
                >
                    <a href="javascript:;" style="color:#108ee9">删除</a>
                </a-popconfirm>
            </span>
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
                    { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
                ],
                selectedRowKeys: [],
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
    
</style>
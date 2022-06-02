<template>
    <div>
        <a-form class="search-content"  labelAlign="left">
            <a-row>
                <a-col :span="10">
                    <a-input  placeholder="请输入查询语句" v-model="queryCode"/>
                </a-col>
                <a-col :span="4" :offset="4">
                    <a-button type="primary" @click="onQuery">提交</a-button>
                </a-col>
            </a-row>
        </a-form><br/>
        <a-table 
            :columns="columns" 
            :data-source="dataSource" 
            class="table" 
            :pagination="false"
            :loading="tableLoading"
            @change="handleTableChange"
        >
        </a-table>
    </div>
</template>

<script>
import {orderList} from 'common@api/list.js'

export default {
    name: 'search',
    data(){
        return{
            queryCode:'',
            columns: [],
            dataSource:[],
            tableLoading:false,
            params:{
                route:'Query_index',
                content:''
            }

        }
    },
    methods:{
        onQuery(){
            if(!this.queryCode) return;
            this.postTableList();

            console.log(this.queryCode)
        },
        handleTableChange(){
        },
        postTableList() {
            this.tableLoading = true;
            let that = this;
            this.params.content = this.queryCode
            console.log(this.params)
            orderList(this.params).then(res=>{
                that.tableLoading = false;
                that.dataSource = res.respData.dataList;
                that.columns = res.respData.columnList.map(cvalue=>{
                    return {title:cvalue,dataIndex:cvalue,key:cvalue}
                })
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
    }
}
</script>
<style scoped>
    .search-content .ant-form-item {
        display: flex;
    }
    .table{
        overflow: scroll;
    }
</style>
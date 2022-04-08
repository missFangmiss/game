<template>
    <div class="addContent">
        <div class="content">
            <a-form-model
                ref="ruleForm"
                :model="form"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-model-item ref="userName" label="用户名" prop="userName" labelAlign="left">
                    <a-input
                        placeholder="请输入用户名"
                        v-model="form.userName"   
                    />
                </a-form-model-item>
                <a-form-model-item ref="name" label="姓名" prop="name" labelAlign="left">
                    <a-input
                        placeholder="请输入用户姓名"
                        v-model="form.name"                       
                    />
                </a-form-model-item>
                <a-form-model-item ref="account" label="账号" prop="account" labelAlign="left">
                    <a-input
                        placeholder="请输入用户账号"
                        v-model="form.account"                      
                    />
                </a-form-model-item>
                <a-form-model-item ref="password" label="密码" prop="password" labelAlign="left">
                    <a-input
                        placeholder="请输入用户密码"
                        v-model="form.password"
                        type="password"
                    />
                </a-form-model-item>
                <a-form-model-item ref="desc" label="描述" prop="desc" labelAlign="left">
                    <a-input v-model="form.desc" type="textarea" placeholder="请输入描述（非必填）" />
                </a-form-model-item>
                <a-form-model-item ref="status" label="用户状态" prop="status" labelAlign="left">
                    <a-radio-group v-model="form.status">
                        <a-radio value="2">
                        正常
                        </a-radio>
                        <a-radio value="3">
                        注销
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </div>
        <div class="footer">
            <a-button  @click="resetForm">取消</a-button>
            <a-button type="primary" @click="onSubmit">确认</a-button>
        </div> 
    </div>
</template>
<script>
    export default {
        name: 'addUser',
        data(){
            return {
                labelCol: { span: 1 },
                wrapperCol: { span: 4 },
                form: {
                    userName: '',
                    name:'',
                    account: '',
                    password: '',
                    desc: '',
                    status: '2'

                },
                rules: {
                    userName: [
                        {required: true, message: '请先输入用户名', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入用户姓名', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '请输入用户账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetForm() {
                this.$router.go(-1);
            },
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        console.log(this.form)
                    }
                })
            },
        }  
    }
</script>
<style lang="less" rel="stylesheet/less">
    // .addContent{      
    //     display: flex;
    //     flex-direction: column;
    //     min-height: 100%;
    //     .content{
    //         flex: 1;
    //         margin: 10px;
    //     }
    // }
    // .footer{
    //     padding: .9375rem 0 0;
    //     border-top: 1px solid #ccc;
    //     display: flex;
    //     justify-content: center;
    //     .ant-btn{
    //         margin-left: .9375rem;
    //     }
    // }
</style>
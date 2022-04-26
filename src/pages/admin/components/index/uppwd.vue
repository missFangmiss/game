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
                <a-form-model-item ref="account" label="账号" prop="account" labelAlign="right">
                    <a-input
                        placeholder="请输入用户账号"
                        v-model="form.account"
                        disabled                   
                    />
                </a-form-model-item>
                <a-form-model-item ref="password" label="新密码" prop="password" labelAlign="right">
                    <a-input-password
                        placeholder="请输入用户密码"
                        v-model="form.password"
                    />
                </a-form-model-item>
                <a-form-model-item ref="password2" label="确认密码" prop="password2" labelAlign="right">
                    <a-input-password
                        placeholder="请输入用户密码"
                        v-model="form.password2"
                    />
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
import { updatePwd } from 'common@api/user.js'
    export default {
        name: 'uppwd',
        data(){
            return {
                labelCol: { span: 2, },
                wrapperCol: { span: 8,offset:1},
                form: {
                    account: '',
                    password: '',
                    password2:''
                },
                rules: {
                    
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            this.form.account = this.$store.getters.userInfo.username
        },
        methods: {
            resetForm() {
                this.$router.go(-1);
            },
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        if(this.form.password != this.form.password2){
                            return this.$Message.error('两次密码输入不一致！')
                        }
                        updatePwd({route:'Index_updatePassword',password:this.form.password,confirmPsw:this.form.password2}).then(res=>{
                            if(res.respCode == '00'){
                                this.$Message.success('修改成功')
                                this.$router.go(-1)
                            }else{
                                this.$Message.error(res.respDesc)
                                return;
                            }
                        })
                    }
                })
            },
        }  
    }
</script>

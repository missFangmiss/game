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
                <a-form-model-item ref="num" label="最低开始人数" prop="num" labelAlign="right">
                    <a-input
                        placeholder="请输入"
                        v-model="form.num"
                        style="width:90%"
                    />&nbsp; 人
                </a-form-model-item>
                <a-form-model-item ref="waitTime" label="等待新玩家时间" prop="waitTime" labelAlign="right">
                    <a-input
                        placeholder="请输入"
                        v-model="form.waitTime"
                        style="width:90%"
                    />&nbsp; 秒
                </a-form-model-item>
                <a-form-model-item ref="gameTime" label="游戏时间" prop="gameTime" labelAlign="right">
                    <a-input
                        placeholder="请输入"
                        v-model="form.gameTime"
                        style="width:90%"
                    />&nbsp; 秒
                </a-form-model-item>
                
            </a-form-model>
        </div>
        <div class="footer">
            <a-button type="primary" @click="onSubmit">确认</a-button>
        </div> 
    </div>
</template>
<script>
    export default {
        name: 'uppwd',
        mounted(){
            
        },
        data(){
            return {
                labelCol: { span: 2, },
                wrapperCol: { span: 6,offset:1},
                form: {
                    num: '2',
                    waitTime: '5',
                    gameTime:'30'
                },
                rules: {
                    
                    num: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    waitTime: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'}
                    ],
                    gameTime: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){

        },
        methods: {
            
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        if(this.form.password != this.form.password2){
                            return this.$Message.error('两次密码输入不一致！')
                        }
                        this.$axios.post(this.$baseUrl+'/receive',{route:'Index_updatePassword',password:this.form.password,confirmPsw:this.form.password2}).then( res => {
                            if(res.respCode == '00'){
                                this.$Message.success('修改成功')
                                this.$router.go(-1)
                            }else{
                                this.$Message.error(res.respDesc)
                                return;
                            }
                        }).catch( err => {
                            console.log(err);
                            this.$Message.error('系统错误')
                            return;
                        })
                    }
                })
            },
        }  
    }
</script>

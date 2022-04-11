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
                <a-form-model-item ref="fee" label="入场费" prop="fee" labelAlign="right">
                    <a-input
                        placeholder="请输入入场费"
                        v-model="form.fee"
                        style="width:90%"
                    />
                </a-form-model-item>
                <a-form-model-item ref="scale" label="佣金比例" prop="scale" labelAlign="right">
                    <a-input
                        placeholder="请输入佣金比例"
                        v-model="form.scale"
                        style="width:90%"
                    /> &nbsp;%
                </a-form-model-item>
                
            </a-form-model>
        </div>
        <div class="footer">
            <a-button type="primary"  @click="onSubmit">提交</a-button>
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
                    fee:'100',
                    scale:'5'
                },
                rules: {
                    fee: [
                        {required: true, message: '请输入入场费', trigger: 'blur'}
                    ],
                    scale: [
                        {required: true, message: '请输入佣金比例', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){

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

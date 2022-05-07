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
                <a-form-model-item ref="rate" label="佣金比例" prop="rate" labelAlign="right">
                    <a-input
                        placeholder="请输入佣金比例"
                        v-model="form.rate"
                        style="width:90%"
                    /> &nbsp;%
                </a-form-model-item>
                
            </a-form-model>
        </div>
        <div class="footer">
                <!-- @cancel="cancel" -->
            <a-popconfirm
                title="确认修改?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="onSubmit"
            >
                <a-button type="primary">提交</a-button>
            </a-popconfirm>
        </div> 
    </div>
</template>
<script>
import {setInfo,updateSet} from 'common@api/set.js'

    export default {
        name: 'uppwd',
        mounted(){
            setInfo({route:'Index_config'}).then(res=>{
                let config = res.respData.config;
                this.form.fee = config.entrance_fee;
                this.form.rate = config.rate;
            })
        },
        data(){
            return {
                labelCol: { span: 2, },
                wrapperCol: { span: 6,offset:1},
                form: {
                    fee:'100',
                    rate:'5'
                },
                rules: {
                    fee: [
                        {required: true, message: '请输入入场费', trigger: 'blur'}
                    ],
                    rate: [
                        {required: true, message: '请输入佣金比例', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        updateSet({
                            route:'Index_saveConfig',
                            entrance_fee:this.form.fee,
                            rate:this.form.rate,
                        }).then(res=>{
                            this.$Message.success('修改成功')
                        })
                    }
                })
            },
        }  
    }
</script>

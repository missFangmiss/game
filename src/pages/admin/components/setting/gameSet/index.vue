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
import {setInfo,updateSet} from 'common@api/set.js'
    export default {
        name: 'uppwd',
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
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    waitTime: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    gameTime: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            setInfo({route:'Index_config'}).then(res=>{
                let config = res.respData.config;
                this.form.num = config.min_num;
                this.form.waitTime = config.wait_time;
                this.form.gameTime = config.game_time;
            })
        },
        methods: {
            
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        if(this.form.num>10||this.form.num<2){
                            this.$Message.error('最低开始人数为2～10')
                            return;
                        }
                        updateSet({
                            route:'Index_saveConfig',
                            min_num:this.form.num,
                            wait_time:this.form.waitTime,
                            game_time:this.form.gameTime
                        }).then(res=>{
                            this.$Message.success('修改成功')
                        })
                    }
                })
            },
        }  
    }
</script>

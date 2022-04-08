<template>
    <div class="addContent">
        <div class="content">
            <a-button type="primary" class="add_btn" icon="plus" @click="onHandleAdd">上传新内容</a-button>
            <a-timeline>
                <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
            </a-timeline>
        </div>
        <div class="footer">
            <a-button  @click="resetForm">取消</a-button>
            <!-- <a-button type="primary" @click="onSubmit">确认</a-button> -->
        </div> 
        <!-- 弹出层 -->
        <a-modal
            :title="modalTitle"
            :visible="visible"
            :confirm-loading="confirmLoading"
            :centered="true"
            okText="确定"
            cancelText="取消"
            width="55%"
            @cancel="onHandleCancel"
            >
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
                    >
                    <div>
                        <a-icon type="plus" />
                        <div class="ant-upload-text">
                        </div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>  
                <a-form-model
                    ref="ruleForm"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item ref="status" label="同步到云相册" prop="status" labelAlign="left">
                        <a-switch  v-model="form.status "/>
                    </a-form-model-item> 
                    <a-form-model-item ref="desc" label="文字内容" prop="desc" labelAlign="left">
                        <a-input v-model="form.desc" type="textarea" placeholder="请添加直播文字内容" style="height: 100px"/>
                    </a-form-model-item>     
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
    export default {
        name: 'live',
        data(){
            return{
                modalTitle:'上传新内容',
                visible: false,
                confirmLoading: false,
                fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                previewVisible: false,
                previewImage: '',
                form: {
                    status: false,
                    desc: ''
                },
                rules: {

                },
                labelCol: { span: 3 },
                wrapperCol: { span: 8},
            }
        },
        methods: {
            resetForm() {
                this.$router.go(-1);
            },
            onHandleAdd(){
                this.visible = true
            },
            //弹窗 取消
            onHandleCancel(){
                this.visible = false;
            },
            handleCancel() {
                this.previewVisible = false;
            },
            // 点击文件链接或预览图标时的回调
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
            // 上传文件改变时的状态
            handleChange({ fileList }) {
                this.fileList = fileList;
            },
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .add_btn{margin-bottom: 20px;}
</style>
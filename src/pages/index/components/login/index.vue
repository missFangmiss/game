<template>
    <div class="bbbb">
        <van-form @submit="onSubmit" style="width:100%">
        <van-field
            v-model="username"
            name="username"
            label="用户ID"
            placeholder="6位数字用于测试"
            :rules="[{ required: true, message: '6位数字用于测试' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
import { Form, Field ,Button} from 'vant';
export default {
    name: 'login',
    components:{
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
    },
    data(){
        return{
            username: '',
        }
    },
    methods: {
        onSubmit(values) {
            this.$router.push('/')
            sessionStorage.setItem('userId',values.username)
        },
    },


}
</script>
<style>
.bbbb{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content:  center;
    width: 100%;
}
</style>

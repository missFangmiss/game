<template>
	<div class="page-login">
		<div class="login-title">
			GUESS NUMBER 管理平台
        </div> 
		<div class="login-content">
			<div class="login-name">登录</div>
			<a-form-model
				:model="form"
				class="login-form" 
				ref="loginForm" 
				:label-col="labelCol" 
				:wrapper-col="wrapperCol"   
				@submit="handleSubmit"   
			>
				<a-form-model-item label="" prop="account">
					<a-input v-model="form.account" placeholder="账户"  class="input-style" size="large" >
						<a-icon slot="prefix" type="user" />
					</a-input>
				</a-form-model-item>
				<a-form-model-item label="" prop="password">
					<a-input-password v-model="form.password" placeholder="密码"  class="input-style" size="large" >
						<a-icon slot="prefix" type="lock" />
					</a-input-password>
				</a-form-model-item>
				<!-- <a-form-model-item label="" prop="code">
					<a-row>
						<a-col :span="14">
							<a-input v-model="form.code" placeholder="验证码"  class="input-style" size="large" >
								<a-icon slot="prefix" type="safety-certificate" />
							</a-input>
						</a-col>
						<a-col :span="8" :offset="2">
							<div class="code_img"></div>
						</a-col>
					</a-row>
				</a-form-model-item> -->
				<a-form-model-item>
					<a-button type="primary" html-type="submit"  :loading="loading"  class="input-style" size="large" > 登录 </a-button>
				</a-form-model-item>
			</a-form-model>
		</div>
	</div>
</template>
<script>

export default {
	name: 'login',
	data(){
		return{
			form: {
				account: '',
				password: '',
				code: ''
			},
			labelCol: { span: 0 },
			wrapperCol: { span: 24 },
			loading:false
		}
	},

	methods:{
		handleSubmit(e){
			console.log('111')
			let that = this;
			this.$router.replace('/home');
		}
	}
}
</script>

<style lang="less" rel="stylesheet/less">
	.page-login{
		background: #f0f3f8;
		width: 100%;
		height: 100%;
		.login-title{
			width: 100%;
			font-size: 32px;
			font-weight: bold;
			vertical-align: middle;
			text-align: center;
			color: #000;
			display: flex;
			padding: 20px;
		}
		.login-name{
			width: 100%;
			font-size: 20px;
			font-weight: bold;
			vertical-align: middle;
			text-align: center;
			color: #000;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 20px;
		}
		.login-content {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 1;
			top: 10%;
			flex-wrap: wrap;
			margin: 80px auto;
			width:460px;
			text-align: center;
			padding: 15px 35px 30px ;
			background: white;
			transform: translate(-1%, -1%);
			overflow: hidden;
			color: rgba(0, 0, 0, 0.87);
			border-radius: 2px;
			.login-form {
				width: 70%;
			}
			.input-style{flex:1;width:100%;font-weight: bold;}
			.code_img{border: 1px solid;height: 40px;}
		}
	}
</style>
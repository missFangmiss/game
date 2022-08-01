<template>
	<div class="container" id="app">
		<transition name="slide-fade">
			<router-view ></router-view>
		</transition>
	</div>
</template>
<script>
// import 'spa@static/base.css';
export default {
	data() {
		return {
			
		}
	},
	created() {
		
	},
	components:{

	},
	 methods: {
		
	}
}
</script>
<style>
html,body{
	height: 100%;
	margin: 0;
	padding: 0;
	position: relative;
	font-size: 14px;
	-webkit-overflow-scrolling: touch;
}

div,p,h1,h2,h3,h4,ul,ol,li,dl,dt,dd{
	margin: 0;
	padding: 0;
	outline: none;
}
ul,ol,dl{
	list-style: none;
}

img{vertical-align: middle;}
	.slide-fade-enter-active {
		transition: all .5s ease;
	}

	.slide-fade-enter, .slide-fade-leave-to{
		transform: translateX(10px);
		opacity: 0;
	}
	#app{
		width: 100%;
		min-height: 100vh;
		background: url('../../../static/images/bg.png') no-repeat fixed top left / 100% auto;
		max-width: 768px;
		margin: auto;
	}
	
</style>
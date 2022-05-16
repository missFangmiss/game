<template>
	<div class="container" id="app">
		<transition name="slide-fade">
			<router-view ></router-view>
		</transition>
	</div>
</template>
<script>
import 'spa@static/base.css';
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
		background: #101A2C;
		max-width: 768px;
		margin: auto;
	}
	
</style>
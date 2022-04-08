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
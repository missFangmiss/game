<script>
const initMixins = {
	data(){
		return {
			commonParams: {},
		}
	},
	methods:{
		handleCommonParams(obj){
			this.commonParams = {...obj}
		},
		getCommonParams(url) {
			window.location.href = url;
		}
	}
}

export default {
	initMixins
}
</script>

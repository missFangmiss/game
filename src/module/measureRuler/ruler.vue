<template>
	<div class="thermometer">
    	<div class="instrument" v-swipe="{fn:vuetouch,name:'left'}">
		    <ul class="meter" :style="meterStyle">
		    	<li class="meter-point" v-for="(n,index) in conMax" v-if="n > min" :key="index" :style="{width: `50px`,left: ((n-1) * 50) + 'px'}">
		    		<span class="-point"></span>
		    		<span class="-point"></span>
		    		<span class="unit">{{ (n-1)*point }}</span>
		    		<span v-if="(n-1)==min" class="last-point">
		    			<span class="-point"></span>
		    			<span class="-point"></span>
		    		</span>
		    	</li>
		    </ul>
    	</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { vueTouch } from './touch';
Vue.directive("swipe",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipe");
    }
});
export default {
	props: {
		// 刻度最小
		min: {
            type: Number,
            default: 0
        },
        // 刻度最大
        max: {
            type: Number,
            default: 99
        },
        // 初始刻度
        current: {
			type: Number,
            default: 0
        },
        // 单位
        point: {
        	type: Number,
            default: 1
        },
        // 是否开启进制位
        isDecimal:{
        	type: Boolean,
        	default: false
        }
	},
	data () {
		return {
			scale: this.current < this.min ? this.min * 50 : this.current > this.max ? this.max * 50 :  this.current *50,
			conMax: this.max + 1,
			meterStyle:{
				width: 50 * this.max + 'px',
				transform: 'translateX(0px)'
			},
			endScale: 0
		}
	},
	created() {
		this.meterStyle.transform = 'translateX(-'+ this.scale +'px)';
		this.endScale = this.scale;
	},
	watch: {
		scale: function(newValue){
			this.endScale = newValue;
		},
		endScale: function(newValue){
			this.$emit('input', ((newValue/50)*this.point).toFixed(2));
		}
	},
	methods:{
        vuetouch:function(moveX, currentX, isMove, e){
        	if(isMove){
        		// 移动中
        		let differ = moveX - currentX;
		        if(differ > 0){
		        	if(this.endScale <= this.min*50){
						this.meterStyle.transform = 'translateX(-'+ (this.min*50) + 'px)';
						this.endScale = this.min*50
		        	}else{
		        		this.meterStyle.transform = 'translateX(-'+ (this.scale-Math.abs(differ)) + 'px)';
						this.endScale = this.scale - Math.abs(differ)
		        	}
		        }else{
		        	if(this.endScale >= (this.max*50)){
						this.meterStyle.transform = 'translateX(-'+ (this.max*50) + 'px)';
						this.endScale = (this.max*50)
		        	}else{
		        		this.meterStyle.transform = 'translateX(-'+ (this.scale+Math.abs(differ)) + 'px)';
						this.endScale = this.scale + Math.abs(differ)
		        	}
					
		        }
        	}else{
        		// 移动结束 todo
        		let differ = moveX - currentX;
        		if(differ > 0){
        			if(this.endScale <= (this.min*50)){
        				this.scale = this.endScale = this.min*50;
        			}else{
        				this.scale = this.endScale = this.formatNum(Math.abs(differ), true);
        			}
        		}else{
					if(this.endScale >= (this.max*50)){
        				this.scale = this.endScale = this.max*50;
        			}else{
        				this.scale = this.endScale =  this.formatNum(Math.abs(differ), false);
        			}
        		}
        		this.meterStyle.transform = 'translateX(-'+ this.scale + 'px)';
        	}
			e.preventDefault();
        },
        formatNum(num, isPush){
        	if(isPush){
        		if(this.isDecimal){
        			return (((this.scale-num)/50).toFixed(0))*50
        		}
        		return this.scale-num
        	}
        	if(this.isDecimal){
    			return (((this.scale+num)/50).toFixed(0))*50
    		}
        	return this.scale+num        	
        }
    }
}
</script>
<!--  -->
<style lang="less" rel="stylesheet/less">
ul,li{margin: 0; padding: 0; list-style: none;}
.thermometer{
	display: flex;
	flex-flow: column nowrap;
    width: 100%;
    margin: auto;
}
.instrument {
	flex: 1;
	position: relative;
	overflow: hidden;
	padding-left: 50%;
	height: 50px;
	border-bottom: #eee solid 1px;

	&::after {
		content: '';
		position: absolute;
		z-index: 10;
		bottom: 0;
		left: 50%;
		width: 1px;
		height: 70%;
		background: #f95268;
		transform: translateX(-50%);
	}

	.meter {
		display: flex;
		position: relative;
		z-index: 1;
		height: 100%;
  		/*will-change: transform;
  		transition:all 0.1s ease;*/

		.last-point{
			position: absolute; left: -50px; top: 0;
			height: 100%;
			width: 100%;

			&::before {
				content: '';
				position: absolute;
				z-index: 10;
				bottom: 0;
				left: 51%;
				width: 1px;
				height: 40%;
				background: linear-gradient(90deg, #999 50%, transparent 50%);
			}
		}


		.meter-point {
			position: absolute;
			bottom: 0;
			color: #bababa;
			font-size: 0.75rem;
			height: 100%;

			&::after {
				content: '';
				position: absolute;
				z-index: 10;
				bottom: 0;
				left: 0;
				width: 1px;
				height: 50%;
				background: linear-gradient(90deg, #666 50%, transparent 50%);
			}
			&::before {
				content: '';
				position: absolute;
				z-index: 10;
				bottom: 0;
				left: 50%;
				width: 1px;
				height: 40%;
				background: linear-gradient(90deg, #999 50%, transparent 50%);
			}

			.-point{
				float: left; width: 50%; position: relative; height: 100%;

				&::after {
					content: '';
					position: absolute;
					z-index: 10;
					bottom: 0;
					right: 29.6%;
					width: 1px;
					height: 30%;
					background: linear-gradient(90deg, #999 50%, transparent 50%);
				}
				&::before {
					content: '';
					position: absolute;
					z-index: 10;
					bottom: 0;
					left: 34%;
					width: 1px;
					height: 30%;
					background: linear-gradient(90deg, #999 50%, transparent 50%);
				}
			}

			.unit{
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				color: #666;
				transform: translateX(-50%);
			}
		}
	}
}
</style>
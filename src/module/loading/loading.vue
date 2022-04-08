<template>
    <transition name="fade">
        <div :class="classes" v-show="show">
            <div :class="innerClasses" :style="styles"></div>
        </div>
    </transition>
</template>

<script>
export default {
	props: {
		color: {
            type: String,
            default: 'primary'
        },
        failedColor: {
            type: String,
            default: 'error'
        },
	},
	data () {
		return {
			percent: 0,
			status: 'success',
			show: false
		}
	},
	computed: {
		classes(){
			return 'loading-bar'
		},
		innerClasses(){
			return [
				'loading-bar-inner',
				{
					[`loading-bar-inner-primary`]: this.color === 'primary' && this.status === 'success',
                    [`loading-bar-inner-error`]: this.failedColor === 'error' && this.status === 'error'
				}
			]
		},
		styles () {
            let style = {
                width: `${this.percent}%`
            };

            if (this.color !== 'primary' && this.status === 'success') {
                style.backgroundColor = this.color;
            }

            if (this.failedColor !== 'error' && this.status === 'error') {
                style.backgroundColor = this.failedColor;
            }

            return style;
        }
	}	
}
</script>
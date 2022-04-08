<template>
	<div class="slider" ref="rangeSlider">
        <div class="slider-num">
            <div :class="activeMin>0?'-active -fl':'-fl'">{{unit}}{{activeMin}}</div>
            <div :class="activeMax<max?'-active -fr':'-fr'">{{unit}}{{activeMax>=max?activeMax+'+':activeMax}}</div>
        </div>
		<div class="slider-range">
            <div ref="rulerBar" class="slider-range-propo"></div>
            <div ref="startBar" class="-bar -left" @touchstart.prevent="starTouchStart" @touchmove="starTouchMove" @touchend="starTouchEnd"></div>
		    <div ref="endBar" class="-bar -right" @touchstart.prevent="endTouchStart" @touchmove="endTouchMove" @touchend="endTouchEnd"></div>
        </div>
	</div>
</template>
<script type="text/javascript">
export default {
    name: 'slider',
    props:{
        // 回调, 将所选最小最大值传出
        "valueFun":{
            type:Function,
            required: true,
        },
        // 最大值 (限制为步长的倍数)
        "max":{
            type:Number,
            default:100
        },
        // 选中最大值 (限制为步长的倍数)
        "selMax":{
            type:Number,
            default: null
        },
        // 最小值
        "min":{
            type:Number,
            default:0
        },
        // 选中最小值 (限制为步长的倍数且小于最大值)
        "selMin":{
            type:Number,
            default: null
        },
        // 步长
        'step':{
            type:Number,
            default:1
        },
        // 单位
        'unit':{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            slider: null,
            rulerBar: null,
            startBar: null,
            endBar:null,

            barWidth: 20,

            sliderOffsetX: 0,
            clickStartBarX: 0,
            totleStep: 0,
            stepW: 0,
            activeMin: 0,
            activeMax: 0
        }
    },
    created(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    methods:{
        // 初始化
        init(){
            this.slider = this.$refs.rangeSlider
            this.rulerBar = this.$refs.rulerBar
            this.startBar = this.$refs.startBar
            this.endBar = this.$refs.endBar

            this.activeMin = (this.selMin < this.min ? this.min : this.selMin) || this.min
            this.activeMax = (this.selMax > this.max ? this.max : this.selMax) || this.max

            this.sliderOffsetX = this.elementLeft(this.slider)
            this.barWidth = this.startBar.clientWidth

            this.totleStep = parseInt(this.max / this.step)
            this.stepW = (this.slider.clientWidth - this.barWidth) / this.totleStep
            // 初始化范围坐标（active）
            if(this.selMin){
                this.startBar.style.left = this.stepW * (this.selMin / this.step) + 'px'
                this.rulerBar.style.left = this.stepW * (this.selMin / this.step) + this.barWidth + 'px' 
            }
            if(this.selMax){
                this.endBar.style.right = this.stepW * (this.totleStep - (this.selMax / this.step))  + 'px'
                this.rulerBar.style.right = (this.stepW * (this.totleStep - (this.selMax / this.step))) + this.barWidth + 'px'
            }
        },
        // 重置
        reset(){
            this.activeMin = this.min
            this.activeMax = this.max

            this.startBar.style.left = this.stepW * (this.min / this.step) + 'px'
            this.rulerBar.style.left = this.stepW * (this.min / this.step) + this.barWidth + 'px'

            this.endBar.style.right = this.stepW * (this.totleStep - (this.max / this.step))  + 'px'
            this.rulerBar.style.right = (this.stepW * (this.totleStep - (this.max / this.step))) + this.barWidth + 'px'
            this.valueFun(this.activeMin,this.activeMax)
        },
        elementLeft(e){
            var offset = e.offsetLeft;
            if(e.offsetParent != null) offset += this.elementLeft(e.offsetParent);
            return offset;
        },
        starTouchStart(e){
            this.clickStartBarX = e.touches[0].pageX - this.elementLeft(this.startBar)
        },
        starTouchMove(e){
            let moveX = (e.touches[0].pageX - this.sliderOffsetX) - this.clickStartBarX
            if(moveX <= 0){
                moveX = 0
                this.activeMin = moveX
                this.startBar.style.left = moveX + 'px'
                this.rulerBar.style.left = moveX + this.barWidth + 'px'
                return
            }
            this.activeMin = Math.round(moveX / this.stepW) * this.step
            if(this.activeMin >= (this.activeMax - this.step)){
                this.activeMin = (this.activeMax - this.step)
                return
            }
            this.startBar.style.left = moveX + 'px'
            this.rulerBar.style.left = moveX + this.barWidth + 'px'
        },
        starTouchEnd(e){
            let moveX = (e.changedTouches[0].pageX - this.sliderOffsetX) - this.clickStartBarX
            if(moveX <= 0){
                moveX = 0
                this.activeMin = moveX
                this.startBar.style.left = moveX + 'px'
                this.rulerBar.style.left = moveX + this.barWidth + 'px'
                this.valueFun(this.activeMin,this.activeMax)
                return
            }
            if(this.activeMin >= (this.activeMax - this.step)){
                this.valueFun(this.activeMin,this.activeMax)
                return
            }
            let moveEndX = this.stepW * Math.round(moveX / this.stepW)
            this.startBar.style.left = moveEndX + 'px'
            this.rulerBar.style.left = moveEndX + this.barWidth + 'px'
            this.valueFun(this.activeMin,this.activeMax)
        },
        endTouchStart(e){
            this.clickEndBarX = e.touches[0].pageX - this.elementLeft(this.endBar)
        },
        endTouchMove(e){
            let moveX = ((e.touches[0].pageX - this.sliderOffsetX) - this.slider.clientWidth) + this.clickEndBarX
            if( moveX >= 0 ){
                moveX = 0
                this.activeMax = this.max
                this.endBar.style.right = moveX  + 'px'
                this.rulerBar.style.right = moveX + this.barWidth + 'px'
                return
            }
            this.activeMax = (this.totleStep - Math.round(Math.abs(moveX) / this.stepW)) * this.step
            if(this.activeMax <= (this.activeMin + this.step)){
                this.activeMax = (this.activeMin + this.step)
                return
            }
            this.endBar.style.right = Math.abs(moveX) + 'px'
            this.rulerBar.style.right = Math.abs(moveX) + this.barWidth + 'px'
        },
        endTouchEnd(e){
            let moveX = ((e.changedTouches[0].pageX - this.sliderOffsetX) - this.slider.clientWidth) + this.clickEndBarX
            if( moveX >= 0 ){
                moveX = 0
                this.activeMax = this.max
                this.endBar.style.right = moveX  + 'px'
                this.rulerBar.style.right = moveX + this.barWidth + 'px'
                this.valueFun(this.activeMin,this.activeMax)
                return
            }
            if(this.activeMax <= (this.activeMin + this.step)){
                this.valueFun(this.activeMin,this.activeMax)
                return
            }
            let moveEndX = this.stepW * Math.round(Math.abs(moveX) / this.stepW)
            this.endBar.style.right = moveEndX + 'px'
            this.rulerBar.style.right = moveEndX + this.barWidth + 'px'
            this.valueFun(this.activeMin,this.activeMax)
        }
    }
}
</script>
<style lang="less">
.slider{
    width: 100%;

    &-num{
        height: 24px; margin-bottom: 20px; font-size: 12px; color: #999;

        .-active{color: #FF5660;}
    }

    &-range{
        position: relative;
        background: #f0f0f0; height: 2px; margin-bottom: 13px;

        &-propo{
            position:absolute; height: 2px; top: 0; background: #3889fc; left: 0; right: 0;
        }

        .-bar{
            position:absolute; width: 28px; height: 28px; border-radius: 50%; 
            border: #3889fc solid 1px; top: -15px; background: #fff; box-shadow: 0 0 3px rgba(0,0,0,.2);
            
            &.-left{left: 0; z-index: 9;}
            &.-right{right: 0; z-index: 8;}
        }
    }
}
</style>
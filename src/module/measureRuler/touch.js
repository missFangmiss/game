function vueTouch(el,binding,type){
	this.obj=el;
	this.binding=binding;
	this.vueTouches=0;
	this.vueCallBack = typeof(binding.value) == "object" ? binding.value.fn : binding.value;
	var _this=this;
	setTimeout(function(){
		_this.obj.addEventListener("touchstart",function(e){
			e.preventDefault();
			_this.start(e);
		},false);
		_this.obj.addEventListener("touchend",function(e){
			e.preventDefault();
			_this.end(e);
		},false);
		_this.obj.addEventListener("touchmove",function(e){
			e.preventDefault();
			_this.move(e);
		},false);
	},100)
};
vueTouch.prototype={
	start:function(e){
		e.stopPropagation();
		// 收集触摸开始坐标
		this.vueTouches = e.changedTouches[0].pageX;
	},
	end:function(e){
		e.stopPropagation();
		let disX = e.changedTouches[0].pageX;
		this.vueCallBack(disX, this.vueTouches, false, e);
	},
	move:function(e){
		let disX = e.changedTouches[0].pageX;
		this.vueCallBack(disX, this.vueTouches, true, e);
		e.preventDefault();
	}
};

export {
	vueTouch
}
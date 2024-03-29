"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _touch = _interopRequireDefault(require("../utils/touch"));

var _event = require("../utils/event");

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: 'van-swipe'
    }, [_c('div', {
      class:'van-swipe__track',
      style: _vm.trackStyle,
      on: {
        "touchstart": _vm.onTouchStart,
        "touchmove": _vm.onTouchMove,
        "touchend": _vm.onTouchEnd,
        "touchcancel": _vm.onTouchEnd,
        "transitionend": function transitionend($event) {
          _vm.$emit('change', _vm.activeIndicator);
        }
      }
    }, [_vm._t("default")], 2), _vm._e()]);
  },
  name: 'swipe',
  mixins: [_touch.default],
  props: {
    autoplay: Number,
    vertical: Boolean,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    initialSwipe: {
      type: Number,
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data: function data() {
    return {
      computedWidth: 0,
      computedHeight: 0,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipes: [],
      swiping: false
    };
  },
  mounted: function mounted() {
    this.initialize();

    if (!this.$isServer) {
      (0, _event.on)(window, 'resize', this.onResize, true);
    }
  },
  destroyed: function destroyed() {
    this.clear();

    if (!this.$isServer) {
      (0, _event.off)(window, 'resize', this.onResize, true);
    }
  },
  watch: {
    swipes: function swipes() {
      this.initialize();
    },
    initialSwipe: function initialSwipe() {
      this.initialize();
    },
    autoplay: function autoplay(_autoplay) {
      if (!_autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    }
  },
  computed: {
    count: function count() {
      return this.swipes.length;
    },
    delta: function delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size: function size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },
    trackSize: function trackSize() {
      return this.count * this.size;
    },
    activeIndicator: function activeIndicator() {
      return (this.active + this.count) % this.count;
    },
    trackStyle: function trackStyle() {
      var _ref;

      return _ref = {}, _ref[this.vertical ? 'height' : 'width'] = this.trackSize + "px", _ref.transitionDuration = (this.swiping ? 0 : this.duration) + "ms", _ref.transform = "translate" + (this.vertical ? 'Y' : 'X') + "(" + this.offset + "px)", _ref;
    }
  },
  methods: {
    // initialize swipe position
    initialize: function initialize(active) {
      if (active === void 0) {
        active = this.initialSwipe;
      }

      clearTimeout(this.timer);
      var rect = this.$el.getBoundingClientRect();

      if (this.$el) {
        this.computedWidth = this.width || rect.width;
        this.computedHeight = this.height || rect.height;
      }

      this.swiping = true;
      this.active = active;

      this.offset = this.count > 1 ? (this.active >= (this.count-1) ? -((this.size * this.active) - (rect.width - this.size)) : -this.size * this.active) : 0;

      this.swipes.forEach(function (swipe) {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    onResize: function onResize() {
      this.initialize(this.activeIndicator);
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.touchable) return;
      this.clear();
      this.swiping = true;
      this.touchStart(event);
      this.correctPosition();
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.touchable) return;
      this.touchMove(event);

      if (this.vertical && this.direction === 'vertical' || this.direction === 'horizontal') {
        event.preventDefault();
        event.stopPropagation();
        this.move(0, Math.min(Math.max(this.delta, -this.size), this.size));
      }
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.touchable) return;

      if (this.delta) {
        var offset = this.vertical ? this.offsetY : this.offsetX;
        this.move(offset > 50 ? this.delta > 0 ? -1 : 1 : 0);
        this.swiping = false;
      }

      this.autoPlay();
    },
    move: function move(_move, offset) {
      if (_move === void 0) {
        _move = 0;
      }

      if (offset === void 0) {
        offset = 0;
      }

      var delta = this.delta,
          active = this.active,
          count = this.count,
          swipes = this.swipes,
          trackSize = this.trackSize;
      var atFirst = active === 0;
      var atLast = active === count - 1;
      var outOfBounds = !this.loop && (atFirst && (offset > 0 || _move < 0) || atLast && (offset < 0 || _move > 0));

      if (outOfBounds || count <= 1) {
        return;
      }

      swipes[0].offset = atLast && (delta < 0 || _move > 0) ? trackSize : 0;
      swipes[count - 1].offset = atFirst && (delta > 0 || _move < 0) ? -trackSize : 0;

      if (_move && active + _move >= -1 && active + _move <= count) {
        this.active += _move;
      }
      if(this.active >= count-1 && this.width > 0){
        var rect = this.$el.getBoundingClientRect();
        this.offset = offset - (this.active * this.size) + (rect.width - this.size);
      }else{
        this.offset = offset - this.active * this.size;
      }
    },
    swipeTo: function swipeTo(index) {
      var _this = this;

      this.swiping = true;
      this.correctPosition();
      setTimeout(function () {
        _this.swiping = false;

        _this.move(index % _this.count - _this.active);
      }, 30);
    },
    correctPosition: function correctPosition() {
      if (this.active <= -1) {
        this.move(this.count);
      }

      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },
    clear: function clear() {
      clearTimeout(this.timer);
    },
    autoPlay: function autoPlay() {
      var _this2 = this;

      var autoplay = this.autoplay;

      if (autoplay && this.count > 1) {
        this.clear();
        this.timer = setTimeout(function () {
          _this2.swiping = true;

          _this2.resetTouchStatus();

          _this2.correctPosition();

          setTimeout(function () {
            _this2.swiping = false;

            _this2.move(1);

            _this2.autoPlay();
          }, 30);
        }, autoplay);
      }
    }
  }
});

exports.default = _default;
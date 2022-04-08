/*
    *全局页面加载进度条
*/ 

import LoadingBar from './loading.vue';
import Vue from 'vue';

LoadingBar.newInstance = properties => {
	const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(LoadingBar, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const loading_bar = Instance.$children[0];

    return {
    	update (options) {
            if ('percent' in options) {
                loading_bar.percent = options.percent;
            }
            if (options.status) {
                loading_bar.status = options.status;
            }
            if ('show' in options) {
                loading_bar.show = options.show;
            }
        },
    	destroy () {
            document.body.removeChild(document.getElementsByClassName('loading-bar')[0]);
        }
    }
}

let timer;
let loadingBarInstance;
let color = 'primary';
let failedColor = 'error';

function getLoadingBarInstance () {
    loadingBarInstance = loadingBarInstance || LoadingBar.newInstance({
        color: color,
        failedColor: failedColor,
    });

    return loadingBarInstance;
}

function update(options) {
    let instance  = getLoadingBarInstance();
    instance.update(options);
}
function hide() {
    setTimeout(() => {
        update({
            show: false
        });
        setTimeout(() => {
            update({
                percent: 0
            });
        }, 300);
    }, 500);
}
function clearTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

export default {
	start () {
		if (timer) return;

        let percent = 0;

        timer = setInterval(() => {
            percent += Math.floor(Math.random () * 3 + 5);
            if (percent > 95) {
                clearTimer();
            }
            update({
                percent: percent,
                status: 'success',
                show: true
            });
        }, 200);
	},
	finish () {
        clearTimer();
        update({
            percent: 100,
            status: 'success',
            show: true
        });
        hide()
    },
    error () {
        clearTimer();
        update({
            percent: 100,
            status: 'error',
            show: true
        });
        hide();
    },
	destroy () {
        clearTimer();
        let instance = getLoadingBarInstance();
        loadingBarInstance = null;
        instance.destroy();
    }
}
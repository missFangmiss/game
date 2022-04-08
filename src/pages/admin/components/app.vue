<style>
    @import '../../../static/base.css';
</style>

<template>
    <div class="container">
        <a-config-provider :locale="zhCN">
            <transition name="slide-to-top" mode="out-in">
                <router-view></router-view>
            </transition>
        </a-config-provider>
    </div>
</template>
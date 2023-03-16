<template>
    <a-layout>
        <a-layout-sider
            v-model:collapsed="collapsed"
            :trigger="null"
            collapsible
            class="slide"
            :class="width < 768 ? 'mobile' : ''"
            width="250"
            breakpoint="lg"
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
            <Sidebar @closeDrawer="onClose" />
        </a-layout-sider>
        <a-drawer class="drawer" :placement="placement" :closable="false" :visible="visible" @close="onClose">
            <Sidebar @closeDrawer="onClose" />
        </a-drawer>
        <a-layout :style="{ marginLeft: width < 768 ? mobileView : collapsed ? '80px' : '250px', transition: 'all 0.2s' }">
            <a-layout-header :style="{ position: 'sticky', top: 0, zIndex: 9, width: '100%', background: '#fff', padding: 0 }" class="fixed-header">
                <div class="dis">
                    <div>
                        <DoubleRightOutlined v-if="collapsed" class="trigger" @click="() => (width >= 768 ? (collapsed = !collapsed) : (visible = true))" />
                        <DoubleLeftOutlined v-else class="trigger" @click="() => (width >= 768 ? (collapsed = !collapsed) : (visible = true))" />
                    </div>
                    <Header />
                </div>
            </a-layout-header>
            <a-layout-content :style="{ padding: '24px', minHeight: '93vh' }">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons-vue";
import { onDeactivated, onMounted, ref, getCurrentInstance } from "vue";
import Header from "../components/admin/header.vue";
import Sidebar from "../components/admin/sidebar.vue";

const collapsed = ref(false);
const visible = ref(false);
const width = ref(window.innerWidth);
const mobileView = ref("80px");
const placement = ref("left");
let app = null;
let $instance = null;

onMounted(async () => {
    width.value < 768 ? (mobileView.value = "0px") : (mobileView.value = "80px");
    window.addEventListener("resize", onResize);
    app = getCurrentInstance();
    $instance = app.appContext.config.globalProperties.$recaptchaInstance;
    if ($instance) {
        await $instance.value.hideBadge();
    }
});

onDeactivated(() => {
    window.removeEventListener("resize", onResize);
});

const onResize = () => {
    width.value = window.innerWidth;
    width.value < 768 ? (mobileView.value = "0px") : (mobileView.value = "80px");
};
const onClose = () => {
    visible.value = false;
};
</script>
<style>
.logo img {
    width: 100%;
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.slide {
    max-height: 100vh;
    min-height: 100vh;
    height: 100%;
}

.trigger {
    padding: 20px;
    font-size: 20px;
}
.dis {
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
}
.mobile {
    max-width: 0px !important;
    min-width: 0px !important;
    width: 0px !important;
}

.drawer .ant-drawer-body {
    padding: 0 !important;
    min-height: 100vh;
    max-height: 100vh;
    height: 100vh;
    background-color: #001529;
}
</style>

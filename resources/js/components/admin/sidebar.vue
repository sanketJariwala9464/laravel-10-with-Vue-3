<template>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-sub-menu key="header" :style="{ padding: '8px 0' }">
            <template #icon>
                <a-avatar shape="square" :style="{ backgroundColor: '#009fd4', verticalAlign: 'middle', lineHeight: '30px', position: 'relative', left: '-8px' }">
                    <span class="text-uppercase">{{ store.getAuthDetails.user }}</span>
                </a-avatar>
            </template>
            <template #title class="header">{{ store.getAuthDetails.user }}</template>
            <template #expandIcon></template>
        </a-sub-menu>

        <a-divider class="divider" style="height: 0.2px; background-color: #283f54" />
        <a-menu-item key="3" :class="$route.name === 'admin' ? 'selected' : ''"> 
            <router-link :to="{ name: 'admin' }" @click="closeDrawer">
                <dashboard-outlined />
                <span>Dashboard</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="contact-detail-management" :class="$route.name === 'contact' ? 'selected' : ''">
            <router-link :to="{ name: 'contact' }" @click="closeDrawer">
                <UserOutlined />
                <span>Contact Details</span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { DashboardOutlined, UserOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useAuthStore } from '../../store/auth';
import { useRoute } from "vue-router";

const route = useRoute();
const store = useAuthStore();
const selectedKeys = ref<string[]>(["1"]);
const emit = defineEmits<{
    (event: "closeDrawer"): void;
}>();

const closeDrawer = () => {
    emit("closeDrawer");
};
</script>

<style scoped>
.divider {
    margin-top: 0px !important;
    margin-bottom: 10px;
}
.text-uppercase {
    text-transform: uppercase;
}

.ant-menu-item > span > a:hover, .selected > span > a {
    color: #fff !important;
}
.selected, .ant-menu-item:hover{
    background-color: #396697 !important;
}
</style>

<template>
    <a-popconfirm title="Are you sure you want to deactivate?" ok-text="Yes" cancel-text="No" @confirm="status(data?.id)">
        <a-tooltip placement="bottom">
            <template #title>
                <span>Click to deactivate</span>
            </template>
            <a-button v-if="data?.status === 1" class="active">
                <template #icon>
                    <CheckOutlined />
                </template>
            </a-button>
        </a-tooltip>
    </a-popconfirm>
</template>

<script setup lang="ts">
import { CheckOutlined } from "@ant-design/icons-vue";

defineProps({
    data: Object,
    status: {
         type: Function,
        default: () => true,
    }
});

</script>

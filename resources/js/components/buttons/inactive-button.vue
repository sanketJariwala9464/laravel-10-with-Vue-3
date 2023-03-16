<template>
    <a-popconfirm title="Are you sure you want to activate?" ok-text="Yes" cancel-text="No" @confirm="status(data?.id)">
        <a-tooltip placement="bottom">
            <template #title>
                <span>Click to activate</span>
            </template>
            <a-button v-if="data?.status === 0" class="inactive">
                <template #icon>
                    <CloseOutlined />
                </template>
            </a-button>
        </a-tooltip>
    </a-popconfirm>
</template>

<script setup lang="ts">
import { CloseOutlined } from "@ant-design/icons-vue";

defineProps({
    data: Object,
    status: {
        type: Function,
        default: () => true,
    }
});

</script>

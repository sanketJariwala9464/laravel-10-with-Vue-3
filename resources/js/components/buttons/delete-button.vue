<template>
    <a-popconfirm title="Are you sure you want to delete?" ok-text="Yes" cancel-text="No" @confirm="remove(data?.id)">
        <a-tooltip placement="bottom">
            <template #title>
                <span>Click to delete</span>
            </template>
            <a-button class="delete">
                <template #icon>
                    <DeleteOutlined />
                </template>
            </a-button>
        </a-tooltip>
    </a-popconfirm>
</template>

<script setup lang="ts">
import { DeleteOutlined } from "@ant-design/icons-vue";

defineProps({
    data: Object,
    remove: {
         type: Function,
        default: () => true,
    }
});

</script>

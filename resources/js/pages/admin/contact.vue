<template>
    <div>
        <a-row type="flex" justify="space-between">
            <a-col><h4 class=""><UserOutlined />&nbsp;Contact Us Management</h4></a-col>
        </a-row>
        <div class="pb-10 table-search">
            <a-select ref="select" v-model:value="params.data.limit" style="width: 80px" @change="limitChange">
                <a-select-option value="10">10</a-select-option>
                <a-select-option value="25">25</a-select-option>
                <a-select-option value="50">50</a-select-option>
                <a-select-option value="100">100</a-select-option>
            </a-select>
            <a-input-search v-model:value="params.data.search" placeholder="Search" style="width: 250px" @change="onSearch"/>
        </div>
        <a-table :columns="columns" :scroll="{ x: 1300 }" :data-source="contactList" @change="handleChange" :pagination="pagination" :loading="isLoadingList" :rowKey="(record) => record.id">
            <template #bodyCell="{ column, record }">
                <tempate v-if="column.dataIndex === 'message'">
                    {{ record.message }}
                </tempate>

                <tempate v-if="column.dataIndex === 'status'">
                    <a-tag :color="record.status === 1 ? 'green' : 'red'">{{ record.status === 1 ? 'Active' : 'Inactive' }}</a-tag>
                </tempate>

                <tempate v-if="column.dataIndex === 'actions'">
                    <inactiveButton :data="record" :status="contactStatus" />
                    <activeButton :data="record" :status="contactStatus" />
                    &nbsp;&nbsp;
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>Update</span>
                        </template>
                        <a-button class="edit" @click="getSingleContact(record.id)">
                            <template #icon>
                                <FormOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                    <deleteButton :data="record" :remove="deleteContact"/>
                </tempate>
            </template>
        </a-table>

        <a-modal v-model:visible="isvisible" title="Update User Contact Form" :mask-closable="false">
            <template #footer>
                <a-button key="back" @click="updateContactCancel">cancel</a-button>
                <a-button key="submit" :disabled="isLoadingSingleForm" :loading="isLoading" @click="updateContactDetails" type="primary">Update</a-button>
            </template>
            <div class="init-loader" v-if="isLoadingSingleForm">
                <a-spin tip="Loading..." size="large"></a-spin>
            </div>
            <a-form v-else :model="formState" :rules="rules" :label-col="labelCol" ref="contactform" autocomplete="off">
                <a-form-item label="First Name" name="first_name" ref="first_name">
                    <a-input v-model:value="formState.first_name" placeholder="First Name"/>
                </a-form-item>

                <a-form-item label="Last Name" name="last_name" ref="last_name">
                    <a-input v-model:value="formState.last_name" placeholder="Last Name"/>
                </a-form-item>

                <a-form-item label="Email" name="email" ref="email" :validate-first="true">
                    <a-input v-model:value="formState.email" placeholder="Email"/>
                </a-form-item>

                <a-form-item label="Contact Number" name="contact_number" ref="contact_number" :validate-first="true">
                    <a-input v-model:value="formState.contact_number" placeholder="Contact Number"/>
                </a-form-item>

                <a-form-item label="Message" name="message" ref="message">
                    <a-textarea v-model:value="formState.message" placeholder="Message..."/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { contactFormService } from '../../service/contactform';
import { computed, onMounted, ref } from 'vue';
import { UserOutlined, FormOutlined } from "@ant-design/icons-vue";
import activeButton from "../../components/buttons/active-button.vue";
import deleteButton from "../../components/buttons/delete-button.vue";
import inactiveButton from "../../components/buttons//inactive-button.vue";

const labelCol = { style: { width: '150px' } };

const { 
    contactList, params, columns, isLoadingList, updateContactCancel,
    getContactList, contactStatus, deleteContact,
    formState, contactform, onFinish, onResetForm, rules, isLoading, isLoadingSingleForm, updateContactDetails, isvisible, getSingleContact
} = contactFormService();

const timer = ref();
onMounted(async () => {
    await getContactList();
});
const pagination = computed(() => ({
    total: params.data.total,
    current: params.data.page,
    pageSize: params.data.limit,
}));

const limitChange = async (val) => {
    params.data.page = 1;
    params.data.limit = val;
    await getContactList();
}

const onSearch = () => {
    params.data.page = 1;
    isLoadingList.value = true;
    clearTimeout(timer.value);

    timer.value = setTimeout(async () => {
        await getContactList();
        isLoadingList.value = false;
    }, 300);
};

const handleChange = async (pagination, filters, sorter) => {
    if (filters.status) {
        let status = "";
        filters.status.filter((x) => {
            status += x + ",";
        });
        params.data.status = status;
    }

    params.data.page = pagination.current;
    params.data.sort = sorter.field ? sorter.field : "";
    if (sorter.order === "ascend") {
        params.data.dir = "asc";
    } else if (sorter.order === "descend") {
        params.data.dir = "desc";
    } else {
        params.data.dir = "";
    }
    await getContactList();
};

</script>

<style>
.init-loader{
    min-height: 60vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-search{
    display: flex;
    justify-content: space-between;
}

.pb-10 {
    padding-bottom: 10px;
}
</style>
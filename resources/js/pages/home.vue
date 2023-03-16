<template>
  <a-row class="py-5">
    <a-col :span="9" :xs="{ span: 24 }" :md="{ span: 9 }"></a-col>
    <a-col :span="15" :xs="{ span: 24 }" :md="{ span: 15 }">
      <a-card :bordered="false" class="header-solid pb-30 ant-card-bordered auth-card">
        <template #title>
          <h5 class="text-center auth-header form-title">Contact Form</h5>
        </template>
        <a-form :model="formState" :rules="rules" :label-col="labelCol" ref="contactform" autocomplete="off" @finish="onFinish">
          <div class="py-2">
            <label for="first_name" class="ant-form-item-required ant-form-item-no-colon" title="First Name">First Name</label>
            <a-form-item  name="first_name" ref="first_name">
              <a-input v-model:value="formState.first_name" placeholder="First Name"/>
            </a-form-item>
          </div>
          <div class="py-2">
            <label for="last_name" class="ant-form-item-required ant-form-item-no-colon" title="Last Name">Last Name</label>
            <a-form-item name="last_name" ref="last_name">
              <a-input v-model:value="formState.last_name" placeholder="Last Name"/>
            </a-form-item>
          </div>
          <div class="py-2">
            <label for="email" class="ant-form-item-required ant-form-item-no-colon" title="Email">Email</label>
            <a-form-item name="email" ref="email" :validate-first="true">
              <a-input v-model:value="formState.email" placeholder="Email"/>
            </a-form-item>
          </div>
          <div class="py-2">
            <label for="contact_number" class="ant-form-item-required ant-form-item-no-colon" title="Contact Number">Contact Number</label>
            <a-form-item name="contact_number" ref="contact_number" :validate-first="true">
              <a-input v-model:value="formState.contact_number" placeholder="Contact Number"/>
            </a-form-item>
          </div>
          <div class="py-2">
            <label for="message" class="ant-form-item-required ant-form-item-no-colon" title="Message">Message</label>
            <a-form-item name="message" ref="message">
              <a-textarea v-model:value="formState.message" placeholder="Message..."/>
            </a-form-item>
          </div>
          <a-form-item class="align-btn">
            <a-button type="primary" :loading="isLoading" html-type="submit">Submit</a-button>
            <a-button class="margin-left-10px" clas type="default" html-type="button" @click="onResetForm">Cancel</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { contactFormService } from '../service/contactform';

const  { formState, contactform, onFinish, onResetForm, rules, isLoading } = contactFormService();

const labelCol = { style: { width: '150px' } };

</script>

<style scoped>

.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.margin-left-10px {
  margin-left: 10px !important;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.align-btn {
  text-align: center;
}
</style>
  
  
  
<template>
  <a-row class="py-5">
    <a-col :span="8"></a-col>
    <a-col :span="8">
      <div class="title">
        <h1>Contact Form</h1>
      </div>
      <a-form :model="formState" :rules="rules" :label-col="labelCol" ref="contactform" autocomplete="off" @finish="onFinish">
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

        <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" :loading="isLoading" html-type="submit">Submit</a-button>
          <a-button class="margin-left-10px" clas type="default" html-type="button" @click="onResetForm">Cancel</a-button>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="8"></a-col>
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
</style>
  
  
  
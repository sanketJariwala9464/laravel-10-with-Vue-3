<template>
    <a-row class="py-5">
      <a-col :span="9" :xs="{ span: 24 }" :md="{ span: 9 }"></a-col>
      <a-col :span="15" :xs="{ span: 24 }" :md="{ span: 15 }">
        <a-card :bordered="false" class="header-solid pb-30 ant-card-bordered auth-card">
          <template #title>
            <h5 class="text-center auth-header form-title">Sign In</h5>
          </template>
          <a-form :model="formState" :rules="rules" :label-col="labelCol" ref="loginform" autocomplete="off" @finish="onFinish">
            <div class="pb-2">
              <label for="email" class="ant-form-item-required ant-form-item-no-colon" title="Email Address">Email Address</label>
              <a-form-item name="email" ref="email">
                <a-input v-model:value="formState.email" placeholder="Enter Email"/>
              </a-form-item>
            </div>
            <div class="pb-2">
              <label for="password" class="ant-form-item-required ant-form-item-no-colon" title="Password">Password</label>
              <a-form-item name="password" ref="password">
                <a-input-password v-model:value="formState.password" placeholder="Enter Password"/>
              </a-form-item>
            </div>
            <a-form-item>
              <a-button type="primary" block :loading="isLoading" html-type="submit">Sign In</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </template>
  
  <script setup>
  import { authService } from '../service/auth';
  
  const  { formState, loginform, onFinish, onResetForm, rules, isLoading } = authService();
  
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

  .ant-input {
    border-radius: 4px !important;
  }
  </style>
    
    
    
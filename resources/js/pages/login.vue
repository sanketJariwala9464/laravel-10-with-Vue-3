<template>
    <a-row class="py-5">
      <a-col :span="8"></a-col>
      <a-col :span="8">
        <div class="title">
          <h1>Login</h1>
        </div>
        <a-form
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          ref="loginform"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item label="Email" name="email" ref="email">
            <a-input v-model:value="formState.email" placeholder="Enter Email"/>
          </a-form-item>
  
          <a-form-item label="Password" name="password" ref="password">
            <a-input-password v-model:value="formState.password" placeholder="Enter Password"/>
          </a-form-item>
  
          <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
            <a-button type="primary" :loading="isLoading" html-type="submit">Login</a-button>
            <a-button class="margin-left-10px" clas type="default" html-type="button" @click="onResetForm">Cancel</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="8"></a-col>
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
  </style>
    
    
    
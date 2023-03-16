import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import repositories from '../repositories';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const formState = reactive({
  email: '',
  password: '',
});

const rules = reactive({
  email: [
    { required: true, message: 'Please enter your Email', trigger: ['blur', 'change'] },
    { type: 'email', message: 'Please enter valid email address', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: ['blur', 'change'] },
  ],
})

const loginform = ref()
const isLoading = ref(false)
const isLogoutLoading = ref(false)

export const authService = () => {
  const store = useAuthStore();
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      isLoading.value = true;
      const response = await repositories.auth.login(values);
      if (response.success) {
        store.login({ ...response.data, isAuth: true });
        router.push({ name: 'admin' });
        message.success(response.message);
        isLoading.value = false;
        onResetForm();
      } else {
        isLoading.value = false;
        message.error(response.message);
      }
    } catch (error) {
      isLoading.value = false;
      message.error(error.message);
    }
  };
  
  const onResetForm = () => {
    loginform.value.resetFields();
  };

  const logout = async () => {
    try {
      isLogoutLoading.value = true;
      const response = await repositories.auth.logout();
      if (response.success) {
        store.logout();
        router.push({ name: 'login' });
        message.success(response.message);
        isLogoutLoading.value = false;
      } else {
        message.error(response.message);
        isLogoutLoading.value = false;
      }
    } catch (error) {
      isLogoutLoading.value = false;
      message.error(error.message);
    }
  }

  return {
    formState,
    rules,
    loginform,
    onFinish,
    onResetForm,
    isLoading,
    logout,
    isLogoutLoading
  }
}
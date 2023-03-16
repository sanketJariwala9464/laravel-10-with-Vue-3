import { message } from 'ant-design-vue';
import { reactive, ref, computed } from 'vue';
import repositories from '../repositories';

const formState = reactive({
  first_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  message: '',
  id: '',
});

const params = reactive({
  data: {
    limit: 10,
    page: 1,
    sort: "",
    dir: "",
    search: "",
    status: "",
    total: 0,
  },
});
const isLoadingList = ref(false)

const contactList = ref([])

const columns = computed(() => {
  return [
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: true,
      width: "150px",
    },
    {
      title: "last_name",
      dataIndex: "last_name",
      sorter: true,
      width: "100px",
    },
    {
      title: "Full name",
      dataIndex: "full_name",
      sorter: true,
      width: "150px",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "200px",
    },
    {
      title: "Message",
      dataIndex: "message",
      width: "150px",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "150px",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" }
      ],
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: true,
      width: "200px",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "150px",
    },
  ];
});

const validateMobileNo = (rule, value) => {
  if (!value || value.length === 0) return Promise.resolve();
  if (!/^[0-9]+$/.test(value)) {
    return Promise.reject(new Error('Contact number containe only number'));
  } else {
    if (value.length < 10) {
      return Promise.reject(new Error('Please enter proper contact number'));
    } else {
      return Promise.resolve();
    }
  }
};

const checkUniqueEmail = async(rule, value) => {
  if (!value || value.length === 0) return Promise.resolve();
  const payload = {
    email: value,
  }
  if (formState.id || formState.id !== '') {
    payload.id = formState.id;
  }
  const checkEmail = await repositories.contactform.uniqueEmail(payload);
  if (checkEmail.success) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(checkEmail.message));
  }
};

const rules = reactive({
  first_name: [
    { required: true, message: 'Please enter your First Name!', trigger: ['blur', 'change'] },
  ],
  last_name: [
    { required: true, message: 'Please enter your Last Name', trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: 'Please enter your Email', trigger: ['blur', 'change'] },
    { type: 'email', message: 'Please enter valid email address', trigger: ['blur', 'change'] },
    { validator: checkUniqueEmail, trigger: ['blur', 'change'] }
  ],
  contact_number: [
    { required: true, message: 'Please enter your Contact Number', trigger: ['blur', 'change'] },
    { validator: validateMobileNo, trigger: ['blur', 'change'] }
  ],
  message: [
    { required: true, message: 'Please enter your Message', trigger: ['blur', 'change'] },
  ],
})

const contactform = ref()
const isLoading = ref(false)
const isLoadingSingleForm = ref(false)
const isvisible = ref(false);

export const contactFormService = () => {

  const getContactList = async () => {
    try {
      isLoadingList.value = true;
      const response = await repositories.contactform.getContactList(params.data);
      if (response.success) {
        contactList.value = response.data.data;
        params.data.total = response.data.total;
        isLoadingList.value = false;
      } else {
        message.error(response.message);
        isLoadingList.value = false;
      }
    } catch (error) {
      console.log(error);
      isLoadingList.value = true;
      message.error(error.message);
    }
  }


  const onFinish = async (values) => {
    try {
      isLoading.value = true;
      const response = await repositories.contactform.createContact(values);
      if (response.success) {
        isLoading.value = false;
        message.success(response.message);
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
    contactform.value.resetFields();
  };

  const contactStatus = async (id) => {
    try {
      const response = await repositories.contactform.updateStatus(id);
      if (response.success) {
        message.success(response.message);
        getContactList();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await repositories.contactform.deleteContact(id);
      if (response.success) {
        message.success(response.message);
        getContactList();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const updateContactDetails = async () => {
    try {
      isLoading.value = true;
      const validate = await contactform.value.validate();
      if (validate) {
        const response = await repositories.contactform.updateContact(validate, formState.id);
        if (response.success) {
          isLoading.value = false;
          message.success(response.message);
          isvisible.value = false;
          getContactList();
        } else {
          isLoading.value = false;
          message.error(response.message);
        }
      }
    } catch (error) {
      isLoading.value = false;
      if (error.errorFields.length > 0) {
        return
      }
      message.error(error.message);
    }
  }

  const getSingleContact = async (id) => {
    try {
      isvisible.value = true;
      isLoadingSingleForm.value = true;
      const response = await repositories.contactform.getContactDetails(id);
      if (response.success) {
        formState.first_name = response.data.first_name;
        formState.last_name = response.data.last_name;
        formState.email = response.data.email;
        formState.contact_number = response.data.contact_number;
        formState.message = response.data.message;
        formState.id = response.data.id;
        isLoadingSingleForm.value = false;
      } else {
        message.error(response.message);
        isLoadingSingleForm.value = false;
      }
    } catch (error) {
      isvisible.value = false;
      isLoadingSingleForm.value = true;
      message.error(error.message);
    }
  }

  const updateContactCancel = () => {
    isvisible.value = false;
    contactform.value.resetFields();
  }

  return {
    formState,
    rules,
    contactform,
    onFinish,
    onResetForm,
    isLoading,
    columns,
    params,
    contactList,
    isLoadingList,
    getContactList,
    contactStatus,
    deleteContact,
    isLoadingSingleForm,
    updateContactDetails,
    getSingleContact,
    isvisible,
    updateContactCancel
  }
}
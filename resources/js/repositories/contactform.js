import { api } from "../api";

export default {
    uniqueEmail: (data) => api.$post("unique-email", data),
    createContact: (data) => api.$post("user-contact-form", data),
    getContactList: (data) => api.$get(
        `admin/user-contact-list?limit=`+
        data.limit +
        `&page=` +
        data.page +
        `&sort=` +
        data.sort +
        `&dir=` +
        data.dir +
        `&search=` +
        data.search +
        `&status=` +
        data.status +
        `` 
    ),
    updateStatus: (data) => api.$patch(`admin/user-contact-change-status/${data}`),
    deleteContact: (data) => api.$patch(`admin/user-contact-delete/${data}`),
    updateContact: (data, id) => api.$patch(`admin/user-update-form/${id}`, data),
    getContactDetails: (data) => api.$get(`admin/user-contact-get/${data}`),
}
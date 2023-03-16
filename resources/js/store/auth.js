import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import router from "../router";
export const useAuthStore = defineStore('auth', () => {
    const state = ref(useLocalStorage('auth', {
        user: null,
        token: null,
        email: null,
        isAuth: false,
    }))

    const login = (payload) => {
        state.value.user = payload.user;
        state.value.token = payload.token;
        state.value.email = payload.email;
        state.value.isAuth = true;
    }

    const logout = () => {
        try {
            state.value.user = null;
            state.value.token = null;
            state.value.email = null;
            state.value.isAuth = false;
            router.push({ name: 'login' });
        } catch (error) {
            console.log('error -->', error);
        }
    }

    const getAuthDetails = computed(() => {
        return state.value
    })

    return {
        state,
        login,
        logout,
        getAuthDetails,
    }
})
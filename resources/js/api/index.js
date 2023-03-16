import { httpClient } from "./http"

export const api = {
    $get: async (url, config) => await (await httpClient.get(url, config)).data,
    $post: async (url, data, config) => await (await httpClient.post(url, data, config)).data,
    $put: async (url, data, config) => await (await httpClient.put(url, data, config)).data,
    $delete: async (url, config) => await (await httpClient.delete(url, config)).data,
    $patch: async (url, data, config) => await (await httpClient.patch(url, data, config)).data
}
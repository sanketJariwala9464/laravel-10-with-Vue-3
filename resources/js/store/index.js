import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
    // persist the pinia store
// pinia.use((context) => {
//     // get all pinia store id
//     const storeId = context.store.$id;
//     // define serializer
//     const serializer = {
//         serializer: JSON.stringify,
//         deserializer: JSON.parse,
//     };
//     // read data from pinia store
//     const fromStore = serializer.deserializer(window.localStorage.getItem(storeId));
//     if (fromStore) {
//         context.store.$patch(fromStore)
//     }
//     // store data itnto pinia store
//     context.store.$subscribe((mutations, state) => {
//         window.localStorage.setItem(storeId, serializer.serializer(state))
//     })
// })

// pinia.use(piniaPluginPersistedstate)

export default pinia

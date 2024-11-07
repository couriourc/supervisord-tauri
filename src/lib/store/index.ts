import {load, Store} from '@tauri-apps/plugin-store';

let store: Store;
export const getStore = async () => {
    if (!!store) return store;
    store = await load('store.json', {autoSave: false});
    return store;
};

import {createAlova} from 'alova';
import SvelteHook from 'alova/svelte';
import {axiosRequestAdapter} from "@alova/adapter-axios";

export const alovaInstance = createAlova({
    get baseURL() {
        return "http://localhost:9001";
    },
    requestAdapter: axiosRequestAdapter(),
    statesHook: SvelteHook,
});

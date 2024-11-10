import {createAlova} from 'alova';
import {axiosRequestAdapter} from "@alova/adapter-axios";
import SvelteHook from "alova/svelte";


export class BaseClient {
    _endpoint: string = "";
    alovaInstance = createAlova({
        baseURL: "",
        requestAdapter: axiosRequestAdapter(),
        statesHook: SvelteHook,
    });

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(val) {
        this.alovaInstance.options.baseURL = val;
    }

}

import {createAlova} from 'alova';
import {axiosRequestAdapter} from "@alova/adapter-axios";
import SvelteHook from "alova/svelte";
import {createClientTokenAuthentication} from 'alova/client';

const {onAuthRequired, onResponseRefreshToken} = createClientTokenAuthentication({
    // ...
});

export class BaseClient {
    _endpoint: string = "";
    alovaInstance = createAlova({
        baseURL: "",
        requestAdapter: axiosRequestAdapter(),
        statesHook: SvelteHook,

    });
    password: string = "";
    username: string = "";

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(val) {
        this.alovaInstance.options.baseURL = val;
    }

    setAuth(username: string, password: string) {
        this.username = username;
        this.password = password;
        /*@ts-ignore*/
        this.alovaInstance.options.beforeRequest = onAuthRequired(
            (method) => {
                method.config.headers["Authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
            }
        );
    }
}

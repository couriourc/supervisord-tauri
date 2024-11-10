import {getStore} from "$lib/store";
import {z} from "zod";
import {writable} from "svelte/store";
import {onMount} from "svelte";
import {Store} from "lucide-svelte";

export class HostsManager {
    static namespace: string = "hosts";
    static ContextKey = "hosts_manager";


    constructor() {

    }

    async Query(id?: string): Promise<Host[]> {
        const store = await getStore();
        const hosts = await store.get<Host[]>(HostsManager.namespace);
        return hosts?.map((host) => {
            return new Host(host);
        }).filter((some) => {
            if (!id) return true;
            return some.id === id;
        }) ?? [] as Host[];
    }

    async Update(host: Host) {
        const store = await getStore();
        const hosts = await this.Query();
        const nHost = hosts.find(someHost => someHost.id === host.id);
        if (!host) return null;
        host.update_time = Date.now();
        await store.set(HostsManager.namespace, hosts);
        await store.save();
    }

    async Create(host: Host) {
        const store = await getStore();
        const hosts = await this.Query();
        host.create_time = Date.now();
        host.update_time = Date.now();
        host.id = `${host.create_time}-${hosts.length}`;
        hosts.push(host);
        await store.set(HostsManager.namespace, hosts);
        await store.save();
    }

    async Replace(host: Host) {
        const store = await getStore();
        const hosts = await this.Query();
        const nHostIndex = hosts.findIndex(someHost => someHost.id === host.id);
        if (nHostIndex === -1) return null;
        hosts[nHostIndex] = host;
        await store.set(HostsManager.namespace, hosts);
        await store.save();
    }

    async Delete(host: Host) {
        const store = await getStore();
        const hosts = await this.Query();
        const nHostIndex = hosts.findIndex(someHost => someHost.id === host.id);
        if (nHostIndex === -1) return null;
        hosts.splice(nHostIndex, 1);
        await store.set(HostsManager.namespace, hosts);
        await store.save();
    }
}

export class Host {
    static ContextKey = "host";
    name?: string = "";
    endpoint?: string = "http://localhost:8080";
    group?: string = "";
    create_time?: number = Date.now();
    update_time?: number = Date.now();
    id?: string = "";
    password?: string = "";
    username?: string = "";

    constructor(host: Partial<Host>) {
        this.id = host.id;
        this.name = host.name ?? this.name;
        this.endpoint = host.endpoint ?? this.endpoint;
        this.group = host.group ?? this.group;
        this.create_time = host.create_time ?? this.create_time;
        this.update_time = host.update_time ?? this.update_time;
        this.password = host.password ?? this.password;
        this.username = host.username ?? this.username;
    }

}


export const hostsManager = new HostsManager();

export function useHostsManager() {
    const loading = writable<boolean>(false);
    let data = writable<Host[]>([]);
    const refresh = async () => {
        loading.set(true);
        data.set(await hostsManager.Query());
        loading.set(false);
    };
    const remove = async (host: Host) => {
        await hostsManager.Delete(host);
        await refresh();
    };
    onMount(async () => {
        data.set(await hostsManager.Query());
    });
    return {
        loading,
        data,
        refresh,
        remove
    };
}

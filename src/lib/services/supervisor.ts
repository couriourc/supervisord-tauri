import {alovaInstance} from "./index";
import {type AbcClient} from "$lib/services/abcClient";

export const postSupervisorShutdown = (endpoint: string) =>
    alovaInstance.Post("/supervisor/shutdown");
export const postSupervisorReload = (endpoint: string) =>
    alovaInstance.Post("/supervisor/reload");

export const getSupervisorConfig = (endpoint: string) =>
    alovaInstance.Get("/supervisor/config");

export class SupervisorClient implements AbcClient {
    public endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.postSupervisorShutdown = postSupervisorShutdown.bind(null, this.endpoint);
        this.postSupervisorReload = postSupervisorReload.bind(null, this.endpoint);
        this.getSupervisorConfig = getSupervisorConfig.bind(null, this.endpoint);
    }

    postSupervisorShutdown: () => ReturnType<typeof postSupervisorShutdown>;
    postSupervisorReload: () => ReturnType<typeof postSupervisorReload>;
    getSupervisorConfig: () => ReturnType<typeof getSupervisorConfig>;

}

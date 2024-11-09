import {alovaInstance} from "./index";
import {type AbcClient} from "$lib/services/abcClient";
import normalizeUrl from "normalize-url";
import type {AxiosResponse} from "axios";
import type {SupervisorConfigInfo, SupervisorSummaryInfo} from "$lib/types/supervisord";

export const postSupervisorShutdown = (endpoint: string) =>
    alovaInstance.Post(normalizeUrl(endpoint + "/supervisor/shutdown"));
export const postSupervisorReload = (endpoint: string) =>
    alovaInstance.Post(normalizeUrl(endpoint + "/supervisor/reload"));

export const getSupervisorConfig = (endpoint: string) =>
    alovaInstance.Get<AxiosResponse<SupervisorConfigInfo>>(normalizeUrl(endpoint + "/supervisor/config"));
export const postSupervisorConfig = (endpoint: string, content: string) =>
    alovaInstance.Post<AxiosResponse<SupervisorConfigInfo>>(normalizeUrl(endpoint + "/supervisor/config"), content);
export const getSupervisorSummary = (endpoint: string) =>
    alovaInstance.Get<AxiosResponse<SupervisorSummaryInfo>>(normalizeUrl(endpoint + "/supervisor/summary"));

export class SupervisorClient implements AbcClient {
    public endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.postSupervisorShutdown = postSupervisorShutdown.bind(null, this.endpoint);
        this.postSupervisorReload = postSupervisorReload.bind(null, this.endpoint);
        this.getSupervisorConfig = getSupervisorConfig.bind(null, this.endpoint);
        this.getSupervisorSummary = getSupervisorSummary.bind(null, this.endpoint);
        this.postSupervisorConfig = postSupervisorConfig.bind(null, this.endpoint);
    }

    postSupervisorShutdown: () => ReturnType<typeof postSupervisorShutdown>;
    postSupervisorReload: () => ReturnType<typeof postSupervisorReload>;
    getSupervisorConfig: () => ReturnType<typeof getSupervisorConfig>;
    getSupervisorSummary: () => ReturnType<typeof getSupervisorSummary>;
    postSupervisorConfig: (content: string) => ReturnType<typeof postSupervisorConfig>;

}

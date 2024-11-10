import {alovaInstance} from "./index";
import {BaseClient} from "$lib/services/baseClient";
import normalizeUrl from "normalize-url";
import type {AxiosResponse} from "axios";
import type {SupervisorConfigInfo, SupervisorSummaryInfo} from "$lib/types/supervisord";

export const postSupervisorShutdown = (alovaInstance: BaseClient["alovaInstance"]) =>
    alovaInstance.Post("/supervisor/shutdown");
export const postSupervisorReload = (alovaInstance: BaseClient["alovaInstance"]) =>
    alovaInstance.Post("/supervisor/reload");

export const getSupervisorConfig = (alovaInstance: BaseClient["alovaInstance"]) =>
    alovaInstance.Get<AxiosResponse<SupervisorConfigInfo>>("/supervisor/config");
export const postSupervisorConfig = (alovaInstance: BaseClient["alovaInstance"], content: string) =>
    alovaInstance.Post<AxiosResponse<SupervisorConfigInfo>>("/supervisor/config", content);
export const getSupervisorSummary = (alovaInstance: BaseClient["alovaInstance"]) =>
    alovaInstance.Get<AxiosResponse<SupervisorSummaryInfo>>("/supervisor/summary");

export class SupervisorClient extends BaseClient {
    constructor(endpoint: string) {
        super();
        this.endpoint = endpoint;
        this.postSupervisorShutdown = postSupervisorShutdown.bind(null, this.alovaInstance);
        this.postSupervisorReload = postSupervisorReload.bind(null, this.alovaInstance);
        this.getSupervisorConfig = getSupervisorConfig.bind(null, this.alovaInstance);
        this.getSupervisorSummary = getSupervisorSummary.bind(null, this.alovaInstance);
        this.postSupervisorConfig = postSupervisorConfig.bind(null, this.alovaInstance);
    }

    postSupervisorShutdown: () => ReturnType<typeof postSupervisorShutdown>;
    postSupervisorReload: () => ReturnType<typeof postSupervisorReload>;
    getSupervisorConfig: () => ReturnType<typeof getSupervisorConfig>;
    getSupervisorSummary: () => ReturnType<typeof getSupervisorSummary>;
    postSupervisorConfig: (content: string) => ReturnType<typeof postSupervisorConfig>;

}

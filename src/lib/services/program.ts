import {alovaInstance} from "./index";
import normalizeUrl from "normalize-url";
import {partial} from "radash";
import {BaseClient} from "$lib/services/baseClient";
import type {ProcessModel} from "$lib/store/process.model";
import type {AxiosResponse} from "axios";
import type {Host} from "$lib/store/hosts.model";

export const getProgramList = (alovaInstance: BaseClient["alovaInstance"]) =>
    alovaInstance.Get<AxiosResponse<ProcessModel[]>>("/program/list");
export const postProgramStartByName = (alovaInstance: BaseClient["alovaInstance"], name: string) =>
    alovaInstance.Post(`/program/start/${name}`);
export const postProgramStopByName = (alovaInstance: BaseClient["alovaInstance"], name: string) =>
    alovaInstance.Post(`/program/stop/${name}`);
export const getProgramLogNameStdout = (alovaInstance: BaseClient["alovaInstance"],) =>
    alovaInstance.Get("/program/log/${name}/stdout");
export const postProgramStartPrograms = (alovaInstance: BaseClient["alovaInstance"],) =>
    alovaInstance.Post("/program/startPrograms");
export const postProgramStopPrograms = (alovaInstance: BaseClient["alovaInstance"],) =>
    alovaInstance.Post("/program/stopPrograms");

export class ProgramClient extends BaseClient {

    constructor(host: Host) {
        super();
        this.endpoint = host.endpoint!;
        this.setAuth(host.username!, host.password!);
        this.getProgramList = getProgramList.bind(null, this.alovaInstance);
        this.postProgramStartByName = postProgramStartByName.bind(null, this.alovaInstance);
        this.postProgramStopByName = postProgramStopByName.bind(null, this.alovaInstance);
        this.getProgramLogNameStdout = getProgramLogNameStdout.bind(null, this.alovaInstance);
        this.postProgramStartPrograms = postProgramStartPrograms.bind(null, this.alovaInstance);
        this.postProgramStopPrograms = postProgramStopPrograms.bind(null, this.alovaInstance);
    }

    getProgramList: () => ReturnType<typeof getProgramList>;
    postProgramStartByName: (name: string) => ReturnType<typeof postProgramStartByName>;
    postProgramStopByName: (name: string) => ReturnType<typeof postProgramStopByName>;
    getProgramLogNameStdout: () => ReturnType<typeof getProgramLogNameStdout>;
    postProgramStartPrograms: () => ReturnType<typeof postProgramStartPrograms>;
    postProgramStopPrograms: () => ReturnType<typeof postProgramStopPrograms>;
}

import {alovaInstance} from "./index";
import normalizeUrl from "normalize-url";
import {partial} from "radash";
import type {AbcClient} from "$lib/services/abcClient";

export const getProgramList = (endpoint: string) =>
    alovaInstance.Get(normalizeUrl(endpoint + "/program/list"));
export const postProgramStartByName = (endpoint: string, name: string) =>
    alovaInstance.Post(normalizeUrl(endpoint + `/program/start/${name}`));
export const postProgramStopByName = (endpoint: string, name: string) =>
    alovaInstance.Post(normalizeUrl(endpoint + `/program/stop/${name}`));
export const getProgramLogNameStdout = (endpoint: string,) =>
    alovaInstance.Get(normalizeUrl(endpoint + "/program/log/${name}/stdout"));
export const postProgramStartPrograms = (endpoint: string,) =>
    alovaInstance.Post(normalizeUrl(endpoint + "/program/startPrograms"));
export const postProgramStopPrograms = (endpoint: string,) =>
    alovaInstance.Post(normalizeUrl(endpoint + "/program/stopPrograms"));

export class ProgramClient implements AbcClient {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.getProgramList = getProgramList.bind(null, this.endpoint);
        this.postProgramStartByName = postProgramStartByName.bind(null, this.endpoint);
        this.postProgramStopByName = postProgramStopByName.bind(null, this.endpoint);
        this.getProgramLogNameStdout = getProgramLogNameStdout.bind(null, this.endpoint);
        this.postProgramStartPrograms = postProgramStartPrograms.bind(null, this.endpoint);
        this.postProgramStopPrograms = postProgramStopPrograms.bind(null, this.endpoint);
    }

    getProgramList: () => ReturnType<typeof getProgramList>;
    postProgramStartByName: (name: string) => ReturnType<typeof postProgramStartByName>;
    postProgramStopByName: (name: string) => ReturnType<typeof postProgramStopByName>;
    getProgramLogNameStdout: () => ReturnType<typeof getProgramLogNameStdout>;
    postProgramStartPrograms: () => ReturnType<typeof postProgramStartPrograms>;
    postProgramStopPrograms: () => ReturnType<typeof postProgramStopPrograms>;
}

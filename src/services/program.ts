import {alovaInstance} from "./index";

export const getProgramList = () =>
    alovaInstance.Get("/program/list");
export const postProgramStartByName = (name: string) =>
    alovaInstance.Post(`/program/start/${name}`);
export const postProgramStopByName = (name: string) =>
    alovaInstance.Post(`/program/stop/${name}`);
export const getProgramLogNameStdout = () =>
    alovaInstance.Get("/program/log/${name}/stdout");
export const postProgramStartPrograms = () =>
    alovaInstance.Post("/program/startPrograms");
export const postProgramStopPrograms = () =>
    alovaInstance.Post("/program/stopPrograms");

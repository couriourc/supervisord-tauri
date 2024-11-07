import {alovaInstance} from "./index";

export const getLogtailByProgramStdout = (program: string) => alovaInstance.Get(`/logtail/${program}/stdout`);
export const getLogtailByProgramStderr = (program: string) => alovaInstance.Get(`/logtail/${program}/stderr`);

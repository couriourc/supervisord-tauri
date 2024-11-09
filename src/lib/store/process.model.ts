import {EProcessStatus} from "$lib/types/program";

export interface ProcessModel {
    name: string;
    statename: EProcessStatus;
    group: string;
    description: string;
    start: number;
    stop: string;
    now: number;
    state: number;
    spawnerr: string;
    exitstatus: 0;
    logfile: string;
    stdout_logfile: string;
    stderr_logfile: string;
    pid: number;
}

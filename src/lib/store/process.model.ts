import {EProcessStatus} from "$lib/types/program";

export interface ProcessModel {
    name: string;
    statename: EProcessStatus;
}

import {alovaInstance} from "./index";

export const postSupervisorShutdown = () =>
    alovaInstance.Post("/supervisor/shutdown");
export const postSupervisorReload = () =>
    alovaInstance.Post("/supervisor/reload");

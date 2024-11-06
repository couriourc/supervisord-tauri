import {alovaInstance} from "./index";

export const getMetrics = () => alovaInstance.Get("/metrics");

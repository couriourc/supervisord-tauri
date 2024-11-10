import {alovaInstance} from "./index";
import {BaseClient} from "$lib/services/baseClient";
import normalizeUrl from "normalize-url";

export const getMetrics = (alovaInstance: BaseClient["alovaInstance"]) => alovaInstance.Get("/metrics");

export class MetricsClient extends BaseClient {

    constructor(endpoint: string) {
        super();
        this.endpoint = endpoint;
        this.getMetrics = getMetrics.bind(null, this.alovaInstance);
    }

    getMetrics: () => ReturnType<typeof getMetrics>;
}

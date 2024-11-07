import {alovaInstance} from "./index";
import {AbcClient} from "$lib/services/abcClient";
import normalizeUrl from "normalize-url";

export const getMetrics = (endpoint: string) => alovaInstance.Get(normalizeUrl(endpoint + "/metrics"));

export class MetricsClient implements AbcClient {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.getMetrics = getMetrics.bind(null, this.endpoint);
    }

    getMetrics: () => ReturnType<typeof getMetrics>;
}

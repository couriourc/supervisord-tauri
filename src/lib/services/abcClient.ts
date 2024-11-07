export abstract class AbcClient {
    abstract endpoint: string;

    protected constructor(endpoint: string) {
    }
}

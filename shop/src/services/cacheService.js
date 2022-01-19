import { createClient } from "redis";
import helpers from "../helper";
const cacheService = {
    async connect() {
        this.client = createClient(6379);
        // echo redis errors to the console
        this.client.on("error", (err) => {
            throw err;
        });
        await this.client.connect();
        return this.client;
    },
    getInstance() {
        return this.client;
    },
    async set(key, value, EX) {
        try {
            let cleanValue = value;
            if (typeof value === "object") {
                cleanValue = JSON.stringify(value);
            }
            await this.client.set(key, cleanValue, { EX });
        } catch (e) {}
    },
    async get(key) {
        try {
            const data = await this.client.get(key);
            return helpers.isJSON(data) ? JSON.parse(data) : data;
        } catch (e) {
            return null;
        }
    },
};
export default cacheService;

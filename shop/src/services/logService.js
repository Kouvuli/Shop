import logModel from "../models/logModel";
const logService = {
    async create({ userId = "", action = "view", extra = {}, objectId = "" }) {
        return await logModel.create({ userId, action, extra, objectId });
    },
    async getLogsByUserId({ userId }) {
        return await logModel.find({ userId }).lean();
    },
    async getLogsByObjectId({ objectId, action = "" }) {
        const filter = { objectId };
        if (!!action) {
            filter.action = action;
        }
        return await logModel.find(filter).lean();
    },
};

export default logService;

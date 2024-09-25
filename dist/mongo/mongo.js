"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uri = process.env.MONGO_URI || "mongodb://10.14.255.53:27017";
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
exports.db = client.db("swift");
const collection = (coll) => exports.db.collection(coll);
exports.collection = collection;
//# sourceMappingURL=mongo.js.map
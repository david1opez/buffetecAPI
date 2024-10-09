"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const uri = process.env.MONGO_URI || "mongodb://localhost:27017/";
const uri = process.env.MONGO_URI ||
    "mongodb+srv://swift:swift@cluster0.h4bqimr.mongodb.net/";
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
exports.db = client.db("swift");
const collection = (coll) => exports.db.collection(coll);
exports.collection = collection;
//# sourceMappingURL=mongo.js.map
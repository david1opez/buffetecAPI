import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();

// const uri = process.env.MONGO_URI || "mongodb://localhost:27017/";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://swift:swift@cluster0.h4bqimr.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("swift");
export const collection = (coll: string) => db.collection(coll);

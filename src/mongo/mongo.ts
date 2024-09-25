import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URI || "mongodb://10.14.255.53:27017";

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

export const db = client.db("swift");
export const collection = (coll: string) => db.collection(coll);

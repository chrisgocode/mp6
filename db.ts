import { MongoClient, Db, Collection } from "mongodb";
import { Collections, User } from "./lib/types";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI not set");
}

const DB_NAME = "mp6-data";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connect(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedDb && cachedClient) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGO_URI!);
  await client.connect();

  cachedClient = client;
  cachedDb = client.db(DB_NAME);

  return { client: cachedClient, db: cachedDb };
}

// i wanted to parametize this getCollection with a generic <T> so i could
// reuse it to retrieve collections via this function and just pass in the type
// but i found this and i think it works better than what i had in mind
// https://stackoverflow.com/questions/72030590/how-do-i-get-a-generic-and-static-reference-to-a-mongodb-collection
async function getCollection<Name extends keyof Collections>(
  collectionName: Name,
): Promise<Collections[Name]> {
  const { db } = await connect();
  return db.collection(collectionName) as Collections[Name];
}

export async function getUsersCollection(): Promise<Collection<User>> {
  return getCollection("USERS_COLLECTION");
}

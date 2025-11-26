import { User } from "./types";
import { ObjectId } from "mongodb";
import { getUsersCollection } from "@/db";

export default async function getUserById(id: string): Promise<User | null> {
  const userId = ObjectId.createFromHexString(id);

  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: userId });

  if (user === null) {
    return null;
  }

  return user;
}

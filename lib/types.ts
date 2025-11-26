import { Collection, Document, ObjectId } from "mongodb";

export interface User extends Document {
  _id?: ObjectId;
  github_id: number;
  username: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Collections {
  USERS_COLLECTION: Collection<User>;
}

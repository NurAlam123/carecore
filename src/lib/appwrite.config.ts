"use server";

import { Client, Databases, Messaging, Storage, Users } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string);

  return {
    get users() {
      return new Users(client);
    },
    get database() {
      return new Databases(client);
    },
    get messaging() {
      return new Messaging(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

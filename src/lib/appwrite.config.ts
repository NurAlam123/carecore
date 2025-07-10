"use server";

import {
  Client,
  Databases,
  ID,
  Messaging,
  Models,
  Storage,
  Users,
} from "node-appwrite";

import { parseStringify } from "./utils";

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

export const getUser = async (userID: string) => {
  const { users } = await createAdminClient();

  try {
    const user = await users.get(userID);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};

export const createDocument = async (data: Partial<Models.Document>) => {
  const { database } = await createAdminClient();

  const document = await database.createDocument(
    process.env.DATABASE_ID!,
    process.env.PATIENT_COLLECTION_ID!,
    ID.unique(),
    data,
  );

  return document;
};

export const uploadFileStorage = async (inputFile: File) => {
  const { storage } = await createAdminClient();

  const file = await storage.createFile(
    process.env.NEXT_PUBLIC_BUCKET_ID!,
    ID.unique(),
    inputFile,
  );

  return {
    file_id: file.$id,
    file,
    url: file.$id
      ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID!}/files/${file.$id}/view??project=${process.env.APPWRITE_PROJECT_ID}`
      : null,
  };
};

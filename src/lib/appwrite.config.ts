"use server";

import {
  Client,
  Databases,
  ID,
  Messaging,
  Models,
  Query,
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

export const getPatient = async (userID: string) => {
  const { database } = await createAdminClient();

  try {
    const patients = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal("user_id", userID)],
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(error);
  }
};

export const createDocument = async ({
  data,
  collection,
}: {
  data: Partial<Models.Document>;
  collection: "patient" | "appointment";
}) => {
  const { database } = await createAdminClient();

  let collectionID;
  switch (collection) {
    case "patient":
      collectionID = process.env.PATIENT_COLLECTION_ID!;
      break;
    case "appointment":
      collectionID = process.env.APPOINTMENT_COLLECTION_ID!;
      break;
    default:
      collectionID = process.env.PATIENT_COLLECTION_ID!;
      break;
  }

  const document = await database.createDocument(
    process.env.DATABASE_ID!,
    collectionID!,
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

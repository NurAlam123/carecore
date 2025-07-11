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
import { Collection } from "@/constants";

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

const getCollectionID = (ID: Collection) => {
  switch (ID) {
    case Collection.PATIENT:
      return process.env.PATIENT_COLLECTION_ID!;
    case Collection.APPOINTMENT:
      return process.env.APPOINTMENT_COLLECTION_ID!;
    default:
      return process.env.PATIENT_COLLECTION_ID!;
  }
};

export const getUser = async (userID: string) => {
  const { users } = await createAdminClient();

  try {
    const user = await users.get(userID);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getDocument = async ({
  documentID,
  collection,
}: {
  documentID: string;
  collection: Collection;
}) => {
  const { database } = await createAdminClient();
  try {
    const collectionID = getCollectionID(collection);

    const document = await database.getDocument(
      process.env.DATABASE_ID!,
      collectionID,
      documentID,
    );

    return parseStringify(document);
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getDocumentList = async ({
  query,
  collection,
}: {
  query: string[];
  collection: Collection;
}) => {
  const { database } = await createAdminClient();
  try {
    const collectionID = getCollectionID(collection);

    const documents = await database.listDocuments(
      process.env.DATABASE_ID!,
      collectionID,
      query,
    );

    return parseStringify(documents);
  } catch (error) {
    console.error(error);
    return;
  }
};

export const createDocument = async ({
  data,
  collection,
}: {
  data: Partial<Models.Document>;
  collection: Collection;
}) => {
  const { database } = await createAdminClient();

  const collectionID = getCollectionID(collection);

  const document = await database.createDocument(
    process.env.DATABASE_ID!,
    collectionID!,
    ID.unique(),
    data,
  );

  return document;
};
export const updateDocument = async ({
  data,
  documentID,
  collection,
}: {
  documentID: string;
  data: Partial<Models.Document>;
  collection: Collection;
}) => {
  const { database } = await createAdminClient();
  try {
    const collectionID = getCollectionID(collection);

    const updatedDocument = await database.updateDocument(
      process.env.DATABASE_ID!,
      collectionID!,
      documentID,
      data,
    );

    if (!updatedDocument) {
      throw new Error("Appointment not found");
    }

    return parseStringify(updatedDocument);
  } catch (error) {
    console.error(error);
    return;
  }
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

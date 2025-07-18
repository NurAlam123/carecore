"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  createAdminClient,
  createDocument,
  getDocumentList,
  uploadFileStorage,
} from "../appwrite";
import { parseStringify } from "../utils";
import { Collection } from "@/constants";
import { CreateUserParams, RegisterUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
  const { users } = await createAdminClient();

  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      "+" + user.phone,
      undefined,
      user.name,
    );
    return { isNew: true, user: newUser };
  } catch (error) {
    // console.error(error);
    if (error instanceof AppwriteException) {
      if (error.code === 409) {
        const documents = await users.list([
          Query.equal("email", [user.email]),
        ]);

        return {
          isNew: false,
          user: documents.users[0],
        };
      }
    }
  }
};

export const registerPatient = async ({
  identification_document,
  gender,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identification_document) {
      const inputFile =
        identification_document &&
        InputFile.fromBuffer(
          identification_document?.get("blobFile") as Blob,
          identification_document?.get("fileName") as string,
        );

      file = await uploadFileStorage(inputFile);
    }

    const newPatient = await createDocument({
      data: {
        ...patient,
        gender: gender.toLowerCase(),
        identification_document_id: file?.file_id ? file.file_id : null,
        identification_document_url: file?.url,
      },
      collection: Collection.PATIENT,
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userID: string) => {
  const patients = await getDocumentList({
    query: [Query.equal("user_id", userID)],
    collection: Collection.PATIENT,
  });

  return patients.documents[0];
};

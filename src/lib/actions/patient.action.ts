"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";

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
    return newUser;
  } catch (error) {
    console.error(error);
    if (error instanceof AppwriteException) {
      if (error.code === 409) {
        const documents = await users.list([
          Query.equal("email", [user.email]),
        ]);

        return documents.users[0];
      }
    }
  }
};

"use server";

import { createDocument } from "../appwrite";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams,
) => {
  try {
    const newPatient = await createDocument({
      data: appointmentData,
      collection: "appointment",
    });

    return parseStringify(newPatient);
  } catch {}
};

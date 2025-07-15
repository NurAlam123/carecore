"use server";

import { Query } from "node-appwrite";
import {
  createDocument,
  getDocument,
  getDocumentList,
  sendSMS,
  updateDocument,
} from "../appwrite";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite";
import { Collection } from "@/constants";
import { revalidatePath } from "next/cache";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams,
) => {
  try {
    const newPatient = await createDocument({
      data: appointmentData,
      collection: Collection.APPOINTMENT,
    });

    return parseStringify(newPatient);
  } catch {}
};

export const getAppointment = async (appointmentID: string) => {
  const appointment = getDocument({
    documentID: appointmentID,
    collection: Collection.APPOINTMENT,
  });
  return appointment;
};

export const getRecentAppointmentList = async () => {
  const appointments = await getDocumentList({
    collection: Collection.APPOINTMENT,
    query: [Query.orderDesc("$createdAt")],
  });

  if (!appointments) return;

  const initialCounts = {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  };

  const counts = (appointments.documents as Appointment[]).reduce(
    (acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    },
    initialCounts,
  );

  const data = {
    totalCount: appointments.total,
    ...counts,
    documents: appointments.documents,
  };

  return parseStringify(data);
};

export const updateAppointment = async ({
  appointment_id: appointmentID,
  user_id: userID,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  const updatedAppointment = await updateDocument({
    collection: Collection.APPOINTMENT,
    documentID: appointmentID,
    data: appointment,
  });

  if (!updatedAppointment) return;
  // sms
  const sms = `
    Hi, it's CareCore.
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primary_physician}`
        : `We regret to inform you that your appointment has been cancelled for the following reason ${appointment.cancellation_reason}`
    }
  `;

  await sendSMS({ userID, content: sms });

  revalidatePath("/admin");
  return updateDocument;
};

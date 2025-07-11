"use server";

import { Query } from "node-appwrite";
import { createDocument, getDocument, getDocumentList } from "../appwrite";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite";
import { Collection } from "@/constants";

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

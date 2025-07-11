"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField from "../forms/CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Doctors, FormFieldTypes } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  AppointmentFieldValuesTypeMap,
  getAppointmentSchema,
} from "@/schemas/AppointmentSchema";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite";

type AppointmentStatusType = "create" | "cancel" | "schedule";

interface Props {
  userID: string;
  patientID: string;
  appointmentStatusType: AppointmentStatusType;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}

const AppointmentForm = ({
  userID,
  patientID,
  appointmentStatusType,
  appointment,
  setOpen,
}: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const AppointmentValidationSchema = getAppointmentSchema(
    appointmentStatusType,
  );

  const form = useForm<AppointmentFieldValuesTypeMap[AppointmentStatusType]>({
    resolver: zodResolver(AppointmentValidationSchema),
    defaultValues: {
      primary_physician: appointment ? appointment.primary_physician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellation_reason:
        appointment && appointment.cancellation_reason
          ? appointment.cancellation_reason
          : "",
    },
  });

  async function onSubmit(
    values: AppointmentFieldValuesTypeMap[AppointmentStatusType],
  ) {
    setIsLoading(true);

    let status;

    switch (appointmentStatusType) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (appointmentStatusType === "create" && patientID) {
        const appointmentData = {
          user_id: userID,
          patient: patientID,
          primary_physician: values.primary_physician,
          schedule: new Date(values.schedule),
          reason: values.reason || "",
          note: values.note,
          status: status as Status,
        } satisfies CreateAppointmentParams;

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userID}/new-appointment/success?appointmentID=${appointment.$id}`,
          );
        }

        setIsLoading(false);
      } else {
        const appointmentToUpdate = {
          user_id: userID,
          appointment_id: appointment?.$id as string,
          appointment: {
            primary_physician: values.primary_physician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellation_reason: values.cancellation_reason,
          },
          type: appointmentStatusType,
        } satisfies UpdateAppointmentParams;

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          if (setOpen) setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  let buttonLabel;

  switch (appointmentStatusType) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {appointmentStatusType === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {appointmentStatusType !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SELECT}
              name="primary_physician"
              placeholder="Select a Doctor"
              label="Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt="Doctor"
                      width={32}
                      height={32}
                      draggable="false"
                      className="rounded-full border border-dark-500 aspect-square select-none"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - hh-mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {appointmentStatusType === "cancel" && (
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="cancellation_reason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={cn(
            "w-full",
            appointmentStatusType === "cancel"
              ? "shad-danger-btn"
              : "shad-primary-btn",
          )}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

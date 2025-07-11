import z from "zod";

export const CreateAppointmentSchema = z.object({
  primary_physician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primary_physician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primary_physician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellation_reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export type CreateAppointmentFieldValues = z.infer<
  typeof CreateAppointmentSchema
>;
export type CancelAppointmentFieldValues = z.infer<
  typeof CancelAppointmentSchema
>;
export type ScheduleAppointmentFieldValues = z.infer<
  typeof ScheduleAppointmentSchema
>;

export type AppointmentFieldValuesTypeMap = {
  create: CreateAppointmentFieldValues;
  cancel: CancelAppointmentFieldValues;
  schedule: ScheduleAppointmentFieldValues;
};

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

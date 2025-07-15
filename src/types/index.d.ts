import { Appointment } from "./appwrite";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  user_id: string;
  birth_date: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  primary_physician: string;
  insurance_provider: string;
  insurance_policy_number: string;
  allergies: string | undefined;
  current_medication: string | undefined;
  family_medical_history: string | undefined;
  past_medical_history: string | undefined;
  identification_type: string | undefined;
  identification_number: string | undefined;
  identification_document: FormData | undefined;
  privacy_consent: boolean;
  treatment_consent: boolean;
  disclosure_consent: boolean;
}

declare type CreateAppointmentParams = {
  user_id: string;
  patient: string;
  primary_physician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointment_id: string;
  user_id: string;
  appointment: Partial<Appointment>;
  type: string;
};
